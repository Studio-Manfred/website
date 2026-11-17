import { parseDocument } from "htmlparser2";
import { findAll, findOne, getAttributeValue, textContent } from "domutils";
import { isTag, isText, type Element } from "domhandler";
import type { Finding, ModelFinding } from "./findings";
import { TRAITS } from "./traits";

// Plain checks on the page's HTML that need no model: the WCAG basics a
// screen reader, zoom or keyboard user trips over first. They cover only a
// part of accessibility (no contrast, focus order or behaviour), so the
// report says so. Each problem goes to the archetypes whose access needs it
// hits; when none of the chosen ones has such a need, to all of them, since
// real customers do.

type Check = Omit<ModelFinding, "archetypes" | "phase" | "quotes"> & { needs: RegExp };

const el = (n: Element, name: string) => n.name === name;
const attr = (n: Element, name: string) => getAttributeValue(n, name)?.trim() ?? "";
const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

function accessibleName(n: Element, byId: Map<string, Element>): string {
  const labelledby = attr(n, "aria-labelledby");
  const fromIds = labelledby
    .split(/\s+/)
    .map((id) => byId.get(id))
    .filter(Boolean)
    .map((e) => textContent(e!).trim())
    .join(" ");
  const imgAlts = findAll((c) => el(c, "img"), n.children).map((i) => attr(i, "alt")).join(" ");
  return [attr(n, "aria-label"), fromIds, textContent(n).trim(), imgAlts, attr(n, "title")].join(" ").trim();
}

export function runChecks(html: string): Check[] {
  const doc = parseDocument(html, { lowerCaseTags: true, lowerCaseAttributeNames: true });
  const all = findAll(() => true, doc.children);
  const byId = new Map(all.filter((n) => attr(n, "id")).map((n) => [attr(n, "id"), n]));
  const out: Check[] = [];
  const base = { heuristic: null, kind: "accessibility" as const };

  const htmlEl = findOne((n) => el(n, "html"), doc.children);
  if (!htmlEl || !attr(htmlEl, "lang")) {
    out.push({ ...base, needs: /screen reader|low vision/i, title: "The page doesn't say its language", severity: "medium", effort: "small", where: "<html> element", problem: "Without a lang attribute, screen readers read the text with the wrong voice and pronunciation.", suggestion: 'Add lang to the html element, e.g. <html lang="sv">.', wcag: "3.1.1" });
  }

  const title = findOne((n) => el(n, "title"), doc.children);
  if (!title || !textContent(title).trim()) {
    out.push({ ...base, needs: /screen reader|interrupted/i, title: "The page has no title", severity: "low", effort: "small", where: "<head>", problem: "The browser tab and screen readers have no name for the page, so it is hard to find again among tabs.", suggestion: "Give every page a unique, descriptive <title>.", wcag: "2.4.2" });
  }

  const viewport = findOne((n) => el(n, "meta") && attr(n, "name").toLowerCase() === "viewport", doc.children);
  const vp = viewport ? attr(viewport, "content").toLowerCase().replace(/\s/g, "") : "";
  const maxScale = Number(vp.match(/maximum-scale=([\d.]+)/)?.[1] ?? "10");
  if (vp.includes("user-scalable=no") || vp.includes("user-scalable=0") || maxScale < 2) {
    out.push({ ...base, needs: /low vision|glasses|zoom/i, title: "Zooming is blocked on phones", severity: "high", effort: "small", where: "<meta name=\"viewport\">", problem: "The viewport stops people from pinching to zoom, so small text stays small for anyone who needs it bigger.", suggestion: "Remove user-scalable=no and maximum-scale from the viewport meta tag.", wcag: "1.4.4" });
  }

  const imgs = findAll((n) => el(n, "img") && getAttributeValue(n, "alt") === undefined && attr(n, "role") !== "presentation" && attr(n, "aria-hidden") !== "true", doc.children);
  if (imgs.length) {
    out.push({ ...base, needs: /screen reader|low vision/i, title: "Images without alt text", severity: imgs.length > 3 ? "high" : "medium", effort: "small", where: plural(imgs.length, "image", "images"), problem: `${plural(imgs.length, "image has", "images have")} no alt attribute, so a screen reader reads the file name or nothing at all.`, suggestion: 'Describe meaningful images in alt; give decorative ones alt="".', wcag: "1.1.1" });
  }

  const labelFor = new Set(findAll((n) => el(n, "label"), doc.children).map((l) => attr(l, "for")).filter(Boolean));
  const fields = findAll((n) => {
    if (!["input", "select", "textarea"].includes(n.name)) return false;
    const type = attr(n, "type").toLowerCase();
    if (["hidden", "submit", "button", "reset", "image"].includes(type)) return false;
    if (attr(n, "aria-label") || attr(n, "aria-labelledby") || attr(n, "title")) return false;
    if (attr(n, "id") && labelFor.has(attr(n, "id"))) return false;
    let p = n.parent as Element | null;
    while (p && isTag(p)) {
      if (p.name === "label") return false;
      p = p.parent as Element | null;
    }
    return true;
  }, doc.children);
  if (fields.length) {
    out.push({ ...base, needs: /screen reader|low vision|interrupted|plain language/i, title: "Form fields without labels", severity: "high", effort: "small", where: plural(fields.length, "form field", "form fields"), problem: `${plural(fields.length, "field has", "fields have")} no label. A placeholder disappears when you type, and a screen reader can't say what to fill in.`, suggestion: "Give every field a visible <label> tied to it with for/id.", wcag: "1.3.1" });
  }

  const unnamed = findAll((n) => (el(n, "button") || (el(n, "a") && getAttributeValue(n, "href") !== undefined)) && !accessibleName(n, byId), doc.children);
  if (unnamed.length) {
    out.push({ ...base, needs: /screen reader/i, title: "Buttons or links with no name", severity: "high", effort: "small", where: plural(unnamed.length, "button or link", "buttons and links"), problem: `${plural(unnamed.length, "control has", "controls have")} no text a screen reader can read, often icon buttons. The user hears only "button" or "link".`, suggestion: "Add visible text or an aria-label that says what the control does.", wcag: "4.1.2" });
  }

  const headings = findAll((n) => /^h[1-6]$/.test(n.name), doc.children).map((h) => Number(h.name[1]));
  if (!headings.includes(1)) {
    out.push({ ...base, needs: /screen reader|dyslexia|plain language/i, title: "No main heading", severity: "low", effort: "small", where: "Headings", problem: "The page has no h1, so it is harder to grasp what the page is about and to jump to its content.", suggestion: "Give the page one h1 that names its purpose.", wcag: "1.3.1" });
  }
  const skips = headings.filter((h, i) => i > 0 && h > headings[i - 1] + 1).length;
  if (skips) {
    out.push({ ...base, needs: /screen reader/i, title: "Heading levels skip", severity: "low", effort: "small", where: plural(skips, "heading", "headings"), problem: "Heading levels jump (for example h2 to h4), which makes the outline confusing for screen reader users.", suggestion: "Use heading levels in order, without gaps.", wcag: "1.3.1" });
  }

  const positiveTab = findAll((n) => Number(attr(n, "tabindex")) > 0, doc.children);
  if (positiveTab.length) {
    out.push({ ...base, needs: /screen reader|one-handed|keyboard/i, title: "Unusual tab order", severity: "medium", effort: "small", where: plural(positiveTab.length, "element", "elements"), problem: "A positive tabindex changes the keyboard order away from the visual order.", suggestion: "Remove positive tabindex values and order the HTML instead.", wcag: "2.4.3" });
  }

  const autoplay = findAll((n) => (el(n, "video") || el(n, "audio")) && getAttributeValue(n, "autoplay") !== undefined && getAttributeValue(n, "muted") === undefined, doc.children);
  if (autoplay.length) {
    out.push({ ...base, needs: /screen reader|dyslexia|interrupted/i, title: "Sound that plays by itself", severity: "medium", effort: "small", where: plural(autoplay.length, "media element", "media elements"), problem: "Media with sound starts on its own and talks over the screen reader.", suggestion: "Don't autoplay sound; start muted with visible controls.", wcag: "1.4.2" });
  }

  return out;
}

