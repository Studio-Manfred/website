"use client";

import { useState } from "react";
import { PHASES, ROLES, type RoleId } from "@/lib/triple-diamond";

// Triple Diamond Roles share page (STU-1167): role filters on top, the three
// diamonds, and per sub-phase the activities of the roles that are on. Same
// type scale and blue accents as the case pages (CaseStudy, CaseList).

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

export function TripleDiamondRoles() {
  const [on, setOn] = useState<Record<RoleId, boolean>>(allOn);
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
                          <li key={r.id} className="border-t border-[var(--color-border-default)] py-4">
                            <p className={`${label} mb-1`}>{r.name}</p>
                            <p className="font-light text-[var(--color-text-secondary)] text-sm" style={{ lineHeight: 1.7 }}>
                              {s.acts[r.id]}
                            </p>
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
          Activities are examples to start the conversation. Adjust them to how your teams work and what your policies allow.
        </p>
      </div>
    </section>
  );
}
