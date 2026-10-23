import { describe, expect, it } from "vitest";
import { INDUSTRIES } from "./datasets";
import { ROW_STEP, STEPS } from "./levels";
import { MATRIX_GROUPS, MATRIX_ROWS } from "./matrix";
import {
  buildInsights,
  buildWatch,
  deliveryCurve,
  emotionCurve,
  expectCurve,
  metricsFor,
  rankOpportunities,
  resolveValue,
  sentimentOf,
  smoothPath,
  visibleGroups,
} from "./engine";

const finance = INDUSTRIES.finance;
const persona = finance.personas[0];

describe("customer journey data", () => {
  it("every industry has six phases and data for each of them", () => {
    for (const ind of Object.values(INDUSTRIES)) {
      expect(ind.phases).toHaveLength(6);
      expect(ind.emotionCards).toHaveLength(6);
      expect(ind.touchpoints).toHaveLength(6);
      expect(ind.expect).toHaveLength(6);
      for (const s of ind.segments) expect(ind.metrics[s.id].curve).toHaveLength(6);
      for (const p of ind.personas) {
        expect(p.expect).toHaveLength(6);
        expect(p.deliver).toHaveLength(6);
      }
      for (const o of ind.opportunities) expect(o.phase).toBeLessThan(6);
    }
  });

  it("names no real client and is in English", () => {
    const text = JSON.stringify([INDUSTRIES, MATRIX_ROWS, MATRIX_GROUPS]);
    expect(text).not.toMatch(/lysa/i);
    expect(text).not.toMatch(/[åäöÅÄÖ]/);
  });

  it("every matrix row has a complexity step", () => {
    for (const r of MATRIX_ROWS) expect([1, 2, 3]).toContain(ROW_STEP[r.id]);
    expect(STEPS.map((s) => s.step)).toEqual([1, 2, 3]);
  });

  it("every matrix row has six cells and belongs to a group", () => {
    const grouped = MATRIX_GROUPS.flatMap((g) => g.rows);
    for (const r of MATRIX_ROWS) {
      expect(r.cells).toHaveLength(6);
      expect(grouped).toContain(r.id);
    }
  });
});

describe("curves", () => {
  it("the emotion curve is the segment curve, moved by 60% of the persona's delivery", () => {
    expect(emotionCurve(finance, "alla", null)).toEqual(finance.metrics.alla.curve);
    const base = finance.metrics.alla.curve;
    expect(emotionCurve(finance, "alla", persona)).toEqual(base.map((v, i) => v + persona.deliver[i] * 0.6));
  });

  it("expectation and delivery follow the persona and stay within 0 to 100", () => {
    expect(expectCurve(finance, null)).toEqual(finance.expect);
    expect(expectCurve(finance, persona)).toEqual(finance.expect.map((v, i) => Math.max(0, Math.min(100, v + persona.expect[i]))));
    expect(deliveryCurve(finance, "premium", null)).toEqual(finance.delivery.premium);
    const hot = { ...persona, deliver: [200, -200, 0, 0, 0, 0] };
    const d = deliveryCurve(finance, "alla", hot);
    expect(d[0]).toBe(100);
    expect(d[1]).toBe(0);
  });

  it("falls back to all customers when a segment has no delivery curve", () => {
    expect(deliveryCurve(finance, "unknown", null)).toEqual(finance.delivery.alla);
  });

  it("sentiment bands: 60 and up positive, 45 and up mixed, else negative", () => {
    expect(sentimentOf(60)).toBe("pos");
    expect(sentimentOf(59)).toBe("mixed");
    expect(sentimentOf(45)).toBe("mixed");
    expect(sentimentOf(44)).toBe("neg");
  });

  it("a smooth path passes through every point", () => {
    const d = smoothPath([
      [0, 10],
      [10, 20],
      [20, 5],
    ]);
    expect(d.startsWith("M0,10")).toBe(true);
    expect(d).toContain(" 10,20 C");
    expect(d.endsWith(" 20,5")).toBe(true);
    expect(smoothPath([])).toBe("");
  });
});

