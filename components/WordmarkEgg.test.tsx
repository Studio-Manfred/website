import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CYCLE_INTERVAL_MS, WORDMARK_FONTS } from "@/lib/wordmark-fonts";
import { WordmarkReveal } from "./WordmarkReveal";

// The real module calls next/font/google, which only works inside Next's build.
vi.mock("@/components/wordmark-fonts", () => ({
  wordmarkFamilies: Object.fromEntries(
    WORDMARK_FONTS.map(({ key }) => [key, `family-${key}`]),
  ),
}));

const loadFont = vi.fn((_font: string) => Promise.resolve([] as FontFace[]));
const reduced = vi.hoisted(() => ({ value: false }));
vi.mock("@/lib/prefers-reduced-motion", () => ({
  prefersReducedMotion: () => reduced.value,
}));

const [first, second] = WORDMARK_FONTS;

function setup(props: { egg?: boolean } = { egg: true }) {
  const user = userEvent.setup({ delay: null });
  const view = render(
    <WordmarkReveal
      phase="done"
      frames={null}
      onComplete={() => {}}
      egg={props.egg}
    />,
  );
  const wordmark = screen.getByRole("img", { name: "Manfred" });
  return { user, wordmark, ...view };
}

const eggText = (container: HTMLElement) => container.querySelector("text");
const artwork = (container: HTMLElement) =>
  container.querySelector("svg > g") as SVGGElement;

// The fonts come from a dynamic import, then document.fonts.load.
async function flush() {
  await act(async () => {
    await vi.dynamicImportSettled();
    await vi.advanceTimersByTimeAsync(0);
  });
}

async function tick(ms: number) {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
}

beforeEach(() => {
  vi.useFakeTimers();
  // Testing Library waits on a real timer unless it sees a `jest` global.
  vi.stubGlobal("jest", { advanceTimersByTime: vi.advanceTimersByTime });
  reduced.value = false;
  loadFont.mockClear();
  loadFont.mockImplementation(() => Promise.resolve([] as FontFace[]));
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { load: loadFont },
  });
  window.manfred = vi.fn();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  delete window.manfred;
});

