import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EvaluationReport } from "./EvaluationReport";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import type { EvaluationResult, Finding } from "@/lib/evaluation/findings";
import { defaultAssumptions, rankFindings } from "@/lib/evaluation/score";

const hotel = INDUSTRIES.hotel;
const f = (over: Partial<Finding>): Finding => ({
  id: "x",
  source: "model",
  title: "Finding",
  kind: "usability",
  severity: "medium",
  effort: "medium",
  phase: 1,
  archetypes: ["family_planner"],
  where: "Room page",
  problem: "The problem.",
  suggestion: "The fix.",
  quotes: [],
  wcag: null,
  heuristic: null,
  ...over,
});
const findings = [
  f({ id: "a", title: "Room size unclear", severity: "high", effort: "small", quotes: [{ archetype: "family_planner", quote: "Will the cot fit?" }] }),
  f({ id: "b", title: "Images without alt text", kind: "accessibility", source: "check", severity: "medium", effort: "small", archetypes: ["business_traveller", "loyal_regular"], wcag: "1.1.1" }),
  f({ id: "c", title: "Slow checkout", severity: "critical", effort: "large", archetypes: ["business_traveller"] }),
];
const result: EvaluationResult = { mode: "live", summary: "Overall fine.", findings, page: { url: "https://hotel.example/", title: "Rooms" } };

const backlog = () => within(screen.getByRole("list", { name: "Priority backlog" })).getAllByRole("listitem");

describe("EvaluationReport", () => {
  it("leads with the task, the page and the key figures", () => {
    render(<EvaluationReport result={result} industry="hotel" task="Book a room" />);
    expect(screen.getByRole("heading", { level: 2, name: "Book a room" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "https://hotel.example/" })).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    const stat = (name: string) => screen.getByText(name).closest("div")!;
    expect(within(stat("Findings")).getByText("3")).toBeInTheDocument();
    expect(within(stat("Critical or high")).getByText("2")).toBeInTheDocument();
    expect(within(stat("Accessibility issues")).getByText("1")).toBeInTheDocument();
  });

  it("lists the backlog by priority, with the expected value", () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const ranked = rankFindings(findings, hotel, defaultAssumptions(hotel));
    const items = backlog();
    expect(items.map((li) => li.querySelector("button span.block")?.textContent)).toEqual(ranked.map((r) => r.title));
    expect(within(items[0]).getByText(`${new Intl.NumberFormat("en-GB").format(ranked[0].value)} SEK`)).toBeInTheDocument();
  });

  it("opens a finding to show the fix, quotes, source and the sum behind its value", async () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const toggle = screen.getByRole("button", { name: /Room size unclear/ });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const panel = document.getElementById(toggle.getAttribute("aria-controls")!)!;
    expect(panel).toBeVisible();
    expect(within(panel).getByText("The fix.")).toBeInTheDocument();
    expect(within(panel).getByText(/Will the cot fit\?/)).toBeInTheDocument();
    expect(within(panel).getByText(/× segment revenue ×/)).toBeInTheDocument();

    const a11y = screen.getByRole("button", { name: /Images without alt text/ });
    await userEvent.click(a11y);
    expect(screen.getByText(/Automatic check · WCAG 1.1.1/)).toBeInTheDocument();
  });

  it("the matrix shows which archetypes each finding affects", () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const table = screen.getByRole("table", { name: "Findings by archetype" });
    const row = within(table).getByRole("row", { name: /Images without alt text/ });
    expect(within(row).getAllByText("Affects")).toHaveLength(2);
    expect(within(table).queryByRole("columnheader", { name: /Weekend Couple/ })).not.toBeInTheDocument();
  });

  it("changing an assumption changes the values, and reset brings back the journey data", async () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const total = () => within(screen.getByText("Estimated value at stake").closest("div")!).getAllByText(/SEK/)[0].textContent;
    const before = total();
    const revenue = screen.getByLabelText("Revenue per customer, Business travellers");
    expect(revenue).toHaveValue(3300);
    await userEvent.clear(revenue);
    await userEvent.type(revenue, "9000");
    expect(total()).not.toBe(before);
    await userEvent.click(screen.getByRole("button", { name: "Reset to the journey data" }));
    expect(screen.getByLabelText("Revenue per customer, Business travellers")).toHaveValue(3300);
    expect(total()).toBe(before);
  });

  it("shows the demo note and can print", async () => {
    const print = vi.spyOn(window, "print").mockImplementation(() => {});
    render(<EvaluationReport result={{ ...result, mode: "demo", note: "Demo note." }} industry="hotel" task="t" />);
    expect(screen.getByRole("status")).toHaveTextContent("Demo note.");
    await userEvent.click(screen.getByRole("button", { name: "Print or save as PDF" }));
    expect(print).toHaveBeenCalled();
  });

  it("customer count and share at stake also change the values", async () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const total = () => within(screen.getByText("Estimated value at stake").closest("div")!).getAllByText(/SEK/)[0].textContent;
    const before = total();
    const customers = screen.getByLabelText("Customers");
    await userEvent.clear(customers);
    await userEvent.type(customers, "1000");
    const fewer = total();
    expect(fewer).not.toBe(before);
    const critical = screen.getByLabelText("At stake, critical");
    await userEvent.clear(critical);
    await userEvent.type(critical, "50");
    expect(total()).not.toBe(fewer);
  });

  it("says where the data comes from, and what it was evaluated against", () => {
    render(<EvaluationReport result={{ ...result, criteria: ["h-status", "h-errors", "a11y-html", "b-trust", "b-conversion", "b-price", "b-mobile", "b-content"] }} industry="hotel" task="t" />);
    expect(screen.getByRole("link", { name: /Hotel customer journey/ })).toHaveAttribute("href", "/cases/customer-journey-intelligence/hotel");
    expect(screen.getByText(/Evaluated against/).parentElement).toHaveTextContent(/Usability heuristics: Visibility of system status, Error prevention · Accessibility \(WCAG 2.2 AA\): Automatic HTML checks · Experience and business: all 5/);
  });

  it("shows each archetype's value per customer, from its segments", () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const list = screen.getByRole("list", { name: "Archetypes by value" });
    expect(within(list).getByText(/The Loyal Regular/).closest("li")).toHaveTextContent(/5,280 SEK per customer a year/);
  });

  it("every ticket shows how it spreads over archetypes, and opens to archetypes and segments", async () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const row = screen.getByRole("button", { name: /Images without alt text/ });
    expect(within(row).getByRole("img", { name: /Affected: The Business Traveller \d+%, The Loyal Regular \d+%/ })).toBeInTheDocument();
    await userEvent.click(row);
    const panel = document.getElementById(row.getAttribute("aria-controls")!)!;
    const archetypes = within(panel).getByRole("table", { name: "Affected archetypes" });
    expect(within(archetypes).getAllByRole("row")).toHaveLength(3);
    const segments = within(panel).getByRole("table", { name: "Affected segments" });
    expect(within(segments).getByRole("row", { name: /Business travellers/ })).toHaveTextContent(/% of the segment/);
  });

  it("the segment revenues drive each archetype's value", async () => {
    render(<EvaluationReport result={result} industry="hotel" task="t" />);
    const list = screen.getByRole("list", { name: "Archetypes by value" });
    const regular = () => within(list).getByText(/The Loyal Regular/).closest("li")!.textContent;
    const before = regular();
    const loyal = screen.getByLabelText("Revenue per customer, Loyalty members");
    await userEvent.clear(loyal);
    await userEvent.type(loyal, "10000");
    expect(regular()).not.toBe(before);
  });
});
