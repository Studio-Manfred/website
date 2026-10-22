"use client";

import { useEffect, useRef, useState } from "react";
import { LEVELS, PHASES, ROLES, type Activity, type LevelId, type RoleId } from "@/lib/triple-diamond";

// Triple Diamond Roles share page (STU-1167): role filters on top, the three
// diamonds, and per sub-phase the activities of the roles that are on. Same
// type scale and blue accents as the case pages (CaseStudy, CaseList). Each
// activity shows its title and level; clicking it opens the details in a
// modal (STU-1171, STU-1172).

const BLUE = "var(--color-business-blue)";
const allOn = () => Object.fromEntries(ROLES.map((r) => [r.id, true])) as Record<RoleId, boolean>;
const allOff = () => Object.fromEntries(ROLES.map((r) => [r.id, false])) as Record<RoleId, boolean>;
const label = "text-xs font-extrabold uppercase tracking-[0.08em] text-[var(--color-business-blue)]";

function Diamond({ name }: { name: string }) {
  return (
    <div className="relative h-[110px] max-w-[420px] lg:max-w-none">
      <svg aria-hidden="true" viewBox="0 0 400 110" preserveAspectRatio="none" className="absolute inset-0 w-full h-full">
        <polygon points="2,55 200,3 398,55 200,107" fill="white" stroke={BLUE} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
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

const levelOf = (id: LevelId) => LEVELS.find((l) => l.id === id)!;

// Three bars, as many filled as the level is hard. Decorative: the name is
// always written next to it.
function LevelBars({ id }: { id: LevelId }) {
  const n = LEVELS.findIndex((l) => l.id === id) + 1;
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[2px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[4px] rounded-[1px] ${i <= n ? "bg-[var(--color-business-blue)]" : "bg-[var(--color-border-default)]"}`}
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

type Open = { activity: Activity; role: string; phase: string; sub: string };

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
        <div className="p-6 md:p-10">
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
              className="shrink-0 w-10 h-10 rounded-full border border-[var(--color-border-default)] flex items-center justify-center hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
            >
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          <h2
            id="activity-title"
            className="font-extrabold text-[var(--color-business-blue)] leading-[1.15] tracking-[var(--letter-spacing-tight)] mb-5"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
          >
            {open.activity.title}
          </h2>
          <div className="flex items-start gap-3 rounded-xl bg-[var(--blue-50)] px-4 py-3 mb-8">
            <span className="mt-1"><LevelBars id={open.activity.level} /></span>
            <p className="text-sm font-light text-[var(--color-text-primary)]">
              <span className="font-extrabold">Level: {levelOf(open.activity.level).name}.</span> {levelOf(open.activity.level).description}
            </p>
          </div>
          <h3 className="font-extrabold mb-2">How to work with it</h3>
          <p className="font-light text-[var(--color-text-secondary)] mb-8" style={{ lineHeight: 1.7 }}>{open.activity.how}</p>
          <h3 className="font-extrabold mb-3">Tools</h3>
          <ul className="flex flex-wrap gap-2 mb-8">
            {open.activity.tools.map((t) => (
              <li key={t} className="rounded-full bg-[var(--blue-50)] text-[var(--color-business-blue)] px-3 py-1 text-sm">{t}</li>
            ))}
          </ul>
          <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
            <h3 className="font-extrabold mb-2">Example</h3>
            <p className="font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>{open.activity.example}</p>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function TripleDiamondRoles() {
  const [on, setOn] = useState<Record<RoleId, boolean>>(allOn);
  const [open, setOpen] = useState<Open | null>(null);
  const active = ROLES.filter((r) => on[r.id]);
  const total = PHASES.reduce((n, p) => n + p.subs.length, 0) * ROLES.length;
  const shown = PHASES.reduce((n, p) => n + p.subs.length, 0) * active.length;

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="mb-16">
          <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">AI in the design process</p>
          <h1
            className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Where each role can use AI in the triple diamond
          </h1>
          <p className="font-light text-[var(--color-text-primary)] max-w-3xl" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 1.7 }}>
            Switch roles on and off to see the specific activities where AI helps in each part of the process. People review and decide. AI drafts, clusters, summarises and generates.
          </p>
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
          <p className={`${label} mt-10 mb-4`}>Levels</p>
          <dl className="grid gap-4 sm:grid-cols-3">
            {LEVELS.map((l) => (
              <div key={l.id}>
                <dt className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  <LevelBars id={l.id} />
                  {l.name}
                </dt>
                <dd className="text-sm font-light text-[var(--color-text-secondary)]">{l.description}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="grid gap-16 lg:grid-cols-3 lg:gap-0">
          {PHASES.map((p) => (
            <section key={p.name} className="min-w-0">
              <Diamond name={p.name} />
              <div className="grid sm:grid-cols-2 mt-8">
                {p.subs.map((s, i) => (
                  <div key={s.name} className={`min-w-0 pt-2 pb-6 sm:px-5 ${i === 1 ? "sm:border-l border-[var(--color-border-default)]" : ""}`}>
                    <h3 className="font-extrabold text-[var(--color-text-primary)] mb-5" style={{ fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)" }}>
                      <span className="block text-xs font-light uppercase tracking-[0.08em] text-[var(--color-text-muted)] mb-1">{p.name}</span>
                      {s.name}
                    </h3>
                    {active.length > 0 && (
                      <ul>
                        {active.map((r) => (
                          <li key={r.id} className="border-t border-[var(--color-border-default)]">
                            <button
                              type="button"
                              onClick={() => setOpen({ activity: s.acts[r.id], role: r.name, phase: p.name, sub: s.name })}
                              className="group w-full text-left py-4 flex items-start justify-between gap-3"
                            >
                              <span className="min-w-0 flex-1">
                                <span className={`${label} block mb-1`}>{r.name}</span>
                                <span className="block font-light text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-business-blue)] group-hover:underline underline-offset-4" style={{ lineHeight: 1.6 }}>
                                  {s.acts[r.id].title}
                                </span>
                                <span className="block mt-2">
                                  <LevelTag id={s.acts[r.id].level} />
                                </span>
                              </span>
                              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-5 text-[var(--color-business-blue)] transition-transform group-hover:translate-x-0.5">
                                <path d="m9 6 6 6-6 6" />
                              </svg>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {active.length === 0 && (
          <p className="font-light text-[var(--color-text-secondary)] text-center border border-dashed border-[var(--color-border-default)] rounded-2xl p-8 mt-4">
            No roles selected. Switch on one or more roles above to see their activities.
          </p>
        )}

        <p className="font-light text-sm text-[var(--color-text-muted)] max-w-[70ch] mt-20 pt-5 border-t border-[var(--color-border-default)]">
          Activities are examples to start the conversation. Select one to read how to work with it, tools and an example. Levels are a rough guide to how much it takes to get started. Adjust them to how your teams work and what your policies allow.
        </p>
      </div>
      <ActivityDialog open={open} onClose={() => setOpen(null)} />
    </section>
  );
}
