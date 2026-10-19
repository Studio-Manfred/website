import { supabase } from "./supabase";

// Case pages from the intranet's Case CMS (STU-1143). Rows live in the
// intranet Supabase `cases` table; RLS lets the anon key read published rows
// only. Blocks and sidebar are JSON in the shapes of the intranet's
// src/lib/case-model.ts — change both repos together. Unknown block types are
// skipped, so an intranet that ships a new block first never breaks a page.

export type ProcessStep = { title: string; methods: string[]; description: string };
export type CaseImage = { src: string; alt: string; label: string; note: string; showNote: boolean };

export type CaseBlock =
  | { id: string; type: "brief"; heading: string; text: string; bullets: string[] }
  | { id: string; type: "process"; heading: string; steps: ProcessStep[]; stakeholders: string[] }
  | { id: string; type: "deliverables"; heading: string; text: string; bullets: string[]; images: CaseImage[] }
  | { id: string; type: "outcomes"; heading: string; items: { heading: string; text: string }[] };

export type Consultant = { name: string; title: string; photoUrl: string };
export type FactBox = { label: string; items: string[] };

export type CaseStudy = {
  slug: string;
  title: string;
  categoryLine: string;
  intro: string;
  blocks: CaseBlock[];
  sidebar: { consultants: Consultant[]; facts: FactBox[] };
};

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => !!v && typeof v === "object" && !Array.isArray(v);
const str = (v: unknown) => (typeof v === "string" ? v : "");
const strings = (v: unknown) => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
const objects = (v: unknown) => (Array.isArray(v) ? v.filter(isObj) : []);

function parseBlock(r: Obj, index: number): CaseBlock | null {
  const id = str(r.id) || `block-${index}`;
  const heading = str(r.heading);
  switch (r.type) {
    case "brief":
      return { id, type: "brief", heading, text: str(r.text), bullets: strings(r.bullets) };
    case "process":
      return {
        id,
        type: "process",
        heading,
        steps: objects(r.steps).map((s) => ({ title: str(s.title), methods: strings(s.methods), description: str(s.description) })),
        stakeholders: strings(r.stakeholders),
      };
    case "deliverables":
      return {
        id,
        type: "deliverables",
        heading,
        text: str(r.text),
        bullets: strings(r.bullets),
        images: objects(r.images)
          .map((i) => ({ src: str(i.src), alt: str(i.alt), label: str(i.label), note: str(i.note), showNote: i.show_note === true }))
          .filter((i) => i.src),
      };
    case "outcomes":
      return { id, type: "outcomes", heading, items: objects(r.items).map((i) => ({ heading: str(i.heading), text: str(i.text) })) };
    default:
      return null;
  }
}

export function parseCase(row: Obj): CaseStudy {
  const sidebar = isObj(row.sidebar) ? row.sidebar : {};
  return {
    slug: str(row.slug),
    title: str(row.title),
    categoryLine: str(row.category_line),
    intro: str(row.intro),
    blocks: objects(row.blocks)
      .map(parseBlock)
      .filter((b): b is CaseBlock => b !== null),
    sidebar: {
      consultants: objects(sidebar.consultants).map((c) => ({ name: str(c.name), title: str(c.title), photoUrl: str(c.photo_url) })),
      facts: objects(sidebar.facts).map((f) => ({ label: str(f.label), items: strings(f.items) })),
    },
  };
}

/** A published case by slug, or null (unknown, draft, or the read failed). */
export async function getCase(slug: string): Promise<CaseStudy | null> {
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .limit(1);
  if (error) console.error(`getCase(${slug}):`, error.message);
  if (error || !data?.length) return null;
  return parseCase(data[0]);
}

export type CaseSummary = Pick<CaseStudy, "slug" | "title" | "categoryLine"> & { consultants: Consultant[] };

/** Published cases for the /cases overview, newest first (STU-1148). */
export async function listCases(): Promise<CaseSummary[]> {
  const { data, error } = await supabase
    .from("cases")
    .select("slug, title, category_line, sidebar")
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (error) {
    console.error("listCases:", error.message);
    return [];
  }
  return (data ?? []).map((row) => {
    const c = parseCase(row);
    return { slug: c.slug, title: c.title, categoryLine: c.categoryLine, consultants: c.sidebar.consultants };
  });
}
