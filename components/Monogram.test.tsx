import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Monogram } from "./Monogram";

describe("Monogram", () => {
  it("is 23 px high, a little under the wordmark's cap height, and keeps the glyph's proportions", () => {
    render(<Monogram color="white" />);
    const m = screen.getByTestId("monogram");
    expect(m).toHaveAttribute("height", "23");
    expect(m).toHaveAttribute("width", "26");
    expect(m).toHaveAttribute("viewBox", "70 81 100.03 88.77");
  });

  it("is named for assistive tech", () => {
    render(<Monogram color="blue" />);
    expect(
      screen.getByRole("img", { name: "Manfred home" }),
    ).toBeInTheDocument();
  });
});
