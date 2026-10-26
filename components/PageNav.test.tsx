import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PageNav } from "./PageNav";

vi.mock("@/components/ds", () => ({
  Logo: ({ color, variant }: { color: string; variant: string }) => (
    <div data-testid="logo" data-color={color} data-variant={variant} />
  ),
  Button: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="button">{children}</span>
  ),
  Typography: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
}));

vi.mock("@/components/SiteMenu", () => ({
  SiteMenu: ({
    tone,
    headerInnerStyle,
  }: {
    tone?: string;
    headerInnerStyle?: { maxWidth?: string };
  }) => (
    <div
      data-testid="menu"
      data-tone={tone}
      data-max-width={headerInnerStyle?.maxWidth}
    />
  ),
}));

describe("PageNav", () => {
  it("renders the blue variant with the brand background", () => {
    const { container } = render(<PageNav variant="blue" />);
    const nav = container.querySelector("nav");
    expect(nav).not.toBeNull();
    expect(nav?.className).toContain("bg-[var(--color-business-blue)]");
    expect(nav?.className).toContain("cursor-white");
    for (const logo of screen.getAllByTestId("logo")) {
      expect(logo.getAttribute("data-color")).toBe("white");
    }
  });

  it("renders the white variant with a white background by default", () => {
    const { container } = render(<PageNav />);
    const nav = container.querySelector("nav");
    expect(nav?.className).toContain("bg-white");
    expect(nav?.className).not.toContain("bg-[var(--color-business-blue)]");
    for (const logo of screen.getAllByTestId("logo")) {
      expect(logo.getAttribute("data-color")).toBe("blue");
    }
  });

  it("caps the inner row at 960px by default", () => {
    const { container } = render(<PageNav />);
    const row = container.querySelector("nav > div") as HTMLElement;
    expect(row.style.maxWidth).toBe("960px");
  });

  it('widens the inner row to 1200px for width="wide"', () => {
    const { container } = render(<PageNav width="wide" />);
    const row = container.querySelector("nav > div") as HTMLElement;
    expect(row.style.maxWidth).toBe("1200px");
  });

  it("shows the wordmark on desktop and the M monogram on a phone", () => {
    render(<PageNav />);
    const variants = screen
      .getAllByTestId("logo")
      .map((logo) => logo.getAttribute("data-variant"));
    expect(variants.sort()).toEqual(["monogram", "wordmark"]);
  });

  it("puts the menu last, after Get in touch", () => {
    const { container } = render(<PageNav />);
    const row = container.querySelector("nav > div") as HTMLElement;
    const right = row.lastElementChild as HTMLElement;
    expect(within(right).getByTestId("button")).toBeInTheDocument();
    expect(right.lastElementChild).toBe(within(right).getByTestId("menu"));
  });

  it("gives a white ring to the menu on a blue page and a blue ring on a white page", () => {
    const { unmount } = render(<PageNav variant="blue" />);
    expect(screen.getByTestId("menu").getAttribute("data-tone")).toBe("white");
    unmount();
    render(<PageNav variant="white" />);
    expect(screen.getByTestId("menu").getAttribute("data-tone")).toBe("blue");
  });

  it("gives the menu the same row width as the nav, so the close button keeps its place", () => {
    render(<PageNav width="wide" />);
    expect(screen.getByTestId("menu").getAttribute("data-max-width")).toBe(
      "1200px",
    );
  });

  it("leaves out the menu when menu is false, and keeps Get in touch", () => {
    render(<PageNav menu={false} />);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });
});
