import { MATRIX_GROUPS, MATRIX_ROWS } from "./matrix";
import { ROW_STEP, inStep, type Step } from "./levels";
import type { Industry, MatrixRow, Opportunity, Persona, SegmentMetrics, Sentiment } from "./types";

const clamp = (v: number) => Math.max(0, Math.min(100, v));

export const sentimentOf = (v: number): Sentiment => (v >= 60 ? "pos" : v >= 45 ? "mixed" : "neg");

export function emotionCurve(ind: Industry, seg: string, p: Persona | null): number[] {
  const base = (ind.metrics[seg] ?? ind.metrics.alla).curve;
  return p ? base.map((v, i) => clamp(v + p.deliver[i] * 0.6)) : base;
}

export function expectCurve(ind: Industry, p: Persona | null): number[] {
  return p ? ind.expect.map((v, i) => clamp(v + p.expect[i])) : ind.expect;
}

export function deliveryCurve(ind: Industry, seg: string, p: Persona | null): number[] {
  const base = ind.delivery[seg] ?? ind.delivery.alla;
  return p ? base.map((v, i) => clamp(v + p.deliver[i])) : base;
}

export function metricsFor(ind: Industry, seg: string, p: Persona | null): SegmentMetrics {
  const base = ind.metrics[seg] ?? ind.metrics.alla;
  return p ? { ...base, nps: p.nps, csat: p.csat, churn: p.churn, sess: p.sess } : base;
}

const SEG_KEYS: Record<string, keyof Omit<SegmentMetrics, "curve">> = {
  SEG_NPS: "nps",
  SEG_CSAT: "csat",
  SEG_OB: "ob",
  SEG_RET: "ret",
  SEG_CHURN: "churn",
  SEG_SESS: "sess",
  SEG_DEP: "dep",
  SEG_APP: "app",
  SEG_SUP: "sup",
  SEG_AUM: "aum",
  SEG_REV: "rev",
  SEG_ADOPT: "adopt",
  SEG_SCOST: "scost",
};

export function resolveValue(raw: string, m: SegmentMetrics): string {
  const key = SEG_KEYS[raw];
  return key ? m[key] : raw;
}

/** A curve through every point (Catmull-Rom as cubic Béziers), as an SVG path. */
export function smoothPath(pts: [number, number][]): string {
  if (!pts.length) return "";
  const f = (n: number) => +n.toFixed(2);
  let d = `M${f(pts[0][0])},${f(pts[0][1])}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${f(c1[0])},${f(c1[1])} ${f(c2[0])},${f(c2[1])} ${f(p2[0])},${f(p2[1])}`;
  }
  return d;
}

export type RankedOpportunity = Opportunity & { index: number; score: number };

/**
 * Gaps (under-delivering) ranked by reward per effort, plus quick wins
 * (over-delivering, reward 3 or more). `index` is the position in the
 * industry's list, so a marker in the chart and a row in the list match.
 */
export function rankOpportunities(opps: Opportunity[], phase: number | null): RankedOpportunity[] {
  return opps
    .map((o, index) => ({ ...o, index, score: o.gap < 0 ? o.reward / (o.effort || 1) : o.reward / 1.5 }))
    .filter((o) => o.gap < 0 || o.reward >= 3)
    .filter((o) => phase === null || o.phase === phase)
    .sort((a, b) => b.score - a.score);
}

export function visibleGroups(role: string, step: Step | null): { label: string; rows: MatrixRow[] }[] {
  return MATRIX_GROUPS.map((g) => ({
    label: g.label,
    rows: g.rows
      .map((id) => MATRIX_ROWS.find((r) => r.id === id))
      .filter((r): r is MatrixRow => !!r && (role === "all" || r.roles.includes(role)) && inStep(ROW_STEP[r.id], step)),
  })).filter((g) => g.rows.length > 0);
}

export type Level = "Low" | "Medium" | "High";

export type Insight = {
  title: string;
  phase: string;
  problem: string;
  action: string;
  effort: Level;
  risk: Level;
  impact: Level;
  forecast: { metric: string; value: string; positive: boolean }[];
};

