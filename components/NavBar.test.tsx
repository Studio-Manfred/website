import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { NavBar } from "./NavBar";

vi.mock("@/components/ds", () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="button">{children}</span>
  ),
}));

vi.mock("@/components/GetInTouchLink", () => ({
  GetInTouchLink: () => <a data-testid="get-in-touch" />,
}));

describe("NavBar", () => {
  it("paints the bar with the brand-blue background", () => {
    const { container } = render(<NavBar />);
    const header = container.querySelector("header");
    expect(header?.className).toContain("bg-[var(--color-business-blue)]");
  });

  it("opts into the white cursor variant so the custom cursor stays visible", () => {
    const { container } = render(<NavBar />);
    const header = container.querySelector("header");
    expect(header?.className).toContain("cursor-white");
  });
});
