import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { GroupHeadline } from "./GroupHeadline";
import { GROUP_INTRO, GROUP_WORDS } from "@/lib/group";

function mockReducedMotion(reduce: boolean) {
  vi.spyOn(window, "matchMedia").mockImplementation(
    (query: string) => ({ matches: reduce && query.includes("reduce"), media: query }) as MediaQueryList,
  );
}

describe("GroupHeadline", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("gives screen readers the whole sentence at once", () => {
    mockReducedMotion(false);
    render(<GroupHeadline />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveAccessibleName(expect.stringContaining(GROUP_INTRO));
    for (const w of GROUP_WORDS) expect(h1).toHaveAccessibleName(new RegExp(w.word, "i"));
  });

  it("types the intro, then the first word in its company's style", () => {
    mockReducedMotion(false);
    render(<GroupHeadline />);
    const typed = screen.getByTestId("typed");
    expect(typed).toHaveTextContent("");
    act(() => vi.advanceTimersByTime(60_000));
    expect(typed).toHaveTextContent(GROUP_INTRO);
    const word = screen.getByTestId("typed-word");
    const current = GROUP_WORDS.find((w) => w.word === word.textContent?.trim());
    expect(word).toHaveAttribute("data-company", current ? current.company : expect.any(String));
  });

  it("shows the sentence without typing under reduced motion", () => {
    mockReducedMotion(true);
    render(<GroupHeadline />);
    expect(screen.getByTestId("typed")).toHaveTextContent(GROUP_INTRO);
    expect(screen.getByTestId("typed-word")).toHaveTextContent(GROUP_WORDS[0].word);
    expect(screen.getByTestId("typed-word")).toHaveAttribute("data-company", GROUP_WORDS[0].company);
  });
});
