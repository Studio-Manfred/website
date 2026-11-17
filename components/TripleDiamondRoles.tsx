"use client";

import { useEffect, useRef, useState } from "react";
import { LEVELS, PHASES, ROLES, TD_CASE_DEFAULTS, type Activity, type LevelId, type RoleId } from "@/lib/triple-diamond";
import type { Consultant } from "@/lib/cases";

// Triple Diamond Roles share page (STU-1167): role filters on top, the three
// diamonds, and per sub-phase the activities of the roles that are on. Same
// type scale and blue accents as the case pages (CaseStudy, CaseList). Each
// activity shows its title and level; clicking it opens the details in a
// modal (STU-1171, STU-1172).

const BLUE = "var(--color-business-blue)";
const allOn = () => Object.fromEntries(ROLES.map((r) => [r.id, true])) as Record<RoleId, boolean>;
const allOff = () => Object.fromEntries(ROLES.map((r) => [r.id, false])) as Record<RoleId, boolean>;
const label = "text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-business-blue)]";

// `connect` draws a dashed line from the right tip to the next diamond, across
// the panel padding (desktop, three columns, panels edge to edge; STU-1174, STU-1176).
// max-lg:hidden, not `hidden lg:block`: the design system's CSS loads a second
// `.hidden` after the lg: utilities, which would hide it on every width.
function Diamond({ name, connect }: { name: string; connect: boolean }) {
  return (
    <div className="relative h-[110px] max-w-[420px] lg:max-w-none">
      {connect && (
        <span
          aria-hidden="true"
          data-connector="across"
          className="max-lg:hidden absolute top-1/2 left-[calc(100%-2px)] w-[calc(1rem+4px)] border-t-2 border-dashed border-[var(--color-business-blue)]"
        />
      )}
      <svg aria-hidden="true" viewBox="0 0 400 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon points="2,55 200,3 398,55 200,107" fill="white" fillOpacity="0.6" stroke={BLUE} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
      </svg>
      <h2
        className="absolute inset-0 flex items-center justify-center text-center px-[22%] font-extrabold leading-[1.1] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)]"
        style={{ fontSize: "clamp(1.1rem, 1.7vw, 1.5rem)" }}
      >
        {name}
      </h2>
    </div>
  );
}

// One brand tint per phase (STU-1173): Light Beige, Blue 50, a lighter Human
// Pink. The panel and the modal header use it, so the phases are easy to tell apart.
const PHASE_BG = ["var(--beige-light)", "var(--blue-50)", "color-mix(in srgb, var(--pink) 60%, white)"];

const levelOf = (id: LevelId) => LEVELS.find((l) => l.id === id)!;

// Three bars, as many filled as the level is hard. Decorative: the name is
// always written next to it.
// `inverted`: white bars for a blue (pressed) button.
function LevelBars({ id, inverted = false }: { id: LevelId; inverted?: boolean }) {
  const n = LEVELS.findIndex((l) => l.id === id) + 1;
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[2px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[4px] rounded-[1px] ${i <= n ? (inverted ? "bg-white" : "bg-[var(--color-business-blue)]") : inverted ? "bg-white/35" : "bg-[var(--color-border-default)]"}`}
          style={{ height: `${4 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

function LevelTag({ id }: { id: LevelId }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-light text-[var(--color-text-muted)] whitespace-nowrap">
      <LevelBars id={id} />
      <span>
        <span className="sr-only">Level: </span>
        {levelOf(id).name}
      </span>
    </span>
  );
}

type Open = { activity: Activity; role: string; phase: string; sub: string; bg: string };

// A native <dialog> opened with showModal(): the browser traps focus, closes it
// on Esc and returns focus to the title that opened it.
function ActivityDialog({ open, onClose }: { open: Open | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (open && d && !d.open) d.showModal();
  }, [open]);
  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && close()}
      aria-labelledby="activity-title"
      className="m-auto w-[calc(100%-32px)] max-w-2xl max-h-[calc(100%-32px)] rounded-2xl bg-white p-0 text-[var(--color-text-primary)] backdrop:bg-black/50"
    >
      {open && (
        <>
          <header className="px-6 md:px-10 pt-6 md:pt-10 pb-6 md:pb-8" style={{ background: open.bg }}>
          <div className="flex items-start justify-between gap-6 mb-6">
            <div>
              <p className={`${label} mb-2`}>{open.role}</p>
              <p className="text-sm font-light text-[var(--color-text-muted)]">
                {open.phase} · {open.sub}
              </p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="shrink-0 w-10 h-10 rounded-full bg-white border border-[var(--color-border-default)] flex items-center justify-center hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2
            id="activity-title"
            className="font-extrabold text-[var(--color-business-blue)] leading-[1.15] tracking-[var(--letter-spacing-tight)]"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {open.activity.title}
          </h2>
          </header>
          <div className="p-6 md:p-10">
          <div className="flex items-start gap-3 rounded-xl bg-[var(--blue-50)] px-4 py-3 mb-8">
            <span className="mt-1"><LevelBars id={open.activity.level} /></span>
            <p className="text-sm font-light text-[var(--color-text-primary)]">
              <span className="font-extrabold">Level: {levelOf(open.activity.level).name}.</span> {levelOf(open.activity.level).description}
            </p>
          </div>
          <h3 className="font-extrabold mb-2">How to work with it</h3>
          <p className="font-light text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: 1.7 }}>{open.activity.how}</p>
          <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
            <h3 className="font-extrabold mb-2">Example</h3>
            <p className="font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>{open.activity.example}</p>
          </div>
          </div>
        </>
      )}
    </dialog>
  );
}

