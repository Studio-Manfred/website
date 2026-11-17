"use client";

import { useId, useState } from "react";

// Process block of a case page (STU-1153): an accordion of steps. Each step opens
// and closes on its own, several can be open, and step 01 starts open. Same design
// as the intranet's case preview (Studio-Manfred/manfred-intranet
// src/components/cases/case-process-timeline.tsx); keep the two in step.
// Closed panels stay in the DOM (inert, height 0), so print can show them.

type Step = {
  id: number;
  title: string;
  methods: string[];
  description: string;
};

type Props = {
  steps: Step[];
  stakeholders: string[];
  heading?: string;
};

function ChevronDown({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

const BLUE = "var(--color-business-blue)";
const LINE = "var(--color-border-default)";

function StepMarker({ open }: { open: boolean }) {
  return (
    <span aria-hidden className="relative flex-shrink-0 w-8 h-8 flex items-center justify-center">
      {open ? (
        <>
          {/* Only this outer ring pulses; the circle on top stays still. */}
          <span
            data-testid="step-halo"
            className="absolute inset-0 rounded-full bg-[color-mix(in_srgb,var(--color-business-blue)_12%,transparent)] animate-halo-pulse motion-reduce:animate-none print:animate-none"
          />
          <span className="relative w-5 h-5 rounded-full flex items-center justify-center bg-[var(--color-business-blue)]">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        </>
      ) : (
        <span className="w-5 h-5 rounded-full border-2 border-[var(--neutral-400)] bg-white" />
      )}
    </span>
  );
}

export function ProcessTimeline({ steps, stakeholders, heading = "Process & Methods" }: Props) {
  const baseId = useId();
  const [open, setOpen] = useState<Set<number>>(() => new Set([0]));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  return (
    <div>
      <h2
        className="font-extrabold text-[var(--color-text-primary)] mb-6"
        style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}
      >
        {heading}
      </h2>

      {steps.length > 0 && (
        <ol className="list-none p-0 m-0">
          {steps.map((step, i) => {
            const isOpen = open.has(i);
            const isLast = i === steps.length - 1;
            const buttonId = `${baseId}-step-${i}`;
            const panelId = `${baseId}-panel-${i}`;
            const title = step.title.trim() || `Step ${i + 1}`;
            return (
              <li key={i} className="relative">
                {i > 0 && (
                  <span aria-hidden className="absolute top-0 left-10 right-0 h-px" style={{ background: LINE }} />
                )}
                {!isLast && (
                  // From the bottom of this marker to the top of the next one (18 px into the next row).
                  <span
                    aria-hidden
                    className="absolute left-[15px] -bottom-[18px] w-0.5"
                    style={{ background: LINE, top: isOpen ? 44 : 38 }}
                  />
                )}

                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(i)}
                    className="w-full min-h-11 py-3 flex items-start gap-2 text-left bg-transparent border-0 cursor-pointer"
                  >
                    <StepMarker open={isOpen} />
                    <span
                      aria-hidden
                      className="w-7 flex-shrink-0 pt-1 font-semibold"
                      style={{ fontSize: "16px", color: isOpen ? BLUE : "var(--color-text-muted)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="flex-1 min-w-0 pt-[5px] font-semibold text-[var(--color-text-primary)]"
                      style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
                    >
                      {title}
                    </span>
                    <ChevronDown
                      aria-hidden
                      className={`w-5 h-5 mt-1.5 flex-shrink-0 text-[var(--color-text-secondary)] transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  inert={!isOpen}
                  className={`grid transition-[grid-template-rows] duration-200 motion-reduce:transition-none print:grid-rows-[1fr] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <div className="pl-[76px] pb-4 sm:pb-5">
                      {step.description && (
                        <p
                          className="font-normal sm:font-light text-[var(--color-text-secondary)] max-w-[70ch] mb-4"
                          style={{ fontSize: "15px", lineHeight: 1.6 }}
                        >
                          {step.description}
                        </p>
                      )}
                      {step.methods.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {step.methods.map((m, k) => (
                            <span
                              key={`${m}-${k}`}
                              className="font-medium rounded-full px-4 py-2 text-[var(--color-business-blue)] bg-[color-mix(in_srgb,var(--color-business-blue)_8%,transparent)]"
                              style={{ fontSize: "14px" }}
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {stakeholders.length > 0 && (
      <div className="mt-8 sm:mt-10">
        <p
          className="font-extrabold text-[var(--color-text-primary)] mb-4 text-[14px] sm:text-[length:clamp(1rem,1.4vw,1.1rem)]"
        >
          Stakeholder collaboration
        </p>
        <div className="flex flex-wrap gap-2">
          {stakeholders.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="font-light text-[var(--color-business-blue)] border border-[var(--color-business-blue)] rounded-full px-4 py-1"
              style={{ fontSize: "13px" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
