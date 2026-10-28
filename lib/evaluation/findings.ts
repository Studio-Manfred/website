import { z } from "zod";

// What an evaluation finds. The model fills `ModelFinding`; the server adds
// an id and where the finding came from.

export const SEVERITIES = ["low", "medium", "high", "critical"] as const;
export const EFFORTS = ["small", "medium", "large"] as const;
export const KINDS = ["usability", "accessibility", "improvement"] as const;

export type Severity = (typeof SEVERITIES)[number];
export type Effort = (typeof EFFORTS)[number];
export type Kind = (typeof KINDS)[number];

export const ModelFinding = z.object({
  title: z.string().describe("Short name of the problem, under 70 characters"),
  kind: z.enum(KINDS),
  severity: z.enum(SEVERITIES),
  effort: z.enum(EFFORTS).describe("Rough effort to fix"),
  phase: z.number().int().describe("Index of the journey phase this belongs to"),
  archetypes: z.array(z.string()).describe("Ids of the archetypes it affects"),
  where: z.string().describe("Where on the page or in the flow"),
  problem: z.string().describe("What goes wrong and why it matters"),
  suggestion: z.string().describe("A concrete change"),
  quotes: z
    .array(z.object({ archetype: z.string(), quote: z.string() }))
    .describe("A short first-person reaction per affected archetype, in their voice"),
  wcag: z.string().nullable().describe("WCAG 2.2 success criterion, e.g. 1.1.1, or null"),
  heuristic: z.string().nullable().describe("Usability heuristic it breaks, or null"),
});
export type ModelFinding = z.infer<typeof ModelFinding>;

export const ModelReport = z.object({
  summary: z.string().describe("Two or three sentences on the overall picture"),
  findings: z.array(ModelFinding),
});
export type ModelReport = z.infer<typeof ModelReport>;

export type FindingSource = "check" | "model" | "demo";
export type Finding = ModelFinding & { id: string; source: FindingSource };

export type EvaluationResult = {
  mode: "live" | "demo";
  summary: string;
  findings: Finding[];
  page: { url: string; title: string } | null;
  /** Why the run fell back to demo data, when it did. */
  note?: string;
};

/** Keep only archetypes that exist, phases in range, and quotes for kept archetypes. */
export function cleanFinding(f: ModelFinding, archetypeIds: string[], phaseCount: number): ModelFinding | null {
  const archetypes = [...new Set(f.archetypes.filter((a) => archetypeIds.includes(a)))];
  if (archetypes.length === 0) return null;
  const phase = Math.min(Math.max(Math.round(f.phase), 0), phaseCount - 1);
  const quotes = f.quotes.filter((q) => archetypes.includes(q.archetype) && q.quote.trim());
  return { ...f, archetypes, phase, quotes };
}
