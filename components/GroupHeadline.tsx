"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { GROUP_INTRO, GROUP_WORDS } from "@/lib/group";
import { prefersReducedMotion } from "@/lib/prefers-reduced-motion";
import { fontSize } from "@/lib/typography";
import { INITIAL, step } from "@/lib/typewriter";

// Each word wears the brand of the company it belongs to.
const WORD_STYLE: Record<string, string> = {
  "studio-manfred": "font-extrabold text-[var(--color-business-blue)]",
  "seventyone-consulting": "font-[family-name:var(--font-s71-heading)] italic font-normal text-[var(--color-s71-teal)]",
  "mather-studio":
    "font-[family-name:var(--font-mather-heading)] [font-stretch:125%] font-extrabold text-[var(--color-mather-ink)]",
};

const words = GROUP_WORDS.map((w) => w.word);
const config = { intro: GROUP_INTRO, words };
const spoken = `${GROUP_INTRO} ${words.slice(0, -1).join(", ").toLowerCase()} and ${words.at(-1)}.`;
const longest = GROUP_WORDS.reduce((a, b) => (b.word.length > a.word.length ? b : a));

const noSubscribe = () => () => {};
// TRANSFORMATION must fit a phone's width, so the word shrinks below the hero size there.
const WORD_SIZE = { fontSize: "min(1em, 9vw)" };

export function GroupHeadline() {
  const [state, setState] = useState(INITIAL);
  const still = useSyncExternalStore(noSubscribe, prefersReducedMotion, () => false);

  useEffect(() => {
    if (still) return;
    let current = INITIAL;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const next = step(current, config);
      timer = setTimeout(() => {
        current = next.state;
        setState(current);
        tick();
      }, next.delay);
    };
    tick();
    return () => clearTimeout(timer);
  }, [still]);

  const intro = still ? GROUP_INTRO : GROUP_INTRO.slice(0, state.introLen);
  const active = GROUP_WORDS[still ? 0 : state.wordIndex];
  const word = still ? active.word : active.word.slice(0, state.wordLen);
  const typingWord = !still && state.introLen === GROUP_INTRO.length;

  return (
    <h1
      aria-label={spoken}
      className="grid leading-[1.1] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)] font-extrabold"
      style={{ fontSize: fontSize.heroDisplay }}
    >
      {/* Invisible copy with the longest word reserves the final height, so the page doesn't jump while typing. */}
      <span aria-hidden className="invisible [grid-area:1/1]">
        {GROUP_INTRO}{" "}
        <span className="whitespace-nowrap">
          <span className={WORD_STYLE[longest.company]} style={WORD_SIZE}>
            {longest.word}
          </span>
          <span className="ml-1">|</span>
        </span>
      </span>
      <span aria-hidden className="[grid-area:1/1]">
        <span data-testid="typed">{intro}</span>{" "}
        <span className="whitespace-nowrap">
          <span data-testid="typed-word" data-company={active.company} className={WORD_STYLE[active.company]} style={WORD_SIZE}>
            {word}
          </span>
          {!still && (
            <span
              className={`ml-1 inline-block animate-pulse font-light ${typingWord ? WORD_STYLE[active.company] : ""}`}
            >
              |
            </span>
          )}
        </span>
      </span>
    </h1>
  );
}
