import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeMenu } from "./HomeMenu";

async function openMenu() {
  const user = userEvent.setup();
  render(<HomeMenu />);
  const trigger = screen.getByRole("button", { name: "Open menu" });
  await user.click(trigger);
  return { user, trigger };
}

describe("HomeMenu", () => {
  it("renders a closed menu button", () => {
    render(<HomeMenu />);
    const trigger = screen.getByRole("button", { name: "Open menu" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the panel when the button is clicked", async () => {
    const { trigger } = await openMenu();
    expect(screen.getByRole("dialog", { name: "Menu" })).toBeInTheDocument();
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("lists the four main links in the primary nav", async () => {
    await openMenu();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    const expected = [
      ["Home", "/"],
      ["Writing", "/writing"],
      ["Training & Courses", "/training-and-courses"],
      ["Cases", "/cases"],
    ];
    expect(links).toHaveLength(expected.length);
    links.forEach((link, index) => {
      const [title, href] = expected[index];
      expect(link).toHaveAttribute("href", href);
      expect(within(link).getByText(title)).toBeInTheDocument();
    });
  });
});
