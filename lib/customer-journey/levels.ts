// How hard each part of the journey instrument is to build, as three steps of
// a roadmap. The complexity filter is cumulative: step 2 shows what steps 1
// and 2 give you.

export type Step = 1 | 2 | 3;

export const STEPS: { step: Step; name: string; title: string; summary: string; sources: string; time: string; who: string }[] = [
  {
    step: 1,
    name: "Easy",
    title: "Map the journey",
    summary: "Phases, touchpoints and the emotion curve, from data you already have or can gather in a few weeks.",
    sources: "Workshops, 10–20 interviews, existing NPS and CSAT surveys, app store reviews, support volumes",
    time: "2–6 weeks",
    who: "CX, design, research",
  },
  {
    step: 2,
    name: "Medium",
    title: "Connect the data",
    summary: "Behaviour, retention and customer voices per phase, segments and personas, and the gap between what customers expect and get.",
    sources: "Product analytics and event tracking, onboarding and retention data, support free text, expectation research",
    time: "2–3 months",
    who: "Product, analytics, data",
  },
  {
    step: 3,
    name: "Advanced",
    title: "Run the business on it",
    summary: "Business data per customer, predictive models, the service blueprint behind each phase, and AI analysis on top.",
    sources: "Finance and CRM data, a churn model, system and event inventories with IT",
    time: "3–6 months and ongoing",
    who: "Leadership, data science, IT and architecture",
  },
];

/** Step each matrix row belongs to, by row id. */
export const ROW_STEP: Record<string, Step> = {
  mindset: 1,
  nps: 1,
  csat: 1,
  appstore: 1,
  support: 1,
  onb_met: 2,
  retention: 2,
  sessions: 2,
  deposit: 2,
  support_qual: 2,
  qualimpr: 2,
  aum: 3,
  rev: 3,
  churnscore: 3,
  adoptbiz: 3,
  scost: 3,
  capabilities: 3,
  dataevents: 3,
  systemdeps: 3,
  automation: 3,
  failscenarios: 3,
  sla: 3,
};

/** Step for the other parts of the page. */
export const SECTION_STEP = {
  journey: 1,
  touchpoints: 1,
  gap: 2,
  personas: 2,
  insights: 3,
  ask: 3,
} as const satisfies Record<string, Step>;

/** null means every step. */
export const inStep = (level: Step, step: Step | null) => step === null || level <= step;
