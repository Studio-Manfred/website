import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import {
  BUTTON_AFTER_HEADLINE_MS,
  INTRO_DURATION_MS,
  INTRO_TIMEOUT_MS,
} from "@/lib/hero-intro";
import { HeroIntro } from "./HeroIntro";

// FadeIn is replaced by a stub that shows the start prop it gets.
vi.mock("@/components/FadeIn", () => ({
  FadeIn: ({
    children,
    start = true,
  }: {
    children: React.ReactNode;
    start?: boolean;
  }) => (
    <div data-testid="fade" data-start={String(start)}>
      {children}
    </div>
  ),
}));

const FRAMES = Array.from({ length: 72 }, (_, n) =>
  n === 0 ? "" : `M${n} 0Z`,
);

beforeEach(() => {
  vi.useFakeTimers({
    toFake: [
      "requestAnimationFrame",
      "cancelAnimationFrame",
      "performance",
      "setTimeout",
      "clearTimeout",
    ],
  });
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

async function flush() {
  await act(async () => {
    await Promise.resolve();
  });
}

function advance(ms: number) {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

function parts(container: HTMLElement) {
  const [headline, button] = screen.getAllByTestId("fade");
  return {
    phase: container.firstElementChild?.getAttribute("data-intro"),
    headline: headline.getAttribute("data-start"),
    button: button.getAttribute("data-start"),
  };
}

function preferReducedMotion() {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) =>
      ({
        matches: query === "(prefers-reduced-motion: reduce)",
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }) as unknown as MediaQueryList,
  );
}

describe("HeroIntro", () => {
  it("starts pending, loads the stencil once, and holds the text", () => {
    const loader = vi.fn().mockReturnValue(new Promise(() => {}));
    const { container } = render(<HeroIntro loadStencil={loader} />);
    expect(loader).toHaveBeenCalledTimes(1);
    expect(parts(container)).toEqual({
      phase: "pending",
      headline: "false",
      button: "false",
    });
  });

  it("plays once the stencil has loaded, and still holds the text", async () => {
    const loader = vi.fn().mockResolvedValue(FRAMES);
    const { container } = render(<HeroIntro loadStencil={loader} />);
    await flush();
    advance(INTRO_DURATION_MS / 2);
    expect(parts(container)).toEqual({
      phase: "playing",
      headline: "false",
      button: "false",
    });
  });

  it("starts the headline when the drawing is done, and the button 300 ms later", async () => {
    const loader = vi.fn().mockResolvedValue(FRAMES);
    const { container } = render(<HeroIntro loadStencil={loader} />);
    await flush();
    advance(INTRO_DURATION_MS + 100);
    expect(parts(container)).toEqual({
      phase: "done",
      headline: "true",
      button: "false",
    });
    advance(BUTTON_AFTER_HEADLINE_MS);
    expect(parts(container).button).toBe("true");
  });

  it("shows everything at once for reduced motion, without loading the stencil", async () => {
    preferReducedMotion();
    const loader = vi.fn().mockResolvedValue(FRAMES);
    const { container } = render(<HeroIntro loadStencil={loader} />);
    await flush();
    expect(loader).not.toHaveBeenCalled();
    expect(parts(container)).toEqual({
      phase: "done",
      headline: "true",
      button: "true",
    });
  });

  it("shows everything at once when the stencil fails to load", async () => {
    const loader = vi.fn().mockRejectedValue(new Error("offline"));
    const { container } = render(<HeroIntro loadStencil={loader} />);
    await flush();
    expect(parts(container)).toEqual({
      phase: "done",
      headline: "true",
      button: "true",
    });
  });

  it("gives up after the timeout and shows everything", () => {
    const loader = vi.fn().mockReturnValue(new Promise(() => {}));
    const { container } = render(<HeroIntro loadStencil={loader} />);
    advance(INTRO_TIMEOUT_MS + 10);
    expect(parts(container)).toEqual({
      phase: "done",
      headline: "true",
      button: "true",
    });
  });

  it("keeps the wordmark, the headline and the button in the page in every phase", async () => {
    const loader = vi.fn().mockResolvedValue(FRAMES);
    render(<HeroIntro loadStencil={loader} />);
    const check = () => {
      expect(screen.getByRole("img", { name: "Manfred" })).toBeInTheDocument();
      expect(
        screen.getByRole("heading", {
          level: 1,
          name: /Building Better Product Companies/i,
        }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /Get in touch/i }),
      ).toBeInTheDocument();
    };
    check();
    await flush();
    check();
    advance(INTRO_DURATION_MS + 500);
    check();
  });
});
