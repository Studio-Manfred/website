"use client";

import { useId, useMemo, useState } from "react";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import type { IndustryId } from "@/lib/customer-journey/types";
import type { EvaluationResult, Kind, Severity } from "@/lib/evaluation/findings";
import { SEVERITIES } from "@/lib/evaluation/findings";
import { archetypeEconomics, defaultAssumptions, rankFindings, valueByArchetype, type Assumptions, type Valued } from "@/lib/evaluation/score";
import { CRITERIA_GROUPS } from "@/lib/evaluation/criteria";
import { SEGMENT_MIX, businessSegments } from "@/lib/evaluation/segments";
import { industryPath } from "@/lib/customer-journey/slugs";
import { label, pad2, personaColor } from "@/components/customer-journey/theme";

// The report: what was found, for whom, where in the journey, and what it is
// worth. Values follow the assumptions panel, which anyone can change.

const sek = (n: number) => `${new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(n)} SEK`;
const short = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M SEK` : n >= 1000 ? `${Math.round(n / 1000)}k SEK` : sek(n);

const SEVERITY: Record<Severity, { label: string; bg: string; fg: string }> = {
  critical: { label: "Critical", bg: "var(--color-feedback-error-bg)", fg: "var(--color-feedback-error-fg)" },
  high: { label: "High", bg: "var(--color-feedback-warning-bg)", fg: "var(--color-feedback-warning-fg)" },
  medium: { label: "Medium", bg: "var(--blue-50)", fg: "var(--color-business-blue)" },
  low: { label: "Low", bg: "var(--color-bg-subtle)", fg: "var(--color-text-secondary)" },
};
const num = (n: number) => new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 }).format(n);
const pct = (x: number) => `${Math.round(x * 100)}%`;
const countLabel = (n: number) => `${n} finding${n === 1 ? "" : "s"}`;
const KIND: Record<Kind, string> = { usability: "Usability", accessibility: "Accessibility", improvement: "Improvement" };
const SOURCE = { model: "AI analysis", check: "Automatic check", demo: "Demo data" } as const;

function Badge({ bg, fg, children }: { bg: string; fg: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

function Stat({ name, value, note }: { name: string; value: string; note?: string }) {
  return (
    <div className="rounded-2xl bg-[var(--beige-light)] p-5">
      <dt className="text-sm font-light text-[var(--color-text-secondary)]">{name}</dt>
      <dd className="mt-1 font-extrabold text-[var(--color-business-blue)]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
        {value}
      </dd>
      {note && <dd className="mt-1 text-xs font-light text-[var(--color-text-muted)]">{note}</dd>}
    </div>
  );
}

function NumberField({ id, name, value, onChange, suffix, step = 1 }: { id: string; name: string; value: number; onChange: (n: number) => void; suffix?: string; step?: number }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-extrabold">{name}</label>
      <span className="flex items-center gap-2">
        <input
          id={id}
          type="number"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="w-full rounded-lg border border-[var(--color-border-default)] px-3 py-2 focus:border-[var(--color-business-blue)] focus:outline-none"
        />
        {suffix && <span className="text-sm font-light text-[var(--color-text-muted)]">{suffix}</span>}
      </span>
    </div>
  );
}

export function EvaluationReport({ result, industry, task }: { result: EvaluationResult; industry: IndustryId; task: string }) {
  const ind = INDUSTRIES[industry];
  const [assumptions, setAssumptions] = useState<Assumptions>(() => defaultAssumptions(ind));
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();

  const ranked = useMemo(() => rankFindings(result.findings, ind, assumptions), [result.findings, ind, assumptions]);
  const byArchetype = useMemo(() => valueByArchetype(ranked, ind), [ranked, ind]);
  const economics = useMemo(() => archetypeEconomics(ind, assumptions), [ind, assumptions]);
  const segments = businessSegments(ind);
  const usedGroups = result.criteria
    ? CRITERIA_GROUPS.map((g) => ({ g, items: g.items.filter((c) => result.criteria!.includes(c.id)) })).filter((x) => x.items.length)
    : [];
  const involved = ind.personas.filter((p) => ranked.some((f) => f.archetypes.includes(p.id)));
  const total = ranked.reduce((s, f) => s + f.value, 0);
  const serious = ranked.filter((f) => f.severity === "critical" || f.severity === "high").length;
  const a11y = ranked.filter((f) => f.kind === "accessibility").length;
  const maxArchetype = Math.max(1, ...Object.values(byArchetype));
  const maxPriority = Math.max(1, ...ranked.map((f) => f.priority));
  const persona = (id: string) => ind.personas.find((p) => p.id === id)!;
  const setImpact = (s: Severity, pct: number) => setAssumptions((a) => ({ ...a, impact: { ...a.impact, [s]: pct / 100 } }));

  return (
    <section aria-labelledby={`${baseId}-h`} className="mt-20 border-t-4 border-[var(--color-business-blue)] pt-6 print:mt-0 print:border-0 print:pt-0">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-3xl">
          <p className={label}>
            Evaluation report · {ind.name} · {result.mode === "live" ? "AI analysis" : "Demo data"}
          </p>
          <p className="mt-1 text-sm font-light text-[var(--color-text-secondary)]">
            Archetypes, segments, phases and revenue from the{" "}
            <a href={industryPath(industry)} target="_blank" rel="noopener" className="underline underline-offset-4 hover:text-[var(--color-business-blue)]">
              {ind.name} customer journey<span aria-hidden="true"> ↗</span>
            </a>
          </p>
          <h2 id={`${baseId}-h`} className="mt-2 font-extrabold leading-[1.15] tracking-[var(--letter-spacing-tight)]" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
            {task}
          </h2>
          {result.page && (
            <p className="mt-2 text-sm font-light text-[var(--color-text-secondary)]">
              {result.page.title ? `${result.page.title} · ` : ""}
              <a href={result.page.url} target="_blank" rel="noreferrer noopener" className="underline underline-offset-4 hover:text-[var(--color-business-blue)]">
                {result.page.url}
              </a>
            </p>
          )}
        </div>
        <button type="button" onClick={() => window.print()} className="shrink-0 rounded-full border border-[var(--color-business-blue)] px-4 py-2 text-sm text-[var(--color-business-blue)] hover:bg-[var(--blue-50)] print:hidden">
          Print or save as PDF
        </button>
      </div>

      {result.note && (
        <p role="status" className="mt-6 rounded-xl bg-[var(--color-feedback-warning-bg)] p-4 text-sm text-[var(--color-feedback-warning-fg)]">
          {result.note}
        </p>
      )}
      <p className="mt-6 max-w-3xl font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
        {result.summary}
      </p>
      {usedGroups.length > 0 && (
        <p className="mt-4 max-w-3xl text-sm font-light text-[var(--color-text-secondary)]">
          <span className="font-extrabold text-[var(--color-text-primary)]">Evaluated against</span>{" "}
          {usedGroups.map(({ g, items }) => `${g.name}: ${items.length === g.items.length ? `all ${g.items.length}` : items.map((c) => c.name).join(", ")}`).join(" · ")}
        </p>
      )}

      <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat name="Findings" value={String(ranked.length)} />
        <Stat name="Critical or high" value={String(serious)} />
        <Stat name="Estimated value at stake" value={short(total)} note="Per year, from the assumptions below" />
        <Stat name="Accessibility issues" value={String(a11y)} />
      </dl>

      {/* Value per archetype: one measure, so plain bars; colour is each archetype's identity, as on the journey page. */}
      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
        <div>
          <h3 className={`${label} mb-1`}>Archetypes by value</h3>
          <p className="mb-4 text-sm font-light text-[var(--color-text-secondary)]">What each archetype is worth, from its business segments, and how much of it these findings put at stake.</p>
          <ul aria-label="Archetypes by value" className="space-y-5">
            {ind.personas.map((p) => (
              <li key={p.id}>
                <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-extrabold">
                    <span aria-hidden="true" className="mr-1.5">{p.emoji}</span>
                    {p.name}
                  </span>
                  <span className="font-light text-[var(--color-text-secondary)]">
                    {sek(byArchetype[p.id] ?? 0)} at stake · {countLabel(ranked.filter((f) => f.archetypes.includes(p.id)).length)}
                  </span>
                </div>
                <p className="mb-1.5 text-xs font-light text-[var(--color-text-muted)]">
                  {num(economics[p.id].revenuePerCustomer)} SEK per customer a year · {short(economics[p.id].yearly)} a year in all
                </p>
                <div aria-hidden="true" className="h-2.5 rounded-full bg-[var(--color-bg-subtle)]">
                  <div className="h-full rounded-full" style={{ width: `${((byArchetype[p.id] ?? 0) / maxArchetype) * 100}%`, background: personaColor(p.color), minWidth: byArchetype[p.id] ? 4 : 0 }} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          <h3 className={`${label} mb-4`}>Who each finding affects</h3>
          <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-default)]">
            <table className="w-full min-w-[520px] text-sm">
              <caption className="sr-only">Findings by archetype</caption>
              <thead>
                <tr className="bg-[var(--beige-light)]">
                  <th scope="col" className="px-4 py-3 text-left font-extrabold">Finding</th>
                  {involved.map((p) => (
                    <th key={p.id} scope="col" className="px-2 py-3 text-center font-light text-xs">
                      <span aria-hidden="true" className="block text-base">{p.emoji}</span>
                      {p.name.replace(/^The /, "")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ranked.map((f) => (
                  <tr key={f.id} className="border-t border-[var(--color-border-default)]">
                    <th scope="row" className="px-4 py-2.5 text-left font-light">{f.title}</th>
                    {involved.map((p) => (
                      <td key={p.id} className="px-2 py-2.5 text-center">
                        {f.archetypes.includes(p.id) ? (
                          <>
                            <span aria-hidden="true" className="inline-block h-3 w-3 rounded-full ring-2 ring-white" style={{ background: personaColor(p.color) }} />
                            <span className="sr-only">Affects</span>
                          </>
                        ) : (
                          <span className="sr-only">Not affected</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <h3 className={`${label} mt-14 mb-1`}>Priority backlog</h3>
      <p className="mb-5 text-sm font-light text-[var(--color-text-secondary)]">Ranked by value per effort. Open a finding for the details and the sums behind its value.</p>
      <ol aria-label="Priority backlog" className="space-y-3">
        {ranked.map((f, i) => (
          <BacklogItem key={f.id} f={f} rank={i} maxPriority={maxPriority} open={open === f.id} onToggle={() => setOpen((o) => (o === f.id ? null : f.id))} phase={ind.phases[f.phase]?.name ?? ""} persona={persona} assumptions={assumptions} />
        ))}
      </ol>

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        <section aria-labelledby={`${baseId}-a`} className="rounded-2xl border border-[var(--color-border-default)] p-6 print:break-inside-avoid">
          <h3 id={`${baseId}-a`} className={`${label} mb-1`}>Assumptions</h3>
          <p className="mb-5 text-sm font-light text-[var(--color-text-secondary)]">
            Value = affected customers in each segment × that segment&apos;s revenue per customer × share at stake × how big the journey gap is in that phase (1 to 2). Change any number and the report follows.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField id={`${baseId}-c`} name="Customers" value={assumptions.customers} onChange={(n) => setAssumptions((a) => ({ ...a, customers: n }))} />
            {segments.map((s) => (
              <NumberField key={s.id} id={`${baseId}-r-${s.id}`} name={`Revenue per customer, ${s.label}`} value={assumptions.revenue[s.id]} suffix="SEK" onChange={(n) => setAssumptions((a) => ({ ...a, revenue: { ...a.revenue, [s.id]: n } }))} />
            ))}
            {[...SEVERITIES].reverse().map((s) => (
              <NumberField key={s} id={`${baseId}-${s}`} name={`At stake, ${SEVERITY[s].label.toLowerCase()}`} value={Math.round(assumptions.impact[s] * 1000) / 10} step={0.1} suffix="%" onChange={(n) => setImpact(s, n)} />
            ))}
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[420px] text-xs">
              <caption className="mb-2 text-left text-sm font-extrabold">Archetypes in segments <span className="font-light text-[var(--color-text-muted)]">(modelled, each row adds up to 100%)</span></caption>
              <thead>
                <tr className="text-[var(--color-text-muted)]">
                  <th scope="col" className="py-1.5 pr-2 text-left font-light">Archetype</th>
                  {segments.map((s) => (
                    <th key={s.id} scope="col" className="px-1.5 py-1.5 text-right font-light">{s.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ind.personas.map((p) => (
                  <tr key={p.id} className="border-t border-[var(--color-border-default)]">
                    <th scope="row" className="py-1.5 pr-2 text-left font-light">{p.name}</th>
                    {segments.map((s) => (
                      <td key={s.id} className="px-1.5 py-1.5 text-right">{pct(SEGMENT_MIX[p.id][s.id])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={() => setAssumptions(defaultAssumptions(ind))} className="mt-5 text-sm font-light underline underline-offset-4 hover:text-[var(--color-business-blue)] print:hidden">
            Reset to the journey data
          </button>
        </section>
        <section aria-labelledby={`${baseId}-n`} className="rounded-2xl bg-[var(--beige-light)] p-6 text-sm font-light text-[var(--color-text-secondary)] print:break-inside-avoid" style={{ lineHeight: 1.7 }}>
          <h3 id={`${baseId}-n`} className={`${label} mb-3`}>How to read this</h3>
          <p>The archetypes are synthetic. Treat every finding as a hypothesis and test the important ones with real users before you build.</p>
          <p className="mt-3">The values are estimates for comparing findings with each other, not forecasts. Customers, archetype shares and segment revenue come from the {ind.name} journey. How each archetype spreads over the segments is a modelled assumption: change the segment revenues to see what it means.</p>
          <p className="mt-3">The automatic checks read the page&apos;s HTML and catch only part of WCAG. Contrast, keyboard use and screen reader behaviour need a manual test.</p>
        </section>
      </div>
    </section>
  );
}

function BacklogItem({ f, rank, maxPriority, open, onToggle, phase, persona, assumptions }: {
  f: Valued;
  rank: number;
  maxPriority: number;
  open: boolean;
  onToggle: () => void;
  phase: string;
  persona: (id: string) => { id: string; name: string; emoji: string; color: number };
  assumptions: Assumptions;
}) {
  const panel = useId();
  const sev = SEVERITY[f.severity];
  const parts = f.byArchetype.map((x) => ({ ...x, p: persona(x.id), share: f.affectedCustomers ? x.customers / f.affectedCustomers : 0 }));
  const segs = f.bySegment.filter((s) => s.customers > 0);
  const cell = "px-3 py-2 text-right";
  return (
    <li className="rounded-2xl border border-[var(--color-border-default)] print:break-inside-avoid">
      <button type="button" aria-expanded={open} aria-controls={panel} onClick={onToggle} className="grid w-full grid-cols-[32px_minmax(0,1fr)] gap-x-4 gap-y-2 p-4 text-left md:grid-cols-[32px_minmax(0,1fr)_200px] md:items-center">
        <span className="font-extrabold text-[var(--color-business-blue)]">{pad2(rank)}</span>
        <span className="min-w-0">
          <span className="block font-extrabold">{f.title}</span>
          <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <Badge bg={sev.bg} fg={sev.fg}>{sev.label}</Badge>
            <Badge bg="var(--color-bg-subtle)" fg="var(--color-text-secondary)">{KIND[f.kind]}</Badge>
            <span className="text-xs font-light text-[var(--color-text-muted)]">{phase} · effort {f.effort}</span>
          </span>
          {/* Who the finding reaches: one 100% bar, a segment per archetype by affected customers, 2px gaps. */}
          <span className="mt-2.5 flex items-center gap-2">
            <span role="img" aria-label={`Affected: ${parts.map((x) => `${x.p.name} ${pct(x.share)}`).join(", ")}`} className="flex h-2 w-40 shrink-0 gap-[2px]">
              {parts.map((x) => (
                <span key={x.id} className="h-full first:rounded-l-full last:rounded-r-full" style={{ width: `${x.share * 100}%`, background: personaColor(x.p.color) }} />
              ))}
            </span>
            <span aria-hidden="true" className="flex flex-wrap gap-x-2 text-xs font-light text-[var(--color-text-muted)]">
              {parts.map((x) => (
                <span key={x.id} title={x.p.name}>
                  {x.p.emoji} {pct(x.share)}
                </span>
              ))}
            </span>
          </span>
        </span>
        <span className="col-start-2 md:col-start-auto">
          <span className="flex items-baseline justify-between text-sm">
            <span className="font-extrabold">{sek(f.value)}</span>
            <span className="text-xs font-light text-[var(--color-text-muted)]">per year</span>
          </span>
          <span aria-hidden="true" className="mt-1.5 block h-1.5 rounded-full bg-[var(--color-bg-subtle)]">
            <span className="block h-full rounded-full bg-[var(--color-business-blue)]" style={{ width: `${(f.priority / maxPriority) * 100}%`, minWidth: f.priority ? 4 : 0 }} />
          </span>
        </span>
      </button>
      <div id={panel} hidden={!open} className="border-t border-[var(--color-border-default)] p-5 print:block">
        <dl className="grid gap-x-8 gap-y-4 text-sm md:grid-cols-2">
          <div>
            <dt className="font-extrabold">The problem</dt>
            <dd className="mt-1 font-light text-[var(--color-text-secondary)]">{f.problem}</dd>
          </div>
          <div>
            <dt className="font-extrabold">Suggestion</dt>
            <dd className="mt-1 font-light text-[var(--color-text-secondary)]">{f.suggestion}</dd>
          </div>
          <div>
            <dt className="font-extrabold">Where</dt>
            <dd className="mt-1 font-light text-[var(--color-text-secondary)]">{f.where}</dd>
          </div>
          <div>
            <dt className="font-extrabold">Source</dt>
            <dd className="mt-1 font-light text-[var(--color-text-secondary)]">
              {SOURCE[f.source]}
              {f.wcag ? ` · WCAG ${f.wcag}` : ""}
              {f.heuristic ? ` · ${f.heuristic}` : ""}
            </dd>
          </div>
          {f.quotes.length > 0 && (
            <div className="md:col-span-2">
              <dt className="font-extrabold">In their words</dt>
              <dd className="mt-2 grid gap-2 md:grid-cols-2">
                {f.quotes.map((q, i) => (
                  <blockquote key={i} className="rounded-xl border-l-4 bg-[var(--color-bg-subtle)] px-4 py-3 font-light" style={{ borderColor: personaColor(persona(q.archetype).color) }}>
                    “{q.quote}”
                    <footer className="mt-1 text-xs text-[var(--color-text-muted)]">{persona(q.archetype).name}</footer>
                  </blockquote>
                ))}
              </dd>
            </div>
          )}
          <div className="md:col-span-2">
            <dt className="font-extrabold">Who it reaches</dt>
            <dd className="mt-2 grid gap-4 lg:grid-cols-2">
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
                <table className="w-full min-w-[360px] text-xs">
                  <caption className="sr-only">Affected archetypes</caption>
                  <thead className="bg-[var(--beige-light)]">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left font-extrabold">Archetype</th>
                      <th scope="col" className={cell}>Customers</th>
                      <th scope="col" className={cell}>Share</th>
                      <th scope="col" className={cell}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parts.map((x) => (
                      <tr key={x.id} className="border-t border-[var(--color-border-default)]">
                        <th scope="row" className="px-3 py-2 text-left font-light">
                          <span aria-hidden="true" className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ background: personaColor(x.p.color) }} />
                          {x.p.name}
                        </th>
                        <td className={cell}>{num(x.customers)}</td>
                        <td className={cell}>{pct(x.share)}</td>
                        <td className={cell}>{sek(x.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="overflow-x-auto rounded-xl border border-[var(--color-border-default)]">
                <table className="w-full min-w-[360px] text-xs">
                  <caption className="sr-only">Affected segments</caption>
                  <thead className="bg-[var(--beige-light)]">
                    <tr>
                      <th scope="col" className="px-3 py-2 text-left font-extrabold">Segment</th>
                      <th scope="col" className={cell}>Customers</th>
                      <th scope="col" className={cell}>Reach</th>
                      <th scope="col" className={cell}>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {segs.map((s) => (
                      <tr key={s.id} className="border-t border-[var(--color-border-default)]">
                        <th scope="row" className="px-3 py-2 text-left font-light">{s.label}</th>
                        <td className={cell}>{num(s.customers)}</td>
                        <td className={cell}>{pct(s.ofSegment)} of the segment</td>
                        <td className={cell}>{sek(s.value)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-extrabold">How the value is worked out</dt>
            <dd className="mt-1 font-light text-[var(--color-text-secondary)]">
              Per segment: affected customers × segment revenue × {Math.round(assumptions.impact[f.severity] * 1000) / 10}% at stake × phase gap {f.weight.toFixed(2)}, added up: {sek(f.value)} per year for {num(f.affectedCustomers)} customers. Effort {f.effort}, so priority {sek(Math.round(f.priority))} per effort unit.
            </dd>
          </div>
        </dl>
      </div>
    </li>
  );
}
