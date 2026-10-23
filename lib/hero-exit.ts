interface HeroEntry {
  isIntersecting: boolean;
  boundingClientRect: { bottom: number };
}

export function isPastHero(entry: HeroEntry): boolean {
  return !entry.isIntersecting && entry.boundingClientRect.bottom <= 0;
}
