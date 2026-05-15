import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { Marquee } from "./Marquee";

// jsdom has no canvas context — stub a minimal one.
const stubContext = {
  setTransform: vi.fn(),
  clearRect: vi.fn(),
  fillText: vi.fn(),
  save: vi.fn(),
  restore: vi.fn(),
  translate: vi.fn(),
  rotate: vi.fn(),
  measureText: vi.fn(() => ({ width: 10 })),
  font: "",
  textBaseline: "",
  textAlign: "",
  fillStyle: "",
};

let fontsReadyResolve: (() => void) | undefined;

beforeEach(() => {
  vi.useFakeTimers();

  HTMLCanvasElement.prototype.getContext = vi.fn(() => stubContext) as unknown as HTMLCanvasElement["getContext"];

  // Stub document.fonts.ready so the post-mount resize only fires when we want it to.
  const fontsReady = new Promise<void>((resolve) => {
    fontsReadyResolve = resolve;
  });
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: fontsReady },
  });
});

afterEach(() => {
  fontsReadyResolve = undefined;
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("Marquee", () => {
  it("renders an accessible canvas with role=img and aria-label", () => {
    const { container } = render(<Marquee />);
    const canvas = container.querySelector("canvas");
    expect(canvas).not.toBeNull();
    expect(canvas?.getAttribute("role")).toBe("img");
    expect(canvas?.getAttribute("aria-label")).toBeTruthy();
  });

  it("keeps the inline canvas height stable between first paint and post-mount (hydration regression)", () => {
    const { container } = render(<Marquee />);
    const canvas = container.querySelector("canvas") as HTMLCanvasElement;

    const firstHeight = canvas.style.height;
    expect(firstHeight).toMatch(/px$/);

    // Flush microtasks / RAFs that ResizeObserver / fonts.ready might trigger.
    act(() => {
      vi.advanceTimersByTime(32);
    });

    const afterTickHeight = canvas.style.height;
    expect(afterTickHeight).toBe(firstHeight);
  });

  it("renders the brand heading", () => {
    const { getByText } = render(<Marquee />);
    expect(getByText("Brands that trust us")).toBeInTheDocument();
  });
});
