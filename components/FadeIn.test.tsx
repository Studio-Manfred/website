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
  it("constructs an IntersectionObserver with threshold 0 so tall wrappers can fire", () => {
    // STU-313 regression: a non-zero threshold (was 0.06) means the observer
    // never fires for wrappers taller than 1/threshold times the viewport
    // — e.g. long /writing/<slug> bodies stayed at opacity 0 forever. With
    // threshold 0 + the existing -40px bottom rootMargin, the observer fires
    // once any pixel of the element is past the rootMargin boundary, which
    // is the right "any portion visible" semantic.
    render(
      <FadeIn>
        <span>content</span>
      </FadeIn>,
    );
    expect(lastObserver).not.toBeNull();
    expect(lastObserver!.options?.threshold).toBe(0);
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

  it("skips the observer and marks in-view immediately when prefers-reduced-motion is on (STU-290)", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    try {
      const { container } = render(
        <FadeIn>
          <span>content</span>
        </FadeIn>,
      );
      expect(lastObserver).toBeNull();
      expect(
        (container.firstElementChild as HTMLElement).classList.contains("in-view"),
      ).toBe(true);
    } finally {
      window.matchMedia = original;
    }
  });
});
