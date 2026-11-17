import type { Industry } from "@/lib/customer-journey/types";
import type { Effort, Finding, Severity } from "./findings";

// Findings made from the journey data itself, for when no model is switched
// on. They show what a report looks like and are marked as demo data.

const effortOf = (n: number): Effort => (n <= 2 ? "small" : n === 3 ? "medium" : "large");

export function demoFindings(ind: Industry, archetypes: string[], phase: number): Finding[] {
  const chosen = ind.personas.filter((p) => archetypes.includes(p.id));
  const out: Finding[] = [];
  const quoteFor = (pid: string, ph: number) => {
    const p = ind.personas.find((x) => x.id === pid)!;
    const m = p.moments.find((x) => x.phase === ph) ?? p.moments[0];
    return { archetype: pid, quote: (m?.insight ?? p.friction[0] ?? "").replace(/^"|"$/g, "") };
  };

  // The journey's own opportunities in this phase, or next to it.
  const near = [phase, phase + 1, phase - 1];
  const opps = near.flatMap((ph) => ind.opportunities.filter((o) => o.phase === ph)).slice(0, 4);
  for (const o of opps) {
    const hurt = chosen.filter((p) => (p.deliver[o.phase] ?? 0) < 0).map((p) => p.id);
    const who = hurt.length ? hurt : chosen.map((p) => p.id);
    const severity: Severity = o.type === "crit" ? (o.gap <= -20 ? "critical" : "high") : o.type === "quick" ? "medium" : "low";
    out.push({
      id: `demo-${out.length + 1}`,
      source: "demo",
      title: o.name,
      kind: o.type === "quick" ? "improvement" : "usability",
      severity,
      effort: effortOf(o.effort),
      phase: o.phase,
      archetypes: who,
      where: ind.phases[o.phase].name,
      problem: o.desc,
      suggestion: chosen.find((p) => who.includes(p.id))?.opportunity ?? o.desc,
      quotes: who.slice(0, 2).map((id) => quoteFor(id, o.phase)),
      wcag: null,
      heuristic: null,
    });
  }

  // Each archetype's own biggest friction.
  for (const p of chosen) {
    const friction = p.friction[0];
    if (!friction || out.some((f) => f.title === friction)) continue;
    const gap = p.deliver[phase] ?? 0;
    out.push({
      id: `demo-${out.length + 1}`,
      source: "demo",
      title: friction,
      kind: "usability",
      severity: gap <= -10 ? "high" : gap < 0 ? "medium" : "low",
      effort: "medium",
      phase,
      archetypes: [p.id],
      where: ind.phases[phase].name,
      problem: `${p.name} (${p.tagline.toLowerCase()}) runs into this: ${friction.toLowerCase()}.`,
      suggestion: p.opportunity,
      quotes: [quoteFor(p.id, phase)],
      wcag: null,
      heuristic: null,
    });
  }
  return out;
}
