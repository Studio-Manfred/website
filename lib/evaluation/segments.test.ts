import { describe, expect, it } from "vitest";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { SEGMENT_MIX, businessSegments } from "./segments";

describe("archetypes in business segments", () => {
  it("every archetype is spread over its industry's segments, adding up to 100%", () => {
    for (const ind of Object.values(INDUSTRIES)) {
      const segs = businessSegments(ind).map((s) => s.id);
      expect(segs).not.toContain(ind.segments[0].id);
      for (const p of ind.personas) {
        const mix = SEGMENT_MIX[p.id];
        expect(mix, p.id).toBeDefined();
        expect(Object.keys(mix).sort(), p.id).toEqual([...segs].sort());
        expect(Object.values(mix).reduce((s, x) => s + x, 0), p.id).toBeCloseTo(1, 5);
        for (const x of Object.values(mix)) expect(x).toBeGreaterThanOrEqual(0);
      }
    }
  });
});
