import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeMenu } from "./HomeMenu";

// Next's Link calls preventDefault on a client-side navigation, so the mock
// does too. A close handler that skips prevented clicks would then fail here.
vi.mock("next/link", () => ({
  default: ({
    href,
    onClick,
    children,
    ...rest
  }: React.ComponentPropsWithoutRef<"a"> & { href: string }) => (
    <a
      href={href}
      onClick={(event) => {
        onClick?.(event);
        event.preventDefault();
      }}
      {...rest}
    >
      {children}
    </a>
  ),
}));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  delete (window as unknown as { manfred?: unknown }).manfred;
});

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

  it("lists the three main links in the primary nav", async () => {
    await openMenu();
    const nav = screen.getByRole("navigation", { name: "Primary" });
    const links = within(nav).getAllByRole("link");
    const expected = [
      ["Home", "/"],
      ["Writing", "/writing"],
      ["Training & Courses", "/training-and-courses"],
    ];
    expect(links).toHaveLength(expected.length);
    expect(within(nav).queryByText("Cases")).not.toBeInTheDocument();
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

  it("closes and scrolls to the top when Home is clicked", async () => {
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { user } = await openMenu();
    await user.click(screen.getByRole("link", { name: /^Home/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
  });

  it("closes when another link is clicked", async () => {
    const { user } = await openMenu();
    await user.click(screen.getByRole("link", { name: /^Writing/ }));
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("reports the Get in touch click with the menu location", async () => {
    const manfred = vi.fn();
    (window as unknown as { manfred?: typeof manfred }).manfred = manfred;
    window.history.pushState({}, "", "/");
    const { user } = await openMenu();
    const link = screen.getByRole("link", { name: "Get in touch" });
    expect(link).toHaveAttribute("href", "mailto:hello@studiomanfred.com");
    link.addEventListener("click", (event) => event.preventDefault());
    await user.click(link);
    expect(manfred).toHaveBeenCalledWith("Get in touch", {
      props: { location: "menu", page: "/" },
    });
  });

  it("shows the email as a link and the phone number as plain text", async () => {
    await openMenu();
    expect(
      screen.getByRole("link", { name: "hello@studiomanfred.com" }),
    ).toHaveAttribute("href", "mailto:hello@studiomanfred.com");
    expect(screen.getByText("079 — 336 29 10")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /079/ })).not.toBeInTheDocument();
  });
});

describe("HomeMenu sticky bar", () => {
  type Callback = (entries: unknown[]) => void;
  let callbacks: Callback[];
  let options: IntersectionObserverInit[];
  let disconnect: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    callbacks = [];
    options = [];
    disconnect = vi.fn();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        constructor(callback: Callback, init: IntersectionObserverInit) {
          callbacks.push(callback);
          options.push(init);
        }
        observe = vi.fn();
        unobserve = vi.fn();
        takeRecords = () => [];
        disconnect = disconnect;
      },
    );
  });

  const renderWithHero = () =>
    render(
      <>
        <div id="hero" />
        <HomeMenu />
      </>,
    );
  const bar = () => screen.getByTestId("home-menu-bar");
  const scrollPastHero = () =>
    act(() =>
      callbacks[0]([
        { isIntersecting: false, boundingClientRect: { bottom: 10 }, rootBounds: { top: 72 } },
      ]),
    );

  it("hides the bar while the hero is in view", () => {
    renderWithHero();
    expect(bar()).toHaveAttribute("aria-hidden", "true");
  });

  it("shows the bar once the hero has scrolled past", () => {
    renderWithHero();
    scrollPastHero();
    expect(bar()).toHaveAttribute("aria-hidden", "false");
  });

  it("hides the bar again when the hero comes back into view", () => {
    renderWithHero();
    scrollPastHero();
    act(() =>
      callbacks[0]([
        { isIntersecting: true, boundingClientRect: { bottom: 400 }, rootBounds: { top: 72 } },
      ]),
    );
    expect(bar()).toHaveAttribute("aria-hidden", "true");
  });

  it("keeps one menu button in both states", () => {
    renderWithHero();
    expect(screen.getAllByRole("button", { name: "Open menu" })).toHaveLength(1);
    scrollPastHero();
    expect(screen.getAllByRole("button", { name: "Open menu" })).toHaveLength(1);
  });

  it("watches the hero with the bar height as the top margin", () => {
    renderWithHero();
    expect(options[0]).toEqual({ threshold: 0, rootMargin: "-72px 0px 0px 0px" });
  });

  it("uses the taller desktop bar height from 768 px up", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
    } as MediaQueryList);
    renderWithHero();
    expect(options[0]).toEqual({
      threshold: 0,
      rootMargin: "-104px 0px 0px 0px",
    });
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = renderWithHero();
    unmount();
    expect(disconnect).toHaveBeenCalled();
  });
});
