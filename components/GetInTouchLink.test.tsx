import { describe, expect, it, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GetInTouchLink } from "./GetInTouchLink";

afterEach(() => {
  delete (window as unknown as { manfred?: unknown }).manfred;
});

function preventNavigation(el: HTMLElement) {
  el.addEventListener("click", (event) => event.preventDefault());
}

describe("GetInTouchLink", () => {
  it("renders a mailto link with the default label", () => {
    render(<GetInTouchLink location="hero" />);
    const link = screen.getByRole("link", { name: "Get in touch" });
    expect(link).toHaveAttribute("href", "mailto:hello@studiomanfred.com");
  });

  it("fires window.manfred with the placement and current pathname on click", async () => {
    const manfred = vi.fn();
    (window as unknown as { manfred?: typeof manfred }).manfred = manfred;
    window.history.pushState({}, "", "/join-us");

    const user = userEvent.setup();
    render(<GetInTouchLink location="join-us-cta" />);
    const link = screen.getByRole("link", { name: "Get in touch" });
    preventNavigation(link);
    await user.click(link);

    expect(manfred).toHaveBeenCalledTimes(1);
    expect(manfred).toHaveBeenCalledWith("Get in touch", {
      props: { location: "join-us-cta", page: "/join-us" },
    });
  });

  it("does not throw when the tracker is not yet on window", async () => {
    const user = userEvent.setup();
    render(<GetInTouchLink location="hero" />);
    const link = screen.getByRole("link", { name: "Get in touch" });
    preventNavigation(link);
    await expect(user.click(link)).resolves.not.toThrow();
  });

  it("forwards className and accepts custom children", () => {
    render(
      <GetInTouchLink location="what-else" className="underline">
        Get in touch.
      </GetInTouchLink>,
    );
    const link = screen.getByRole("link", { name: "Get in touch." });
    expect(link).toHaveClass("underline");
  });
});
