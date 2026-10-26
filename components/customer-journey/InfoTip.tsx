"use client";

import { useEffect, useId, useRef, useState } from "react";

// A small "i" next to a heading. Tapping it shows what the section means, so
// the headings can stand alone without an intro. Closes on Esc, on a tap
// outside, or on the button again.
export function InfoTip({ topic, children }: { topic: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const root = useRef<HTMLSpanElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={root} className="relative inline-flex">
      <button
        ref={button}
        type="button"
        aria-label={`About ${topic}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-extrabold transition-colors ${
          open
            ? "border-[var(--color-business-blue)] bg-[var(--color-business-blue)] text-white"
            : "border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:border-[var(--color-business-blue)] hover:text-[var(--color-business-blue)]"
        }`}
      >
        <span aria-hidden="true">i</span>
      </button>
      {open && (
        <span
          id={id}
          role="note"
          className="absolute left-0 top-full z-30 mt-2 block w-[min(22rem,calc(100vw-3rem))] rounded-xl border border-[var(--color-border-default)] bg-white p-4 text-sm font-light leading-relaxed text-[var(--color-text-secondary)] shadow-lg"
        >
          {children}
        </span>
      )}
    </span>
  );
}
