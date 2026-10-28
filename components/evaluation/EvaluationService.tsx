"use client";

import { useId, useState } from "react";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import type { IndustryId } from "@/lib/customer-journey/types";
import type { Screenshot } from "@/lib/evaluation/evaluate";
import type { EvaluationResult } from "@/lib/evaluation/findings";
import { TRAITS } from "@/lib/evaluation/traits";
import { label, personaColor, pill } from "@/components/customer-journey/theme";
import { EvaluationReport } from "./EvaluationReport";
import { toScreenshot } from "./screenshots";

// The evaluation service prototype: pick an industry and its archetypes, say
// what to evaluate, and get a report that ties findings to the customer
// journey and to what they are worth.

const LIST = Object.values(INDUSTRIES);
const MAX_SHOTS = 3;
const DEVICE = { mobile: "Mobile", desktop: "Desktop", both: "Mobile and desktop" } as const;

type Shot = Screenshot & { name: string };
type Status = { kind: "idle" } | { kind: "running" } | { kind: "error"; message: string } | { kind: "done"; result: EvaluationResult; industry: IndustryId };

function Meter({ value, of = 5, name }: { value: number; of?: number; name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5" title={`${name} ${value} of ${of}`}>
      <span className="sr-only">{`${name}: ${value} of ${of}`}</span>
      <span aria-hidden="true" className="flex gap-[2px]">
        {Array.from({ length: of }, (_, i) => (
          <span key={i} className={`h-1.5 w-3 rounded-full ${i < value ? "bg-[var(--color-business-blue)]" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </span>
    </span>
  );
}

export function EvaluationService({ live }: { live: boolean }) {
  const [industry, setIndustry] = useState<IndustryId>("hotel");
  const ind = INDUSTRIES[industry];
  const [chosen, setChosen] = useState<string[]>(ind.personas.map((p) => p.id));
  const [phase, setPhase] = useState(1);
  const [url, setUrl] = useState("");
  const [task, setTask] = useState("");
  const [shots, setShots] = useState<Shot[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const ids = { url: useId(), task: useId(), phase: useId(), files: useId() };

  const pickIndustry = (id: IndustryId) => {
    setIndustry(id);
    setChosen(INDUSTRIES[id].personas.map((p) => p.id));
    setPhase(1);
  };
  const toggle = (id: string) => setChosen((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const addFiles = async (files: FileList | null) => {
    if (!files) return;
    const room = MAX_SHOTS - shots.length;
    try {
      const added = await Promise.all([...files].slice(0, room).map(async (f) => ({ ...(await toScreenshot(f)), name: f.name })));
      setShots((s) => [...s, ...added]);
    } catch {
      setStatus({ kind: "error", message: "One of the images could not be read. Try a PNG or JPEG." });
    }
  };

  const ready = chosen.length > 0 && task.trim().length >= 3 && (url.trim() !== "" || shots.length > 0);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready) return;
    setStatus({ kind: "running" });
    try {
      const res = await fetch("/api/evaluation", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ industry, archetypes: chosen, phase, task, url: url.trim() || undefined, screenshots: shots.map(({ mediaType, data }) => ({ mediaType, data })) }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setStatus({ kind: "error", message: json?.error ?? "The evaluation failed. Try again." });
        return;
      }
      setStatus({ kind: "done", result: json as EvaluationResult, industry });
    } catch {
      setStatus({ kind: "error", message: "No answer from the server. Check your connection and try again." });
    }
  };

  const field = "w-full rounded-xl border border-[var(--color-border-default)] bg-white px-4 py-3 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-business-blue)] focus:outline-none";

  return (
    <section className="bg-white px-6 md:px-12 lg:px-8 pt-20 md:pt-32 pb-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="print:hidden">
          <p className={`${label} mb-4`}>Prototype</p>
          <h1 className="font-extrabold leading-[1.05] tracking-[var(--letter-spacing-tight)]" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
            Evaluation <span className="text-[var(--color-business-blue)]">service</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
            Evaluate a page or a flow through the eyes of an industry&apos;s archetypes. Each finding is tied to a phase of the customer journey, to the archetypes it affects, and to what it is worth.
          </p>
          <p className={`mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm ${live ? "bg-[var(--color-feedback-success-bg)] text-[var(--color-feedback-success-fg)]" : "bg-[var(--color-feedback-warning-bg)] text-[var(--color-feedback-warning-fg)]"}`}>
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-current" />
            {live ? "AI analysis is on" : "Demo mode: AI analysis is not switched on, findings come from the journey data"}
          </p>

          <form onSubmit={run} className="mt-14 space-y-12">
            <fieldset>
              <legend className={`${label} mb-4`}>1 · Industry</legend>
              <div className="flex flex-wrap gap-2">
                {LIST.map((i) => (
                  <button key={i.id} type="button" aria-pressed={industry === i.id} onClick={() => pickIndustry(i.id)} className={pill(industry === i.id)}>
                    <span aria-hidden="true" className="mr-1.5">{i.emoji}</span>
                    {i.name}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={`${label} mb-1`}>2 · Archetypes</legend>
              <p className="mb-4 text-sm font-light text-[var(--color-text-secondary)]">
                {ind.segments.length} segments and {ind.personas.length} archetypes from the {ind.name} journey. Choose who walks through the task.
              </p>
              <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {ind.personas.map((p) => {
                  const t = TRAITS[p.id];
                  const on = chosen.includes(p.id);
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(p.id)}
                        className={`flex h-full w-full flex-col rounded-2xl border-2 p-5 text-left transition-colors ${on ? "border-[var(--color-business-blue)] bg-[var(--blue-50)]" : "border-[var(--color-border-default)] hover:border-[var(--color-business-blue)]"}`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="font-extrabold">
                            <span aria-hidden="true" className="mr-1.5">{p.emoji}</span>
                            {p.name}
                          </span>
                          <span className="shrink-0 text-xs font-light text-[var(--color-text-muted)]">{p.share}%</span>
                        </span>
                        <span className="mt-1 block text-sm font-light text-[var(--color-text-secondary)]">{p.tagline}</span>
                        <span className="mt-4 grid grid-cols-[90px_1fr] items-center gap-x-3 gap-y-1.5 text-xs">
                          <span className="font-light text-[var(--color-text-muted)]">Digital skill</span>
                          <Meter value={t.digitalSkill} name="Digital skill" />
                          <span className="font-light text-[var(--color-text-muted)]">Patience</span>
                          <Meter value={t.patience} name="Patience" />
                          <span className="font-light text-[var(--color-text-muted)]">Device</span>
                          <span>{DEVICE[t.device]}</span>
                        </span>
                        {t.access.length > 0 && (
                          <span className="mt-3 flex flex-wrap gap-1.5">
                            {t.access.map((a) => (
                              <span key={a} className="rounded-full border px-2 py-0.5 text-[11px]" style={{ borderColor: personaColor(p.color) }}>
                                {a}
                              </span>
                            ))}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </fieldset>

            <fieldset className="grid gap-6 lg:grid-cols-2">
              <legend className={`${label} mb-4`}>3 · What to evaluate</legend>
              <div className="space-y-6">
                <div>
                  <label htmlFor={ids.url} className="mb-2 block font-extrabold text-sm">Page address</label>
                  <input id={ids.url} type="url" inputMode="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://www.example.com/booking" className={field} />
                  <p className="mt-1.5 text-xs font-light text-[var(--color-text-muted)]">Public pages only. Add screenshots for pages behind a login.</p>
                </div>
                <div>
                  <label htmlFor={ids.task} className="mb-2 block font-extrabold text-sm">The task</label>
                  <textarea id={ids.task} rows={3} value={task} onChange={(e) => setTask(e.target.value)} placeholder="For example: book a family room for two nights in July" className={field} />
                </div>
                <div>
                  <label htmlFor={ids.phase} className="mb-2 block font-extrabold text-sm">Journey phase</label>
                  <select id={ids.phase} value={phase} onChange={(e) => setPhase(Number(e.target.value))} className={field}>
                    {ind.phases.map((p, i) => (
                      <option key={p.name} value={i}>
                        {String(i + 1).padStart(2, "0")} {p.name} · {p.sub}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <p id={ids.files} className="mb-2 font-extrabold text-sm">Screenshots <span className="font-light text-[var(--color-text-muted)]">(optional, up to {MAX_SHOTS}, in order)</span></p>
                <label className={`flex min-h-[140px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center text-sm font-light text-[var(--color-text-secondary)] ${shots.length >= MAX_SHOTS ? "pointer-events-none opacity-50" : "border-[var(--color-border-strong)] hover:border-[var(--color-business-blue)]"}`}>
                  <input type="file" accept="image/png,image/jpeg,image/webp" multiple aria-labelledby={ids.files} disabled={shots.length >= MAX_SHOTS} className="sr-only" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
                  <span className="font-extrabold text-[var(--color-business-blue)]">Choose images</span>
                  <span className="mt-1">PNG, JPEG or WebP. They are shrunk before upload.</span>
                </label>
                {shots.length > 0 && (
                  <ol className="mt-4 grid grid-cols-3 gap-3">
                    {shots.map((s, i) => (
                      <li key={i} className="relative overflow-hidden rounded-xl border border-[var(--color-border-default)]">
                        {/* eslint-disable-next-line @next/next/no-img-element -- a local preview of an upload */}
                        <img src={`data:${s.mediaType};base64,${s.data}`} alt={`Screenshot ${i + 1}: ${s.name}`} className="h-28 w-full object-cover object-top" />
                        <button type="button" onClick={() => setShots((all) => all.filter((_, j) => j !== i))} aria-label={`Remove screenshot ${i + 1}`} className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm shadow">
                          <span aria-hidden="true">×</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            </fieldset>

            <div className="flex flex-wrap items-center gap-4 border-t border-[var(--color-border-default)] pt-8">
              <button type="submit" disabled={!ready || status.kind === "running"} className="rounded-full bg-[var(--color-business-blue)] px-7 py-3 text-white hover:bg-[var(--color-interactive-brand-bg-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-secondary)]">
                {status.kind === "running" ? "Evaluating…" : "Run the evaluation"}
              </button>
              <p aria-live="polite" className="text-sm font-light text-[var(--color-text-secondary)]">
                {status.kind === "running"
                  ? `Walking through the task as ${chosen.length} archetype${chosen.length === 1 ? "" : "s"}. This can take a minute or two.`
                  : !ready
                    ? "Choose archetypes, describe the task, and give an address or a screenshot."
                    : ""}
              </p>
            </div>
            {status.kind === "error" && (
              <p role="alert" className="rounded-xl bg-[var(--color-feedback-error-bg)] p-4 text-sm text-[var(--color-feedback-error-fg)]">
                {status.message}
              </p>
            )}
          </form>
        </div>

        {status.kind === "done" && <EvaluationReport key={JSON.stringify(status.result.findings.map((f) => f.id))} result={status.result} industry={status.industry} task={task} />}
      </div>
    </section>
  );
}
