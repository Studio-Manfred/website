import { describe, expect, it } from "vitest";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { TRAITS } from "./traits";
import { cleanFinding, type Finding } from "./findings";
import {
  affectedShare,
  defaultAssumptions,
  parseAmount,
  phaseWeight,
  rankFindings,
  valueByArchetype,
  valueFinding,
} from "./score";

const hotel = INDUSTRIES.hotel;
const base: Finding = {
  id: "f1",
  source: "model",
  title: "Room size unclear",
  kind: "usability",
  severity: "high",
  effort: "small",
  phase: 1,
  archetypes: ["family_planner"],
  where: "Room page",
  problem: "Beds and cot space are not shown.",
  suggestion: "Show beds and space per room.",
  quotes: [{ archetype: "family_planner", quote: "Will the cot fit?" }],
  wcag: null,
  heuristic: "Match between system and the real world",
};

describe("traits", () => {
  it("every archetype in every industry has traits", () => {
    for (const ind of Object.values(INDUSTRIES)) for (const p of ind.personas) expect(TRAITS[p.id], p.id).toBeDefined();
  });
});

describe("parseAmount", () => {
  it("reads numbers with thousands separators, and nothing as 0", () => {
    expect(parseAmount("8,200")).toBe(8200);
    expect(parseAmount("310,000")).toBe(310000);
    expect(parseAmount("–")).toBe(0);
  });
});

describe("value of a finding", () => {
  const a = defaultAssumptions(hotel);

  it("takes customers and revenue from the industry", () => {
    expect(a.customers).toBe(310000);
    expect(a.revenuePerCustomer).toBe(2450);
  });

  it("the share affected is the archetypes' share of customers", () => {
    expect(affectedShare(hotel, ["family_planner"])).toBeCloseTo(0.21);
    expect(affectedShare(hotel, ["family_planner", "leisure_couple"])).toBeCloseTo(0.48);
    expect(affectedShare(hotel, ["unknown"])).toBe(0);
  });

  it("a bigger gap in the phase weighs more, between 1 and 2", () => {
    for (let i = 0; i < 6; i++) {
      expect(phaseWeight(hotel, i)).toBeGreaterThanOrEqual(1);
      expect(phaseWeight(hotel, i)).toBeLessThanOrEqual(2);
    }
    // Hotel: before arrival (2) has a bigger gap than inspiration (0).
    expect(phaseWeight(hotel, 2)).toBeGreaterThan(phaseWeight(hotel, 0));
  });

  it("value is customers × share × revenue × impact × phase weight", () => {
    const v = valueFinding(base, hotel, a);
    expect(v.affectedCustomers).toBe(Math.round(310000 * 0.21));
    expect(v.value).toBe(Math.round(v.affectedCustomers * 2450 * 0.01 * phaseWeight(hotel, 1)));
    expect(v.priority).toBe(v.value);
  });

  it("more effort lowers priority, not value", () => {
    const small = valueFinding(base, hotel, a);
    const large = valueFinding({ ...base, effort: "large" }, hotel, a);
    expect(large.value).toBe(small.value);
    expect(large.priority).toBe(small.value / 4);
  });

  it("changing an assumption changes the value", () => {
    const doubled = valueFinding(base, hotel, { ...a, revenuePerCustomer: a.revenuePerCustomer * 2 });
    expect(doubled.value).toBeCloseTo(valueFinding(base, hotel, a).value * 2, -1);
  });

  it("ranks by priority, highest first", () => {
    const low = { ...base, id: "f2", severity: "low" as const };
    const crit = { ...base, id: "f3", severity: "critical" as const };
    expect(rankFindings([low, base, crit], hotel, a).map((f) => f.id)).toEqual(["f3", "f1", "f2"]);
  });

  it("splits each finding's value over its archetypes by share", () => {
    const both = { ...base, archetypes: ["family_planner", "leisure_couple"] };
    const [v] = rankFindings([both], hotel, a);
    const split = valueByArchetype([v], hotel);
    expect(split.family_planner + split.leisure_couple).toBeCloseTo(v.value, -1);
    expect(split.family_planner / split.leisure_couple).toBeCloseTo(21 / 27, 1);
    expect(split.business_traveller).toBe(0);
  });
});

describe("cleanFinding", () => {
  const ids = hotel.personas.map((p) => p.id);
  it("drops unknown archetypes and their quotes, and clamps the phase", () => {
    const f = cleanFinding({ ...base, archetypes: ["family_planner", "ghost"], quotes: [...base.quotes, { archetype: "ghost", quote: "Boo" }], phase: 9 }, ids, 6)!;
    expect(f.archetypes).toEqual(["family_planner"]);
    expect(f.quotes).toHaveLength(1);
    expect(f.phase).toBe(5);
  });
  it("drops a finding with no known archetype", () => {
    expect(cleanFinding({ ...base, archetypes: ["ghost"] }, ids, 6)).toBeNull();
  });
});
