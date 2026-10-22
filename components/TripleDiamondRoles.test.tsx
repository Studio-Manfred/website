import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripleDiamondRoles } from "./TripleDiamondRoles";
import { LEVELS, PHASES, ROLES } from "@/lib/triple-diamond";

// jsdom has no <dialog> methods; enough of them for open/close.
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement) {
    this.setAttribute("open", "");
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement) {
    this.removeAttribute("open");
    this.dispatchEvent(new Event("close"));
  };
});

const subs = PHASES.flatMap((p) => p.subs);
const all = subs.flatMap((s) => ROLES.flatMap((r) => s.acts[r.id].map((a) => ({ s, r, a }))));
const total = all.length;
const first = PHASES[0].subs[0].acts.res[0];

describe("TripleDiamondRoles (STU-1167)", () => {
  it("one h1, three phases, and every activity with all roles on", () => {
    render(<TripleDiamondRoles />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent)).toEqual(PHASES.map((p) => p.name));
    expect(screen.getByText(`Showing ${total} of ${total} activities`)).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(total);
  });

  it("switching a role off hides its activities", async () => {
    render(<TripleDiamondRoles />);
    const researcher = screen.getByRole("button", { name: "Researcher" });
    expect(researcher).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(researcher);
    expect(researcher).toHaveAttribute("aria-pressed", "false");
    const perRole = all.filter((x) => x.r.id === "res").length;
    expect(screen.getByText(`Showing ${total - perRole} of ${total} activities`)).toBeInTheDocument();
    expect(screen.queryByText(first.title)).not.toBeInTheDocument();
  });

  it("Clear shows the empty message, Show all roles brings everything back", async () => {
    render(<TripleDiamondRoles />);
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByText(/No roles selected/)).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    await userEvent.click(screen.getByRole("button", { name: "Show all roles" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(total);
    expect(screen.getAllByRole("list", { name: "Researcher" })[0]).toHaveTextContent(first.title);
  });
});

describe("UX / Product Designer role (STU-1170)", () => {
  it("is a role with activities in every sub-phase", () => {
    render(<TripleDiamondRoles />);
    expect(screen.getByRole("button", { name: "UX / Product Designer" })).toHaveAttribute("aria-pressed", "true");
    for (const s of subs) expect(s.acts.design.length).toBeGreaterThan(0);
  });
});

describe("activity details in a modal (STU-1171)", () => {
  it("every activity has a title, how, tools and an example, with no dashes as punctuation", () => {
    for (const { s, r, a } of all) {
      expect(a.title && a.how && a.example, `${s.name} / ${r.name}`).toBeTruthy();
      expect(a.tools.length, `${s.name} / ${r.name}`).toBeGreaterThan(0);
      expect(`${a.title} ${a.how} ${a.example}`, a.title).not.toMatch(/[—–]/);
    }
  });

  it("the overview shows only the title; clicking it opens the details, Close closes them", async () => {
    render(<TripleDiamondRoles />);
    expect(screen.queryByText(first.how)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: new RegExp(first.title) }));
    const dialog = screen.getByRole("dialog", { name: first.title });
    expect(dialog).toHaveTextContent(first.how);
    expect(dialog).toHaveTextContent(first.example);
    for (const t of first.tools) expect(within(dialog).getByText(t)).toBeInTheDocument();
    expect(dialog).toHaveTextContent("Researcher");
    expect(dialog).toHaveTextContent(PHASES[0].subs[0].name);
    await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByText(first.how)).not.toBeInTheDocument();
  });
});

describe("short titles and a difficulty level (STU-1172)", () => {
  it("every title is short, and every activity has a level", () => {
    for (const { s, r, a } of all) {
      expect(a.title.length, `${s.name} / ${r.name}: ${a.title}`).toBeLessThanOrEqual(42);
      expect(LEVELS.map((l) => l.id), `${s.name} / ${r.name}`).toContain(a.level);
    }
  });

  it("the overview shows each activity's level; the modal explains it", async () => {
    render(<TripleDiamondRoles />);
    const button = screen.getByRole("button", { name: new RegExp(first.title) });
    const level = LEVELS.find((l) => l.id === first.level)!;
    expect(button).toHaveTextContent(`Level: ${level.name}`);
    await userEvent.click(button);
    const dialog = screen.getByRole("dialog", { name: first.title });
    expect(dialog).toHaveTextContent(level.name);
    expect(dialog).toHaveTextContent(level.description);
  });

  it("explains the three levels on the page", () => {
    render(<TripleDiamondRoles />);
    for (const l of LEVELS) expect(screen.getAllByText(l.description).length).toBeGreaterThan(0);
  });
});

describe("a colour per phase (STU-1173)", () => {
  it("each phase sits on its own background, and the modal uses the phase's colour", async () => {
    render(<TripleDiamondRoles />);
    const bgs = PHASES.map((p) => screen.getByRole("heading", { level: 2, name: p.name }).closest("section")!.style.background);
    expect(bgs.every(Boolean)).toBe(true);
    expect(new Set(bgs).size).toBe(PHASES.length);
    await userEvent.click(screen.getByRole("button", { name: new RegExp(first.title) }));
    const dialog = screen.getByRole("dialog", { name: first.title });
    expect(dialog.querySelector("header")!.style.background).toBe(bgs[0]);
  });
});

describe("dashed lines connect the diamonds (STU-1174)", () => {
  it("one line between each pair of phases, across (desktop) and down (stacked), hidden from screen readers", () => {
    const { container } = render(<TripleDiamondRoles />);
    for (const dir of ["across", "down"]) {
      const lines = container.querySelectorAll(`[data-connector="${dir}"]`);
      expect(lines).toHaveLength(PHASES.length - 1);
      for (const l of lines) {
        expect(l).toHaveAttribute("aria-hidden", "true");
        expect(l.className).toContain("border-dashed");
      }
    }
  });
});

describe("three activities per role and sub-phase (STU-1175)", () => {
  it("every role has three activities in every sub-phase, with distinct titles", () => {
    expect(total).toBe(subs.length * ROLES.length * 3);
    for (const s of subs)
      for (const r of ROLES) {
        expect(s.acts[r.id], `${s.name} / ${r.name}`).toHaveLength(3);
        expect(new Set(s.acts[r.id].map((a) => a.title)).size, `${s.name} / ${r.name}`).toBe(3);
      }
  });

  it("groups each sub-phase's activities under the role, as a list named by the role", () => {
    render(<TripleDiamondRoles />);
    const lists = screen.getAllByRole("list", { name: "Researcher" });
    expect(lists).toHaveLength(subs.length);
    expect(within(lists[0]).getAllByRole("listitem")).toHaveLength(3);
  });
});
