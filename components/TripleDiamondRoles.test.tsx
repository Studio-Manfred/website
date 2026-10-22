import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripleDiamondRoles } from "./TripleDiamondRoles";
import { PHASES, ROLES } from "@/lib/triple-diamond";

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

const total = PHASES.reduce((n, p) => n + p.subs.length, 0) * ROLES.length;
const first = PHASES[0].subs[0].acts.res;

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
    const perRole = total / ROLES.length;
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
    const list = screen.getAllByRole("list")[0];
    expect(within(list).getAllByRole("listitem")[0]).toHaveTextContent("Researcher");
  });
});

describe("UX / Product Designer role (STU-1170)", () => {
  it("is a role with an activity in every sub-phase", () => {
    render(<TripleDiamondRoles />);
    expect(screen.getByRole("button", { name: "UX / Product Designer" })).toHaveAttribute("aria-pressed", "true");
    for (const p of PHASES) for (const s of p.subs) expect(s.acts.design.title.trim()).toBeTruthy();
  });
});

describe("activity details in a modal (STU-1171)", () => {
  it("every activity has a title, how, tools and an example, with no dashes as punctuation", () => {
    for (const p of PHASES)
      for (const s of p.subs)
        for (const r of ROLES) {
          const a = s.acts[r.id];
          expect(a.title && a.how && a.example, `${s.name} / ${r.name}`).toBeTruthy();
          expect(a.tools.length, `${s.name} / ${r.name}`).toBeGreaterThan(0);
          expect(`${a.title} ${a.how} ${a.example}`).not.toMatch(/[—–]/);
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
