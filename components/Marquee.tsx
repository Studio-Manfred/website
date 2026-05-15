"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";

const BRANDS = ["Boka Direkt", "Mentimeter", "Fishbrain", "Svea Bank", "Trygg-Hansa"];
const WAVE = "〰️";

const MAX_FONT = 64;
// Amplitude as a fraction of viewport width — keeps max letter angle
// constant across all screen sizes (angle = atan(AMPLITUDE_RATIO * FREQUENCY * 2π))
const AMPLITUDE_RATIO = 0.035;
const WAVE_PAD = 32;
const FREQUENCY = 2;
const BASE_SPEED = 1.1;
const LETTER_SPACING = 1;

type Glyph = { char: string; isWave: boolean };

const GLYPHS: Glyph[] = [];
for (const brand of BRANDS) {
  for (const char of brand) {
    GLYPHS.push({ char, isWave: false });
  }
  GLYPHS.push({ char: WAVE, isWave: true });
}

function getFontSize(vw: number) {
  return Math.round(Math.max(24, Math.min(MAX_FONT, vw * 0.1)));
}

function getCanvasHeight(vw: number, fontSize: number) {
  const amplitude = Math.round(vw * AMPLITUDE_RATIO);
  return amplitude * 2 + fontSize * 2 + 80;
}


export function Marquee() {
  const ref = useRef<HTMLCanvasElement>(null);

  // Use a fixed SSR-safe fallback; useEffect updates it to the real viewport size
  const [canvasHeight, setCanvasHeight] = useState(() => getCanvasHeight(640, getFontSize(640)));

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ctx = el.getContext("2d")!;

    let animId = 0;
    let offset = 0;
    let glyphWidths: number[] = [];
    let totalWidth = 0;
    let running = true;
    let fontSize = getFontSize(window.innerWidth);
    let amplitude = Math.round(window.innerWidth * AMPLITUDE_RATIO);
    const speed = BASE_SPEED;
    const reduced = prefersReducedMotion();

    function getFont(size: number) {
      return `300 ${size}px 'Host Grotesk', sans-serif`;
    }

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const vw = window.innerWidth;
      fontSize = getFontSize(vw);
      amplitude = Math.round(vw * AMPLITUDE_RATIO);
      const h = getCanvasHeight(vw, fontSize);
      setCanvasHeight(h);
      el.width = el.offsetWidth * dpr;
      el.height = el.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      measure();
    }

    function measure() {
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = getFont(fontSize);
      const wavePad = Math.round((fontSize / MAX_FONT) * WAVE_PAD);
      glyphWidths = GLYPHS.map((g) => {
        const extra = g.isWave ? wavePad * 2 : LETTER_SPACING;
        return ctx.measureText(g.char).width + extra;
      });
      totalWidth = glyphWidths.reduce((a, b) => a + b, 0);
    }

    function draw() {
      if (!running) return;
      const dpr = window.devicePixelRatio || 1;
      const W = el.offsetWidth;
      const H = el.offsetHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = getFont(fontSize);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      if (totalWidth === 0) {
        animId = requestAnimationFrame(draw);
        return;
      }

      const reps = Math.ceil((W + totalWidth) / totalWidth) + 2;
      const off = offset % totalWidth;

      for (let rep = -1; rep < reps; rep++) {
        let x = rep * totalWidth - off;

        for (let gi = 0; gi < GLYPHS.length; gi++) {
          const g = GLYPHS[gi];
          const w = glyphWidths[gi];
          const wavePad = g.isWave ? Math.round((fontSize / MAX_FONT) * WAVE_PAD) : 0;
          const charWidth = w - (g.isWave ? wavePad * 2 : LETTER_SPACING);
          const cx = x + (g.isWave ? wavePad : 0) + charWidth / 2;

          const phase = (cx / W) * FREQUENCY * Math.PI * 2;
          const y = H / 2 + amplitude * Math.sin(phase);
          const dydx = (amplitude * FREQUENCY * Math.PI * 2 * Math.cos(phase)) / W;
          const angle = Math.atan(dydx);

          ctx.save();
          ctx.translate(cx, y);
          ctx.rotate(angle);
          ctx.fillStyle = g.isWave ? "#2c28ec" : "#1e1e24";
          ctx.fillText(g.char, 0, 0);
          ctx.restore();

          x += w;
        }
      }

      // STU-290: reduced-motion holds the first frame indefinitely. The
      // aria-label still announces all five brand names.
      if (reduced) return;
      offset += speed;
      animId = requestAnimationFrame(draw);
    }

    // Resize immediately so canvas dimensions are correct before fonts load
    resize();

    const ro = new ResizeObserver(() => resize());
    ro.observe(el);

    document.fonts.ready.then(() => {
      resize();
      draw();
    });

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      className="bg-white overflow-hidden"
      style={{ paddingTop: "8%", paddingBottom: "10%" }}
    >
      <div className="text-center mb-8 px-6">
        <h2
          className="font-extrabold text-[#2c28ec] tracking-[var(--letter-spacing-tight)] leading-[var(--line-height-tight)]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Brands that trust us
        </h2>
      </div>
      <canvas
        ref={ref}
        aria-label="Boka Direkt, Mentimeter, Fishbrain, Svea Bank, Trygg-Hansa"
        role="img"
        style={{ width: "100%", height: `${canvasHeight}px`, display: "block" }}
      />
    </section>
  );
}
