import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { PageNav } from "./PageNav";

vi.mock("@/components/ds", () => ({
  Logo: ({ color }: { color: string }) => <div data-testid="logo" data-color={color} />,
  Button: ({ children }: { children: React.ReactNode }) => <span data-testid="button">{children}</span>,
  Typography: ({ children }: { children: React.ReactNode }) => <span>{children}</span>,
}));

describe("PageNav", () => {
  it("renders the blue variant with the brand background", () => {
    const { container } = render(<PageNav variant="blue" />);
    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();
    expect(nav?.className).toContain("bg-[var(--color-business-blue)]");
    expect(nav?.className).toContain("cursor-white");
    expect(screen.getByTestId("logo").getAttribute("data-color")).toBe("white");
  });

  it("renders the white variant with a white background by default", () => {
    const { container } = render(<PageNav />);
    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("bg-white");
    expect(nav?.className).not.toContain("bg-[var(--color-business-blue)]");
    expect(screen.getByTestId("logo").getAttribute("data-color")).toBe("blue");
  });
});
