# Animated wordmark intro on the home hero (STU-1183)

Status: draft for review. Source: `manfred-logo-white-transparent.gif` (the owner's file) and the Lottie traced from it.

## Goal

When the home page loads, the Manfred wordmark in the hero draws itself in. When it is done, the headline and the "Get in touch" button come in.

## What we found

| Fact | Value |
|---|---|
| Source | A GIF, 1920×1080, 137 frames at 25 fps, 5.48 s. White wordmark on a transparent background. |
| Lottie | A trace of that GIF. It has the same timeline. 820 KB as JSON, 40 KB packed as `.lottie`. |
| Motion | The pen follows the stroke order. The "a" and the "d" start as round shapes ("o", "c"), then the stem or the tail comes. It is not a plain wipe. |
| Timeline | Frame 0 is empty. Frames 10–71 (0.4–2.8 s) draw the word, with the "d" stem last. Frames 71–80 hold it. Frames 90–125 erase it. Frames 130–136 are empty. |
| The last frame | Empty. Played to the end, the wordmark disappears. We use frames 0 to 71 only. The word is complete at frame 71, because the pen draws the "d" stem last (measured: the stencil covers 99.7 % of the real wordmark at frame 71, and 96.4 % at frame 62). |

### Why the Lottie is not used as the picture

We compared the Lottie with the GIF, frame by frame, in the browser.

- The overlap of the two shapes is 96 % on average (96.6 % in the hold). The 13 empty frames match.
- The Lottie shapes are about 3 % fatter.
- **The trace is coarse.** The full word is 292 points in 8 paths, in whole pixels, with few curves. The round top of the "d" stem is about seven points, so it looks chopped. In the GIF it is round. The owner saw this in the held frame.
- The static wordmark on the site (DS `Logo`) has real curves and a round top.

So the Lottie is good enough to say *where the pen is*, but not to be *seen*.

## Approach: reveal the real wordmark through a stencil

The picture is the real vector wordmark (the DS `Logo` artwork). The traced animation is used only as a stencil: at each frame, the real wordmark shows only where the traced shape is, widened by a few units. At the end, the stencil is removed and the real wordmark is all there. There is nothing to swap, so nothing can jump.

- **Stencil data.** A one-off script reads the Lottie JSON, takes frames 0 to 71, maps each frame to the static wordmark's `viewBox` (0 0 620×282), and writes one path per frame. We commit the result, not the script's input. Budget: at most 30 KB gzip.
- **Mapping.** The glyph box in the Lottie canvas is x 456, y 342, 1010×357. In the static `viewBox` it is x 61, y 54, 497.2×174.5. The script uses that box-to-box transform. The two aspect ratios differ by 0.7 %, and the widening hides that.
- **Widening.** The stencil paths get a white stroke of about 3 units, so the crisp edge of the real wordmark is never cut. The 3 % extra weight of the trace is hidden the same way.
- **Player.** No Lottie library. A small `requestAnimationFrame` loop picks the frame from the elapsed time and sets the stencil path. `lottie-web` is not needed. This also removes the 46 KB gzip player that the first spike chose.
- **Speed.** 1.75×, so frames 0 to 71 take 1.62 s. The loop runs at the screen's rate and picks the frame at 25 fps × 1.75.
- **The wordmark artwork.** The path data comes from the DS `Logo`. We keep a typed copy in `lib/wordmark.ts` and a test that checks it still equals what the DS renders. If the DS changes the logo, the test fails.

## Decisions (made by the owner)

1. Speed: 1.5× first, then 1.75× after the owner saw it (the full word takes 1.62 s).
2. End state: the real wordmark, with the stencil removed.
3. The headline starts when the drawing is 85 % done, and the button 0.3 s after the headline. Both use the existing `FadeIn` rise.
4. The animation plays on every visit.

## Sequence (pure logic, tested first)

`lib/hero-intro.ts` holds the phase logic. The phases are `pending`, `playing` and `done`.

- `pending`: before the stencil is ready. The wordmark, headline and button are hidden.
- `playing`: the wordmark draws. The headline and button wait for their start times.
- `done`: everything shows.
- `done` comes at once when: the user prefers reduced motion, the stencil fails to load, or a timeout passes (4 s). The page must never stay empty.
- The same module holds the timing: the frame at a given time, the hold frame, and the start times of the headline and the button.

## Page load and the first paint

- The server renders the real wordmark, headline and button. The largest paint stays fast, and a visitor without JavaScript sees everything.
- With JavaScript, the hero starts in `pending`. A CSS rule under `@media (scripting: enabled)` hides the three parts, so the full wordmark does not flash before the animation.
- The hero keeps `id="hero"`. The home menu (STU-1181) watches it.
- No layout shift: the wordmark box has a fixed size from the first paint.

## Accessibility

- The wordmark keeps its name, "Manfred", in every phase. The stencil is `aria-hidden`.
- Reduced motion: no animation, the final state at once (`lib/prefers-reduced-motion.ts`, STU-290).
- The M cursor, the skip link and the menu button work at all times.
- Content is hidden only visually while it waits. It stays in the accessibility tree.

## Tests (write them first)

- `lib/hero-intro.test.ts`: the phases, the timeout, reduced motion, the error, the frame at a time and the text start times.
- `lib/wordmark.test.ts`: our copy of the path equals the DS `Logo` artwork.
- `components/WordmarkReveal.test.tsx`: the right frame shows at a given time, the stencil is removed at the end, the accessible name stays.
- `e2e/hero-intro.spec.ts`: the final state shows wordmark, headline and button; with reduced motion all three show at once; with JavaScript off all three show; the wordmark box keeps its size; the headline and the button come after the wordmark.

## Out of scope

- The hamburger menu (STU-1181).
- Other pages.
- A new Lottie file. If the owner gets a stroke-based export later (trim paths), the stencil can be replaced by a real stroke animation.

## Open items

1. The stencil size. The plan measures it in task 3. If it passes 30 KB gzip, we drop to every second frame and interpolate.
2. Merge order with PR #58 (STU-1181). Both touch the hero. PR #58 adds `id="hero"`. Rebase this branch after #58 merges.
