// The intranet's CV generator starts a CV with the consultant's name, their
// role and a `---` line. The page already shows the name (heading + Consultant
// box), so this takes that header off the text and hands the role back to be
// shown under the name in the Consultant box. Mirrors splitCvHeader in the
// intranet (src/lib/cv-header.ts), which does the same for the PDF. Works on
// sanitized HTML (see sanitizeCvHtml), so it can use plain string matching.

const MAX_ROLE_LENGTH = 80;
const RULE = /^[-–—_*]{3,}$/;
const BLOCK = /^\s*<(h[1-3]|p)>([\s\S]*?)<\/\1>/i;

const textOf = (html: string) =>
  html
    .replace(/<[^>]*>/g, "")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

export function splitCvHeader(html: string, name: string): { role: string; html: string } {
  const unchanged = { role: "", html };
  const wanted = name.replace(/\s+/g, " ").trim().toLowerCase();
  if (!wanted) return unchanged;

  let rest = html;
  let role = "";
  let state: "name" | "role" | "rule" | "done" = "name";

  while (state !== "done") {
    const m = BLOCK.exec(rest);
    if (!m) break;
    const parts = m[2].split(/<br\s*\/?>/i);
    let used = 0;
    for (const part of parts) {
      const text = textOf(part);
      if (state === "name") {
        if (text.toLowerCase() !== wanted) break;
        state = "role";
      } else if (RULE.test(text)) {
        state = "done";
      } else if (state === "role" && text && text.length <= MAX_ROLE_LENGTH) {
        role = text;
        state = "rule";
      } else {
        state = "done";
        break;
      }
      used++;
      if (state === "done") break;
    }
    if (used === 0) break;
    if (used === parts.length) {
      rest = rest.slice(m[0].length);
    } else {
      rest = `<${m[1]}>${parts.slice(used).join("<br />")}</${m[1]}>` + rest.slice(m[0].length);
      break;
    }
  }

  if (state === "name") return unchanged;
  return { role, html: rest.trimStart() };
}
