import { afterEach, describe, expect, it, vi } from "vitest";
import { prefersReducedMotion } from "./prefers-reduced-motion";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

describe("prefersReducedMotion", () => {
  it("returns false when matchMedia is unavailable", () => {
    window.matchMedia = undefined as unknown as typeof window.matchMedia;
    expect(prefersReducedMotion()).toBe(false);
  });

  it("returns true when the media query matches", () => {
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    expect(prefersReducedMotion()).toBe(true);
  });

  it("returns false when the media query does not match", () => {
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      media: "",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;

    expect(prefersReducedMotion()).toBe(false);
  });
});
