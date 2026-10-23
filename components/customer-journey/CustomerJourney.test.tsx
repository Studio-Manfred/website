import { beforeAll, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomerJourney } from "./CustomerJourney";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { MATRIX_ROWS } from "@/lib/customer-journey/matrix";
import { ROW_STEP } from "@/lib/customer-journey/levels";
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
const complexity = () => screen.getByRole("group", { name: "Complexity" });

describe("CustomerJourney", () => {
  it("one h1 with the case defaults, and the bank journey to start with", () => {
    render(<CustomerJourney />);
    expect(screen.getAllByRole("heading", { level: 1 }).map((h) => h.textContent)).toEqual([CJ_CASE_DEFAULTS.title]);
    expect(screen.getByRole("heading", { level: 2, name: `The customer journey at ${finance.name}` })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: new RegExp(finance.name), pressed: true })).toBeInTheDocument();
    for (const p of finance.phases) expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
  });

  it("is in English", () => {
    const { container } = render(<CustomerJourney />);
    expect(container.textContent).not.toMatch(/[åäöÅÄÖ]/);
    expect(container.querySelector("[lang]")).toBeNull();
  });

  it("switching industry shows its phases and resets the filters", async () => {
    render(<CustomerJourney />);
    await openFilters();
    await userEvent.selectOptions(within(filterPanel()).getByLabelText("Segment"), "premium");
    expect(screen.getByRole("list", { name: "Active filters" })).toHaveTextContent("Private / Premium");

    const grocery = INDUSTRIES.grocery;
    await userEvent.click(screen.getByRole("button", { name: new RegExp(grocery.name) }));
    expect(screen.getByRole("heading", { level: 2, name: `The customer journey at ${grocery.name}` })).toBeInTheDocument();
    expect(screen.getAllByText(grocery.phases[0].name).length).toBeGreaterThan(0);
    expect(screen.queryByRole("list", { name: "Active filters" })).not.toBeInTheDocument();
    expect(screen.getByText("No filters selected")).toBeInTheDocument();
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

    const chips = screen.getByRole("list", { name: "Active filters" });
    expect(within(chips).getAllByRole("listitem")).toHaveLength(2);
    expect(toggle).toHaveAccessibleName(/active: 2/);

    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("region", { name: "Filter" })).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it("a chip's remove button clears just that filter, Reset clears all", async () => {
    render(<CustomerJourney />);
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "CX" }));
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Compare all" }));
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Done" }));

    await userEvent.click(screen.getByRole("button", { name: "Remove the View filter" }));
    const chips = screen.getByRole("list", { name: "Active filters" });
    expect(chips).toHaveTextContent("Compare all");
    expect(chips).not.toHaveTextContent("CX");

    await userEvent.click(screen.getByRole("button", { name: "Reset" }));
    expect(screen.getByText("No filters selected")).toBeInTheDocument();
  });

  it("a persona shows its strip and its moments in the gap chart", async () => {
    render(<CustomerJourney />);
    const p = finance.personas[0];
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: new RegExp(p.name) }));
    expect(screen.getByText(p.desc)).toBeInTheDocument();
    for (const m of p.moments) expect(screen.getByRole("button", { name: `${p.name}, ${finance.phases[m.phase].name}: ${m.insight}` })).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Clear persona" }));
    expect(screen.queryByText(p.desc)).not.toBeInTheDocument();
  });

  it("the role filter limits the matrix rows", async () => {
    render(<CustomerJourney />);
    expect(screen.getByText("Capabilities")).toBeInTheDocument();
    await openFilters();
    await userEvent.click(within(filterPanel()).getByRole("button", { name: "Designer" }));
    expect(screen.queryByText("Capabilities")).not.toBeInTheDocument();
    for (const r of MATRIX_ROWS.filter((r) => r.roles.includes("designer"))) expect(screen.getByText(r.name)).toBeInTheDocument();
  });

  it("a matrix group folds away", async () => {
    render(<CustomerJourney />);
    const group = screen.getByRole("button", { name: /Internal Services/ });
    expect(group).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(group);
    expect(group).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("Capabilities")).not.toBeInTheDocument();
  });

  it("choosing a phase in the gap chart lists only its opportunities", async () => {
    render(<CustomerJourney />);
    const phaseGroup = screen.getByRole("group", { name: "Show opportunities for a phase" });
    await userEvent.click(within(phaseGroup).getByRole("button", { name: new RegExp(finance.phases[0].name) }));
    expect(screen.getByText("No opportunities in this phase.")).toBeInTheDocument();
    const kyc = finance.opportunities.find((o) => o.name === "KYC process")!;
    await userEvent.click(within(phaseGroup).getByRole("button", { name: new RegExp(finance.phases[kyc.phase].name) }));
    const items = screen.getAllByRole("button", { name: /Reward/ });
    expect(items.every((b) => b.textContent?.includes(finance.phases[kyc.phase].name))).toBe(true);
    const item = items.find((b) => b.textContent?.includes("KYC process"))!;
    await userEvent.click(item);
    expect(item).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText(kyc.desc)).toBeInTheDocument();
  });

  it("touchpoints open below the emotion cards", async () => {
    render(<CustomerJourney />);
    const first = finance.touchpoints[0][0].name;
    expect(screen.queryByText(first)).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /Touchpoints/ }));
    expect(screen.getByText(first)).toBeInTheDocument();
  });

  it("a matrix cell opens its details", async () => {
    render(<CustomerJourney />);
    const c = MATRIX_ROWS.find((r) => r.id === "mindset")!.cells[0]!;
    await userEvent.click(screen.getByRole("button", { name: new RegExp(c.headline!) }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: c.headline })).toBeInTheDocument();
    expect(within(dialog).getByText(`Phase 1 · ${finance.phases[0].name}`)).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("Insights opens the priority focus areas for the segment", async () => {
    render(<CustomerJourney />);
    await userEvent.click(screen.getByRole("button", { name: "Insights" }));
    const dialog = screen.getByRole("dialog", { name: "Insights & priorities" });
    expect(within(dialog).getByText(`${finance.name} · All customers · All`)).toBeInTheDocument();
    expect(within(dialog).getAllByRole("listitem").length).toBeGreaterThan(1);
  });

  it("the Analyse field takes a question and says the analysis is not on yet", async () => {
    render(<CustomerJourney />);
    const first = within(screen.getByRole("list", { name: "Example questions" })).getAllByRole("button")[0];
    expect(first).toHaveTextContent(finance.personas[1].name);
    await userEvent.click(first);
    expect(screen.getByRole("textbox", { name: "Analyse" })).toHaveValue(first.textContent);
    const status = screen.getAllByRole("status").find((s) => s.textContent?.includes("AI analysis"))!;
    expect(status).toHaveTextContent("AI analysis is not switched on yet");
    await userEvent.click(within(status).getByRole("button", { name: "Clear" }));
    expect(screen.queryAllByRole("status").some((s) => s.textContent?.includes("AI analysis"))).toBe(false);
  });
});