type Props = { title?: string; intro?: string; categoryLine?: string; consultants?: Consultant[] };

// Title, intro, category and consultants come from the case row (STU-1179).
export function TripleDiamondRoles({
  title = TD_CASE_DEFAULTS.title,
  intro = TD_CASE_DEFAULTS.intro,
  categoryLine = TD_CASE_DEFAULTS.categoryLine,
  consultants = [],
}: Props = {}) {
  const [on, setOn] = useState<Record<RoleId, boolean>>(allOn);
  const [open, setOpen] = useState<Open | null>(null);
  // Level filter (STU-1182): an activity shows when its role and its level are on.
  const [levelOn, setLevelOn] = useState<Record<LevelId, boolean>>({ easy: true, medium: true, advanced: true });
  const active = ROLES.filter((r) => on[r.id]);
  const visible = (acts: Activity[]) => acts.filter((a) => levelOn[a.level]);
  const count = (roles: typeof ROLES, pick: (acts: Activity[]) => Activity[]) =>
    PHASES.reduce((n, p) => n + p.subs.reduce((m, s) => m + roles.reduce((k, r) => k + pick(s.acts[r.id]).length, 0), 0), 0);
  const total = count(ROLES, (acts) => acts);
  const shown = count(active, visible);

  return (
    <section className="bg-white px-6 md:px-12 lg:px-8 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "1600px" }}>
        <div className="mb-16">
          {categoryLine && <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">{categoryLine}</p>}
          <h1
            className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {title}
          </h1>
          <p className="font-light text-[var(--color-text-primary)] max-w-3xl" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 1.7 }}>
            {intro}
          </p>
          <p className="font-light text-[var(--color-text-secondary)] max-w-3xl mt-4">
            People review and decide. AI drafts, clusters, summarises and generates.
          </p>
          {consultants.map((c, i) => (
            <div key={i} className="flex items-center gap-3 mt-8">
              {c.photoUrl && (
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                  {/* The name is right beside it, so the photo is decorative. */}
                  <img src={c.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                </div>
              )}
              <div>
                <p className="font-extrabold text-[var(--color-text-primary)] text-sm">{c.name}</p>
                {c.title && <p className="font-light text-[var(--color-text-secondary)] text-sm">{c.title}</p>}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-4 border-[var(--color-business-blue)] pt-5 mb-20">
          <p id="roles-label" className={`${label} mb-4`}>Roles</p>
          <div role="group" aria-labelledby="roles-label" className="flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r.id}
                type="button"
                aria-pressed={on[r.id]}
                onClick={() => setOn((s) => ({ ...s, [r.id]: !s[r.id] }))}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  on[r.id]
                    ? "bg-[var(--color-business-blue)] border-[var(--color-business-blue)] text-white"
                    : "bg-white border-[var(--color-business-blue)] text-[var(--color-business-blue)] hover:bg-[var(--blue-50)]"
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm">
            <button type="button" onClick={() => setOn(allOn)} className="font-light underline underline-offset-4 text-[var(--color-text-primary)] hover:text-[var(--color-business-blue)]">
              Show all roles
            </button>
            <button type="button" onClick={() => setOn(allOff)} className="font-light underline underline-offset-4 text-[var(--color-text-primary)] hover:text-[var(--color-business-blue)]">
              Clear
            </button>
            <p aria-live="polite" className="font-light text-[var(--color-text-muted)]">
              Showing {shown} of {total} activities
            </p>
          </div>
          <p id="levels-label" className={`${label} mt-10 mb-4`}>Levels</p>
          <div role="group" aria-labelledby="levels-label" className="grid gap-4 sm:grid-cols-3">
            {LEVELS.map((l) => (
              <div key={l.id}>
                <button
                  type="button"
                  aria-pressed={levelOn[l.id]}
                  onClick={() => setLevelOn((v) => ({ ...v, [l.id]: !v[l.id] }))}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm mb-2 transition-colors ${
                    levelOn[l.id]
                      ? "bg-[var(--color-business-blue)] border-[var(--color-business-blue)] text-white"
                      : "bg-white border-[var(--color-business-blue)] text-[var(--color-business-blue)] hover:bg-[var(--blue-50)]"
                  }`}
                >
                  <LevelBars id={l.id} inverted={levelOn[l.id]} />
                  {l.name}
                </button>
                <p className="text-sm font-light text-[var(--color-text-secondary)]">{l.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile values as max-lg: so the design system's second copy of
            .gap-6 / .rounded-2xl can't override the desktop layout (STU-1176). */}
        <div className="grid max-lg:gap-6 lg:grid-cols-3">
          {PHASES.map((p, pi) => (
            <section key={p.name} className="relative min-w-0 max-lg:rounded-2xl max-md:p-4 md:max-lg:p-5 lg:px-2 lg:py-5 lg:first:rounded-l-2xl lg:last:rounded-r-2xl" style={{ background: PHASE_BG[pi] }}>
              <Diamond name={p.name} connect={pi < PHASES.length - 1} />
              {pi < PHASES.length - 1 && (
                // Stacked panels: a dashed line down the gap, under the diamond's centre (STU-1174).
                <span
                  aria-hidden="true"
                  data-connector="down"
                  className="lg:hidden absolute top-full h-6 border-l-2 border-dashed border-[var(--color-business-blue)] left-[calc(1rem+min(210px,50%-1rem))] md:left-[calc(1.25rem+min(210px,50%-1.25rem))]"
                />
              )}
              <div className="grid sm:grid-cols-2 mt-8">
                {p.subs.map((s, i) => (
                  <div key={s.name} className={`min-w-0 pt-2 pb-6 sm:px-5 lg:px-3 ${i === 1 ? "sm:border-l border-[var(--color-border-default)]" : ""}`}>
                    <h3 className="font-extrabold text-[var(--color-text-primary)] mb-5" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
                      <span className="block text-xs font-light uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-1">{p.name}</span>
                      {s.name}
                    </h3>
                    {active.map((r) => {
                      const acts = visible(s.acts[r.id]);
                      if (acts.length === 0) return null;
                      // Each role's activities in this sub-phase, as a list named by the role (STU-1175),
                      // with a light line between them (STU-1177).
                      const labelId = `acts-${p.name}-${s.name}-${r.id}`.replace(/\W+/g, "-");
                      return (
                        <div key={r.id} className="border-t border-[color-mix(in_srgb,var(--color-business-blue)_40%,transparent)] pt-4 pb-2">
                          <p id={labelId} className={`${label} mb-1`}>{r.name}</p>
                          <ul aria-labelledby={labelId} className="divide-y divide-black/10">
                            {acts.map((a) => (
                              <li key={a.title}>
                                <button
                                  type="button"
                                  onClick={() => setOpen({ activity: a, role: r.name, phase: p.name, sub: s.name, bg: PHASE_BG[pi] })}
                                  className="group w-full text-left py-3 flex items-start justify-between gap-3"
                                >
                                  <span className="min-w-0 flex-1">
                                    <span className="block font-light text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-business-blue)] group-hover:underline underline-offset-4" style={{ lineHeight: 1.6 }}>
                                      {a.title}
                                    </span>
                                    <span className="block mt-1">
                                      <LevelTag id={a.level} />
                                    </span>
                                  </span>
                                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-1 text-[var(--color-business-blue)] transition-transform group-hover:translate-x-0.5">
                                    <path d="m9 6 6 6-6 6" />
                                  </svg>
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {shown === 0 && (
          <p className="font-light text-[var(--color-text-secondary)] text-center border border-dashed border-[var(--color-border-default)] rounded-2xl p-8 mt-4">
            {active.length === 0
              ? "No roles selected. Switch on one or more roles above to see their activities."
              : "No activities match the selected roles and levels. Switch on more levels above."}
          </p>
        )}

        <p className="font-light text-sm text-[var(--color-text-muted)] max-w-[70ch] mt-20 pt-5 border-t border-[var(--color-border-default)]">
          Activities are examples to start the conversation. Select one to read how to work with it and an example. Levels are a rough guide to how much it takes to get started. Adjust them to how your teams work and what your policies allow.
        </p>
      </div>
      <ActivityDialog open={open} onClose={() => setOpen(null)} />
    </section>
  );
}
