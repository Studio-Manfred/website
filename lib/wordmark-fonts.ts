// The home hero wordmark easter egg: hover it (or tap it on a phone) and the
// word Manfred changes typeface about six times a second. This module is the pure part:
// the font list and the cycling. The fonts themselves load in
// components/wordmark-fonts.ts, only when someone first hovers or taps.

export const CYCLE_INTERVAL_MS = 150;
// A tap has no "leave", so the cycling ends by itself.
export const TAP_STOP_MS = 6000;

export interface WordmarkFont {
  key: string;
  label: string;
  weight: number;
  // Font size and baseline in the wordmark's 620 x 282 viewBox: each typeface
  // sits differently on its baseline, so each gets its own.
  size: number;
  baseline: number;
}

// Alternates style on purpose, so every change is easy to see.
export const WORDMARK_FONTS: readonly WordmarkFont[] = [
  { key: "great-vibes", label: "Great Vibes", weight: 400, size: 210, baseline: 190 },
  { key: "rubik-wet-paint", label: "Rubik Wet Paint", weight: 400, size: 190, baseline: 190 },
  { key: "inter-tight", label: "Inter Tight", weight: 800, size: 190, baseline: 200 },
  { key: "unifraktur-cook", label: "UnifrakturCook", weight: 700, size: 190, baseline: 200 },
  { key: "raleway", label: "Raleway", weight: 200, size: 190, baseline: 200 },
  { key: "bungee", label: "Bungee", weight: 400, size: 180, baseline: 200 },
  { key: "playfair-display", label: "Playfair Display", weight: 900, size: 190, baseline: 200 },
  { key: "special-elite", label: "Special Elite", weight: 400, size: 190, baseline: 200 },
  { key: "rock-salt", label: "Rock Salt", weight: 400, size: 150, baseline: 200 },
  { key: "space-grotesk", label: "Space Grotesk", weight: 700, size: 190, baseline: 200 },
];

export const WORDMARK_FONT_KEYS = WORDMARK_FONTS.map((font) => font.key);

export function nextReadyKey(
  order: readonly string[],
  current: string | null,
  isReady: (key: string) => boolean,
): string | null {
  const from = current === null ? -1 : order.indexOf(current);
  for (let step = 1; step <= order.length; step++) {
    const key = order[(from + step) % order.length];
    if (isReady(key)) return key;
  }
  return null;
}

interface CyclerOptions {
  order: readonly string[];
  isReady: (key: string) => boolean;
  onTick: (key: string) => void;
  intervalMs?: number;
}

export function createCycler({
  order,
  isReady,
  onTick,
  intervalMs = CYCLE_INTERVAL_MS,
}: CyclerOptions) {
  let timer: ReturnType<typeof setInterval> | null = null;
  let current: string | null = null;

  const tick = () => {
    const key = nextReadyKey(order, current, isReady);
    if (key === null) return;
    current = key;
    onTick(key);
  };

  return {
    start() {
      if (timer !== null) return;
      timer = setInterval(tick, intervalMs);
      tick();
    },
    // A font became ready while nothing is on screen yet: show it now, not at
    // the next tick.
    nudge() {
      if (timer !== null && current === null) tick();
    },
    stop() {
      if (timer !== null) clearInterval(timer);
      timer = null;
      current = null;
    },
    running: () => timer !== null,
  };
}
