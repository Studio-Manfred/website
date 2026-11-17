"use client";

import { STEPS, type Step } from "@/lib/customer-journey/levels";

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

/**
 * The build steps, a quiet row under the industry switch in the sticky bar.
 * Folded away at first so the whole journey is easy to demo; opened, it
 * filters the page to the parts of one step.
 */
export function StepFilter({
  step,
  onStep,
  open,
  onToggle,
}: {
  step: Step | null;
  onStep: (s: Step | null) => void;
  open: boolean;
  onToggle: () => void;
}) {
  const btn = (on: boolean) =>
    `inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs transition-colors ${
      on
        ? "border-[var(--color-business-blue)] bg-[var(--blue-50)] text-[var(--color-business-blue)]"
        : "border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
    }`;
  const chosen = step ? stepOf(step) : null;
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="cj-build-steps"
        onClick={onToggle}
        className="inline-flex items-center gap-1.5 text-xs font-light text-[var(--color-text-muted)] hover:text-[var(--color-business-blue)]"
      >
        <StepBars step={3} />
        Build steps
        <svg aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${open ? "rotate-180" : "-rotate-90"}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div id="cj-build-steps" className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <div role="group" aria-label="Complexity" className="flex flex-wrap gap-1.5">
            <button type="button" aria-pressed={step === null} onClick={() => onStep(null)} className={btn(step === null)}>
              All
            </button>
            {STEPS.map((s) => (
              <button key={s.step} type="button" aria-pressed={step === s.step} onClick={() => onStep(s.step)} className={btn(step === s.step)}>
                <StepBars step={s.step} />
                Step {s.step} · {s.name}
              </button>
            ))}
          </div>
          <p aria-live="polite" className="text-xs font-light text-[var(--color-text-muted)]">
            {chosen ? `${chosen.title} · ${chosen.time} · ${chosen.who}` : "Pick a step to see only its parts"}
          </p>
        </div>
      )}
    </div>
  );
}
