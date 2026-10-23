interface HeroEntry {
  isIntersecting: boolean;
  boundingClientRect: { bottom: number };
  rootBounds?: { top: number } | null;
}

// rootBounds.top is the bar height when the observer uses a negative top
// rootMargin, so the bar shows before the hero's last pixels slide under the
// menu button.
export function isPastHero(entry: HeroEntry): boolean {
  return (
    !entry.isIntersecting &&
    entry.boundingClientRect.bottom <= (entry.rootBounds?.top ?? 0)
  );
}
