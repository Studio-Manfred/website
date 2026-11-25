import { describe, expect, it } from "vitest";
import { INITIAL, step, type TypewriterState } from "./typewriter";

const config = { intro: "We are", words: ["UX", "DATA"] };

function run(n: number, from: TypewriterState = INITIAL) {
  let s = from;
  for (let i = 0; i < n; i++) s = step(s, config).state;
  return s;
}

describe("typewriter step", () => {
  it("types the intro one character at a time first", () => {
    expect(run(3)).toEqual({ introLen: 3, wordIndex: 0, wordLen: 0, deleting: false });
  });

  it("then types the word, holds, and deletes it", () => {
    const typed = run(6 + 2);
    expect(typed).toMatchObject({ introLen: 6, wordIndex: 0, wordLen: 2, deleting: false });
    const hold = step(typed, config);
    expect(hold.state.deleting).toBe(true);
    expect(hold.delay).toBeGreaterThan(step(run(6), config).delay);
    expect(run(2, hold.state)).toMatchObject({ wordLen: 0, deleting: true });
  });

  it("moves to the next word and wraps around", () => {
    const afterFirst = run(6 + 2 + 1 + 2 + 1);
    expect(afterFirst).toEqual({ introLen: 6, wordIndex: 1, wordLen: 0, deleting: false });
    const afterSecond = run(4 + 1 + 4 + 1, afterFirst);
    expect(afterSecond.wordIndex).toBe(0);
  });
});
