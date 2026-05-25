import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Mission } from "./Mission";

describe("Mission", () => {
  it("renders both mission statements with their emphasised phrases", () => {
    render(<Mission />);
    expect(screen.getByText("more customer driven")).toBeInTheDocument();
    expect(screen.getByText("Manfred Magic!")).toBeInTheDocument();
  });
});
