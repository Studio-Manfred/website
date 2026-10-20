"use client";

/** Opens the browser's print dialog; the page's print stylesheet makes it an A4 PDF (STU-1155). */
export function PrintButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print-hidden inline-flex items-center gap-2 rounded-full bg-[var(--color-business-blue)] px-5 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity"
    >
      {label}
    </button>
  );
}
