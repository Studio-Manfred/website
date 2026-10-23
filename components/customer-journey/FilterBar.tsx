"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { Industry, IndustryId, Persona } from "@/lib/customer-journey/types";
import type { Step } from "@/lib/customer-journey/levels";
import { StepBars, StepFilter } from "./steps";
import { label, personaColor, pill } from "./theme";

export const ROLES = [
  { id: "all", name: "All" },
  { id: "designer", name: "Designer" },
  { id: "pm", name: "PM" },
  { id: "cx", name: "CX" },
  { id: "leadership", name: "Leadership" },
  { id: "arkitekt", name: "Architect" },
] as const;

/** null = no persona, "all" = compare every persona, else a persona id. */
export type PersonaChoice = string | null;

type Props = {
  industries: Industry[];
  industry: IndustryId;
  onIndustry: (id: IndustryId) => void;
  segments: { id: string; label: string }[];
  seg: string;
  onSeg: (id: string) => void;
  personas: Persona[];
  persona: PersonaChoice;
  onPersona: (p: PersonaChoice) => void;
  role: string;
  onRole: (id: string) => void;
  onInsights: () => void;
  /** Insights belongs to step 3; before that the button is off. */
  insightsOn: boolean;
  step: Step | null;
  onStep: (s: Step | null) => void;
};

function Chip({ name, value, onClear }: { name: string; value: string; onClear: () => void }) {
  return (
    <li className="flex shrink-0 items-center gap-1.5 rounded-full bg-[var(--blue-50)] py-1 pl-3 pr-1 text-sm">
      <span className="text-xs font-extrabold uppercase tracking-[0.06em] text-[var(--color-business-blue)]">{name}</span>
      <span className="whitespace-nowrap font-light">{value}</span>
      <button
        type="button"
        onClick={onClear}
        aria-label={`Remove the ${name} filter`}
        className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-white hover:text-[var(--color-business-blue)]"
      >
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </li>
  );
}

