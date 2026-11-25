export interface TypewriterState {
  introLen: number;
  wordIndex: number;
  wordLen: number;
  deleting: boolean;
}

export interface TypewriterConfig {
  intro: string;
  words: string[];
}

export const INITIAL: TypewriterState = { introLen: 0, wordIndex: 0, wordLen: 0, deleting: false };

const TYPE_INTRO = 40;
const TYPE_WORD = 90;
const HOLD = 1600;
const DELETE = 45;
const NEXT = 350;

/** One tick of the typewriter: the next state and how long to wait before it. */
export function step(s: TypewriterState, { intro, words }: TypewriterConfig): { state: TypewriterState; delay: number } {
  if (s.introLen < intro.length) return { state: { ...s, introLen: s.introLen + 1 }, delay: TYPE_INTRO };
  const word = words[s.wordIndex];
  if (!s.deleting && s.wordLen < word.length) return { state: { ...s, wordLen: s.wordLen + 1 }, delay: TYPE_WORD };
  if (!s.deleting) return { state: { ...s, deleting: true }, delay: HOLD };
  if (s.wordLen > 0) return { state: { ...s, wordLen: s.wordLen - 1 }, delay: DELETE };
  return { state: { ...s, wordIndex: (s.wordIndex + 1) % words.length, deleting: false }, delay: NEXT };
}
