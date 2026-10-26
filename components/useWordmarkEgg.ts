"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import {
  TAP_STOP_MS,
  WORDMARK_FONT_KEYS,
  createCycler,
} from "@/lib/wordmark-fonts";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";

type Input = "hover" | "tap";

export interface EggFont {
  key: string;
  family: string;
}

// Cycling twice a second is under the three flashes a second that WCAG 2.3.1
// allows, and it is a small area. It is off for reduced motion.
export function useWordmarkEgg(enabled: boolean) {
  const [font, setFont] = useState<EggFont | null>(null);
  const [families] = useState(() => new Map<string, string>());
  const [ready] = useState(() => new Set<string>());
  const loading = useRef(false);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentEvent = useRef(false);
  const [cycler] = useState(() =>
    createCycler({
      order: WORDMARK_FONT_KEYS,
      isReady: (key) => ready.has(key),
      onTick: (key) =>
        setFont({ key, family: families.get(key) ?? "" }),
    }),
  );

  const loadFonts = useCallback(() => {
    if (loading.current) return;
    loading.current = true;
    import("@/components/wordmark-fonts").then(({ wordmarkFamilies }) => {
      for (const [key, family] of Object.entries(wordmarkFamilies)) {
        families.set(key, family);
        document.fonts
          .load(`100px ${family}`, "Manfred")
          .then(() => {
            ready.add(key);
            cycler.nudge();
          })
          .catch(() => {});
      }
    });
  }, [cycler, families, ready]);

  const stop = useCallback(() => {
    cycler.stop();
    if (stopTimer.current) clearTimeout(stopTimer.current);
    stopTimer.current = null;
    setFont(null);
  }, [cycler]);

  const start = useCallback(
    (input: Input) => {
      if (!enabled || prefersReducedMotion()) return;
      loadFonts();
      if (!sentEvent.current) {
        sentEvent.current = true;
        window.manfred?.("Wordmark easter egg", {
          props: { page: window.location.pathname, input },
        });
      }
      cycler.start();
      if (input === "tap") stopTimer.current = setTimeout(stop, TAP_STOP_MS);
    },
    [enabled, loadFonts, stop, cycler],
  );

  // Runs on unmount, and when the egg is switched off while it runs.
  useEffect(() => stop, [stop, enabled]);

  const isTouch = (event: PointerEvent) => event.pointerType === "touch";

  return {
    font,
    handlers: {
      onPointerEnter: (event: PointerEvent) => {
        if (!isTouch(event)) start("hover");
      },
      onPointerLeave: (event: PointerEvent) => {
        if (!isTouch(event)) stop();
      },
      onPointerDown: (event: PointerEvent) => {
        if (!isTouch(event)) return;
        if (cycler.running()) stop();
        else start("tap");
      },
    },
  };
}
