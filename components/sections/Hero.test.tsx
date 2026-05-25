import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the home headline and the Get in touch CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Building Better Product Companies/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Get in touch/i })).toBeInTheDocument();
  });
});
