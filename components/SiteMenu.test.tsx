import { describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteMenu } from "./SiteMenu";

const path = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => path.current }));

async function openAt(
  pathname: string,
  props: Partial<Parameters<typeof SiteMenu>[0]> = {},
) {
  path.current = pathname;
  const user = userEvent.setup();
  render(<SiteMenu {...props} />);
  await user.click(screen.getByRole("button", { name: "Open menu" }));
  return screen.getByRole("navigation", { name: "Primary" });
}

const titles = (nav: HTMLElement) =>
  within(nav)
    .getAllByRole("link")
    .map((link) => link.getAttribute("href"));

describe("SiteMenu links", () => {
  it("shows Home, Writing, Training & Courses and Cases on a page that is none of them", async () => {
    const nav = await openAt("/join-us");
    expect(titles(nav)).toEqual([
      "/",
      "/writing",
      "/training-and-courses",
      "/cases",
    ]);
    expect(within(nav).getByText("Back to start.")).toBeInTheDocument();
    expect(
      within(nav).getByText("Work we're proud of. Mostly."),
    ).toBeInTheDocument();
  });

  it("hides the link to the page you are on", async () => {
    expect(titles(await openAt("/"))).toEqual([
      "/writing",
      "/training-and-courses",
      "/cases",
    ]);
  });

  it("hides Writing on the writing list", async () => {
    expect(titles(await openAt("/writing"))).toEqual([
      "/",
      "/training-and-courses",
      "/cases",
    ]);
  });

  it("hides Cases on the cases list", async () => {
    expect(titles(await openAt("/cases"))).toEqual([
      "/",
      "/writing",
      "/training-and-courses",
    ]);
  });

  it("keeps Writing on an article, so you can get back to the list", async () => {
    expect(titles(await openAt("/writing/hello-world"))).toEqual([
      "/",
      "/writing",
      "/training-and-courses",
      "/cases",
    ]);
  });
});

describe("SiteMenu buttons", () => {
  it("draws the menu button as a bare white icon by default: no ring, no fill", () => {
    path.current = "/";
    render(<SiteMenu />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass("text-white");
    expect(button).not.toHaveClass("border-2");
    expect(button).not.toHaveClass("bg-white");
  });

  it("draws the menu button as a bare blue icon on a white page", () => {
    path.current = "/writing";
    render(<SiteMenu tone="blue" />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass("text-[var(--color-business-blue)]");
    expect(button).not.toHaveClass("border-2");
  });

  it("draws the close button as a bare white icon, not a ring or a filled circle", async () => {
    await openAt("/");
    const close = screen.getByRole("button", { name: "Close menu" });
    expect(close).toHaveClass("text-white");
    expect(close).not.toHaveClass("border-2");
    expect(close).not.toHaveClass("bg-white");
  });

  it("keeps the panel blue on a white page", async () => {
    await openAt("/cases", { tone: "blue" });
    expect(screen.getByRole("dialog", { name: "Menu" })).toHaveClass(
      "bg-[var(--color-business-blue)]",
    );
  });

  it("puts the page's nav row geometry on the panel header, so the close button keeps its place", async () => {
    await openAt("/cases", {
      headerClassName: "px-6 py-5",
      headerInnerClassName: "mx-auto h-[56px] w-full",
      headerInnerStyle: { maxWidth: "1200px" },
    });
    const close = screen.getByRole("button", { name: "Close menu" });
    const inner = close.parentElement as HTMLElement;
    expect(inner).toHaveClass("mx-auto", "h-[56px]", "w-full", "justify-end");
    expect(inner.style.maxWidth).toBe("1200px");
    expect(inner.parentElement).toHaveClass("px-6", "py-5");
  });

  it("puts the page's own geometry on the menu button and the panel header", async () => {
    await openAt("/", {
      triggerClassName: "absolute top-[12px]",
      headerClassName: "h-[96px]",
    });
    expect(
      screen.getByRole("dialog").querySelector(".h-\\[96px\\]"),
    ).not.toBeNull();
  });
});

describe("SiteMenu icon and panel motion", () => {
  it("draws the menu button as three lines that rest as a hamburger", () => {
    path.current = "/";
    render(<SiteMenu />);
    const icon = screen
      .getByRole("button", { name: "Open menu" })
      .querySelector("svg");
    expect(icon).toHaveClass("menu-icon");
    expect(icon).not.toHaveClass("menu-icon--morph");
    expect(icon?.querySelectorAll("line")).toHaveLength(3);
    expect(icon).toHaveAttribute("aria-hidden", "true");
  });

  it("draws the close button with the same three lines, set to turn into a cross", async () => {
    await openAt("/");
    const icon = screen
      .getByRole("button", { name: "Close menu" })
      .querySelector("svg");
    expect(icon).toHaveClass("menu-icon", "menu-icon--morph");
    expect(icon?.querySelectorAll("line")).toHaveLength(3);
  });

  it("pulls both buttons out by the space around the lines, so the lines sit flush with the content edge", async () => {
    await openAt("/");
    for (const name of ["Open menu", "Close menu"]) {
      const button = screen.getByRole("button", { name, hidden: true });
      expect(button).toHaveClass("-mr-[12px]", "md:-mr-[16px]");
    }
  });

  it("marks the panel for the wipe, so the close button does not travel", async () => {
    await openAt("/");
    expect(screen.getByRole("dialog", { name: "Menu" })).toHaveClass(
      "menu-panel",
    );
  });
});
