import type { Industry } from "@/lib/customer-journey/types";
import type { Effort, Finding, Severity } from "./findings";

// What a finding is worth, as an estimate with every assumption in the open:
// customers × share of them affected × revenue per customer × the share of
// that revenue the problem puts at stake × how big the journey gap is in
// that phase. Priority is value per unit of effort.

export type Assumptions = {
  customers: number;
  /** Yearly revenue per customer, in SEK. */
  revenuePerCustomer: number;
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
    revenuePerCustomer: parseAmount(ind.metrics[ind.segments[0].id]?.rev ?? ""),
    impact: { ...DEFAULT_IMPACT },
  };
}

/** 1 when the phase delivers what customers expect, up to 2 for a gap of 30 or more. */
export function phaseWeight(ind: Industry, phase: number): number {
  const delivery = ind.delivery[ind.segments[0].id] ?? ind.expect;
  const gap = (ind.expect[phase] ?? 0) - (delivery[phase] ?? 0);
  return 1 + Math.min(Math.max(gap, 0), 30) / 30;
}

/** Share of customers in the finding's archetypes, 0 to 1. */
export function affectedShare(ind: Industry, archetypes: string[]): number {
  const share = ind.personas.filter((p) => archetypes.includes(p.id)).reduce((sum, p) => sum + p.share, 0);
  return Math.min(share, 100) / 100;
}

export type Valued = Finding & {
  affectedCustomers: number;
  weight: number;
  value: number;
  priority: number;
};

export function valueFinding(f: Finding, ind: Industry, a: Assumptions): Valued {
  const affectedCustomers = Math.round(a.customers * affectedShare(ind, f.archetypes));
  const weight = phaseWeight(ind, f.phase);
  const value = Math.round(affectedCustomers * a.revenuePerCustomer * a.impact[f.severity] * weight);
  return { ...f, affectedCustomers, weight, value, priority: value / EFFORT_WEIGHT[f.effort] };
}

/** Findings with their value, highest priority first. */
export function rankFindings(findings: Finding[], ind: Industry, a: Assumptions): Valued[] {
  return findings.map((f) => valueFinding(f, ind, a)).sort((x, y) => y.priority - x.priority || y.value - x.value);
}

/** Value at stake per archetype: each finding's value split by the archetypes' shares. */
export function valueByArchetype(valued: Valued[], ind: Industry): Record<string, number> {
  const out: Record<string, number> = Object.fromEntries(ind.personas.map((p) => [p.id, 0]));
  for (const f of valued) {
    const total = affectedShare(ind, f.archetypes);
    if (total === 0) continue;
    for (const p of ind.personas) {
      if (f.archetypes.includes(p.id)) out[p.id] += Math.round((f.value * p.share) / 100 / total);
    }
  }
  return out;
}
