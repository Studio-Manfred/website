import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CaseList } from "./CaseList";

const cases = [
  { slug: "fishbrain", title: "Fishbrain", categoryLine: "Consumer App", consultants: [{ name: "Moa Bogren", title: "UX Lead", photoUrl: "/moa.jpg" }], locked: false },
  { slug: "bokadirekt", title: "Bokadirekt", categoryLine: "", consultants: [], locked: true },
];

describe("CaseList (STU-1148)", () => {
  it("one h1, and each case as a link to its page with title and consultant", () => {
    render(<CaseList cases={cases} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    const fishbrain = screen.getByRole("link", { name: /Fishbrain/ });
    expect(fishbrain).toHaveAttribute("href", "/cases/fishbrain");
    expect(fishbrain).toHaveTextContent("Moa Bogren");
    expect(fishbrain).toHaveTextContent("Consumer App");
    expect(screen.getByRole("link", { name: /Bokadirekt/ })).toHaveAttribute("href", "/cases/bokadirekt");
  });

  it("says so when there are no cases", () => {
    render(<CaseList cases={[]} />);
    expect(screen.getByText(/No cases yet/)).toBeInTheDocument();
  });

  it("marks a password-protected case (STU-1156)", () => {
    render(<CaseList cases={cases} />);
    expect(screen.getByRole("link", { name: /Bokadirekt/ })).toHaveTextContent("Password protected");
    expect(screen.getByRole("link", { name: /Fishbrain/ })).not.toHaveTextContent("Password protected");
  });
});
