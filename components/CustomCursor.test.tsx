import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { CustomCursor } from "./CustomCursor";
import * as reducedMotion from "@/lib/prefers-reduced-motion";

function stubMatchMedia(answers: Record<string, boolean>) {
  window.matchMedia = ((query: string) => ({
    matches: Object.entries(answers).some(([k, v]) => v && query.includes(k)),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })) as unknown as typeof window.matchMedia;
}

beforeEach(() => {
  stubMatchMedia({ "pointer: fine": true });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("CustomCursor", () => {
  it("renders an aria-hidden fixed overlay with mix-blend-difference and the M svg", () => {
    const { container } = render(<CustomCursor />);
    const el = container.firstElementChild as HTMLDivElement | null;
    expect(el).not.toBeNull();
    expect(el).toHaveAttribute("aria-hidden");
    expect(el?.style.mixBlendMode).toBe("difference");
    expect(el?.className).toContain("fixed");
    expect(el?.className).toContain("pointer-events-none");
    expect(el?.querySelector("svg path")).not.toBeNull();
  });

  it("updates transform in response to mousemove", async () => {
    const { container } = render(<CustomCursor />);
    const el = container.firstElementChild as HTMLDivElement;

    window.dispatchEvent(
      new MouseEvent("mousemove", { clientX: 300, clientY: 200 }),
    );
    // rAF isn't wired to real time in jsdom; the setup.ts shim uses setTimeout.
    await new Promise((r) => setTimeout(r, 32));

    expect(el.style.transform).toContain("278px");
    expect(el.style.transform).toContain("178px");
  });

  it("skips the pointer-track loop when reduced motion is preferred", async () => {
    vi.spyOn(reducedMotion, "prefersReducedMotion").mockReturnValue(true);
    const { container } = render(<CustomCursor />);
    const el = container.firstElementChild as HTMLDivElement;
    const initial = el.style.transform;

    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, clientY: 500 }));
    await new Promise((r) => setTimeout(r, 32));

    expect(el.style.transform).toBe(initial);
  });

  it("skips the pointer-track loop under forced-colors", async () => {
    stubMatchMedia({ "pointer: fine": true, "forced-colors: active": true });
    const { container } = render(<CustomCursor />);
    const el = container.firstElementChild as HTMLDivElement;
    const initial = el.style.transform;

    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, clientY: 500 }));
    await new Promise((r) => setTimeout(r, 32));

    expect(el.style.transform).toBe(initial);
  });

  it("skips the pointer-track loop on coarse (touch) pointers", async () => {
    stubMatchMedia({ "pointer: fine": false });
    const { container } = render(<CustomCursor />);
    const el = container.firstElementChild as HTMLDivElement;
    const initial = el.style.transform;

    window.dispatchEvent(new MouseEvent("mousemove", { clientX: 500, clientY: 500 }));
    await new Promise((r) => setTimeout(r, 32));

    expect(el.style.transform).toBe(initial);
  });
});
