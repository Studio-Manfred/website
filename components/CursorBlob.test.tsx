import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { CursorBlob } from "./CursorBlob";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function flushRaf(times = 5) {
  for (let i = 0; i < times; i++) {
    act(() => {
      vi.advanceTimersByTime(16);
    });
  }
}

describe("CursorBlob", () => {
  it("renders an aria-hidden decorative element", () => {
    const { container } = render(<CursorBlob />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("aria-hidden")).not.toBeNull();
  });

  it("has pointer-events disabled via the pointer-events-none class", () => {
    const { container } = render(<CursorBlob />);
    const el = container.firstElementChild as HTMLElement;
    expect(el.className).toContain("pointer-events-none");
  });

  it("updates the inline transform style when the mouse moves", () => {
    const { container } = render(<CursorBlob />);
    const el = container.firstElementChild as HTMLElement;

    flushRaf();
    const before = el.style.transform;

    act(() => {
      const event = new MouseEvent("mousemove", {
        clientX: 400,
        clientY: 250,
        bubbles: true,
      });
      document.body.dispatchEvent(event);
    });
    flushRaf(10);

    expect(el.style.transform).not.toBe(before);
    expect(el.style.transform).toMatch(/translate\(/);
  });

  it("cancels its animation frame on unmount", () => {
    const cancelSpy = vi.spyOn(globalThis, "cancelAnimationFrame");
    const { unmount } = render(<CursorBlob />);
    flushRaf();
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });

  it("skips the mousemove + RAF loop when prefers-reduced-motion is on (STU-290)", () => {
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation((q: string) => ({
      matches: q === "(prefers-reduced-motion: reduce)",
      media: q,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })) as unknown as typeof window.matchMedia;
    const rafSpy = vi.spyOn(globalThis, "requestAnimationFrame");
    try {
      const before = rafSpy.mock.calls.length;
      const { container } = render(<CursorBlob />);
      const el = container.firstElementChild as HTMLElement;
      // No RAF scheduled by the effect when reduced motion is active.
      expect(rafSpy.mock.calls.length).toBe(before);

      // Mousemove should not change the transform.
      const initial = el.style.transform;
      act(() => {
        document.body.dispatchEvent(
          new MouseEvent("mousemove", { clientX: 500, clientY: 300, bubbles: true }),
        );
      });
      flushRaf(10);
      expect(el.style.transform).toBe(initial);
    } finally {
      window.matchMedia = original;
      rafSpy.mockRestore();
    }
  });
});
