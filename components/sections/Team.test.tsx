import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Team } from "./Team";

vi.mock("next/image", () => ({
  default: ({ alt }: { alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} data-testid="team-photo" />
  ),
}));

vi.mock("@/components/FadeIn", () => ({
  FadeIn: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="fade-in">{children}</div>
  ),
}));

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

function countFloaters(container: HTMLElement) {
  // Floaters are the absolutely-positioned divs that render an emoji directly as text.
  // The team uses 4 photos and 4 FadeIn wrappers inside the grid. The floaters live
  // outside the grid and contain a single emoji child.
  return container.querySelectorAll("section > div[style*='floatUp']").length;
}

describe("Team", () => {
  it("renders the rave toggle button in its calm state by default", () => {
    render(<Team />);
    const button = screen.getByRole("button", { name: /make it rave/i });
    expect(button).toBeInTheDocument();
    expect(button.textContent).toMatch(/Make it rave/);
  });

  it("grows the floater array when rave is on but caps it near the 20 limit", () => {
    const { container } = render(<Team />);
    const button = screen.getByRole("button", { name: /make it rave/i });

    fireEvent.click(button);

    // Initial tick produces one floater.
    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(countFloaters(container)).toBe(1);

    // Run well beyond the 20-cap. The source keeps the last 20 entries and
    // appends a fresh floater on each tick, so the steady-state ceiling is 21.
    act(() => {
      vi.advanceTimersByTime(300 * 40);
    });

    const count = countFloaters(container);
    expect(count).toBeGreaterThan(1);
    expect(count).toBeLessThanOrEqual(21);
  });

  it("returns to the calm visual state when rave is switched off", () => {
    const { container } = render(<Team />);
    const button = screen.getByRole("button", { name: /make it rave/i });

    fireEvent.click(button);
    act(() => {
      vi.advanceTimersByTime(300 * 5);
    });
    expect(countFloaters(container)).toBeGreaterThan(0);

    const stopBtn = screen.getByRole("button", { name: /stop the rave/i });
    fireEvent.click(stopBtn);

    expect(countFloaters(container)).toBe(0);
    const section = container.querySelector("section") as HTMLElement;
    expect(section.style.background).toBe("white");
    expect(
      screen.getByRole("button", { name: /make it rave/i }),
    ).toBeInTheDocument();
  });

  it("clears intervals on unmount so no leaks fire after teardown", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<Team />);
    fireEvent.click(screen.getByRole("button", { name: /make it rave/i }));

    act(() => {
      vi.advanceTimersByTime(300);
    });

    clearSpy.mockClear();
    unmount();

    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
