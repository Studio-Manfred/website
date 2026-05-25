import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Tagline } from "./Tagline";

describe("Tagline", () => {
  it("renders the tagline copy with the three pillar emphases", () => {
    render(<Tagline />);
    expect(screen.getByText("leadership")).toBeInTheDocument();
    expect(screen.getByText("customer research")).toBeInTheDocument();
    expect(screen.getByText("product design")).toBeInTheDocument();
  });
});
