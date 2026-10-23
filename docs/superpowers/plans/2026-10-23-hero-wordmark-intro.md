# Plan: animated wordmark intro on the home hero (STU-1183)

Spec: [2026-10-23-hero-wordmark-intro.md](../specs/2026-10-23-hero-wordmark-intro.md). Branch: `markus/stu-1183-animated-manfred-wordmark-intro-on-the-home-hero-lottie` (from `origin/main`).

Approach B: the real wordmark is revealed through a stencil made from the traced animation. No Lottie library.

Each task is one Red, Green, Refactor cycle. Commit after each task. Use Conventional Commits with `(STU-1183)` in the subject.

## Order and gates

| Task | Depends on | Gate |
|---|---|---|
| 0. Spikes (done) | none | Done. Player weight, shape match, trace quality. |
| 1. `lib/hero-intro.ts` (phases, frame, timing) | none | none |
| 2. `lib/wordmark.ts` (path copy + guard test) | none | none |
| 3. Stencil data and the script that makes it | 2 | You approve a screenshot of the held frame and two mid frames. Size at most 30 KB gzip. |
| 4. `WordmarkReveal` component | 1, 2, 3 | none |
| 5. `HeroIntro`: headline and button wait | 1, 4 | You approve the timing. |
| 6. First paint, no JavaScript, reduced motion | 5 | none |
| 7. End-to-end tests | 6 | none |
| 8. Docs and PR | 7 | You approve the PR text. |

Tasks 1 and 2 do not depend on anything. They can run in parallel.

## Task 0. Spikes (done, 2026-10-23)

- Players: `lottie-web` light is 46 KB gzip and `dotlottie-react` needs a 496 KB gzip WebAssembly file. Neither is used now.
- Shape match: the Lottie is the same artwork as the static wordmark (aspect 2.83 and 2.85).
- Trace quality: 96 % overlap with the GIF, about 3 % fatter, and the shapes are coarse (292 points, straight segments). The round top of the "d" stem looks chopped. This is why the Lottie is a stencil and not the picture.
- The throwaway pages are deleted. Nothing is committed from them.

## Task 1. Phase logic, frame and timing

Test first: `lib/hero-intro.test.ts`.

- `initialPhase(false)` is `pending`. `initialPhase(true)` is `done`.
- `nextPhase`:
  - `ready` moves `pending` to `playing`, and changes nothing else.
  - `complete` moves `playing` to `done`. In `pending` it changes nothing.
  - `error` moves any phase to `done`.
  - `timeout` moves `pending` and `playing` to `done`.
  - A `done` phase ignores every event.
- `frameAt(elapsedMs)`:
  - 0 ms gives frame 0. A negative time gives frame 0.
  - 1893 ms gives frame 71 (25 fps × 1.5).
  - Any time after the duration gives the hold frame (71).
- `INTRO_DURATION_MS` is the time to reach the hold frame (1893 ms).
- `textStartTimes(durationMs)` gives the headline at 85 % and the button 300 ms after the headline.

Green: `lib/hero-intro.ts` exports the types, the functions and the constants (`FPS = 25`, `SPEED = 1.5`, `HOLD_FRAME = 71`, `INTRO_TIMEOUT_MS = 4000`).

Commit: `feat(hero): intro phase logic, frame and timing (STU-1183)`.

## Task 2. The wordmark artwork

- Red: `lib/wordmark.test.ts`. Render the DS `Logo` (wordmark). Read its `viewBox` and its path data. Assert they equal `wordmark.viewBox` and `wordmark.paths`.
- Green: `lib/wordmark.ts` exports the `viewBox` (`0 0 620 282`) and the path data as typed constants.
- Commit: `feat(hero): typed copy of the wordmark artwork (STU-1183)`.

## Task 3. Stencil data

