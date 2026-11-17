import { describe, expect, it } from "vitest";
import { ALL_CRITERIA, AUTO_CHECKS, CRITERIA_GROUPS, allowedKinds, chosenCriteria } from "./criteria";

describe("criteria", () => {
  it("has the ten usability heuristics, accessibility and business groups, with unique ids", () => {
    expect(CRITERIA_GROUPS.map((g) => g.kind)).toEqual(["usability", "accessibility", "improvement"]);
    expect(CRITERIA_GROUPS[0].items).toHaveLength(10);
    expect(new Set(ALL_CRITERIA).size).toBe(ALL_CRITERIA.length);
    expect(ALL_CRITERIA).toContain(AUTO_CHECKS);
  });

  it("keeps only known ids, in menu order", () => {
    expect(chosenCriteria(["b-trust", "ghost", "h-status"]).map((c) => c.id)).toEqual(["h-status", "b-trust"]);
  });

  it("a kind of finding is allowed when its group has a chosen criterion", () => {
    expect(allowedKinds(["h-status"])).toEqual(["usability"]);
    expect(allowedKinds(["a11y-operable", "b-price"])).toEqual(["accessibility", "improvement"]);
  });
});
