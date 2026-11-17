import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CasePasswordGate } from "./CasePasswordGate";

describe("CasePasswordGate (STU-1156)", () => {
  it("one h1, a labelled password field and a submit button", () => {
    render(<CasePasswordGate action={async () => {}} wrong={false} />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByLabelText("Password")).toHaveAttribute("type", "password");
    expect(screen.getByRole("button", { name: "Open the case" })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("says when the password was wrong", () => {
    render(<CasePasswordGate action={async () => {}} wrong />);
    expect(screen.getByRole("alert")).toHaveTextContent("That password doesn’t open this case");
  });
});
