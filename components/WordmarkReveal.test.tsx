import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { INTRO_DURATION_MS } from "@/lib/hero-intro";
import { WordmarkReveal } from "./WordmarkReveal";

// Frame n is "M{n} 0Z", so the frame on screen can be read from the path.
const FRAMES = Array.from({ length: 72 }, (_, n) =>
  n === 0 ? "" : `M${n} 0Z`,
);

beforeEach(() => {
  vi.useFakeTimers({
    toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"],
  });
});

afterEach(() => {
  vi.useRealTimers();
});

function maskPath(container: HTMLElement) {
  return container.querySelector("mask path");
}

function shownFrame(container: HTMLElement) {
  const d = maskPath(container)?.getAttribute("d") ?? "";
  return d === "" ? 0 : Number(d.match(/^M(\d+)/)?.[1]);
}

describe("WordmarkReveal", () => {
  it("shows the full wordmark with no mask when done", () => {
    const { container } = render(
      <WordmarkReveal phase="done" frames={null} onComplete={() => {}} />,
    );
    expect(container.querySelectorAll("svg path:not(mask path)")).toHaveLength(
      7,
    );
    expect(container.querySelector("g[mask]")).toBeNull();
  });

  it("has the name Manfred in every phase, and hides the drawing from assistive tech", () => {
    for (const phase of ["pending", "playing", "done"] as const) {
      const { container, unmount } = render(
        <WordmarkReveal phase={phase} frames={FRAMES} onComplete={() => {}} />,
      );
      expect(screen.getByRole("img", { name: "Manfred" })).toBeInTheDocument();
      expect(container.querySelector("svg")).toHaveAttribute(
        "aria-hidden",
        "true",
      );
      unmount();
    }
  });

  it("starts with an empty stencil while playing", () => {
    const { container } = render(
      <WordmarkReveal phase="playing" frames={FRAMES} onComplete={() => {}} />,
    );
    expect(container.querySelector("g[mask]")).not.toBeNull();
    expect(maskPath(container)?.getAttribute("d")).toBe("");
  });

  it("does not mask the wordmark before the pen starts", () => {
    const { container } = render(
      <WordmarkReveal phase="pending" frames={FRAMES} onComplete={() => {}} />,
    );
    expect(container.querySelector("g[mask]")).toBeNull();
  });

  it("follows the frame that matches the elapsed time", () => {
    const { container } = render(
      <WordmarkReveal phase="playing" frames={FRAMES} onComplete={() => {}} />,
    );
    act(() => {
      vi.advanceTimersByTime(800);
    });
    // 800 ms at 25 fps and 1.75x is frame 35.
    expect(Math.abs(shownFrame(container) - 35)).toBeLessThanOrEqual(1);
  });

  it("reports completion once, and stops", () => {
    const onComplete = vi.fn();
    const { container } = render(
      <WordmarkReveal
        phase="playing"
        frames={FRAMES}
        onComplete={onComplete}
      />,
    );
    act(() => {
      vi.advanceTimersByTime(INTRO_DURATION_MS + 500);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(shownFrame(container)).toBe(71);
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it("removes the mask when the phase becomes done", () => {
    const { container, rerender } = render(
      <WordmarkReveal phase="playing" frames={FRAMES} onComplete={() => {}} />,
    );
    rerender(
      <WordmarkReveal phase="done" frames={FRAMES} onComplete={() => {}} />,
    );
    expect(container.querySelector("g[mask]")).toBeNull();
  });

  it("stops the loop when it unmounts", () => {
    const onComplete = vi.fn();
    const { unmount } = render(
      <WordmarkReveal
        phase="playing"
        frames={FRAMES}
        onComplete={onComplete}
      />,
    );
    unmount();
    act(() => {
      vi.advanceTimersByTime(INTRO_DURATION_MS + 500);
    });
    expect(onComplete).not.toHaveBeenCalled();
  });

  it("keeps a fixed box that matches the logo height", () => {
    render(
      <WordmarkReveal
        phase="done"
        frames={null}
        onComplete={() => {}}
        height={100}
      />,
    );
    const box = screen.getByRole("img", { name: "Manfred" });
    expect(box).toHaveStyle({ height: "100px", width: "219.9px" });
  });

  it("gives each instance its own mask id", () => {
    const { container } = render(
      <>
        <WordmarkReveal phase="playing" frames={FRAMES} onComplete={() => {}} />
        <WordmarkReveal phase="playing" frames={FRAMES} onComplete={() => {}} />
      </>,
    );
    const ids = [...container.querySelectorAll("mask")].map((m) => m.id);
    expect(new Set(ids).size).toBe(2);
  });
});
