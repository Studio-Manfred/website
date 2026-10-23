"use client";

import { useEffect, useRef } from "react";
import type { Insight } from "@/lib/customer-journey/engine";
import { label } from "./theme";

// A native <dialog> opened with showModal(), as on the Triple Diamond page:
// the browser traps focus, closes it on Esc and returns focus to the opener.
function Modal({
  open,
  onClose,
  labelledBy,
  drawer = false,
  children,
}: {
  open: boolean;
  onClose: () => void;
  labelledBy: string;
  drawer?: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (open && d && !d.open) d.showModal();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
      aria-labelledby={labelledBy}
      className={`bg-white p-0 text-[var(--color-text-primary)] backdrop:bg-black/50 ${
        drawer
          ? "ml-auto mr-0 my-0 h-full max-h-full w-full max-w-xl rounded-none md:rounded-l-2xl"
          : "m-auto w-[calc(100%-32px)] max-w-lg max-h-[calc(100%-32px)] rounded-2xl"
      }`}
    >
      {open && children}
    </dialog>
  );
}

// Closing through the dialog element keeps the browser's focus return.
function CloseButton() {
  return (
    <button
      type="button"
      onClick={(e) => e.currentTarget.closest("dialog")?.close()}
      aria-label="Stäng"
      className="shrink-0 w-10 h-10 rounded-full bg-white border border-[var(--color-border-default)] flex items-center justify-center hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    </button>
  );
}

export type CellDetail = {
  title: string;
  phase: string;
  quote?: string;
  details: { label: string; value: string }[];
};

export function CellDialog({
  cell,
  onClose,
}: {
  cell: CellDetail | null;
  onClose: () => void;
}) {
  return (
    <Modal open={!!cell} onClose={onClose} labelledBy="cj-cell-title">
      {cell && (
        <div lang="sv">
          <header className="bg-[var(--beige-light)] px-6 md:px-8 pt-6 md:pt-8 pb-6">
            <div className="flex items-start justify-between gap-6 mb-4">
              <p className={label}>{cell.phase}</p>
              <CloseButton />
            </div>
            <h2
              id="cj-cell-title"
              className="font-extrabold text-[var(--color-business-blue)] leading-[1.15] tracking-[var(--letter-spacing-tight)]"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.75rem)" }}
            >
              {cell.title}
            </h2>
          </header>
          <div className="p-6 md:p-8">
            {cell.details.length > 0 && (
              <dl className="divide-y divide-[var(--color-border-default)] mb-6">
                {cell.details.map((d) => (
                  <div
                    key={d.label}
                    className="flex justify-between gap-6 py-3 text-sm"
                  >
                    <dt className="font-light text-[var(--color-text-secondary)]">
                      {d.label}
                    </dt>
                    <dd className="font-extrabold text-right">{d.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {cell.quote && (
              <blockquote
                className="border-l-4 border-[var(--color-business-blue)] pl-4 font-light text-[var(--color-text-secondary)]"
                style={{ lineHeight: 1.7 }}
              >
                {cell.quote}
              </blockquote>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
}

const LEVEL_TONE: Record<Insight["effort"], string> = {
  Låg: "bg-[var(--color-feedback-success-bg)] text-[var(--color-feedback-success-fg)]",
  Medel:
    "bg-[var(--color-feedback-warning-bg)] text-[var(--color-feedback-warning-fg)]",
  Hög: "bg-[var(--color-feedback-error-bg)] text-[var(--color-feedback-error-fg)]",
};

export function InsightsDialog({
  open,
  onClose,
  subtitle,
  insights,
  watch,
}: {
  open: boolean;
  onClose: () => void;
  subtitle: string;
  insights: Insight[];
  watch: string[];
}) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="cj-insights-title" drawer>
      <div lang="sv" className="flex h-full flex-col">
        <header className="flex items-start justify-between gap-6 border-b border-[var(--color-border-default)] px-6 md:px-8 py-6">
          <div>
            <h2
              id="cj-insights-title"
              className="font-extrabold text-[var(--color-business-blue)] leading-[1.15] tracking-[var(--letter-spacing-tight)]"
              style={{ fontSize: "clamp(1.4rem, 2.6vw, 1.75rem)" }}
            >
              Insights & prioritering
            </h2>
            <p className="mt-1 text-sm font-light text-[var(--color-text-muted)]">
              {subtitle}
            </p>
          </div>
          <CloseButton />
        </header>
        <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6">
          <p
            className="text-sm font-light text-[var(--color-text-secondary)] mb-8"
            style={{ lineHeight: 1.7 }}
          >
            De tre tyngst vägande problemområdena för valt segment, rangordnade
            efter kundpåverkan, effort och risk.
          </p>
          <h3 className={`${label} mb-4`}>Prioriterade fokusområden</h3>
          <ol className="space-y-4 mb-10">
            {insights.map((ins, i) => (
              <li
                key={ins.title}
                className="rounded-2xl border border-[var(--color-border-default)] p-5"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-business-blue)] text-sm font-extrabold text-white"
                  >
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="font-extrabold leading-snug">{ins.title}</h4>
                    <p className="text-xs font-light text-[var(--color-text-muted)] mt-0.5">
                      {ins.phase}
                    </p>
                  </div>
                </div>
                <p
                  className="text-sm font-light text-[var(--color-text-secondary)] mb-3"
                  style={{ lineHeight: 1.7 }}
                >
                  {ins.problem}
                </p>
                <p
                  className="text-sm font-light text-[var(--color-text-secondary)] mb-4"
                  style={{ lineHeight: 1.7 }}
                >
                  <span className="font-extrabold text-[var(--color-text-primary)]">
                    Rekommenderad åtgärd:
                  </span>{" "}
                  {ins.action}
                </p>
                <ul className="flex flex-wrap gap-2 mb-4 text-xs">
                  <li
                    className={`rounded-full px-3 py-1 ${LEVEL_TONE[ins.effort]}`}
                  >
                    Effort: {ins.effort}
                  </li>
                  <li
                    className={`rounded-full px-3 py-1 ${LEVEL_TONE[ins.risk]}`}
                  >
                    Risk: {ins.risk}
                  </li>
                  <li className="rounded-full px-3 py-1 bg-[var(--blue-50)] text-[var(--color-business-blue)]">
                    Impact: {ins.impact}
                  </li>
                </ul>
                <div className="rounded-xl bg-[var(--beige-light)] p-4">
                  <p className="text-xs font-extrabold mb-2">
                    Estimerad förflyttning, 6 månader
                  </p>
                  <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    {ins.forecast.map((f) => (
                      <div
                        key={f.metric}
                        className="flex justify-between gap-2"
                      >
                        <dt className="font-light text-[var(--color-text-secondary)]">
                          {f.metric}
                        </dt>
                        <dd className="font-extrabold">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </li>
            ))}
          </ol>
          <h3 className={`${label} mb-4`}>Bevaka, inte kritiskt nu</h3>
          <ul
            className="space-y-3 rounded-2xl bg-[var(--blue-50)] p-5 text-sm font-light text-[var(--color-text-primary)]"
            style={{ lineHeight: 1.7 }}
          >
            {watch.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </Modal>
  );
}
