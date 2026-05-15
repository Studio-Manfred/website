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
});
