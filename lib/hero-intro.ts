export type IntroPhase = "pending" | "playing" | "done";
// "skip" is for visitors who prefer reduced motion: no animation at all.
export type IntroEvent = "ready" | "complete" | "error" | "timeout" | "skip";

export const FPS = 25;
export const SPEED = 1.75;
// The pen finishes the "d" stem at frame 71: the stencil covers the real
// wordmark best there (99.7 %), better than at frame 62 (96.4 %).
export const HOLD_FRAME = 71;
export const INTRO_DURATION_MS = Math.round(
  (HOLD_FRAME / (FPS * SPEED)) * 1000,
);
export const INTRO_TIMEOUT_MS = 4000;

export const BUTTON_AFTER_HEADLINE_MS = 300;

export function initialPhase(reducedMotion: boolean): IntroPhase {
  return reducedMotion ? "done" : "pending";
}

export function nextPhase(phase: IntroPhase, event: IntroEvent): IntroPhase {
  if (phase === "done") return "done";
  if (event === "error" || event === "timeout" || event === "skip")
    return "done";
  if (event === "ready" && phase === "pending") return "playing";
  if (event === "complete" && phase === "playing") return "done";
  return phase;
}

export function frameAt(elapsedMs: number): number {
  if (elapsedMs >= INTRO_DURATION_MS) return HOLD_FRAME;
  return Math.max(0, Math.floor((elapsedMs / 1000) * FPS * SPEED));
}

// The headline starts when the drawing is done, the button a little later.
export function textStartTimes(durationMs: number) {
  return {
    headline: durationMs,
    button: durationMs + BUTTON_AFTER_HEADLINE_MS,
  };
}
