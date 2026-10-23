import { describe, expect, it } from "vitest";
import { isPastHero } from "./hero-exit";

describe("isPastHero", () => {
  it("is true when the hero has scrolled above the viewport", () => {
    expect(
      isPastHero({ isIntersecting: false, boundingClientRect: { bottom: -1 } }),
    ).toBe(true);
  });

  it("is false while the hero is in view", () => {
    expect(
      isPastHero({ isIntersecting: true, boundingClientRect: { bottom: 300 } }),
    ).toBe(false);
  });

  it("is false when the hero is below the viewport", () => {
    expect(
      isPastHero({ isIntersecting: false, boundingClientRect: { bottom: 500 } }),
    ).toBe(false);
  });

  it("is true when the hero's bottom edge sits exactly at the top", () => {
    expect(
      isPastHero({ isIntersecting: false, boundingClientRect: { bottom: 0 } }),
    ).toBe(true);
  });
});