describe("metrics", () => {
  it("a persona replaces NPS, CSAT, churn and sessions", () => {
    const m = metricsFor(finance, "alla", persona);
    expect(m.nps).toBe(persona.nps);
    expect(m.churn).toBe(persona.churn);
    expect(m.ret).toBe(finance.metrics.alla.ret);
  });

  it("SEG_ values are read from the metrics, other values pass through", () => {
    const m = finance.metrics.risk;
    expect(resolveValue("SEG_NPS", m)).toBe(m.nps);
    expect(resolveValue("SEG_SCOST", m)).toBe(m.scost);
    expect(resolveValue("92%", m)).toBe("92%");
  });
});

describe("opportunities", () => {
  const opps = finance.opportunities;

  it("ranks gaps by reward per effort and keeps quick wins with reward 3 or more", () => {
    const ranked = rankOpportunities(opps, null);
    const scores = ranked.map((r) => r.score);
    expect(scores).toEqual([...scores].sort((a, b) => b - a));
    for (const r of ranked) {
      if (r.gap > 0) expect(r.reward).toBeGreaterThanOrEqual(3);
      expect(opps[r.index]).toBe(opps.find((o) => o.name === r.name));
    }
  });

  it("filters to one phase", () => {
    const ranked = rankOpportunities(opps, 3);
    expect(ranked.length).toBeGreaterThan(0);
    expect(ranked.every((r) => r.phase === 3)).toBe(true);
    expect(rankOpportunities(opps, 0)).toEqual([]);
  });
});

describe("matrix by role and step", () => {
  const count = (gs: ReturnType<typeof visibleGroups>) => gs.reduce((s, g) => s + g.rows.length, 0);

  it("shows every row for all roles and every step", () => {
    expect(count(visibleGroups("all", null))).toBe(MATRIX_ROWS.length);
  });

  it("a step shows its rows and the steps before it", () => {
    const step1 = visibleGroups("all", 1);
    for (const g of step1) for (const r of g.rows) expect(ROW_STEP[r.id]).toBe(1);
    const step2 = count(visibleGroups("all", 2));
    expect(step2).toBe(MATRIX_ROWS.filter((r) => ROW_STEP[r.id] <= 2).length);
    expect(count(step1)).toBeLessThan(step2);
    expect(visibleGroups("all", 1).map((g) => g.label)).not.toContain("Internal Services");
  });

  it("only rows for the role, and no empty groups", () => {
    const groups = visibleGroups("arkitekt", null);
    expect(groups.map((g) => g.label)).toContain("Internal Services");
    for (const g of groups) {
      expect(g.rows.length).toBeGreaterThan(0);
      for (const r of g.rows) expect(r.roles).toContain("arkitekt");
    }
  });
});

describe("insights", () => {
  it("at most three, named after the industry", () => {
    const list = buildInsights(finance.metrics.risk, finance);
    expect(list.length).toBeGreaterThan(0);
    expect(list.length).toBeLessThanOrEqual(3);
    expect(list[0].title).toMatch(/Churn/);
    expect(JSON.stringify(list)).not.toMatch(/[åäöÅÄÖ]/);
    expect(list[0].problem).toContain(finance.name);
  });

  it("the support insight is always there when nothing else applies", () => {
    const calm = { ...finance.metrics.lojal, churn: "2%", nps: "80", csat: "4.8", ob: "4.5", dep: "90%" };
    const list = buildInsights(calm, finance);
    expect(list.map((i) => i.title)).toEqual(["Support: pre-churn support cost is a warning sign"]);
  });

  it("watch points compare the loyal and churn-risk segments", () => {
    const items = buildWatch(finance.metrics.alla, finance);
    expect(items.some((i) => i.includes(finance.metrics.lojal.nps) && i.includes(finance.metrics.risk.nps))).toBe(true);
  });
});
