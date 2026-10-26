import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  CYCLE_INTERVAL_MS,
  TAP_STOP_MS,
  WORDMARK_FONTS,
  createCycler,
  nextReadyKey,
} from "./wordmark-fonts";

const order = ["a", "b", "c", "d"];

describe("WORDMARK_FONTS", () => {
  it("has ten different fonts, each with a size and a baseline that fit the 620 x 282 wordmark box", () => {
    expect(WORDMARK_FONTS).toHaveLength(10);
    expect(new Set(WORDMARK_FONTS.map((font) => font.key)).size).toBe(10);
    for (const font of WORDMARK_FONTS) {
      expect(font.label).not.toBe("");
      expect(font.size).toBeGreaterThan(100);
      expect(font.size).toBeLessThan(300);
      expect(font.baseline).toBeGreaterThan(100);
      expect(font.baseline).toBeLessThan(282);
    }
  });

  it("cycles every 150 ms, and a tap stops by itself after six seconds", () => {
    expect(CYCLE_INTERVAL_MS).toBe(150);
    expect(TAP_STOP_MS).toBe(6000);
  });
});

describe("nextReadyKey", () => {
  it("goes to the next key and wraps round to the first", () => {
    const all = () => true;
    expect(nextReadyKey(order, null, all)).toBe("a");
    expect(nextReadyKey(order, "a", all)).toBe("b");
    expect(nextReadyKey(order, "d", all)).toBe("a");
  });

  it("skips fonts that are not ready", () => {
    const ready = (key: string) => key === "a" || key === "c";
    expect(nextReadyKey(order, "a", ready)).toBe("c");
    expect(nextReadyKey(order, "c", ready)).toBe("a");
  });

  it("stays on the one ready font, and gives null when none is ready", () => {
    expect(nextReadyKey(order, "b", (key) => key === "b")).toBe("b");
    expect(nextReadyKey(order, "b", () => false)).toBeNull();
  });
});

describe("createCycler", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows the first font at once, then the next one every cycle interval", () => {
    const seen: string[] = [];
    const cycler = createCycler({
      order,
      isReady: () => true,
      onTick: (key) => seen.push(key),
    });
    cycler.start();
    expect(seen).toEqual(["a"]);
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    expect(seen).toEqual(["a", "b"]);
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS * 2);
    expect(seen).toEqual(["a", "b", "c", "d"]);
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    expect(seen).toEqual(["a", "b", "c", "d", "a"]);
  });

  it("stops on stop(), and starts again from the first font", () => {
    const seen: string[] = [];
    const cycler = createCycler({
      order,
      isReady: () => true,
      onTick: (key) => seen.push(key),
    });
    cycler.start();
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    cycler.stop();
    vi.advanceTimersByTime(5000);
    expect(seen).toEqual(["a", "b"]);
    cycler.start();
    expect(seen).toEqual(["a", "b", "a"]);
  });

  it("does not run two timers when started twice", () => {
    const seen: string[] = [];
    const cycler = createCycler({
      order,
      isReady: () => true,
      onTick: (key) => seen.push(key),
    });
    cycler.start();
    cycler.start();
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    expect(seen).toEqual(["a", "b"]);
  });

  it("waits for a font to be ready, and uses it on the next tick", () => {
    const ready = new Set<string>();
    const seen: string[] = [];
    const cycler = createCycler({
      order,
      isReady: (key) => ready.has(key),
      onTick: (key) => seen.push(key),
    });
    cycler.start();
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    expect(seen).toEqual([]);
    ready.add("c");
    vi.advanceTimersByTime(CYCLE_INTERVAL_MS);
    expect(seen).toEqual(["c"]);
  });

  it("says whether it is running", () => {
    const cycler = createCycler({
      order,
      isReady: () => true,
      onTick: () => {},
    });
    expect(cycler.running()).toBe(false);
    cycler.start();
    expect(cycler.running()).toBe(true);
    cycler.stop();
    expect(cycler.running()).toBe(false);
  });
});

describe("createCycler nudge", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a font that became ready before the next tick, but only if nothing is shown yet", () => {
    const ready = new Set<string>();
    const seen: string[] = [];
    const cycler = createCycler({
      order,
      isReady: (key) => ready.has(key),
      onTick: (key) => seen.push(key),
    });
    cycler.nudge();
    expect(seen).toEqual([]);
    cycler.start();
    ready.add("b");
    cycler.nudge();
    expect(seen).toEqual(["b"]);
    ready.add("c");
    cycler.nudge();
    expect(seen).toEqual(["b"]);
  });
});
