"use client";

import { useEffect, useRef, useState } from "react";

const BRANDS = ["Boka Direkt", "Mentimeter", "Fishbrain", "Svea Bank", "Trygg-Hansa"];
const WAVE = "〰️";

// These scale with viewport — recalculated on resize
const BASE_FONT = 64;      // max font size px
const BASE_AMPLITUDE = 60; // max wave amplitude px
const WAVE_PAD = 32;       // extra px either side of 〰️
const FREQUENCY = 2;       // sine cycles per screen width
const SPEED = 0.8;         // px per frame (layout pixels)
const LETTER_SPACING = 1;

type Glyph = { char: string; isWave: boolean; padBefore: number; padAfter: number };

const GLYPHS: Glyph[] = [];
for (const brand of BRANDS) {
  for (const char of brand) {
    GLYPHS.push({ char, isWave: false, padBefore: 0, padAfter: LETTER_SPACING });
  }
  GLYPHS.push({ char: WAVE, isWave: true, padBefore: WAVE_PAD, padAfter: WAVE_PAD });
}

function getFontSize(viewportWidth: number) {
  // Scale from 32px on 320px screens up to 64px at 640px+
  return Math.round(Math.max(28, Math.min(BASE_FONT, viewportWidth * 0.1)));
}

export function Marquee() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [canvasHeight, setCanvasHeight] = useState(BASE_AMPLITUDE * 2 + BASE_FONT + 48);
  const [titleSize, setTitleSize] = useState(BASE_FONT);

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
    let amplitude = Math.round((fontSize / BASE_FONT) * BASE_AMPLITUDE);

    const dpr = window.devicePixelRatio || 1;

    function getFont(size: number) {
      return `300 ${size}px 'Host Grotesk', sans-serif`;
    }

    function resize() {
      fontSize = getFontSize(window.innerWidth);
      amplitude = Math.round((fontSize / BASE_FONT) * BASE_AMPLITUDE);
      const h = amplitude * 2 + fontSize + 48;
      setCanvasHeight(h);
      setTitleSize(fontSize);
      el.width = el.offsetWidth * dpr;
      el.height = el.offsetHeight * dpr;
      measure();
    }

    function measure() {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = getFont(fontSize);
      const wavePad = Math.round((fontSize / BASE_FONT) * WAVE_PAD);
      glyphWidths = GLYPHS.map((g) => {
        const pad = g.isWave ? wavePad : LETTER_SPACING;
        const extra = g.isWave ? wavePad * 2 : LETTER_SPACING;
        return ctx.measureText(g.char).width + extra;
      });
      totalWidth = glyphWidths.reduce((a, b) => a + b, 0);
    }

    function draw() {
      if (!running) return;

      const W = el.offsetWidth;
      const H = el.offsetHeight;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.font = getFont(fontSize);
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      const reps = Math.ceil((W + totalWidth) / totalWidth) + 2;
      const off = offset % totalWidth;

      for (let rep = -1; rep < reps; rep++) {
        let x = rep * totalWidth - off;

        for (let gi = 0; gi < GLYPHS.length; gi++) {
          const g = GLYPHS[gi];
          const w = glyphWidths[gi];
          const wavePad = g.isWave ? Math.round((fontSize / BASE_FONT) * WAVE_PAD) : 0;
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

      offset += SPEED;
      animId = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);

    document.fonts.ready.then(() => {
      resize();
      draw();
    });

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="bg-white border-y border-[#1e1e24]/10"
      style={{ paddingTop: "4%", paddingBottom: "4%" }}
    >
      <div className="text-center mb-8 px-6">
        <h2
          className="font-extrabold text-[#2c28ec] tracking-[var(--letter-spacing-tight)] leading-[var(--line-height-tight)]"
          style={{ fontSize: `${titleSize}px` }}
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
