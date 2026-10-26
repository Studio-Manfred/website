"use client";

import { useEffect, useId, useRef } from "react";
import { INTRO_DURATION_MS, frameAt, type IntroPhase } from "@/lib/hero-intro";
import { wordmark } from "@/lib/wordmark";
import { WORDMARK_FONTS } from "@/lib/wordmark-fonts";
import { useWordmarkEgg } from "@/components/useWordmarkEgg";

interface WordmarkRevealProps {
  phase: IntroPhase;
  frames: readonly string[] | null;
  onComplete: () => void;
  height?: number;
  // The hover/tap easter egg (lib/wordmark-fonts.ts). On once the intro is done.
  egg?: boolean;
}

// Draws the real wordmark artwork. While the phase is "playing", a mask shows
// it only where the traced pen path is, frame by frame (see
// lib/wordmark-stencil.json). In every other phase the wordmark is whole.
export function WordmarkReveal({
  phase,
  frames,
  onComplete,
  height = 100,
  egg = false,
}: WordmarkRevealProps) {
  const eggState = useWordmarkEgg(egg);
  const eggFont = eggState.font
    ? WORDMARK_FONTS.find(({ key }) => key === eggState.font?.key)
    : undefined;
  const maskId = `wordmark-stencil-${useId().replace(/:/g, "")}`;
  const pathRef = useRef<SVGPathElement>(null);
  const onCompleteRef = useRef(onComplete);
  const masked = phase === "playing" && frames !== null;

  useEffect(() => {
    onCompleteRef.current = onComplete;
  });

  useEffect(() => {
    const path = pathRef.current;
    if (!masked || !path || !frames) return;

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - start;
      path.setAttribute("d", frames[frameAt(elapsed)] ?? "");
      if (elapsed >= INTRO_DURATION_MS) {
        onCompleteRef.current();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    path.setAttribute("d", frames[0] ?? "");
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [masked, frames]);

  const [, , viewBoxWidth, viewBoxHeight] = wordmark.viewBox
    .split(" ")
    .map(Number);
  const width = Math.round(((height * viewBoxWidth) / viewBoxHeight) * 10) / 10;

  return (
    <span
      role="img"
      aria-label="Manfred"
      className="inline-block leading-[0]"
      style={{ height, width, touchAction: "manipulation" }}
      {...eggState.handlers}
    >
      <svg
        viewBox={wordmark.viewBox}
        width="100%"
        height="100%"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <mask
            id={maskId}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={viewBoxWidth}
            height={viewBoxHeight}
          >
            <path
              ref={pathRef}
              d=""
              fill="#fff"
              fillRule="evenodd"
              stroke="#fff"
              strokeWidth={3}
              strokeLinejoin="round"
            />
          </mask>
        </defs>
        <g
          mask={masked ? `url(#${maskId})` : undefined}
          visibility={eggFont ? "hidden" : "visible"}
        >
          {wordmark.paths.map((d) => (
            <path key={d} d={d} fill="var(--color-brand-logo-paper, #fff)" />
          ))}
        </g>
        {eggFont && eggState.font && (
          <text
            x={30}
            y={eggFont.baseline}
            fontSize={eggFont.size}
            textLength={560}
            lengthAdjust="spacingAndGlyphs"
            fill="var(--color-brand-logo-paper, #fff)"
            style={{
              fontFamily: eggState.font.family,
              fontWeight: eggFont.weight,
            }}
          >
            Manfred
          </text>
        )}
      </svg>
    </span>
  );
}
