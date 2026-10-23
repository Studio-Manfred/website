"use client";

import { STEPS, type Step } from "@/lib/customer-journey/levels";
import { label } from "./theme";

// The complexity roadmap: three steps from easy to advanced. The same bars as
// the Triple Diamond levels mark how hard each part is to build.

const stepOf = (s: Step) => STEPS[s - 1];

/** Three bars, as many filled as the step is hard. Decorative: the name is always written next to it. */
export function StepBars({ step, onDark = false }: { step: Step; onDark?: boolean }) {
  return (
    <span aria-hidden="true" className="inline-flex items-end gap-[2px]">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-[4px] rounded-[1px] ${i <= step ? (onDark ? "bg-white" : "bg-[var(--color-business-blue)]") : onDark ? "bg-white/40" : "bg-[var(--color-border-default)]"}`}
          style={{ height: `${4 + i * 3}px` }}
        />
      ))}
    </span>
  );
}

export function StepTag({ step }: { step: Step }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-xs font-light text-[var(--color-text-muted)]">
      <StepBars step={step} />
      <span>
        <span className="sr-only">Complexity: </span>
        Step {step} · {stepOf(step).name}
      </span>
    </span>
  );
}

/** The always-visible complexity switch in the sticky bar. */
export function StepFilter({ step, onStep }: { step: Step | null; onStep: (s: Step | null) => void }) {
  const btn = (on: boolean) =>
    `inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
      on
        ? "bg-[var(--color-business-blue)] border-[var(--color-business-blue)] text-white"
        : "bg-white border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
    }`;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <p id="cj-complexity" className={label}>
        Complexity
      </p>
      <div role="group" aria-labelledby="cj-complexity" className="flex flex-wrap gap-2">
        <button type="button" aria-pressed={step === null} onClick={() => onStep(null)} className={btn(step === null)}>
          All
        </button>
        {STEPS.map((s) => (
          <button key={s.step} type="button" aria-pressed={step === s.step} onClick={() => onStep(s.step)} className={btn(step === s.step)}>
            <StepBars step={s.step} onDark={step === s.step} />
            Step {s.step} · {s.name}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="text-sm font-light text-[var(--color-text-muted)]">
        {step === null ? "Showing every part of the instrument" : `Showing step ${step}`}
      </p>
    </div>
  );
}

/** The roadmap: what each step takes. Each card also switches the filter. */
export function Roadmap({ step, onStep }: { step: Step | null; onStep: (s: Step | null) => void }) {
  return (
    <section aria-labelledby="cj-roadmap" className="mt-16 border-t-4 border-[var(--color-business-blue)] pt-6">
      <div className="mb-8 max-w-2xl">
        <h2 id="cj-roadmap" className="mb-2 font-extrabold leading-[1.15] tracking-[var(--letter-spacing-tight)]" style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}>
          Roadmap: from easy to advanced
        </h2>
        <p className="font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.7 }}>
          Some parts of a journey instrument can be in place in weeks, others take months and several teams. Pick a step to see only its parts.
        </p>
      </div>
      <ol className="grid gap-4 md:grid-cols-3">
        {STEPS.map((s) => {
          const on = step === s.step;
          const included = step === null || s.step === step;
          return (
            <li key={s.step}>
              <button
                type="button"
                aria-pressed={on}
                onClick={() => onStep(on ? null : s.step)}
                className={`flex h-full w-full flex-col rounded-2xl border p-5 text-left transition-colors ${
                  on ? "border-[var(--color-business-blue)] bg-[var(--blue-50)]" : included ? "border-[var(--color-border-default)] hover:border-[var(--color-business-blue)]" : "border-dashed border-[var(--color-border-strong)] hover:border-[var(--color-business-blue)]"
                }`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className={label}>Step {s.step}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-light text-[var(--color-text-muted)]">
                    <StepBars step={s.step} />
                    {s.name}
                  </span>
                </span>
                <span className="mt-3 block font-extrabold" style={{ fontSize: "1.15rem" }}>{s.title}</span>
                <span className="mt-2 block text-sm font-light text-[var(--color-text-secondary)]" style={{ lineHeight: 1.6 }}>{s.summary}</span>
                <span className="mt-4 grid grid-cols-[64px_1fr] gap-x-3 gap-y-1.5 border-t border-[var(--color-border-default)] pt-4 text-xs">
                  <span className="font-extrabold">Data</span>
                  <span className="font-light text-[var(--color-text-secondary)]">{s.sources}</span>
                  <span className="font-extrabold">Time</span>
                  <span className="font-light text-[var(--color-text-secondary)]">{s.time}</span>
                  <span className="font-extrabold">Who</span>
                  <span className="font-light text-[var(--color-text-secondary)]">{s.who}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