export function FilterBar(props: Props) {
  const { industries, industry, onIndustry, segments, seg, onSeg, personas, persona, onPersona, role, onRole, onInsights, insightsOn, step, onStep } = props;
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const segId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const segLabel = segments.find((s) => s.id === seg)?.label ?? "";
  const chosen = persona && persona !== "all" ? personas.find((p) => p.id === persona) : null;
  const chips: { name: string; value: string; clear: () => void }[] = [];
  if (seg !== segments[0]?.id) chips.push({ name: "Segment", value: segLabel, clear: () => onSeg(segments[0].id) });
  if (persona === "all") chips.push({ name: "Persona", value: "Compare all", clear: () => onPersona(null) });
  if (chosen) chips.push({ name: "Persona", value: `${chosen.emoji} ${chosen.name}`, clear: () => onPersona(null) });
  if (role !== "all") chips.push({ name: "View", value: ROLES.find((r) => r.id === role)?.name ?? role, clear: () => onRole("all") });
  const reset = () => {
    onSeg(segments[0].id);
    onPersona(null);
    onRole("all");
  };

  return (
    <div className="sticky top-0 z-30 -mx-6 md:-mx-12 lg:-mx-8 border-y border-[var(--color-border-default)] bg-white/95 px-6 md:px-12 lg:px-8 py-3 backdrop-blur">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div role="group" aria-label="Industry" className="flex flex-wrap gap-2">
          {industries.map((ind) => (
            <button key={ind.id} type="button" aria-pressed={industry === ind.id} onClick={() => onIndustry(ind.id)} className={pill(industry === ind.id)}>
              <span aria-hidden="true" className="mr-1.5">{ind.emoji}</span>
              {ind.name}
            </button>
          ))}
        </div>

        <div ref={wrap} className="relative flex min-w-0 flex-1 items-center gap-3">
          <button
            ref={toggle}
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((o) => !o)}
            className="flex shrink-0 items-center gap-2 rounded-full border border-[var(--color-text-primary)] bg-white px-4 py-2 text-sm hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filter
            {chips.length > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-business-blue)] px-1.5 text-xs font-extrabold text-white">
                <span className="sr-only">, active: </span>
                {chips.length}
              </span>
            )}
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${open ? "rotate-180" : ""}`}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {chips.length > 0 ? (
            <>
              <ul aria-label="Active filters" className="flex min-w-0 gap-2 overflow-x-auto [scrollbar-width:none]">
                {chips.map((c) => (
                  <Chip key={c.name} name={c.name} value={c.value} onClear={c.clear} />
                ))}
              </ul>
              <button type="button" onClick={reset} className="shrink-0 text-sm font-light underline underline-offset-4 hover:text-[var(--color-business-blue)]">
                Reset
              </button>
            </>
          ) : (
            <p className="text-sm font-light text-[var(--color-text-muted)]">No filters selected</p>
          )}

          {open && (
            <div
              id={panelId}
              role="region"
              aria-label="Filter"
              className="absolute left-0 top-[calc(100%+12px)] z-40 w-[min(680px,calc(100vw-48px))] rounded-2xl border border-[var(--color-border-default)] bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
            >
              <div className="border-b border-[var(--color-border-default)] p-5">
                <label htmlFor={segId} className={`${label} mb-3 block`}>
                  Segment
                </label>
                <select
                  id={segId}
                  value={seg}
                  onChange={(e) => onSeg(e.target.value)}
                  className="w-full max-w-xs rounded-full border border-[var(--color-business-blue)] bg-white px-4 py-2 text-sm text-[var(--color-text-primary)]"
                >
                  {segments.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="border-b border-[var(--color-border-default)] p-5">
                <p id={`${panelId}-p`} className={`${label} mb-3`}>Persona</p>
                <div role="group" aria-labelledby={`${panelId}-p`} className="flex flex-wrap gap-2">
                  <button type="button" aria-pressed={persona === null} onClick={() => onPersona(null)} className={pill(persona === null)}>
                    None
                  </button>
                  {personas.map((p) => (
                    <button key={p.id} type="button" aria-pressed={persona === p.id} onClick={() => onPersona(p.id)} className={`${pill(persona === p.id)} inline-flex items-center gap-2`}>
                      <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full" style={{ background: personaColor(p.color) }} />
                      <span aria-hidden="true">{p.emoji}</span>
                      {p.name}
                    </button>
                  ))}
                  <button type="button" aria-pressed={persona === "all"} onClick={() => onPersona("all")} className={pill(persona === "all")}>
                    Compare all
                  </button>
                </div>
              </div>
              <div className="border-b border-[var(--color-border-default)] p-5">
                <p id={`${panelId}-r`} className={`${label} mb-3`}>View</p>
                <div role="group" aria-labelledby={`${panelId}-r`} className="flex flex-wrap gap-2">
                  {ROLES.map((r) => (
                    <button key={r.id} type="button" aria-pressed={role === r.id} onClick={() => onRole(r.id)} className={pill(role === r.id)}>
                      {r.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-5">
                <button type="button" onClick={reset} className="text-sm font-light underline underline-offset-4 hover:text-[var(--color-business-blue)]">
                  Reset all
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    toggle.current?.focus();
                  }}
                  className="rounded-full bg-[var(--color-business-blue)] px-5 py-2 text-sm text-white hover:bg-[var(--color-interactive-brand-bg-hover)]"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onInsights}
          disabled={!insightsOn}
          title={insightsOn ? undefined : "Insights comes in step 3"}
          className="flex shrink-0 items-center gap-2 rounded-full bg-[var(--color-business-blue)] px-4 py-2 text-sm text-white hover:bg-[var(--color-interactive-brand-bg-hover)] disabled:cursor-not-allowed disabled:bg-[var(--color-bg-muted)] disabled:text-[var(--color-text-secondary)]"
        >
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2Z" />
          </svg>
          Insights
          {!insightsOn && (
            <span className="inline-flex items-center gap-1.5 text-xs">
              <StepBars step={3} />
              <span>Step 3</span>
            </span>
          )}
        </button>
      </div>
      <div className="mt-3 border-t border-[var(--color-border-default)] pt-3">
        <StepFilter step={step} onStep={onStep} />
      </div>
    </div>
  );
}
