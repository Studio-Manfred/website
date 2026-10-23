import type { OpportunityType, Sentiment } from "@/lib/customer-journey/types";

// Brand colours for the Customer Journey case. Lines and dots use the design
// system's chart palette; text on tints uses the feedback colours so it keeps
// its contrast.
export const BLUE = "var(--color-business-blue)";
export const INK = "var(--color-text-primary)";

export const PERSONA_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
];
export const personaColor = (i: number) => PERSONA_COLORS[i % PERSONA_COLORS.length];
export const personaTint = (i: number) => `color-mix(in srgb, ${personaColor(i)} 14%, white)`;

export const SENTIMENT: Record<Sentiment, { color: string; label: string; bg: string; fg: string }> = {
  pos: { color: "var(--color-chart-3)", label: "Positiv", bg: "var(--color-feedback-success-bg)", fg: "var(--color-feedback-success-fg)" },
  mixed: { color: "var(--color-chart-5)", label: "Ambivalent", bg: "var(--color-feedback-warning-bg)", fg: "var(--color-feedback-warning-fg)" },
  neg: { color: "var(--color-chart-6)", label: "Negativ", bg: "var(--color-feedback-error-bg)", fg: "var(--color-feedback-error-fg)" },
};

export const OPPORTUNITY: Record<OpportunityType, { color: string; label: string; bg: string; fg: string }> = {
  crit: { color: "var(--color-chart-6)", label: "Kritiskt gap", bg: "var(--color-feedback-error-bg)", fg: "var(--color-feedback-error-fg)" },
  quick: { color: "var(--color-chart-3)", label: "Quick win", bg: "var(--color-feedback-success-bg)", fg: "var(--color-feedback-success-fg)" },
  watch: { color: "var(--color-chart-5)", label: "Bevaka", bg: "var(--color-feedback-warning-bg)", fg: "var(--color-feedback-warning-fg)" },
};

/** Small uppercase label in brand blue, as on the other case pages. */
export const label = "text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-business-blue)]";

export const pill = (on: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition-colors ${
    on
      ? "bg-[var(--color-business-blue)] border-[var(--color-business-blue)] text-white"
      : "bg-white border-[var(--color-business-blue)] text-[var(--color-business-blue)] hover:bg-[var(--blue-50)]"
  }`;

export const pad2 = (i: number) => String(i + 1).padStart(2, "0");
