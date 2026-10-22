import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TripleDiamondRoles } from "./TripleDiamondRoles";
import { PHASES, ROLES } from "@/lib/triple-diamond";

const total = PHASES.reduce((n, p) => n + p.subs.length, 0) * ROLES.length;

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
    expect(screen.queryByText(PHASES[0].subs[0].acts.res)).not.toBeInTheDocument();
  });

  it("Clear shows the empty message, Show all roles brings everything back", async () => {
    render(<TripleDiamondRoles />);
    await userEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(screen.getByText(/No roles selected/)).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    await userEvent.click(screen.getByRole("button", { name: "Show all roles" }));
    expect(screen.getAllByRole("listitem")).toHaveLength(total);
    const first = screen.getAllByRole("list")[0];
    expect(within(first).getAllByRole("listitem")[0]).toHaveTextContent("Researcher");
  });
});

describe("UX / Product Designer role (STU-1170)", () => {
  it("is a role with an activity in every sub-phase", async () => {
    render(<TripleDiamondRoles />);
    expect(screen.getByRole("button", { name: "UX / Product Designer" })).toHaveAttribute("aria-pressed", "true");
    for (const p of PHASES) for (const s of p.subs) expect(s.acts.design?.trim()).toBeTruthy();
  });
});
