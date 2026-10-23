import { MATRIX_GROUPS, MATRIX_ROWS } from "./matrix";
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

export function visibleGroups(role: string): { label: string; rows: MatrixRow[] }[] {
  return MATRIX_GROUPS.map((g) => ({
    label: g.label,
    rows: g.rows
      .map((id) => MATRIX_ROWS.find((r) => r.id === id))
      .filter((r): r is MatrixRow => !!r && (role === "all" || r.roles.includes(role))),
  })).filter((g) => g.rows.length > 0);
}

export type Insight = {
  title: string;
  phase: string;
  problem: string;
  action: string;
  effort: "Låg" | "Medel" | "Hög";
  risk: "Låg" | "Medel" | "Hög";
  impact: "Låg" | "Medel" | "Hög";
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
      title: "Churn-prevention: reaktivera riskzonen",
      phase: "Fas 5 → Fas 6 — Engagemang till Churn",
      problem: `Nuvarande churn på ${s.churn} är det tyngst vägande problemet. Sessionsdata visar att kunder i riskzonen minskar från ${sess.toFixed(1)} till 1.8 sessioner/mån 60 dagar pre-churn, utan att ${ind.name} intervenerar. 42% av churnade kunder uppger att de skulle kunna tänka sig återvända, vilket indikerar ett outreach-fönster som inte utnyttjas.`,
      action:
        "Implementera churn-signal-trigger: när en kund minskar till <2 sessioner/mån under 4 veckor skickas en personaliserad push + mail med sammanfattning och enkel möjlighet att prata med en rådgivare. Kombinera med en exit-delay på 14 dagar där kunden får ett erbjudande om att pausa snarare än avsluta.",
      effort: "Medel",
      risk: "Låg",
      impact: "Hög",
      forecast: [
        { metric: "Churn rate", value: `−${Math.round(churn * 0.18)}pp`, positive: false },
        { metric: "NPS", value: `+${nps < 55 ? 8 : 5}`, positive: true },
        { metric: "12-mån retention", value: "+3–5%", positive: true },
        { metric: "Intäkt per kund", value: "+6%", positive: true },
      ],
    },
    {
      when: ob < 4.1 || parseFloat(s.dep || "72") < 72,
      title: "Onboarding: friktionen kostar konvertering",
      phase: "Fas 3 — Onboarding",
      problem: `22% av potentiella kunder lämnar vid det mest komplexa steget i onboardingen. Kvalitativa intervjuer visar att användare inte förstår vad valet innebär i praktiken. Onboarding ease-score ${s.ob} antyder att det finns tydligt utrymme för förbättring, och varje förbättrad konverteringspunkt här är direkt tillväxt.`,
      action:
        "Redesigna steget med ett scenario-baserat format: visa konkreta exempel på vad valet betyder för kunden i stället för abstrakta reglage. Tre tydliga alternativ ersätter dagens format. A/B-testa mot nuvarande flöde.",
      effort: "Låg",
      risk: "Låg",
      impact: "Medel",
      forecast: [
        { metric: "Onboarding CVR", value: "+8–12%", positive: true },
        { metric: "Ease score", value: "+0.4", positive: true },
        { metric: "Aktivering dag 1–7", value: "+5%", positive: true },
        { metric: "NPS post-onboarding", value: "+6", positive: true },
      ],
    },
    {
      when: nps < 65 || csat < 4.2,
      title: "Engagemang: passiviteten döljer ökad churn-risk",
      phase: "Fas 5 — Engagemang",
      problem: `Median ${sess.toFixed(1)} sessioner/månad låter stabilt men maskerar ett mönster: 31% av aktiva kunder har <3 sessioner/månad och klassas som passiva. NPS på ${s.nps} bland aktiva kunder, med CSAT på ${s.csat}, antyder att de funktioner som används oftast inte levererar tillräcklig insikt. Kunder efterfrågar specifikt notiser och bättre jämförelsedata.`,
      action:
        "Lansera en månatlig insikts-notis med tre personaliserade datapunkter: (1) hur kunden ligger till jämfört med liknande kunder, (2) vad som händer framåt om beteendet fortsätter, (3) ett relevant tips. Låg implementeringskostnad, hög retention-effekt.",
      effort: "Låg",
      risk: "Låg",
      impact: "Medel",
      forecast: [
        { metric: "Aktiva sessioner/mån", value: "+1.8", positive: true },
        { metric: "CSAT", value: "+0.3", positive: true },
        { metric: "NPS", value: "+4", positive: true },
        { metric: "Churn pre-signal", value: "−8%", positive: false },
      ],
    },
    {
      when: true,
      title: "Support: pre-churn support-cost är ett varningstecken",
      phase: "Fas 5–6 — Engagemang till Churn",
      problem:
        "Kunder som churnar har 31% högre support-kostnad de sista 60 dagarna. Det indikerar att de söker hjälp men inte hittar det de behöver, och att support-kontakten inte lyckas vända situationen. Post-churn outreach existerar inte idag (0% outreach-rate), vilket lämnar 42% potentiellt återvändande kunder utan kontakt.",
      action:
        "Inför support-escalation-trigger: om en kund med sjunkande sessioner kontaktar support, taggas ärendet som retention-risk och en senior Customer Success-agent tar kontakt inom 24h. Mät NPS-förflyttning bland denna grupp.",
      effort: "Medel",
      risk: "Medel",
      impact: "Hög",
      forecast: [
        { metric: "Post-support churn", value: "−15%", positive: false },
        { metric: "Support CSAT", value: "+0.4", positive: true },
        { metric: "Räddade kunder/mån", value: "~12", positive: true },
        { metric: "Intäktspåverkan", value: "+4%", positive: true },
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
  if (parseFloat(s.app) >= 4.3) items.push(`App Store-betyget är starkt (${s.app}). Bevaka Android-betyget separat, historiskt 0.2 lägre än iOS.`);
  if (parseFloat(s.ret) >= 90) items.push(`Retention på ${s.ret} är i god form. Risk: makrohändelser kan snabbt förändra bilden för churn-risk-segmentet.`);
  const loyal = ind.metrics.lojal;
  const risk = ind.metrics.risk;
  if (loyal && risk) {
    items.push(`Lojala kunder har NPS ${loyal.nps} mot ${risk.nps} i churn-risk-segmentet. Ta reda på om det är upplevelsen eller kundtypen som driver skillnaden, det avgör var insatserna gör mest nytta.`);
  }
  return items;
}
