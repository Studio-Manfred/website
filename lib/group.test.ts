import { describe, expect, it } from "vitest";
import { capabilities, cases, partners, pillars } from "./group";

describe("group content", () => {
  it("has the three pillars of value in order", () => {
    expect(pillars.map((p) => p.title)).toEqual(["Growth", "Change", "Expertise"]);
  });

  it("gives every pillar a lead and a body", () => {
    for (const pillar of pillars) {
      expect(pillar.lead.length).toBeGreaterThan(0);
      expect(pillar.body.length).toBeGreaterThan(0);
    }
  });

  it("lists five core capability areas with descriptions", () => {
    expect(capabilities).toHaveLength(5);
    for (const c of capabilities) expect(c.description.length).toBeGreaterThan(0);
  });

  it("lists four selected cases", () => {
    expect(cases.map((c) => c.title)).toEqual([
      "Mentimeter — Building a foundation of scalable design",
      "Blocket — Driving Outcomes",
      "Hubexo — High-Value Search",
      "Clarity for Leaders",
    ]);
  });

  it("lists the selected partners", () => {
    expect(partners).toContain("Scandic Hotels");
    expect(partners).toHaveLength(7);
  });
});
