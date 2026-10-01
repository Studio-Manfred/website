import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ProcessTimeline } from "./ProcessTimeline";

const steps = [
  { id: 1, title: "Discover", methods: ["Interviews"], description: "Talk to users." },
  { id: 2, title: "Define", methods: ["Personas", "Journey map"], description: "Frame the problem." },
  { id: 3, title: "Deliver", methods: ["Prototyping"], description: "Ship it." },
];

const stakeholders = ["Product", "Sales"];

describe("ProcessTimeline", () => {
  it("shows the first step's description and methods by default", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    expect(screen.getByText("Talk to users.")).toBeInTheDocument();
    expect(screen.getByText("Interviews")).toBeInTheDocument();
    expect(screen.queryByText("Ship it.")).not.toBeInTheDocument();
  });

  it("switches the detail panel when a step title is clicked", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    fireEvent.click(screen.getByRole("button", { name: "Define" }));
    expect(screen.getByText("Frame the problem.")).toBeInTheDocument();
    expect(screen.getByText("Personas")).toBeInTheDocument();
    expect(screen.getByText("Journey map")).toBeInTheDocument();
    expect(screen.queryByText("Talk to users.")).not.toBeInTheDocument();
  });

  it("switches the detail panel when a timeline dot is clicked", () => {
    const { container } = render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    const hitTargets = container.querySelectorAll('circle[r="28"]');
    expect(hitTargets).toHaveLength(steps.length);
    fireEvent.click(hitTargets[2]);
    expect(screen.getByText("Ship it.")).toBeInTheDocument();
  });

  it("fills the curve segments before the active step", () => {
    const { container } = render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    const strokes = () =>
      Array.from(container.querySelectorAll("path")).map((p) => p.getAttribute("stroke"));
    expect(strokes()).toEqual(["#ddd", "#ddd"]);
    fireEvent.click(screen.getByRole("button", { name: "Deliver" }));
    expect(strokes()).toEqual(["#2a3fcc", "#2a3fcc"]);
  });

  it("lists the stakeholders", () => {
    render(<ProcessTimeline steps={steps} stakeholders={stakeholders} />);
    expect(screen.getByText("Stakeholder collaboration")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
  });

  it("renders without a detail panel when there are no steps", () => {
    render(<ProcessTimeline steps={[]} stakeholders={[]} />);
    expect(screen.getByRole("heading", { name: /process & methods/i })).toBeInTheDocument();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });
});
