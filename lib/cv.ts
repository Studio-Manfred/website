import sanitizeHtml from "sanitize-html";
import { supabase } from "./supabase";

// Shared CVs from the intranet (STU-1155). A CV is private until its owner
// shares it; the link carries an unguessable token, and the only way in is
// the intranet Supabase function get_shared_cv(token), which returns that
// one CV's display fields. The CV text is HTML written in the intranet, so it
// is sanitized here before it reaches a public page.

export type SharedCv = {
  title: string;
  language: "en" | "sv";
  contentHtml: string;
  name: string;
  email: string;
  avatarUrl: string;
  cases: { title: string; slug: string }[];
};

const TOKEN = /^[A-Za-z0-9_-]{32,128}$/;

export const isShareToken = (token: string) => TOKEN.test(token);

/** What a CV may contain: headings, text, lists, emphasis and http(s) links. */
export function sanitizeCvHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ["h1", "h2", "h3", "h4", "p", "br", "ul", "ol", "li", "strong", "b", "em", "i", "a", "blockquote"],
    allowedAttributes: { a: ["href", "target", "rel"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName,
        attribs: { ...attribs, target: "_blank", rel: "noopener noreferrer" },
      }),
    },
  });
}

type Obj = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");

export async function getSharedCv(token: string): Promise<SharedCv | null> {
  if (!isShareToken(token)) return null;
  const { data, error } = await supabase.rpc("get_shared_cv", { p_token: token });
  if (error) console.error("getSharedCv:", error.message);
  if (error || !data || typeof data !== "object") return null;
  const row = data as Obj;
  const avatar = str(row.avatar_url);
  return {
    title: str(row.title),
    language: row.language === "sv" ? "sv" : "en",
    contentHtml: sanitizeCvHtml(str(row.content)),
    name: str(row.name),
    email: str(row.email),
    avatarUrl: avatar.startsWith("https://") ? avatar : "",
    cases: (Array.isArray(row.cases) ? row.cases : [])
      .filter((c): c is Obj => !!c && typeof c === "object")
      .map((c) => ({ title: str(c.title), slug: str(c.slug) }))
      .filter((c) => c.title && /^[a-z0-9-]+$/.test(c.slug)),
  };
}
