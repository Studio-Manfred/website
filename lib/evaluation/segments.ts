import type { Industry } from "@/lib/customer-journey/types";

// How each archetype's customers spread over the industry's business
// segments (the journey's segments, without "all customers"). Each row adds
// up to 1: a customer is counted in their main segment. The journey data
// doesn't hold this split, so it is a modelled assumption, shown as such in
// the report. It ties the archetypes to the segments' revenue, which is what
// makes one archetype worth more than another.

export const SEGMENT_MIX: Record<string, Record<string, number>> = {
  // Retail bank: premium, young, loyal, churn risk
  bekvamlighetsbanker: { premium: 0.1, ung: 0.3, lojal: 0.45, risk: 0.15 },
  planeringsentusiasten: { premium: 0.3, ung: 0.15, lojal: 0.5, risk: 0.05 },
  trygghetsokaren: { premium: 0.2, ung: 0, lojal: 0.75, risk: 0.05 },
  neobank_hoppar: { premium: 0.05, ung: 0.45, lojal: 0.05, risk: 0.45 },
  // Insurer: premium, new, loyal, churn risk
  prisjagaren: { premium: 0.05, ny: 0.3, lojal: 0.1, risk: 0.55 },
  trygghetsmotorn: { premium: 0.35, ny: 0.05, lojal: 0.55, risk: 0.05 },
  digitala_nativa: { premium: 0.15, ny: 0.45, lojal: 0.15, risk: 0.25 },
  familjeplaneraren: { premium: 0.3, ny: 0.15, lojal: 0.45, risk: 0.1 },
  // Grocery: premium, online, regulars, churn risk
  rutinhandlaren: { premium: 0.1, digital: 0.05, lojal: 0.75, risk: 0.1 },
  digitala_handlaren: { premium: 0.2, digital: 0.6, lojal: 0.1, risk: 0.1 },
  dealjakaren: { premium: 0.05, digital: 0.2, lojal: 0.05, risk: 0.7 },
  halsokonnaren: { premium: 0.45, digital: 0.25, lojal: 0.25, risk: 0.05 },
  // E-commerce: VIP, new, loyal, inactive
  trendjakaren: { premium: 0.1, ny: 0.3, lojal: 0.2, risk: 0.4 },
  kvalitetsjakaren: { premium: 0.4, ny: 0.1, lojal: 0.45, risk: 0.05 },
  bekvamlighetskoparen: { premium: 0.15, ny: 0.1, lojal: 0.6, risk: 0.15 },
  halbbara_shopparen: { premium: 0.15, ny: 0.3, lojal: 0.3, risk: 0.25 },
  // Hotel: premium, business, loyalty members, one-time
  business_traveller: { premium: 0.05, business: 0.7, lojal: 0.2, risk: 0.05 },
  leisure_couple: { premium: 0.3, business: 0, lojal: 0.1, risk: 0.6 },
  family_planner: { premium: 0.15, business: 0, lojal: 0.2, risk: 0.65 },
  loyal_regular: { premium: 0.3, business: 0.1, lojal: 0.6, risk: 0 },
};

/** The industry's business segments: every segment but the first, which is all customers. */
export const businessSegments = (ind: Industry) => ind.segments.slice(1);
