import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripleDiamondRoles } from "./TripleDiamondRoles";
import { TD_DR_GUIDE, TD_DR_META, TD_DR_SLUG } from "@/lib/triple-diamond-design-research";
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

const { roles, phases, levels } = TD_DR_GUIDE;
const subs = phases.flatMap((p) => p.subs);
const all = subs.flatMap((s) => roles.flatMap((r) => (s.acts[r.id] ?? []).map((a) => ({ s, r, a }))));
const first = all[0].a;

const page = () => render(<TripleDiamondRoles {...TD_DR_META} guide={TD_DR_GUIDE} />);

describe("unlisted design and research copy", () => {
  it("has only Researcher and Designer, with three distinct activities in each of the seven phases", () => {
    expect(roles.map((r) => r.id)).toEqual(["res", "design"]);
    expect(subs).toHaveLength(7);
    subs.forEach((s, i) => expect(s.name).toContain(`(Fas\u00a0${i + 1})`));
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
  });

  it("each diamond has its goal, and no activity relies on Figma Make", () => {
    for (const p of phases) expect(p.goal, p.name).toBeTruthy();
    for (const { a } of all) expect(`${a.title} ${a.how} ${a.example}`).not.toMatch(/Figma Make(?! är avstängt)/);
  });

  it("renders in Swedish with the process picture, the goals and every activity", () => {
    const { container } = page();
    expect(container.querySelector("section")).toHaveAttribute("lang", "sv");
    expect(screen.getByRole("img", { name: /Digitals arbetsprocess/ })).toHaveAttribute("src", `/cases/${TD_DR_SLUG}/triple-diamond.png`);
    for (const p of phases) expect(screen.getByText(p.goal!)).toBeInTheDocument();
    expect(screen.getByText(`Visar ${all.length} av ${all.length} aktiviteter`)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(all.length);
    expect(screen.queryByRole("button", { name: "Dev" })).not.toBeInTheDocument();
  });

  it("filters and opens the details in Swedish", async () => {
    page();
    await userEvent.click(screen.getByRole("button", { name: "Researcher" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(all.filter((x) => x.r.id === "design").length);
    await userEvent.click(screen.getByRole("button", { name: "Visa alla roller" }));
    await userEvent.click(screen.getByRole("button", { name: new RegExp(first.title) }));
    const dialog = screen.getByRole("dialog", { name: first.title });
    expect(dialog).toHaveTextContent("Så arbetar ni med den");
    expect(dialog).toHaveTextContent(first.example);
    await userEvent.click(within(dialog).getByRole("button", { name: "Stäng" }));
    expect(screen.queryByText(first.how)).not.toBeInTheDocument();
  });

  it("is kept out of search engines", () => {
    expect(metadata.robots).toEqual({ index: false, follow: false });
  });
});

describe("guide can be passed from a server page", () => {
  it("has no functions in it (React can't send them to a client component)", () => {
    const fns: string[] = [];
    const walk = (v: unknown, path: string) => {
      if (typeof v === "function") fns.push(path);
      else if (v && typeof v === "object") for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`);
    };
    walk(TD_DR_GUIDE, "guide");
    expect(fns).toEqual([]);
  });
});
