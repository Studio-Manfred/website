"use client";

import { useCallback, useEffect, useReducer, useState } from "react";
import { Button } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { WordmarkReveal } from "@/components/WordmarkReveal";
import {
  BUTTON_AFTER_HEADLINE_MS,
  INTRO_TIMEOUT_MS,
  nextPhase,
  type IntroPhase,
} from "@/lib/hero-intro";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";
import { fontSize } from "@/lib/typography";

type LoadStencil = () => Promise<readonly string[]>;

const loadDefaultStencil: LoadStencil = () =>
  import("@/lib/wordmark-stencil.json").then(
    (module) => module.default as readonly string[],
  );

interface HeroIntroProps {
  loadStencil?: LoadStencil;
}

// The home hero: the wordmark draws itself, then the headline rises, then the
// button. The server renders everything visible. Reduced motion, a failed load
// and a timeout all end in "done", so the hero is never left empty.
export function HeroIntro({
  loadStencil = loadDefaultStencil,
}: HeroIntroProps) {
  const [phase, dispatch] = useReducer(nextPhase, "pending" as IntroPhase);
  const [frames, setFrames] = useState<readonly string[] | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [buttonWaited, setButtonWaited] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      dispatch("skip");
      return;
    }
    let cancelled = false;
    const timeout = setTimeout(() => dispatch("timeout"), INTRO_TIMEOUT_MS);
    loadStencil()
      .then((loaded) => {
        if (cancelled) return;
        clearTimeout(timeout);
        setFrames(loaded);
        dispatch("ready");
      })
      .catch(() => {
        if (cancelled) return;
        clearTimeout(timeout);
        dispatch("error");
      });
    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [loadStencil]);

  const onComplete = useCallback(() => {
    setDrawn(true);
    dispatch("complete");
  }, []);

  useEffect(() => {
    if (phase !== "done" || !drawn) return;
    const timer = setTimeout(
      () => setButtonWaited(true),
      BUTTON_AFTER_HEADLINE_MS,
    );
    return () => clearTimeout(timer);
  }, [phase, drawn]);

  const headlineStart = phase === "done";
  const buttonStart = phase === "done" && (!drawn || buttonWaited);

  return (
    <div data-intro={phase} className="w-full">
      <div className="flex justify-center mb-24 md:mb-32">
        <WordmarkReveal phase={phase} frames={frames} onComplete={onComplete} />
      </div>
      <FadeIn delay={1} start={headlineStart}>
        <h1
          className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white text-center mb-20"
          style={{ fontSize: fontSize.heroDisplay }}
        >
          Building Better Product Companies
        </h1>
      </FadeIn>
      <FadeIn delay={2} start={buttonStart}>
        <Button variant="inverse" size="lg" asChild>
          <GetInTouchLink location="hero" />
        </Button>
      </FadeIn>
    </div>
  );
}