describe("complexity filter", () => {
  it("is always visible with all steps, and starts on All", () => {
    render(<CustomerJourney />);
    const g = complexity();
    expect(within(g).getAllByRole("button").map((b) => b.textContent)).toEqual(["All", "Step 1 · Easy", "Step 2 · Medium", "Step 3 · Advanced"]);
    expect(within(g).getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });

  it("a step shows only its own rows in the matrix", async () => {
    render(<CustomerJourney />);
    for (const step of [1, 2, 3] as const) {
      await userEvent.click(within(complexity()).getByRole("button", { name: new RegExp(`Step ${step}`) }));
      for (const r of MATRIX_ROWS) {
        const rowLabel = screen.queryAllByText(r.name, { selector: "p.font-extrabold" });
        expect(rowLabel.length > 0).toBe(ROW_STEP[r.id] === step);
      }
      expect(screen.getByText(`Showing step ${step}`)).toBeInTheDocument();
    }
  });

  it("step 1 keeps the emotion curve and touchpoints, and hides the gap analysis, AI and Insights", async () => {
    render(<CustomerJourney />);
    await userEvent.click(within(complexity()).getByRole("button", { name: /Step 1/ }));
    expect(screen.getByText("Emotion curve")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Touchpoints/ })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Gap/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Analyse" })).not.toBeInTheDocument();
    expect(screen.queryByText(/comes in step/)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Insights/ })).toBeDisabled();
  });

  it("step 2 shows the gap analysis but not the emotion curve, touchpoints or AI", async () => {
    render(<CustomerJourney />);
    await userEvent.click(within(complexity()).getByRole("button", { name: /Step 2/ }));
    expect(screen.getByRole("heading", { name: /Gap/ })).toBeInTheDocument();
    expect(screen.queryByText("Emotion curve")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Touchpoints/ })).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "Analyse" })).not.toBeInTheDocument();
    for (const p of finance.phases) expect(screen.getAllByText(p.name).length).toBeGreaterThan(0);
  });

  it("step 3 shows AI analysis and Insights but not the gap analysis", async () => {
    render(<CustomerJourney />);
    await userEvent.click(within(complexity()).getByRole("button", { name: /Step 3/ }));
    expect(screen.getByRole("textbox", { name: "Analyse" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Insights" })).toBeEnabled();
    expect(screen.queryByRole("heading", { name: /Gap/ })).not.toBeInTheDocument();
  });

  it("a roadmap card switches the step, and again switches back to All", async () => {
    render(<CustomerJourney />);
    const card = within(screen.getByRole("region", { name: /Roadmap/ })).getByRole("button", { name: /Map the journey/ });
    await userEvent.click(card);
    expect(within(complexity()).getByRole("button", { name: /Step 1/ })).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(card);
    expect(within(complexity()).getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "true");
  });
});
