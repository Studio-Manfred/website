"use client";

import { useId, useState } from "react";
import { label } from "./theme";

// The demo's "Analyse" field. In the demo it never had an API key behind it
// and showed a "coming soon" message; this keeps that until an analysis
// endpoint exists on the site.
export function AskBar({ examples }: { examples: string[] }) {
  const [query, setQuery] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const inputId = useId();

  const ask = (q: string) => {
    const t = q.trim();
    if (t) setAsked(t);
  };

  return (
    <div className="mt-12 rounded-2xl border border-[var(--color-border-default)]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ask(query);
        }}
        className="flex flex-wrap items-center gap-3 border-b border-[var(--color-border-default)] p-3 pl-5"
      >
        <label htmlFor={inputId} className={`${label} shrink-0`}>
          Analyse
        </label>
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="For example: which onboarding frictions affect NPS the most?"
          className="min-w-0 flex-1 bg-transparent py-2 text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
        />
        <button type="submit" className="shrink-0 rounded-full bg-[var(--color-business-blue)] px-5 py-2 text-sm text-white hover:bg-[var(--color-interactive-brand-bg-hover)]">
          Analyse
        </button>
      </form>
      <ul aria-label="Example questions" className="flex flex-wrap gap-2 p-4">
        {examples.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => {
                setQuery(q);
                ask(q);
              }}
              className="rounded-full bg-[var(--color-bg-subtle)] px-3 py-1.5 text-left text-sm font-light hover:bg-[var(--blue-50)] hover:text-[var(--color-business-blue)]"
            >
              {q}
            </button>
          </li>
        ))}
      </ul>
      {asked && (
        <div role="status" className="m-4 mt-0 flex items-start justify-between gap-4 rounded-xl bg-[var(--blue-50)] p-4">
          <div>
            <p className="font-extrabold text-sm">→ {asked}</p>
            <p className="mt-1 text-sm font-light text-[var(--color-text-secondary)]">
              AI analysis is not switched on yet. This is where Claude will answer questions about the data with key figures and a short analysis.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAsked(null);
              setQuery("");
            }}
            className="shrink-0 text-sm font-light underline underline-offset-4 hover:text-[var(--color-business-blue)]"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}
