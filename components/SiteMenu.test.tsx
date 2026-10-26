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
  it("draws the menu button as a white ring by default", () => {
    path.current = "/";
    render(<SiteMenu />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass(
      "rounded-full",
      "border-2",
      "border-white",
      "text-white",
    );
    expect(button).not.toHaveClass("bg-white");
  });

  it("draws the menu button as a blue ring on a white page", () => {
    path.current = "/writing";
    render(<SiteMenu tone="blue" />);
    const button = screen.getByRole("button", { name: "Open menu" });
    expect(button).toHaveClass(
      "border-2",
      "border-[var(--color-business-blue)]",
    );
  });

  it("draws the close button as a white ring, not a filled circle", async () => {
    await openAt("/");
    const close = screen.getByRole("button", { name: "Close menu" });
    expect(close).toHaveClass(
      "rounded-full",
      "border-2",
      "border-white",
      "text-white",
    );
    expect(close).not.toHaveClass("bg-white");
  });

  it("keeps the panel blue on a white page", async () => {
    await openAt("/cases", { tone: "blue" });
    expect(screen.getByRole("dialog", { name: "Menu" })).toHaveClass(
      "bg-[var(--color-business-blue)]",
    );
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
