import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProcessTimeline } from "./ProcessTimeline";

const steps = [
  { id: 1, title: "Discover", methods: ["Interviews"], description: "Talk to users." },
  { id: 2, title: "Define", methods: ["Personas", "Journey map"], description: "Frame the problem." },
  { id: 3, title: "Deliver", methods: ["Prototyping"], description: "Ship it." },
];

const stakeholders = ["Product", "Sales"];

const stepButton = (name: string) => screen.getByRole("button", { name: new RegExp(name) });
const panelOf = (button: HTMLElement) => document.getElementById(button.getAttribute("aria-controls") ?? "");

// STU-1153: the Process block is an accordion (same design as the intranet preview,
// src/components/cases/case-process-timeline.tsx there). Keep the two in step.
describe("ProcessTimeline, as an accordion (STU-1153)", () => {
  it("opens step 01 and closes the other steps", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    expect(stepButton("Discover")).toHaveAttribute("aria-expanded", "true");
    expect(stepButton("Define")).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText("Talk to users.")).toBeVisible();
    expect(screen.getByText("Interviews")).toBeVisible();
  });

  it("a click opens another step and the first step stays open", async () => {
    const user = userEvent.setup();
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    await user.click(stepButton("Define"));
    expect(stepButton("Define")).toHaveAttribute("aria-expanded", "true");
    expect(stepButton("Discover")).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Frame the problem.")).toBeVisible();
    expect(screen.getByText("Talk to users.")).toBeVisible();
  });

  it("a click on an open step closes it", async () => {
    const user = userEvent.setup();
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    await user.click(stepButton("Discover"));
    expect(stepButton("Discover")).toHaveAttribute("aria-expanded", "false");
  });

  it("Enter and Space toggle a step from the keyboard", async () => {
    const user = userEvent.setup();
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    stepButton("Define").focus();
    await user.keyboard("{Enter}");
    expect(stepButton("Define")).toHaveAttribute("aria-expanded", "true");
    await user.keyboard(" ");
    expect(stepButton("Define")).toHaveAttribute("aria-expanded", "false");
  });

  it("a closed step keeps its content in the DOM, inert, so print can show it", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    const panel = panelOf(stepButton("Deliver"));
    expect(panel).toHaveAttribute("inert");
    expect(within(panel as HTMLElement).getByText("Ship it.")).toBeInTheDocument();
    expect(panelOf(stepButton("Discover"))).not.toHaveAttribute("inert");
  });

  it("every open step has a slowly pulsing ring that stops under reduced motion and print", async () => {
    const user = userEvent.setup();
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    const rings = () => screen.queryAllByTestId("step-halo");
    expect(rings()).toHaveLength(1);
    expect(rings()[0].className).toContain("animate-halo-pulse");
    expect(rings()[0].className).toContain("motion-reduce:animate-none");
    expect(rings()[0].className).toContain("print:animate-none");
    expect(rings()[0].children).toHaveLength(0);
    await user.click(stepButton("Define"));
    expect(rings()).toHaveLength(2);
  });

  it("names a step without a title \"Step N\"", () => {
    render(<ProcessTimeline steps={[...steps, { id: 4, title: "", methods: [], description: "No title." }]} stakeholders={[]} />);
    expect(stepButton("Step 4")).toBeInTheDocument();
  });

  it("lists the stakeholders", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    expect(screen.getByText("Stakeholder collaboration")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
  });

  it("renders without steps: the heading only", () => {
    render(<ProcessTimeline steps={[]} stakeholders={[]} />);
    expect(screen.getByRole("heading", { name: /process & methods/i })).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("uses the heading it is given, and keeps the default without one (STU-1146)", () => {
    const { unmount } = render(<ProcessTimeline steps={steps} stakeholders={[]} heading="How we worked" />);
    expect(screen.getByRole("heading", { name: "How we worked", level: 2 })).toBeInTheDocument();
    unmount();
    render(<ProcessTimeline steps={steps} stakeholders={[]} />);
    expect(screen.getByRole("heading", { name: "Process & Methods", level: 2 })).toBeInTheDocument();
  });

  it("shows no stakeholder section when there are none (STU-1146)", () => {
    render(<ProcessTimeline steps={steps} stakeholders={[]} />);
    expect(screen.queryByText("Stakeholder collaboration")).not.toBeInTheDocument();
  });
});
