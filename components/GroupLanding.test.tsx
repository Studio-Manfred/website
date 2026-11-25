import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { GroupLanding } from "./GroupLanding";

describe("GroupLanding", () => {
  it("has the headline, the lead and the chat", () => {
    render(<GroupLanding />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveAccessibleName(expect.stringMatching(/^We are talent/));
    expect(screen.getByText("We grow through differences")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: /fråga/i })).toBeInTheDocument();
    expect(screen.queryByText("SeventyOne Group")).not.toBeInTheDocument();
    expect(screen.getByRole("banner")).toHaveTextContent("71collective");
    expect(screen.queryAllByRole("link")).toHaveLength(0);
  });

  it("ends with the People section", () => {
    render(<GroupLanding />);
    expect(screen.getByRole("region", { name: "People" })).toBeInTheDocument();
  });
});
