# Plan: animated wordmark intro on the home hero (STU-1183)

Spec: [2026-10-23-hero-wordmark-intro.md](../specs/2026-10-23-hero-wordmark-intro.md). Branch: `markus/stu-1183-animated-manfred-wordmark-intro-on-the-home-hero-lottie` (from `origin/main`).

Each task is one Red, Green, Refactor cycle. Commit after each task. Use Conventional Commits with `(STU-1183)` in the subject.

## Order and gates

| Task | Depends on | Gate |
|---|---|---|
| 0. Spike: player, weight, end frame | none | You choose the player and approve the end-frame match. |
| 1. Trimmed and cropped asset | 0 | You approve the look (a screenshot of the held frame). |
| 2. `lib/hero-intro.ts` (phases) | none | none |
| 3. `WordmarkIntro` component | 0, 1, 2 | none |
| 4. `HeroIntro`: headline and button wait | 2, 3 | You approve the timing (decisions 1 and 3 in the spec). |
| 5. First paint, no JavaScript, reduced motion | 4 | none |
| 6. End-to-end tests | 5 | none |
| 7. Docs and PR | 6 | You approve the PR text. |

Task 2 does not depend on the others. It can start now.

## Task 0. Spike

Not committed. Use a throwaway page under `public/`, and delete it.

1. Install each player in a scratch copy (or measure with `npm pack` sizes). Build the home page with each. Record the added first-load JS (gzip) from the `next build` output.
2. Draw frame 62 of the Lottie next to the static `Logo` at the same height. Compare the shapes. Record any difference (width, slant, stroke).
3. Check that `dotlottie-react` runs in `next dev` and `next start` with Next 16 and React 19.2 (WebAssembly loading, no SSR errors).
4. Report the numbers and a recommendation. Stop if neither player fits the 60 KB rule.

## Task 1. Asset

- Cut the animation to frames 0 to 62. Crop the canvas to the wordmark box (x 456, y 342, 1010×357) plus 8 px padding. Keep white fill.
- Write the result as a `.lottie` (or JSON, if the spike says so) in `public/` (path decided in Task 0).
- Check: the file is under 25 KB, and the held frame is the full wordmark.
- Commit: `feat(hero): trimmed wordmark animation asset (STU-1183)`.

## Task 2. Phase logic

- Red: `lib/hero-intro.test.ts`.
  - The first phase is `pending`.
  - `ready` moves `pending` to `playing`.
  - `complete` moves `playing` to `done`.
  - `error` moves any phase to `done`.
  - `timeout` moves `pending` and `playing` to `done`.
  - Reduced motion starts in `done`.
  - A `done` phase ignores every event.
- Green: `lib/hero-intro.ts` exports the reducer, the initial state function and the timeout value.
- Commit: `feat(hero): intro phase logic (STU-1183)`.

## Task 3. `WordmarkIntro`

File: `components/WordmarkIntro.tsx` (`"use client"`). One test, then one change:

1. It renders the static wordmark with the name "Manfred" when the phase is `done` without the player.
2. It loads the player lazily and reports `ready`.
3. It reports `complete` when the animation passes the hold frame, and it stops there.
4. It reports `error` when the player fails, and shows the static wordmark.
5. It has one accessible name, "Manfred", in every phase.
6. It keeps a fixed box size, so there is no layout shift.
7. It does not play with reduced motion.

Use a mocked player in the tests.

## Task 4. `HeroIntro`

- Red: tests that the headline and the button are hidden (visually) in `pending` and `playing`, and shown in `done`. Content stays in the accessibility tree at all times.
- Green: wrap the hero content. The headline starts at 85 % of the drawing, and the button 0.3 s later (or the values from decision 3).
- `FadeIn` may need a prop that starts it on a phase, not on scroll. Keep the change small and tested.
- Commit: `feat(hero): headline and button follow the wordmark (STU-1183)`.

## Task 5. First paint, no JavaScript, reduced motion

- The server markup shows all three parts. A rule under `@media (scripting: enabled)` hides them while the phase is `pending`. Put the rule in `app/globals.css`.
- With JavaScript off, everything shows. With reduced motion, everything shows at once.
- Check the largest paint in a trace. It must not get later than on `main`.

## Task 6. End-to-end tests

`e2e/hero-intro.spec.ts` (desktop and phone):

1. The final state shows the wordmark, the headline and the button.
2. With `reducedMotion: "reduce"`, all three show at once.
3. With `javaScriptEnabled: false`, all three show.
4. The wordmark box has the same size before and after the animation (within 1 px).
5. The headline and the button come after the wordmark (order of visibility).
6. Axe passes on the final state.

## Task 7. Docs and PR

- `CHANGELOG.md`: one line under `## [Unreleased]`.
- `CLAUDE.md`: a short "Hero intro" note in "Page anatomy". Record the three facts: the Lottie ends empty, the player is lazy, the sequence rules.
- `MEMORY.md`: where this work stopped.
- Run lint, `tsc --noEmit`, unit tests, the coverage ratchet, the build and the e2e suite. Run the new e2e spec 10 times with `--repeat-each=10`, because the last feature had a timing bug.
- Open the PR after you approve the text.

## Risks

| Risk | Mitigation |
|---|---|
| The player adds too much weight. | Task 0 measures it. Lazy loading. The 60 KB rule. |
| The static wordmark flashes before the animation. | The `@media (scripting: enabled)` rule hides it while `pending`. |
| The hero stays empty if the player hangs. | A timeout moves to `done`. An error moves to `done`. |
| The Lottie end frame differs from the static `Logo`. | Task 0 compares them. The Lottie stays as the held wordmark. |
| The animation is empty at the end of the file. | We cut the file at frame 62 and hold it. |
| Both PR #58 and this branch edit the hero. | Keep the `id="hero"`. Rebase after #58 merges. |
