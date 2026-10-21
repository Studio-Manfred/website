"use client";

import { Button } from "@/components/ds";

/** Opens the browser's print dialog; the page's print stylesheet makes it an A4 PDF (STU-1155). */
export function PrintButton({ label }: { label: string }) {
  return (
    <Button type="button" variant="ghost" size="sm" className="print-hidden max-sm:absolute max-sm:right-0 max-sm:top-0 max-sm:-mt-1.5 max-sm:-mr-2 max-sm:px-2" onClick={() => window.print()}>
      {/* TODO: swap for the DS icon when the design system gets a download/arrow-down glyph */}
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 4v12m0 0l-5-5m5 5l5-5M5 20h14" />
      </svg>
      {/* Phone: icon only; the text stays for screen readers. */}
      <span className="max-sm:sr-only">{label}</span>
    </Button>
  );
}
