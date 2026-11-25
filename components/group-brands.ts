export interface Brand {
  avatar: string;
  name: string;
  bubble: string;
  body: string;
  highlight: string;
}

// Each company's own brand, worn by its chat answers and People cards:
// SeventyOne's cream, teal and serif; Manfred's blue; Mather's monochrome.
// `highlight` marks the few words an answer emphasises.
export const BRANDS: Record<string, Brand> = {
  "seventyone-consulting": {
    avatar: "bg-[var(--color-s71-cream)] ring-1 ring-[var(--color-s71-teal)]",
    name: "font-[family-name:var(--font-s71-heading)] text-[var(--color-s71-teal-dark)] text-lg",
    bubble: "bg-[var(--color-s71-cream)] text-[var(--color-s71-ink)] border-l-4 border-[var(--color-s71-teal)]",
    body: "font-[family-name:var(--font-s71-body)] font-light",
    highlight: "bg-[var(--color-s71-teal-dark)] text-[var(--color-s71-cream)] font-[family-name:var(--font-s71-heading)] italic font-normal",
  },
  "studio-manfred": {
    avatar: "cursor-white bg-[var(--color-business-blue)]",
    name: "font-extrabold tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)] text-lg",
    bubble: "cursor-white bg-[var(--color-business-blue)] text-white",
    body: "font-light",
    highlight: "bg-white text-[var(--color-business-blue)] font-bold",
  },
  "mather-studio": {
    avatar: "bg-[var(--color-mather-ink)] text-[var(--color-mather-paper)]",
    name: "font-[family-name:var(--font-mather-heading)] [font-stretch:125%] font-bold uppercase tracking-wide text-[var(--color-mather-ink)] text-sm",
    bubble: "bg-[var(--color-mather-ink)] text-[var(--color-mather-paper)]",
    body: "font-[family-name:var(--font-mather-body)]",
    highlight: "bg-[var(--color-mather-paper)] text-[var(--color-mather-ink)] font-[family-name:var(--font-mather-heading)] [font-stretch:125%] font-bold uppercase text-[0.9em]",
  },
};
