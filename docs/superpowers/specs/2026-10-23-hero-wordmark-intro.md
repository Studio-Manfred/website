# Animated wordmark intro on the home hero (STU-1183)

Status: draft for review. Asset: `manfred-logo-white-vector.lottie` (and a `.json` with the same content).

## Goal

When the home page loads, the Manfred wordmark in the hero draws itself in from a Lottie file. When it is done, the headline and the "Get in touch" button come in.

## What we found in the file

| Fact | Value |
|---|---|
| `.lottie` size | 40 KB |
| `.json` size | 820 KB (the same animation, not packed) |
| Canvas | 1920×1080, 25 fps, 137 frames, 5.48 s |
| Content | Vector. White fill (`#FFFFFF`), 578 paths, no images, no expressions |
| Build | Each frame is its own layer, made from a GIF. It is frame by frame, not a keyframed animation |
| Loop | `loop: true` in the manifest |

What the animation does:

| Frames | Time | What shows |
|---|---|---|
| 0 | 0.0 s | Nothing |
| 10–60 | 0.4–2.4 s | The wordmark draws in from left to right |
| 60–80 | 2.4–3.2 s | The full wordmark |
| 90–125 | 3.6–5.0 s | The wordmark erases |
| 130–136 | 5.2–5.5 s | Nothing |

- **The last frame is empty.** If we play it to the end, the wordmark disappears. We must stop at about frame 62 and hold it.
- The full wordmark is 1010×357 px inside the canvas, at x 456 and y 342. It sits at the centre of the canvas, and its aspect is 2.83 to 1. The rest of the canvas is empty.
- The current static wordmark (DS `Logo`) is about 2.2 to 1. The two shapes may differ. A spike must compare them.

## Spike result (2026-10-23)

| Question | Answer |
|---|---|
| Which player? | `lottie-web`, the light build (`lottie-web/build/player/lottie_light`, SVG only). 46 KB gzip. It reads the JSON. |
| Why not `dotlottie-react`? | Its wrapper is small (15 KB gzip), but it needs a WebAssembly file of 1.24 MB (496 KB gzip), loaded from a CDN by default. That is ten times too heavy for a 1.7 s intro. |
| Does the light build play the file? | Yes. The file has no expressions and only white fills. We played frames 0–62 at 1.5× and got a `complete` event after 1650 ms. |
| Does the Lottie match the static wordmark? | Yes. It is the same artwork. The glyph box has the same aspect (2.83 for the Lottie, 2.85 for the static `Logo`). The static `Logo` has padding in its `viewBox` (0 0 620×282). |
| What does that mean for the crop? | Crop the Lottie canvas so it has the same `viewBox` shape as the static `Logo` (620:282). Then it is a drop-in replacement at the same height (220×100 px in the hero). The crop box in the 1920×1080 canvas is x 332, y 232, 1260×573. |
| File format | JSON, not `.lottie`. `lottie-web` reads JSON. Trimmed to frames 0–62 and cropped, it should be well under 25 KB gzip. The `.lottie` file is not used. |

## Decisions to make

1. **Speed.** Decided: 1.5× speed. The full wordmark takes 1.65 s.
2. **End state.** Decided: the Lottie holds its last frame as the wordmark. The static `Logo` shows only without JavaScript, with reduced motion, or when the player fails.
3. **How the text comes in.** Decided: the existing `FadeIn` rise. The headline starts when the drawing is 85 % done, and the button 0.3 s after the headline.
4. **Every visit or once per session.** Decided: every visit.

## Approach

### Sequence (pure logic, tested first)

`lib/hero-intro.ts` holds a small state machine. The phases are `pending`, `playing` and `done`.

- `pending`: before the player is ready. The wordmark, headline and button are hidden.
- `playing`: the wordmark draws. The headline and button wait.
- `done`: the headline and button show.
- `done` comes at once when: the user prefers reduced motion, the player fails to load, or a timeout passes (proposal: 4 s). The page must never stay empty.

### Player

- Player: `lottie-web` light build (see "Spike result"). Rule: at most 60 KB gzip on the home page's first load. The player loads lazily (`next/dynamic`, no SSR).
- Trim the file first. We need only frames 0 to 62. We crop the canvas to 332, 232, 1260×573, so it has the shape of the static `Logo`. A one-off script does it. We commit the result, not the script's input.

### Page load and the first paint

- The server renders the static wordmark, headline and button. The largest paint stays fast, and a visitor without JavaScript sees everything.
- With JavaScript, the hero starts in `pending`. A CSS rule under `@media (scripting: enabled)` hides the three parts, so the static wordmark does not flash before the animation.
- The hero keeps `id="hero"`. The home menu (STU-1181) watches it.
- No layout shift: the wordmark box has a fixed size from the first paint.

### Accessibility

- The Lottie has the same name as the static wordmark: `role="img"` and `aria-label="Manfred"`. The animation is `aria-hidden` for the moving parts.
- Reduced motion: no animation, the final state at once (`lib/prefers-reduced-motion.ts`, STU-290).
- The M cursor, the skip link and the menu button work at all times. They do not wait for the animation.
- Content is not hidden from assistive tech while it fades in: only visually.

## Tests (write them first)

- `lib/hero-intro.test.ts`: every phase change, the timeout, reduced motion and the player error.
- `components/WordmarkIntro.test.tsx` with a mocked player: it reports completion, falls back on error, and keeps one accessible name.
- `e2e/hero-intro.spec.ts`: the final state shows headline, button and wordmark; with reduced motion all three show at once; with JavaScript off all three show; the wordmark box does not change size.
- Axe on the final state (`e2e/a11y.spec.ts` already covers `/`).

## Out of scope

- The hamburger menu (STU-1181).
- Other pages.
- Sound.

## Open items

1. The owner's answers to the four decisions above.
2. ~~The spike result~~ Done. See "Spike result".
3. A trimmed and cropped asset. A designer export would be cleaner than our script. Ask the owner if one exists.
4. Merge order with PR #58 (STU-1181). Both touch the hero. PR #58 adds `id="hero"`. Rebase this branch after #58 merges.
