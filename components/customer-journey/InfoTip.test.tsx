import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InfoTip } from "./InfoTip";

const setup = () =>
  render(
    <div>
      <InfoTip topic="the gap">What the gap means.</InfoTip>
      <button type="button">Elsewhere</button>
    </div>,
  );
const tip = () => screen.getByRole("button", { name: "About the gap" });

describe("InfoTip", () => {
  it("is closed at first and opens on tap", async () => {
    setup();
    expect(tip()).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText("What the gap means.")).not.toBeInTheDocument();
    await userEvent.click(tip());
    expect(tip()).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("note")).toHaveTextContent("What the gap means.");
  });

  it("closes on the button again", async () => {
    setup();
    await userEvent.click(tip());
    await userEvent.click(tip());
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });

  it("closes on Esc and gives focus back to the button", async () => {
    setup();
    await userEvent.click(tip());
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
    expect(tip()).toHaveFocus();
  });

  it("closes on a tap outside, but not on a tap inside the text", async () => {
    setup();
    await userEvent.click(tip());
    await userEvent.click(screen.getByRole("note"));
    expect(screen.getByRole("note")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Elsewhere" }));
    expect(screen.queryByRole("note")).not.toBeInTheDocument();
  });
});
