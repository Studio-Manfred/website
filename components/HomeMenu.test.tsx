import { describe, expect, it } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
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

  it("shows a short line under each link", async () => {
    await openMenu();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    for (const line of [
      "Back to the top.",
      "Texts and thoughts from the team.",
      "Training and courses we offer.",
      "Projects we are proud of.",
    ]) {
      expect(within(nav).getByText(line)).toBeInTheDocument();
    }
  });

  it("closes on Escape and returns focus to the menu button", async () => {
    const { user, trigger } = await openMenu();
    await user.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("closes when the close button is clicked", async () => {
    const { user } = await openMenu();
    await user.click(screen.getByRole("button", { name: "Close menu" }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });
});