describe("the wordmark easter egg: mouse", () => {
  it("shows the real wordmark and no text until you hover", () => {
    const { container } = setup();
    expect(eggText(container)).toBeNull();
    expect(artwork(container)).toHaveAttribute("visibility", "visible");
  });

  it("swaps the artwork for the word Manfred in the first font on hover", async () => {
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    const text = eggText(container);
    expect(text).not.toBeNull();
    expect(text?.textContent).toBe("Manfred");
    expect(text?.style.fontFamily).toBe(`family-${first.key}`);
    expect(artwork(container)).toHaveAttribute("visibility", "hidden");
  });

  it("changes font on every cycle interval while you hover", async () => {
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    await tick(CYCLE_INTERVAL_MS);
    expect(eggText(container)?.style.fontFamily).toBe(`family-${second.key}`);
    await tick(CYCLE_INTERVAL_MS);
    expect(eggText(container)?.style.fontFamily).toBe(
      `family-${WORDMARK_FONTS[2].key}`,
    );
  });

  it("brings the real wordmark back when the mouse leaves, and stops cycling", async () => {
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    await user.unhover(wordmark);
    expect(eggText(container)).toBeNull();
    expect(artwork(container)).toHaveAttribute("visibility", "visible");
    await tick(2000);
    expect(eggText(container)).toBeNull();
  });

  it("fits every font to the same width, so the box does not change", async () => {
    const { user, wordmark, container } = setup();
    const before = wordmark.getAttribute("style");
    await user.hover(wordmark);
    await flush();
    const text = eggText(container);
    expect(text?.getAttribute("textLength")).toBe("560");
    expect(text?.getAttribute("lengthAdjust")).toBe("spacingAndGlyphs");
    expect(wordmark.getAttribute("style")).toBe(before);
  });

  it("keeps the name Manfred for assistive tech, and hides the text", async () => {
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    expect(screen.getByRole("img", { name: "Manfred" })).toBe(wordmark);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("skips a font that fails to load", async () => {
    loadFont.mockImplementation((font: string) =>
      font.includes(`family-${first.key}`)
        ? Promise.reject(new Error("no font"))
        : Promise.resolve([] as FontFace[]),
    );
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    expect(eggText(container)?.style.fontFamily).toBe(`family-${second.key}`);
  });

  it("waits to show anything until a font has loaded", async () => {
    let release: () => void = () => {};
    loadFont.mockImplementation(
      () => new Promise<FontFace[]>((resolve) => (release = () => resolve([]))),
    );
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    expect(eggText(container)).toBeNull();
    expect(artwork(container)).toHaveAttribute("visibility", "visible");
    release();
    await tick(CYCLE_INTERVAL_MS);
    expect(eggText(container)).not.toBeNull();
  });
});

describe("the wordmark easter egg: touch", () => {
  const tap = (user: ReturnType<typeof userEvent.setup>, el: HTMLElement) =>
    user.pointer({ keys: "[TouchA]", target: el });

  it("starts cycling on a tap", async () => {
    const { user, wordmark, container } = setup();
    await tap(user, wordmark);
    await flush();
    expect(eggText(container)).not.toBeNull();
    await tick(CYCLE_INTERVAL_MS);
    expect(eggText(container)?.style.fontFamily).toBe(`family-${second.key}`);
  });

  it("stops on a second tap", async () => {
    const { user, wordmark, container } = setup();
    await tap(user, wordmark);
    await flush();
    await tap(user, wordmark);
    expect(eggText(container)).toBeNull();
    expect(artwork(container)).toHaveAttribute("visibility", "visible");
  });

  it("stops by itself after six seconds", async () => {
    const { user, wordmark, container } = setup();
    await tap(user, wordmark);
    await flush();
    await tick(5900);
    expect(eggText(container)).not.toBeNull();
    await tick(200);
    expect(eggText(container)).toBeNull();
  });

  it("does not turn a mouse click into a toggle", async () => {
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    await user.click(wordmark);
    expect(eggText(container)).not.toBeNull();
  });
});

describe("the wordmark easter egg: when it stays off", () => {
  it("does nothing while the intro is still drawing (egg is off)", async () => {
    const { user, wordmark, container } = setup({ egg: false });
    await user.hover(wordmark);
    await flush();
    expect(eggText(container)).toBeNull();
    expect(loadFont).not.toHaveBeenCalled();
  });

  it("does nothing for visitors who prefer reduced motion", async () => {
    reduced.value = true;
    const { user, wordmark, container } = setup();
    await user.hover(wordmark);
    await flush();
    expect(eggText(container)).toBeNull();
    expect(loadFont).not.toHaveBeenCalled();
  });

  it("stops at once if the egg is switched off while it runs", async () => {
    const { user, wordmark, container, rerender } = setup();
    await user.hover(wordmark);
    await flush();
    rerender(
      <WordmarkReveal
        phase="done"
        frames={null}
        onComplete={() => {}}
        egg={false}
      />,
    );
    expect(eggText(container)).toBeNull();
  });
});

describe("the wordmark easter egg: analytics", () => {
  it("sends one event the first time it starts, with how it was started", async () => {
    const { user, wordmark } = setup();
    await user.hover(wordmark);
    await flush();
    await user.unhover(wordmark);
    await user.hover(wordmark);
    await flush();
    expect(window.manfred).toHaveBeenCalledTimes(1);
    expect(window.manfred).toHaveBeenCalledWith("Wordmark easter egg", {
      props: { page: window.location.pathname, input: "hover" },
    });
  });

  it("says tap when a tap started it, and does not throw without a tracker", async () => {
    const { user, wordmark } = setup();
    await user.pointer({ keys: "[TouchA]", target: wordmark });
    await flush();
    expect(window.manfred).toHaveBeenCalledWith("Wordmark easter egg", {
      props: { page: window.location.pathname, input: "tap" },
    });
    delete window.manfred;
    await user.pointer({ keys: "[TouchA]", target: wordmark });
    await user.pointer({ keys: "[TouchA]", target: wordmark });
    await flush();
  });
});
