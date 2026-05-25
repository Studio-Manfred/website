import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { JoinUs } from "./JoinUs";

describe("JoinUs", () => {
  it("renders the Want to join us? heading and Get in touch CTA", () => {
    render(<JoinUs />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Want to join us\?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Get in touch/i }),
    ).toHaveAttribute("href", "mailto:hello@studiomanfred.com");
  });
});
