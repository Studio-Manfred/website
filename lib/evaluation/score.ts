import type { Industry } from "@/lib/customer-journey/types";
import type { Effort, Finding, Severity } from "./findings";
import { SEGMENT_MIX, businessSegments } from "./segments";

// What a finding is worth, as an estimate with every assumption in the open.
// Each archetype's customers spread over the business segments, and each
// segment has its own revenue per customer from the journey data. So:
// affected customers per segment × that segment's revenue × the share of it
// the problem puts at stake × how big the journey gap is in that phase.
// Priority is value per unit of effort.

export type Assumptions = {
  customers: number;
  /** Yearly revenue per customer, in SEK, per business segment id. */
  revenue: Record<string, number>;
  /** Share of an affected customer's yearly revenue at stake, per severity. */
  impact: Record<Severity, number>;
};

export const EFFORT_WEIGHT: Record<Effort, number> = { small: 1, medium: 2, large: 4 };

export const DEFAULT_IMPACT: Record<Severity, number> = {
  low: 0.002,
  medium: 0.005,
  high: 0.01,
  critical: 0.02,
};

/** "8,200" → 8200; "–" or anything without digits → 0. */
export function parseAmount(raw: string): number {
  const digits = raw.replace(/[^\d.]/g, "");
  return digits ? Number(digits) : 0;
}

export function defaultAssumptions(ind: Industry): Assumptions {
  return {
    customers: parseAmount(ind.stats.customers ?? ""),
    revenue: Object.fromEntries(businessSegments(ind).map((s) => [s.id, parseAmount(ind.metrics[s.id]?.rev ?? "")])),
    impact: { ...DEFAULT_IMPACT },
  };
}

/** What customers expect in the phase, what it delivers, and the gap (0 to 100 scale). */
export function phaseGap(ind: Industry, phase: number): { expect: number; delivery: number; gap: number } {
  const e = ind.expect[phase];
  const d = ind.delivery[ind.segments[0].id][phase];
  return { expect: e, delivery: d, gap: e - d };
}

/** 1 when the phase delivers what customers expect, up to 2 for a gap of 30 or more. */
export function phaseWeight(ind: Industry, phase: number): number {
  return 1 + Math.min(Math.max(phaseGap(ind, phase).gap, 0), 30) / 30;
}

/** Share of customers in the finding's archetypes, 0 to 1. */
export function affectedShare(ind: Industry, archetypes: string[]): number {
  const share = ind.personas.filter((p) => archetypes.includes(p.id)).reduce((sum, p) => sum + p.share, 0);
  return Math.min(share, 100) / 100;
}

const revenueOf = (personaId: string, a: Assumptions) =>
  Object.entries(SEGMENT_MIX[personaId]).reduce((sum, [seg, part]) => sum + part * a.revenue[seg], 0);

export type ArchetypeEconomics = { customers: number; revenuePerCustomer: number; yearly: number };

/** Customers, revenue per customer (from their segments) and yearly revenue, per archetype. */
export function archetypeEconomics(ind: Industry, a: Assumptions): Record<string, ArchetypeEconomics> {
  return Object.fromEntries(
    ind.personas.map((p) => {
      const customers = Math.round((a.customers * p.share) / 100);
      const revenuePerCustomer = Math.round(revenueOf(p.id, a));
      return [p.id, { customers, revenuePerCustomer, yearly: customers * revenuePerCustomer }];
    }),
  );
}

export type Part = { id: string; customers: number; value: number };
export type SegmentPart = Part & { label: string; revenuePerCustomer: number; /** Share of the whole segment affected, 0 to 1. */ ofSegment: number };

export type Valued = Finding & {
  affectedCustomers: number;
  weight: number;
  value: number;
  priority: number;
  /** Affected customers and value per archetype, in journey order. */
  byArchetype: Part[];
  /** Affected customers and value per business segment, in journey order. */
  bySegment: SegmentPart[];
};

export function valueFinding(f: Finding, ind: Industry, a: Assumptions): Valued {
  const weight = phaseWeight(ind, f.phase);
  const stake = a.impact[f.severity] * weight;
  const hit = ind.personas.filter((p) => f.archetypes.includes(p.id));
  const customersOf = (share: number) => Math.round((a.customers * share) / 100);

  const byArchetype = hit.map((p) => {
    const customers = customersOf(p.share);
    return { id: p.id, customers, value: Math.round(customers * revenueOf(p.id, a) * stake) };
  });
  const bySegment = businessSegments(ind).map((s) => {
    const size = ind.personas.reduce((sum, p) => sum + customersOf(p.share) * SEGMENT_MIX[p.id][s.id], 0);
    const customers = hit.reduce((sum, p) => sum + customersOf(p.share) * SEGMENT_MIX[p.id][s.id], 0);
    const revenuePerCustomer = a.revenue[s.id];
    return {
      id: s.id,
      label: s.label,
      customers: Math.round(customers),
      value: Math.round(customers * revenuePerCustomer * stake),
      revenuePerCustomer,
      ofSegment: size ? customers / size : 0,
    };
  });

  const affectedCustomers = byArchetype.reduce((s, x) => s + x.customers, 0);
  const value = Math.round(hit.reduce((s, p) => s + customersOf(p.share) * revenueOf(p.id, a) * stake, 0));
  return { ...f, affectedCustomers, weight, value, priority: value / EFFORT_WEIGHT[f.effort], byArchetype, bySegment };
}

/** Findings with their value, highest priority first. */
export function rankFindings(findings: Finding[], ind: Industry, a: Assumptions): Valued[] {
  return findings.map((f) => valueFinding(f, ind, a)).sort((x, y) => y.priority - x.priority || y.value - x.value);
}

/** Value at stake per archetype, summed over the findings. */
export function valueByArchetype(valued: Valued[], ind: Industry): Record<string, number> {
  const out: Record<string, number> = Object.fromEntries(ind.personas.map((p) => [p.id, 0]));
  for (const f of valued) for (const part of f.byArchetype) out[part.id] += part.value;
  return out;
}