/** Checks as findings for the chosen archetypes, in the phase being evaluated. */
export function checkFindings(html: string, archetypes: string[], phase: number): Finding[] {
  return runChecks(html).map(({ needs, ...c }, i) => {
    const hit = archetypes.filter((id) => TRAITS[id]?.access.some((a) => needs.test(a)));
    return { ...c, id: `check-${i + 1}`, source: "check" as const, phase, archetypes: hit.length ? hit : archetypes, quotes: [] };
  });
}

/** What the model reads about the page: its title, outline and visible text, capped. */
export function pageDigest(html: string, maxChars = 40_000): { title: string; text: string } {
  const doc = parseDocument(html, { lowerCaseTags: true });
  const titleEl = findOne((n) => el(n, "title"), doc.children);
  const skip = new Set(["script", "style", "noscript", "svg", "template", "head"]);
  const lines: string[] = [];
  const walk = (nodes: typeof doc.children) => {
    for (const n of nodes) {
      if (isText(n)) {
        const t = n.data.replace(/\s+/g, " ").trim();
        if (t) lines.push(t);
      } else if (isTag(n) && !skip.has(n.name)) {
        const e = n;
        if (/^h[1-6]$/.test(e.name)) lines.push(`\n[${e.name}] ${textContent(e).replace(/\s+/g, " ").trim()}`);
        else if (e.name === "img") lines.push(`[image alt="${getAttributeValue(e, "alt") ?? "(missing)"}"]`);
        else if (["input", "select", "textarea"].includes(e.name)) lines.push(`[field ${attr(e, "type") || e.name} label="${attr(e, "aria-label") || attr(e, "placeholder") || attr(e, "name")}"]`);
        else if (e.name === "button") lines.push(`[button] ${textContent(e).replace(/\s+/g, " ").trim()}`);
        else walk(e.children);
      }
    }
  };
  walk(doc.children);
  const text = lines.join(" ").replace(/ \n/g, "\n");
  return { title: titleEl ? textContent(titleEl).trim() : "", text: text.length > maxChars ? text.slice(0, maxChars) + " …[cut]" : text };
}
