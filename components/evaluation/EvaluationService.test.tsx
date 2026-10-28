import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EvaluationService } from "./EvaluationService";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { demoFindings } from "@/lib/evaluation/demo";
import type { EvaluationResult } from "@/lib/evaluation/findings";
import { toScreenshot } from "./screenshots";

vi.mock("./screenshots", () => ({ toScreenshot: vi.fn() }));

const hotel = INDUSTRIES.hotel;
const findings = demoFindings(hotel, ["family_planner", "business_traveller"], 1);
const result: EvaluationResult = { mode: "demo", summary: "Demo summary.", findings, page: { url: "https://hotel.example/", title: "Rooms" }, note: "The AI analysis is not switched on." };

const mockFetch = (status: number, body: unknown) =>
  vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }));

const fillAndRun = async () => {
  await userEvent.type(screen.getByLabelText("Page address"), "https://hotel.example");
  await userEvent.type(screen.getByLabelText("The task"), "Book a family room");
  await userEvent.click(screen.getByRole("button", { name: "Run the evaluation" }));
};

afterEach(() => vi.restoreAllMocks());

describe("EvaluationService", () => {
  it("starts on Hotel with all its archetypes chosen, and says when the AI is off", () => {
    render(<EvaluationService live={false} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Evaluation service");
    expect(screen.getByText(/Demo mode/)).toBeInTheDocument();
    for (const p of hotel.personas) expect(screen.getByRole("button", { name: new RegExp(p.name) })).toHaveAttribute("aria-pressed", "true");
  });

  it("shows each archetype's traits", () => {
    render(<EvaluationService live />);
    expect(screen.getByText("AI analysis is on")).toBeInTheDocument();
    const card = screen.getByRole("button", { name: /The Business Traveller/ });
    expect(within(card).getByText("Patience: 1 of 5")).toBeInTheDocument();
    expect(within(card).getByText("Books on the move, often one-handed")).toBeInTheDocument();
  });

  it("switching industry loads its archetypes and phases", async () => {
    render(<EvaluationService live={false} />);
    await userEvent.click(screen.getByRole("button", { name: /Grocery/ }));
    for (const p of INDUSTRIES.grocery.personas) expect(screen.getByRole("button", { name: new RegExp(p.name) })).toBeInTheDocument();
    expect(within(screen.getByLabelText("Journey phase")).getAllByRole("option")).toHaveLength(6);
    expect(screen.getByRole("option", { name: /Choosing a channel/ })).toBeInTheDocument();
  });

  it("can't run until there are archetypes, a task and an address or screenshot", async () => {
    render(<EvaluationService live={false} />);
    const run = screen.getByRole("button", { name: "Run the evaluation" });
    expect(run).toBeDisabled();
    await userEvent.type(screen.getByLabelText("The task"), "Book a room");
    expect(run).toBeDisabled();
    await userEvent.type(screen.getByLabelText("Page address"), "https://hotel.example");
    expect(run).toBeEnabled();
    for (const p of hotel.personas) await userEvent.click(screen.getByRole("button", { name: new RegExp(p.name) }));
    expect(run).toBeDisabled();
  });

  it("sends the choices and shows the report", async () => {
    const fetchSpy = mockFetch(200, result);
    render(<EvaluationService live={false} />);
    await userEvent.click(screen.getByRole("button", { name: /The Loyal Regular/ }));
    await userEvent.selectOptions(screen.getByLabelText("Journey phase"), "2");
    await fillAndRun();

    const [url, init] = fetchSpy.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("/api/evaluation");
    const sent = JSON.parse(init.body as string);
    expect(sent).toMatchObject({ industry: "hotel", phase: 2, task: "Book a family room", url: "https://hotel.example", screenshots: [] });
    expect(sent.archetypes).not.toContain("loyal_regular");

    expect(await screen.findByRole("heading", { level: 2, name: "Book a family room" })).toBeInTheDocument();
    expect(screen.getByText("Demo summary.")).toBeInTheDocument();
  });

  it("shows the server's reason when it refuses", async () => {
    mockFetch(400, { error: "Private addresses are not allowed." });
    render(<EvaluationService live={false} />);
    await fillAndRun();
    expect(await screen.findByRole("alert")).toHaveTextContent("Private addresses are not allowed.");
  });

  it("says so when the server can't be reached", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("offline"));
    render(<EvaluationService live={false} />);
    await fillAndRun();
    expect(await screen.findByRole("alert")).toHaveTextContent(/No answer from the server/);
  });

  it("adds screenshots in order, sends them, and can remove one", async () => {
    vi.mocked(toScreenshot).mockImplementation(async (f) => ({ mediaType: "image/jpeg", data: btoa(f.name) }));
    const fetchSpy = mockFetch(200, result);
    render(<EvaluationService live={false} />);
    const input = screen.getByLabelText(/Screenshots/);
    await userEvent.upload(input, [new File(["a"], "one.png", { type: "image/png" }), new File(["b"], "two.png", { type: "image/png" })]);
    expect(await screen.findByAltText("Screenshot 1: one.png")).toBeInTheDocument();
    expect(screen.getByAltText("Screenshot 2: two.png")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Remove screenshot 1" }));
    expect(screen.queryByAltText(/one.png/)).not.toBeInTheDocument();

    await userEvent.type(screen.getByLabelText("The task"), "Book a room");
    await userEvent.click(screen.getByRole("button", { name: "Run the evaluation" }));
    const sent = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.screenshots).toEqual([{ mediaType: "image/jpeg", data: btoa("two.png") }]);
    expect(sent.url).toBeUndefined();
  });

  it("says so when an image can't be read", async () => {
    vi.mocked(toScreenshot).mockRejectedValue(new Error("bad"));
    render(<EvaluationService live={false} />);
    await userEvent.upload(screen.getByLabelText(/Screenshots/), new File(["a"], "x.png", { type: "image/png" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/could not be read/);
  });

  it("falls back to a general message when the error has no body", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response("oops", { status: 502 }));
    render(<EvaluationService live={false} />);
    await fillAndRun();
    expect(await screen.findByRole("alert")).toHaveTextContent("The evaluation failed. Try again.");
  });

  it("shows that the data comes from the industry's customer journey", async () => {
    render(<EvaluationService live={false} />);
    expect(screen.getByRole("link", { name: /Open the Hotel journey/ })).toHaveAttribute("href", "/cases/customer-journey-intelligence/hotel");
    await userEvent.click(screen.getByRole("button", { name: /Grocery/ }));
    expect(screen.getByRole("link", { name: /Open the Grocery journey/ })).toHaveAttribute("href", "/cases/customer-journey-intelligence/grocery");
  });

  it("each archetype shows its main segment and what it is worth", () => {
    render(<EvaluationService live />);
    const card = screen.getByRole("button", { name: /The Business Traveller/ });
    expect(within(card).getByText(/Mostly Business travellers \(70%\)/)).toBeInTheDocument();
    expect(within(card).getByText(/3,700 SEK per customer/)).toBeInTheDocument();
    expect(screen.getByText(/Most valuable per customer: The Loyal Regular/)).toBeInTheDocument();
  });

  it("the phase shows what the journey says about it", async () => {
    render(<EvaluationService live={false} />);
    await userEvent.selectOptions(screen.getByLabelText("Journey phase"), "2");
    expect(screen.getByText(/In the journey, customers expect \d+ and get \d+/)).toBeInTheDocument();
  });

  it("picks what to evaluate against, by criterion or by group, and sends it", async () => {
    const fetchSpy = mockFetch(200, result);
    render(<EvaluationService live={false} />);
    expect(screen.getByRole("checkbox", { name: /Error prevention/ })).toBeChecked();
    await userEvent.click(screen.getByRole("button", { name: "Clear Experience and business" }));
    expect(screen.getByRole("checkbox", { name: /Price transparency/ })).not.toBeChecked();
    await userEvent.click(screen.getByRole("checkbox", { name: /Error prevention/ }));
    expect(screen.getByText(/14 of 20 chosen/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("checkbox", { name: /Price transparency/ }));
    expect(screen.getByText(/15 of 20 chosen/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole("checkbox", { name: /Price transparency/ }));
    await fillAndRun();
    const sent = JSON.parse((fetchSpy.mock.calls[0][1] as RequestInit).body as string);
    expect(sent.criteria).toHaveLength(14);
    expect(sent.criteria).not.toContain("h-errors");
    expect(sent.criteria).not.toContain("b-price");
  });

  it("can't run with nothing to evaluate against", async () => {
    render(<EvaluationService live={false} />);
    for (const g of ["Usability heuristics", "Accessibility (WCAG 2.2 AA)", "Experience and business"]) await userEvent.click(screen.getByRole("button", { name: `Clear ${g}` }));
    await userEvent.type(screen.getByLabelText("Page address"), "https://hotel.example");
    await userEvent.type(screen.getByLabelText("The task"), "Book a room");
    expect(screen.getByRole("button", { name: "Run the evaluation" })).toBeDisabled();
    await userEvent.click(screen.getByRole("button", { name: "Select all Usability heuristics" }));
    expect(screen.getByRole("button", { name: "Run the evaluation" })).toBeEnabled();
  });
});
