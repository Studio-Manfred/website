import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Services } from "./Services";

describe("Services", () => {
  it("renders the What we do? section heading and copy", () => {
    render(<Services />);
    expect(
      screen.getByRole("heading", { level: 2, name: /What we do\?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Product, UX and Service Design\?/i),
    ).toBeInTheDocument();
  });
});
