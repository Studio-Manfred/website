import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { FadeIn } from "./FadeIn";

type ObserverCallback = (
  entries: Array<{ isIntersecting: boolean }>,
  observer: IntersectionObserver,
) => void;

type MockObserver = {
  observe: ReturnType<typeof vi.fn>;
  unobserve: ReturnType<typeof vi.fn>;
  disconnect: ReturnType<typeof vi.fn>;
  callback: ObserverCallback;
  options: IntersectionObserverInit | undefined;
};

let lastObserver: MockObserver | null = null;
let originalIO: typeof IntersectionObserver;

beforeEach(() => {
  originalIO = globalThis.IntersectionObserver;
  lastObserver = null;
  class FakeIntersectionObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    callback: ObserverCallback;
    options: IntersectionObserverInit | undefined;
    constructor(cb: ObserverCallback, options?: IntersectionObserverInit) {
      this.callback = cb;
      this.options = options;
      lastObserver = this as unknown as MockObserver;
    }
  }
  globalThis.IntersectionObserver =
    FakeIntersectionObserver as unknown as typeof IntersectionObserver;
});

afterEach(() => {
  globalThis.IntersectionObserver = originalIO;
});

describe("FadeIn", () => {
  it("constructs an IntersectionObserver with threshold around 0.06", () => {
    render(
      <FadeIn>
        <span>content</span>
      </FadeIn>,
    );
    expect(lastObserver).not.toBeNull();
    expect(lastObserver!.options?.threshold).toBeCloseTo(0.06, 5);
  });

  it("adds the in-view class when the observer reports isIntersecting", () => {
    const { container } = render(
      <FadeIn>
        <span>content</span>
      </FadeIn>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.classList.contains("in-view")).toBe(false);

    lastObserver!.callback(
      [{ isIntersecting: true }],
      lastObserver as unknown as IntersectionObserver,
    );
    expect(wrapper.classList.contains("in-view")).toBe(true);
  });

  it("does not add the in-view class while not intersecting", () => {
    const { container } = render(
      <FadeIn>
        <span>content</span>
      </FadeIn>,
    );
    const wrapper = container.firstElementChild as HTMLElement;
    lastObserver!.callback(
      [{ isIntersecting: false }],
      lastObserver as unknown as IntersectionObserver,
    );
    expect(wrapper.classList.contains("in-view")).toBe(false);
  });

  it("disconnects the observer on unmount", () => {
    const { unmount } = render(
      <FadeIn>
        <span>content</span>
      </FadeIn>,
    );
    expect(lastObserver!.disconnect).not.toHaveBeenCalled();
    unmount();
    expect(lastObserver!.disconnect).toHaveBeenCalledTimes(1);
  });

  it("applies the delay-1 class when delay prop is 1", () => {
    const { container } = render(
      <FadeIn delay={1}>
        <span>content</span>
      </FadeIn>,
    );
    expect(container.firstElementChild?.className).toContain("fade-up-delay-1");
  });
});
