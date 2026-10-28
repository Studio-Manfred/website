import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { PageNav } from "./PageNav";

vi.mock("@/components/ds", () => ({
  Logo: ({
    color,
    variant,
    height,
  }: {
    color: string;
    variant: string;
    height: number;
  }) => (
    <div
      data-testid="logo"
      data-color={color}
      data-variant={variant}
      data-height={height}
    />
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
    inset,
    headerInnerStyle,
  }: {
    tone?: string;
    inset?: string;
    headerInnerStyle?: { maxWidth?: string };
  }) => (
    <div
      data-testid="menu"
      data-tone={tone}
      data-inset={inset}
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

  it("caps the inner row at 1200px, the same on every page", () => {
    const { container } = render(<PageNav />);
    const row = container.querySelector("nav > div") as HTMLElement;
    expect(row.style.maxWidth).toBe("1200px");
  });

  it("has the wordmark at 44 px on a phone and 56 px from md, and the M below 340 px", () => {
    const { container } = render(<PageNav />);
    const logos = screen.getAllByTestId("logo");
    expect(logos.map((logo) => logo.getAttribute("data-variant"))).toEqual([
      "wordmark",
      "wordmark",
    ]);
    expect(logos.map((logo) => logo.getAttribute("data-height"))).toEqual([
      "44",
      "56",
    ]);
    const m = container.querySelector(
      '[data-testid="monogram"]',
    ) as HTMLElement;
    expect(m).not.toBeNull();
    expect(m.closest("span")).toHaveClass("min-[340px]:hidden");
    expect(logos[0].closest("span")).toHaveClass(
      "max-[339px]:hidden",
      "md:hidden",
    );
    expect(logos[1].closest("span")).toHaveClass("max-md:hidden");
  });

  it("pulls the wordmark out by its own padding, so the letters sit flush with the content edge", () => {
    render(<PageNav />);
    const [phone, desktop] = screen.getAllByTestId("logo");
    expect(phone.closest("span")).toHaveClass("-ml-[9.5px]");
    expect(desktop.closest("span")).toHaveClass("md:-ml-[12px]");
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
    render(<PageNav />);
    expect(screen.getByTestId("menu").getAttribute("data-max-width")).toBe(
      "1200px",
    );
  });

  it("gives the menu rows the page's inset, so they line up with the nav row", () => {
    render(<PageNav />);
    expect(screen.getByTestId("menu").getAttribute("data-inset")).toBe(
      "max(24px, calc((100% - 1200px) / 2))",
    );
  });

  it("leaves out the menu when menu is false, and keeps Get in touch", () => {
    render(<PageNav menu={false} />);
    expect(screen.queryByTestId("menu")).toBeNull();
    expect(screen.getByTestId("button")).toBeInTheDocument();
  });
});
