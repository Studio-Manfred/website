import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerJourney } from "./CustomerJourney";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { MATRIX_ROWS } from "@/lib/customer-journey/matrix";
import { CJ_CASE_DEFAULTS } from "@/lib/customer-journey/case";

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

const finance = INDUSTRIES.finance;
const openFilters = () => userEvent.click(screen.getByRole("button", { name: /^Filter/ }));
const filterPanel = () => screen.getByRole("region", { name: "Filter" });

describe("CustomerJourney", () => {
  it("one h1 with the case defaults, and the finance journey to start with", () => {
    render(<CustomerJourney />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual([CJ_CASE_DEFAULTS.title]);
    expect(screen.getByRole("heading", { level: 2, name: `Kundens resa med ${finance.name}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Finance|Storbank/, pressed: true })).toBeInTheDocument();
    for (const p of finance.phases) expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
  });

  it("switching industry shows its phases and resets the filters", async () => {
    render(<CustomerJourney />);
    await openFilters();
    await userEvent.selectOptions(within(filterPanel()).getByLabelText("Segment"), "premium");
    expect(screen.getByRole("list", { name: "Aktiva filter" })).toHaveTextContent("Private / Premium");

    const grocery = INDUSTRIES.grocery;
    await userEvent.click(screen.getByRole("button", { name: new RegExp(grocery.name) }));
    expect(screen.getByRole("heading", { level: 2, name: `Kundens resa med ${grocery.name}` })).toBeInTheDocument();
    expect(screen.getAllByText(grocery.phases[0].name).length).toBeGreaterThan(0);
    expect(screen.queryByRole("list", { name: "Aktiva filter" })).not.toBeInTheDocument();
    expect(screen.getByText("Inga filter valda")).toBeInTheDocument();
  });

  it("the filter panel opens from the top, shows chips, and closes on Esc", async () => {
    render(<CustomerJourney />);
    const toggle = screen.getByRole("button", { name: /^Filter/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("region", { name: "Filter" })).not.toBeInTheDocument();

    await openFilters();
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "PM" }));
    const p = finance.personas[1];
    await userEvent.click(within(filterPanel()).getByRole("button", { name: new RegExp(p.name) }));

    const chips = screen.getByRole("list", { name: "Aktiva filter" });
    expect(within(chips).getAllByRole("listitem")).toHaveLength(2);
    expect(toggle).toHaveAccessibleName(/aktiva: 2/);

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("region", { name: "Filter" })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("a chip's remove button clears just that filter, Återställ clears all", async () => {
    render(<CustomerJourney />);
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "CX" }));
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Jämför alla" }));
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Klar" }));

    await userEvent.click(screen.getByRole("button", { name: "Ta bort filtret Vy" }));
    const chips = screen.getByRole("list", { name: "Aktiva filter" });
    expect(chips).toHaveTextContent("Jämför alla");
    expect(chips).not.toHaveTextContent("CX");

    await userEvent.click(screen.getByRole("button", { name: "Återställ" }));
    expect(screen.getByText("Inga filter valda")).toBeInTheDocument();
  });

  it("a persona shows its strip and its moments in the gap chart", async () => {
    render(<CustomerJourney />);
    const p = finance.personas[0];
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: new RegExp(p.name) }));
    expect(screen.getByText(p.desc)).toBeInTheDocument();
    for (const m of p.moments) expect(screen.getByRole("button", { name: `${p.name}, ${finance.phases[m.phase].name}: ${m.insight}` })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Rensa persona" }));
    expect(screen.queryByText(p.desc)).not.toBeInTheDocument();
  });

  it("the role filter limits the matrix rows", async () => {
    render(<CustomerJourney />);
    expect(screen.getByText("Förmågor")).toBeInTheDocument();
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Designer" }));
    expect(screen.queryByText("Förmågor")).not.toBeInTheDocument();
    const designerRows = MATRIX_ROWS.filter((r) => r.roles.includes("designer"));
    for (const r of designerRows) expect(screen.getByText(r.name)).toBeInTheDocument();
  });

  it("a matrix group folds away", async () => {
    render(<CustomerJourney />);
    const group = screen.getByRole("button", { name: /Internal Services/ });
    expect(group).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(group);
    expect(group).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Förmågor")).not.toBeInTheDocument();
  });

  it("choosing a phase in the gap chart lists only its opportunities", async () => {
    render(<CustomerJourney />);
    const phaseGroup = screen.getByRole("group", { name: "Visa möjligheter för en fas" });
    await userEvent.click(within(phaseGroup).getByRole("button", { name: /Bankbehov/ }));
    expect(screen.getByText("Inga möjligheter i den här fasen.")).toBeInTheDocument();
    const kyc = finance.opportunities.find((o) => o.name === "KYC-process")!;
    await userEvent.click(within(phaseGroup).getByRole("button", { name: new RegExp(finance.phases[kyc.phase].name) }));
    const items = screen.getAllByRole("button", { name: /Reward/ });
    expect(items.every((b) => b.textContent?.includes(finance.phases[kyc.phase].name))).toBe(true);
    const item = items.find((b) => b.textContent?.includes("KYC-process"))!;
    await userEvent.click(item);
    expect(item).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(kyc.desc)).toBeInTheDocument();
  });

  it("touchpoints open below the emotion cards", async () => {
    render(<CustomerJourney />);
    const first = finance.touchpoints[0][0].name;
    expect(screen.queryByText(first)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Touchpoints" }));
    expect(screen.getByText(first)).toBeInTheDocument();
  });

  it("a matrix cell opens its details", async () => {
    render(<CustomerJourney />);
    const row = MATRIX_ROWS.find((r) => r.id === "mindset")!;
    const c = row.cells[0]!;
    await userEvent.click(screen.getByRole("button", { name: new RegExp(c.headline!) }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: c.headline })).toBeInTheDocument();
    expect(within(dialog).getByText(`Fas 1 · ${finance.phases[0].name}`)).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Stäng" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Insights opens the prioritised focus areas for the segment", async () => {
    render(<CustomerJourney />);
    await userEvent.click(screen.getByRole("button", { name: "Insights" }));
    const dialog = screen.getByRole("dialog", { name: "Insights & prioritering" });
    expect(within(dialog).getByText(`${finance.name} · Alla kunder · Alla`)).toBeInTheDocument();
    expect(within(dialog).getAllByRole("listitem").length).toBeGreaterThan(1);
  });
});