/** The three heaviest problem areas for a segment, from simple rules on its metrics. */
export function buildInsights(s: SegmentMetrics, ind: Industry): Insight[] {
  const churn = parseFloat(s.churn);
  const nps = parseFloat(s.nps);
  const csat = parseFloat(s.csat);
  const sess = parseFloat(s.sess);
  const ob = parseFloat(s.ob) || 4.2;
  const pool: (Insight & { when: boolean })[] = [
    {
      when: churn >= 12,
      title: "Churn prevention: reactivate the risk zone",
      phase: "Phase 5 → 6, engagement to churn",
      problem: `Churn at ${s.churn} is the heaviest problem. Session data shows customers in the risk zone drop from ${sess.toFixed(1)} to 1.8 sessions a month in the 60 days before they leave, without ${ind.name} stepping in. 42% of churned customers say they would consider coming back, which points to an outreach window nobody uses.`,
      action:
        "Add a churn signal: when a customer drops below 2 sessions a month for 4 weeks, send a personal push and email with a summary and an easy way to talk to an adviser. Combine it with a 14-day exit delay where the customer is offered a pause instead of closing.",
      effort: "Medium",
      risk: "Low",
      impact: "High",
      forecast: [
        { metric: "Churn rate", value: `−${Math.round(churn * 0.18)}pp`, positive: false },
        { metric: "NPS", value: `+${nps < 55 ? 8 : 5}`, positive: true },
        { metric: "12-month retention", value: "+3–5%", positive: true },
        { metric: "Revenue per customer", value: "+6%", positive: true },
      ],
    },
    {
      when: ob < 4.1 || parseFloat(s.dep || "72") < 72,
      title: "Onboarding: friction is costing conversion",
      phase: "Phase 3, onboarding",
      problem: `22% of potential customers drop out at the most complex onboarding step. Interviews show people don't understand what the choice means in practice. An onboarding ease score of ${s.ob} leaves clear room to improve, and every conversion point gained here is direct growth.`,
      action:
        "Redesign the step around scenarios: show concrete examples of what the choice means for the customer instead of abstract sliders. Three clear options replace today's format. A/B test it against the current flow.",
      effort: "Low",
      risk: "Low",
      impact: "Medium",
      forecast: [
        { metric: "Onboarding conversion", value: "+8–12%", positive: true },
        { metric: "Ease score", value: "+0.4", positive: true },
        { metric: "Activation day 1–7", value: "+5%", positive: true },
        { metric: "NPS after onboarding", value: "+6", positive: true },
      ],
    },
    {
      when: nps < 65 || csat < 4.2,
      title: "Engagement: passivity hides a growing churn risk",
      phase: "Phase 5, engagement",
      problem: `A median of ${sess.toFixed(1)} sessions a month sounds stable but hides a pattern: 31% of active customers have fewer than 3 sessions a month and count as passive. NPS of ${s.nps} with CSAT of ${s.csat} suggests the most used features don't give enough insight. Customers specifically ask for notifications and better comparisons.`,
      action:
        "Launch a monthly insight notification with three personal data points: (1) how the customer compares with similar customers, (2) where they're heading if they keep going, (3) a relevant tip. Cheap to build, strong effect on retention.",
      effort: "Low",
      risk: "Low",
      impact: "Medium",
      forecast: [
        { metric: "Active sessions/month", value: "+1.8", positive: true },
        { metric: "CSAT", value: "+0.3", positive: true },
        { metric: "NPS", value: "+4", positive: true },
        { metric: "Churn pre-signal", value: "−8%", positive: false },
      ],
    },
    {
      when: true,
      title: "Support: pre-churn support cost is a warning sign",
      phase: "Phase 5–6, engagement to churn",
      problem:
        "Customers who churn cost 31% more in support in their last 60 days. They look for help but don't find what they need, and the support contact doesn't turn things around. There is no post-churn outreach today (0%), which leaves the 42% who might come back without contact.",
      action:
        "Add a support escalation trigger: when a customer with falling sessions contacts support, tag the ticket as a retention risk and have a senior customer success agent get in touch within 24 hours. Track how NPS moves in this group.",
      effort: "Medium",
      risk: "Medium",
      impact: "High",
      forecast: [
        { metric: "Churn after support", value: "−15%", positive: false },
        { metric: "Support CSAT", value: "+0.4", positive: true },
        { metric: "Customers saved/month", value: "~12", positive: true },
        { metric: "Revenue effect", value: "+4%", positive: true },
      ],
    },
  ];
  return pool
    .filter((p) => p.when)
    .slice(0, 3)
    .map((p) => {
      const i: Insight & { when?: boolean } = { ...p };
      delete i.when;
      return i;
    });
}

export function buildWatch(s: SegmentMetrics, ind: Industry): string[] {
  const items: string[] = [];
  if (parseFloat(s.app) >= 4.3) items.push(`The App Store rating is strong (${s.app}). Watch the Android rating separately; it has been 0.2 lower than iOS.`);
  if (parseFloat(s.ret) >= 90) items.push(`Retention at ${s.ret} is in good shape. Risk: outside events can quickly change the picture for the churn-risk segment.`);
  const loyal = ind.metrics.lojal;
  const risk = ind.metrics.risk;
  if (loyal && risk) {
    items.push(`Loyal customers have an NPS of ${loyal.nps} against ${risk.nps} in the churn-risk segment. Find out whether the experience or the type of customer drives the difference; that decides where effort pays off most.`);
  }
  return items;
}
