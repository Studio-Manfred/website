import { describe, expect, it } from "vitest";
import { HOLD_FRAME } from "./hero-intro";
import stencil from "./wordmark-stencil.json";

const frames = stencil as string[];

// Box of the real wordmark glyphs inside the viewBox (0 0 620 282), measured
// with getBBox in Chrome: x 61, y 54, width 497.2, height 174.5.
const GLYPHS = { left: 61, top: 54, right: 61 + 497.2, bottom: 54 + 174.5 };

function box(d: string) {
  const numbers = (d.match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
  const xs = numbers.filter((_, i) => i % 2 === 0);
  const ys = numbers.filter((_, i) => i % 2 === 1);
  return {
    left: Math.min(...xs),
    right: Math.max(...xs),
    top: Math.min(...ys),
    bottom: Math.max(...ys),
  };
}

describe("wordmark stencil", () => {
  it("has one frame for each step up to the hold frame", () => {
    expect(frames).toHaveLength(HOLD_FRAME + 1);
  });

  it("starts empty", () => {
    expect(frames[0]).toBe("");
  });

  it("has a closed outline in every frame once the pen has started", () => {
    for (const d of frames.slice(5)) {
      expect(d.startsWith("M")).toBe(true);
      expect(d.endsWith("Z")).toBe(true);
    }
  });

  it("keeps every point near the artwork", () => {
    for (const d of frames.slice(5)) {
      const b = box(d);
      expect(b.left).toBeGreaterThanOrEqual(GLYPHS.left - 8);
      expect(b.top).toBeGreaterThanOrEqual(GLYPHS.top - 8);
      expect(b.right).toBeLessThanOrEqual(GLYPHS.right + 8);
      expect(b.bottom).toBeLessThanOrEqual(GLYPHS.bottom + 8);
    }
  });

  it("covers the whole wordmark in the hold frame", () => {
    const b = box(frames[HOLD_FRAME]);
    expect(b.left).toBeLessThanOrEqual(GLYPHS.left + 1);
    expect(b.top).toBeLessThanOrEqual(GLYPHS.top + 1);
    expect(b.right).toBeGreaterThanOrEqual(GLYPHS.right - 1);
    expect(b.bottom).toBeGreaterThanOrEqual(GLYPHS.bottom - 1);
  });

  it("draws from left to right", () => {
    let right = -Infinity;
    for (const d of frames.slice(5, 56)) {
      const next = box(d).right;
      expect(next).toBeGreaterThanOrEqual(right - 2);
      right = Math.max(right, next);
    }
  });
});