- A one-off script (kept in `scripts/`, with a short comment on how to run it) reads the Lottie JSON and writes frames 0 to 71. Each frame is one `d` string, mapped to the static `viewBox` with the box-to-box transform in the spec, numbers rounded to one decimal, and written as deltas to save space.
- Output: `lib/wordmark-stencil.json`, loaded lazily with a dynamic import (12.6 KB gzip with whole-number coordinates).
- Test: `lib/wordmark-stencil.test.ts`. 63 frames. Frame 0 is empty. Every frame after the first has a non-empty path. The last frame covers the whole static wordmark (check with a point set from the artwork).
- Check size: at most 30 KB gzip. If it is more, keep every second frame and interpolate in the player.
- Show you screenshots: the held frame (stencil over the real wordmark, with the stencil outlined) and two mid frames. Commit after you approve.
- Commit: `feat(hero): stencil frames for the wordmark intro (STU-1183)`.

## Task 4. `WordmarkReveal`

File: `components/WordmarkReveal.tsx` (`"use client"`). One test, then one change:

1. With the phase `done`, it renders the full real wordmark, named "Manfred", with no stencil.
2. In `playing`, at elapsed time 0 the stencil shows frame 0 (nothing visible).
3. At a mid time, the stencil path equals the frame from `frameAt`. The test fakes the clock and `requestAnimationFrame`.
4. At the end, it reports `complete` once, and removes the stencil.
5. If the stencil fails to load, it reports `error` and shows the full wordmark.
6. It reports `ready` when the stencil has loaded.
7. The box has a fixed size, so there is no layout shift.
8. It does not run with reduced motion.
9. The accessible name is "Manfred" in every phase. The stencil is `aria-hidden`.

The stencil is an SVG `<mask>` with one path, widened by a white stroke of 3 units. The real wordmark paths use `mask="url(#…)"` with a unique id.

Commit after steps 1 to 4 and after steps 5 to 9.

## Task 5. `HeroIntro`

- Red: tests that the headline and the button wait. In `pending` and `playing` they are hidden visually, but stay in the accessibility tree. In `playing` the headline shows at 85 % and the button 300 ms later. In `done` both show.
- Green: wrap the hero content. Reuse `FadeIn` if a small, tested prop lets a phase start it. If not, add the minimum code.
- Commit: `feat(hero): headline and button follow the wordmark (STU-1183)`.

## Task 6. First paint, no JavaScript, reduced motion

- The server markup shows all three parts. A rule under `@media (scripting: enabled)` in `app/globals.css` hides them while the phase is `pending`.
- With JavaScript off, everything shows. With reduced motion, everything shows at once.
- Check the largest paint in a trace. It must not be later than on `main`.

## Task 7. End-to-end tests

`e2e/hero-intro.spec.ts` (desktop and phone):

1. The final state shows the wordmark, the headline and the button.
2. With `reducedMotion: "reduce"`, all three show at once.
3. With `javaScriptEnabled: false`, all three show.
4. The wordmark box has the same size before and after the animation (within 1 px).
5. The headline and the button come after the wordmark.
6. Axe passes on the final state.
7. Run the spec 10 times with `--repeat-each=10`. The last feature had a timing bug.

## Task 8. Docs and PR

- `CHANGELOG.md`: one line under `## [Unreleased]`.
- `CLAUDE.md`: a short "Hero intro" note in "Page anatomy". Record: the stencil approach and why (the trace is coarse), the Lottie is not shipped, the phase rules.
- `MEMORY.md`: where this work stopped.
- Run lint, `tsc --noEmit`, unit tests, the coverage ratchet, the build and the e2e suite.
- Open the PR after you approve the text.

## Risks

| Risk | Mitigation |
|---|---|
| The stencil data is too big. | The 30 KB gzip budget. Every second frame, interpolated. |
| The stencil cuts the real wordmark's edge. | The 3-unit stroke. Task 3 shows you the overlay. |
| The mapping is off by a few units. | The box-to-box transform, and the stroke hides the 0.7 % aspect difference. |
| The static flashes before the animation. | The `@media (scripting: enabled)` rule hides it while `pending`. |
| The hero stays empty if the stencil hangs. | A timeout and an error both move to `done`. |
| The DS changes the logo. | The guard test in Task 2 fails. |
| PR #58 and this branch both edit the hero. | Keep `id="hero"`. Rebase after #58 merges. |
