export type IndustryId = "finance" | "insurance" | "grocery" | "ehandel" | "hotel";
export type Sentiment = "pos" | "mixed" | "neg";
export type OpportunityType = "crit" | "quick" | "watch";
export type RoleId = "designer" | "pm" | "cx" | "leadership" | "arkitekt";

export type Phase = { name: string; sub: string };

export type EmotionCard = { emotion: string; sentiment: Sentiment; quote: string; moment: string };

/** Metrics for one segment. `curve` is the emotion curve, 0 to 100 per phase. */
export type SegmentMetrics = {
  curve: number[];
  nps: string;
  csat: string;
  ob: string;
  ret: string;
  churn: string;
  sess: string;
  dep: string;
  app: string;
  sup: string;
  aum: string;
  rev: string;
  adopt: string;
  scost: string;
};

export type Persona = {
  id: string;
  name: string;
  emoji: string;
  /** Index into the chart palette. */
  color: number;
  share: number;
  tagline: string;
  desc: string;
  tags: string[];
  nps: string;
  csat: string;
  churn: string;
  sess: string;
  /** Added to the expectation curve per phase. */
  expect: number[];
  /** Added to the delivery curve per phase. */
  deliver: number[];
  moments: { phase: number; insight: string }[];
  friction: string[];
  opportunity: string;
};

export type Touchpoint = { name: string; sat: string; note: string };

export type Opportunity = {
  phase: number;
  /** Where in the phase the touchpoint sits, 0 to 1. */
  pos: number;
  name: string;
  /** Delivery minus expectation; negative means under-delivering. */
  gap: number;
  type: OpportunityType;
  effort: number;
  reward: number;
  desc: string;
};

export type Industry = {
  id: IndustryId;
  name: string;
  industry: string;
  emoji: string;
  description: string;
  stats: Record<string, string>;
  phases: Phase[];
  emotionCards: EmotionCard[];
  segments: { id: string; label: string }[];
  metrics: Record<string, SegmentMetrics>;
  personas: Persona[];
  /** Touchpoints per phase, by phase index. */
  touchpoints: Touchpoint[][];
  expect: number[];
  delivery: Record<string, number[]>;
  opportunities: Opportunity[];
};

export type MatrixCell = {
  value?: string;
  label?: string;
  trend?: "up" | "down" | "flat";
  trendText?: string;
  headline?: string;
  quote?: string;
  sentiment?: Sentiment;
  sentimentLabel?: string;
  details?: { label: string; value: string }[];
};

export type MatrixRow = {
  id: string;
  name: string;
  kind: "quant" | "qual" | "behaviour";
  source: string;
  roles: string[];
  cells: (MatrixCell | null)[];
};

export type MatrixGroup = { label: string; rows: string[] };
