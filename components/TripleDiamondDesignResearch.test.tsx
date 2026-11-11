import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripleDiamondRoles } from "./TripleDiamondRoles";
import { ROADMAP, TD_DR_GUIDE, TD_DR_META } from "@/lib/triple-diamond-design-research";
import { metadata } from "@/app/cases/ai-design-research-057dc529ef/page";

beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

const { roles, phases, levels, process } = TD_DR_GUIDE;
const subs = phases.flatMap((p) => p.subs);
// Reading order: phase, sub-phase, role, activity.
const all = subs.flatMap((s) => roles.flatMap((r) => (s.acts[r.id] ?? []).map((a) => ({ s, r, a }))));
const byTitle = new Map(all.map((x, i) => [x.a.title, { ...x, i }]));
const first = all[0].a;

const page = () => render(<TripleDiamondRoles {...TD_DR_META} guide={TD_DR_GUIDE} />);

describe("unlisted design and research copy", () => {
  it("has only Researcher and Designer, with three distinct activities in each of the client's seven phases", () => {
    expect(roles.map((r) => r.id)).toEqual(["res", "design"]);
    expect(subs.map((s) => s.tag)).toEqual(["Fas 1", "Fas 2", "Fas 3", "Fas 4", "Fas 5", "Fas 6", "Fas 7"]);
    expect(phases.map((p) => p.subs.length)).toEqual([2, 2, 3]);
    for (const s of subs)
      for (const r of roles) {
        const acts = s.acts[r.id] ?? [];
        expect(acts, `${s.name} / ${r.name}`).toHaveLength(3);
        expect(new Set(acts.map((a) => a.title)).size, `${s.name} / ${r.name}`).toBe(3);
      }
  });

  it("every activity is short, has a level, and has no dashes as punctuation", () => {
    for (const { s, r, a } of all) {
      expect(a.title.length, `${s.name} / ${r.name}: ${a.title}`).toBeLessThanOrEqual(42);
      expect(levels.map((l) => l.id)).toContain(a.level);
      expect(a.how && a.example, a.title).toBeTruthy();
      expect(`${a.title} ${a.how} ${a.example}`, a.title).not.toMatch(/[—–]/);
    }
    for (const s of process!.steps) expect(`${s.name} ${s.description}`).not.toMatch(/[—–]/);
  });

  it("each diamond has its goal, and no activity relies on Figma Make", () => {
    for (const p of phases) expect(p.goal, p.name).toBeTruthy();
    for (const { a } of all) expect(`${a.title} ${a.how} ${a.example}`).not.toMatch(/Figma Make(?! är avstängt)/);
  });
});

describe("three steps through the process", () => {
  it("every activity is in the roadmap and has a step, and every roadmap entry is an activity", () => {
    expect(Object.keys(ROADMAP).sort()).toEqual([...byTitle.keys()].sort());
    for (const { a } of all) expect([1, 2, 3], a.title).toContain(a.step);
  });

  it("every phase has something to start with in step 1", () => {
    for (const s of subs) expect(roles.some((r) => (s.acts[r.id] ?? []).some((a) => a.step === 1)), s.name).toBe(true);
  });

  it("an activity only builds on an earlier step, or the same step earlier in the process", () => {
    for (const x of all)
      for (const t of x.a.after ?? []) {
        const dep = byTitle.get(t);
        expect(dep, `${x.a.title} builds on unknown "${t}"`).toBeDefined();
        const ok = dep!.a.step! < x.a.step! || (dep!.a.step === x.a.step && dep!.i < byTitle.get(x.a.title)!.i);
        expect(ok, `${x.a.title} (step ${x.a.step}) after ${t} (step ${dep!.a.step})`).toBe(true);
      }
  });
});

describe("the process diagram with the activities", () => {
  it("renders in Swedish: Discovery and Delivery, the three diamonds, the seven phases, the milestones and the goals", () => {
    const { container } = page();
    expect(container.querySelector("section")).toHaveAttribute("lang", "sv");
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText("Discovery")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(phases.map((p) => p.name));
    const fas = screen.getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    subs.forEach((s) => expect(fas).toContain(`${s.tag}${s.name}`));
    for (const m of process!.milestones) expect(screen.getByText(m)).toBeInTheDocument();
    for (const p of phases) expect(screen.getByText(p.goal!)).toBeInTheDocument();
  });

  it("puts every activity under its phase and step", () => {
    page();
    expect(screen.getByText(`Visar ${all.length} av ${all.length} aktiviteter`)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(all.length);
    for (const s of subs)
      for (const st of process!.steps) {
        const titles = roles.flatMap((r) => (s.acts[r.id] ?? []).filter((a) => a.step === st.id).map((a) => a.title));
        const list = screen.queryByRole("list", { name: `${s.tag} · ${s.name}, Steg ${st.id}` });
        if (titles.length === 0) expect(list).toBeNull();
        else expect(within(list!).getAllByRole("listitem").map((li) => li.textContent)).toEqual(titles.map((t) => expect.stringContaining(t)));
      }
  });

  it("explains the three steps and the assignment sizes", () => {
    page();
    for (const s of process!.steps) expect(screen.getByText(s.description)).toBeInTheDocument();
    for (const z of process!.sizes!) expect(screen.getByText(z.name, { exact: false })).toBeInTheDocument();
  });

  it("filters by role and level", async () => {
    page();
    await userEvent.click(screen.getByRole("button", { name: "Researcher" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(all.filter((x) => x.r.id === "design").length);
    await userEvent.click(screen.getByRole("button", { name: "Visa alla roller" }));
    await userEvent.click(screen.getByRole("button", { name: "Avancerad" }));
    await userEvent.click(screen.getByRole("button", { name: "Medel" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(all.filter((x) => x.a.level === "easy").length);
  });

  it("opens the details with the step and what it builds on", async () => {
    page();
    const x = all.find((y) => (y.a.after ?? []).length > 0)!;
    await userEvent.click(screen.getByRole("button", { name: new RegExp(x.a.title) }));
    const dialog = screen.getByRole("dialog", { name: x.a.title });
    expect(dialog).toHaveTextContent("Så arbetar ni med den");
    expect(dialog).toHaveTextContent(`Steg ${x.a.step}`);
    expect(dialog).toHaveTextContent(`${x.s.tag} · ${x.s.name}`);
    expect(within(dialog).getByRole("heading", { name: "Bygger på" })).toBeInTheDocument();
    for (const t of x.a.after!) expect(dialog).toHaveTextContent(t);
    await userEvent.click(within(dialog).getByRole("button", { name: "Stäng" }));
    expect(screen.queryByText(first.how)).not.toBeInTheDocument();
  });

  it("is kept out of search engines", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });

  it("has no functions in the guide (React can't send them from a server page to a client component)", () => {
    const fns: string[] = [];
    const walk = (v: unknown, path: string) => {
      if (typeof v === "function") fns.push(path);
      else if (v && typeof v === "object") for (const [k, y] of Object.entries(v)) walk(y, `${path}.${k}`);
    };
    walk(TD_DR_GUIDE, "guide");
    expect(fns).toEqual([]);
  });
});
