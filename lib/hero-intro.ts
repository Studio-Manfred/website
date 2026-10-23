export type IntroPhase = "pending" | "playing" | "done";
export type IntroEvent = "ready" | "complete" | "error" | "timeout";

export const FPS = 25;
export const SPEED = 1.5;
// The pen finishes the "d" stem at frame 71: the stencil covers the real
// wordmark best there (99.7 %), better than at frame 62 (96.4 %).
export const HOLD_FRAME = 71;
export const INTRO_DURATION_MS = Math.round(
  (HOLD_FRAME / (FPS * SPEED)) * 1000,
);
export const INTRO_TIMEOUT_MS = 4000;

const HEADLINE_AT = 0.85;
const BUTTON_AFTER_HEADLINE_MS = 300;

export function initialPhase(reducedMotion: boolean): IntroPhase {
  return reducedMotion ? "done" : "pending";
}

export function nextPhase(phase: IntroPhase, event: IntroEvent): IntroPhase {
  if (phase === "done") return "done";
  if (event === "error" || event === "timeout") return "done";
  if (event === "ready" && phase === "pending") return "playing";
  if (event === "complete" && phase === "playing") return "done";
  return phase;
}

export function frameAt(elapsedMs: number): number {
  if (elapsedMs >= INTRO_DURATION_MS) return HOLD_FRAME;
  return Math.max(0, Math.floor((elapsedMs / 1000) * FPS * SPEED));
}

export function textStartTimes(durationMs: number) {
  const headline = Math.round(durationMs * HEADLINE_AT);
  return { headline, button: headline + BUTTON_AFTER_HEADLINE_MS };
}
