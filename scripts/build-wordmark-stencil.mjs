// One-off script: makes lib/wordmark-stencil.json from the traced Lottie of the
// Manfred wordmark intro (STU-1183). The Lottie is not shipped. It only tells us
// where the pen is at each frame; the real wordmark artwork is the picture.
//
// Run: node scripts/build-wordmark-stencil.mjs <lottie.json> [decimals] [lastFrame]
// Set OUT=<path> to write somewhere else than lib/wordmark-stencil.json.
//
// Each output entry is one frame (0 to HOLD_FRAME): the SVG path data of the
// traced shapes, mapped from the 1920x1080 Lottie canvas into the wordmark
// viewBox (0 0 620 282). The shapes use fill-rule evenodd (as in the Lottie).
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const [input, decimalsArg = "0", lastFrameArg = "71"] = process.argv.slice(2);
if (!input) {
  console.error(
    "usage: node scripts/build-wordmark-stencil.mjs <lottie.json> [decimals]",
  );
  process.exit(1);
}
const decimals = Number(decimalsArg);
const HOLD_FRAME = Number(lastFrameArg);
// Box of the real glyphs in the wordmark viewBox, measured with getBBox in Chrome.
const STATIC_BOX = { x: 61, y: 54, w: 497.2, h: 174.5 };

const lottie = JSON.parse(readFileSync(input, "utf8"));
const assets = new Map(lottie.assets.map((asset) => [asset.id, asset]));

function frameShapes(frame) {
  const layer = lottie.layers.find((l) => l.ip === frame);
  if (!layer) throw new Error(`no layer for frame ${frame}`);
  // An empty frame (the pen has not started) has no shapes.
  const group = assets.get(layer.refId).layers[0]?.shapes?.[0];
  if (!group) return [];
  return group.it.filter((item) => item.ty === "sh").map((item) => item.ks.k);
}

function bounds(shapes) {
  const xs = shapes.flatMap((s) => s.v.map((p) => p[0]));
  const ys = shapes.flatMap((s) => s.v.map((p) => p[1]));
  return {
    x: Math.min(...xs),
    y: Math.min(...ys),
    w: Math.max(...xs) - Math.min(...xs),
    h: Math.max(...ys) - Math.min(...ys),
  };
}

const hold = bounds(frameShapes(HOLD_FRAME));
const sx = STATIC_BOX.w / hold.w;
const sy = STATIC_BOX.h / hold.h;
const mapX = (x) => (x - hold.x) * sx + STATIC_BOX.x;
const mapY = (y) => (y - hold.y) * sy + STATIC_BOX.y;
const round = (n) => Number(n.toFixed(decimals));
const pt = (x, y) => `${round(mapX(x))} ${round(mapY(y))}`;

function shapeToPath(shape) {
  const { v, i, o, c } = shape;
  const count = v.length;
  const segments = c ? count : count - 1;
  let d = `M${pt(v[0][0], v[0][1])}`;
  let last = pt(v[0][0], v[0][1]);
  for (let k = 0; k < segments; k++) {
    const a = v[k];
    const b = v[(k + 1) % count];
    const out = o[k];
    const into = i[(k + 1) % count];
    const straight = !out[0] && !out[1] && !into[0] && !into[1];
    const end = pt(b[0], b[1]);
    if (straight) {
      if (end !== last) d += `L${end}`;
    } else {
      d += `C${pt(a[0] + out[0], a[1] + out[1])} ${pt(b[0] + into[0], b[1] + into[1])} ${end}`;
    }
    last = end;
  }
  return `${d}Z`;
}

const frames = [];
for (let frame = 0; frame <= HOLD_FRAME; frame++) {
  frames.push(frameShapes(frame).map(shapeToPath).join(""));
}

const json = JSON.stringify(frames);
const empty = frames.filter((d) => d === "").length;
console.log(
  `${frames.length} frames (${empty} empty), ${json.length} bytes raw, ${gzipSync(json).length} bytes gzip, decimals ${decimals}`,
);
console.log(`scale x ${sx.toFixed(4)} y ${sy.toFixed(4)} from hold box`, hold);
writeFileSync(
  process.env.OUT ?? new URL("../lib/wordmark-stencil.json", import.meta.url),
  json,
);
