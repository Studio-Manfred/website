# Plan: home page hamburger menu (STU-1181)

Spec: [2026-10-23-home-hamburger-menu.md](../specs/2026-10-23-home-hamburger-menu.md). Branch: `markus/stu-1181-hamburger-menu-for-studiomanfredcom`.

Each task is one Red, Green, Refactor cycle. Commit after each task. Use Conventional Commits with `(STU-1181)` in the subject.

## Order and gates

| Task | Depends on | Gate |
|---|---|---|
| 0. Spike: full-screen `Sheet` | none | Decides `Sheet` or `Dialog`. Stop if neither works. |
| 1. Re-exports in `components/ds.tsx` | 0 | none |
| 2. `lib/contact.ts` | none | none |
| 3. `lib/hero-exit.ts` | none | none |
| 4. Typography and gutter tokens | none | none |
| 5. `HomeMenu`: trigger and panel | 0, 1, 2, 4 | none |
| 6. `HomeMenu`: bar visibility | 3, 5 | none |
| 7. Mount on `/` | 6 | none |
| 8. End-to-end tests | 7 | none |
| 9. Docs | 7 | none |
| 10. Verify and open the PR | 8, 9 | You approve the PR text. |

Tasks 2, 3 and 4 are independent. They can run in parallel.

## Task 0. Spike: can `Sheet` fill the viewport?

**Done (2026-10-23). Result: yes. Use `Sheet`.** The recipe and the measurements are in the spec, under "Spike result". The throwaway page is deleted. Nothing is committed.

The original steps, for the record:

1. Render `SheetContent side="top"` with `className` that sets `inset-0 h-dvh w-screen max-w-none`.
2. Check in the browser: it covers the whole viewport, and no side-panel border, shadow or max-width remains.
3. Check that `showCloseButton={false}` removes the built-in close button.
4. Check that the overlay does not show behind the panel.
5. Decide:
   - `Sheet` works: continue.
   - `Sheet` fights the layout: use `Dialog` with the same props. Record the choice in the spec ("Open items", item 2).

## Task 1. Re-exports

- File: `components/ds.tsx`.
- Add `Icon`, `Sheet`, `SheetClose`, `SheetContent`, `SheetTitle`, `SheetTrigger` (or the `Dialog` family from Task 0).
- No test. Run `npm run lint` and `npx tsc --noEmit`.
- Commit: `chore(ds): re-export Sheet and Icon (STU-1181)`.

## Task 2. Shared contact details

Reason: the phone number now lives in `Footer.tsx` and the menu needs it too.

- Red: `lib/contact.test.ts`. Assert `contact.email` is `hello@studiomanfred.com`. Assert `contact.phone` is `079 — 336 29 10`, the same text as the footer shows today.
- Green: `lib/contact.ts` exports the `contact` object.
- Refactor: `Footer.tsx` reads from `contact`. The footer output stays the same.
- Commit: `refactor(footer): share contact details (STU-1181)`.

## Task 3. Pure helper for the bar

- Red: `lib/hero-exit.test.ts`.
  - `isPastHero({ isIntersecting: false, boundingClientRect: { bottom: -1 } })` returns `true`.
  - `isPastHero({ isIntersecting: true, ... })` returns `false`.
  - `isPastHero({ isIntersecting: false, boundingClientRect: { bottom: 500 } })` returns `false`. The hero is below the viewport, not above it.
- Green: `lib/hero-exit.ts` exports `isPastHero(entry)`.
- Commit: `feat(nav): detect when the hero has left the viewport (STU-1181)`.

## Task 4. Tokens

- `lib/typography.ts`: add `menuLink`: `clamp(2rem, 1.07rem + 3.81vw, 4.5rem)`. It gives 32 px at 390 px and 72 px at 1440 px.
- Add a gutter token with the same fluid rule: `clamp(20px, calc(9.52vw - 17.1px), 120px)`. It gives 20 px at 390 px and 120 px at 1440 px.
- No test. These are static values. Check the numbers in the browser at 390, 768 and 1440 px.
- Commit: `feat(nav): menu typography and gutter tokens (STU-1181)`.

## Task 5. `HomeMenu`: trigger and panel

File: `components/HomeMenu.tsx` (`"use client"`). Test file: `components/HomeMenu.test.tsx`. One test, then one change, in this order:

1. The trigger button has `aria-label="Open menu"` and `aria-expanded="false"`.
2. Click on the trigger opens the panel. The trigger then reports `aria-expanded="true"`.
3. The open panel has a `nav` named "Primary" with two links: Writing `/writing` and Training & Courses `/training-and-courses`. Home and Cases are out.
4. Each link shows its subtitle from the spec.
5. Escape closes the panel and returns focus to the trigger.
6. Click on the close button closes the panel.
7. Click on "Home" closes the panel and scrolls to the top (`window.scrollTo` is called with `top: 0`).
8. Click on any other link closes the panel.
9. "Get in touch" is a `GetInTouchLink` with `location="menu"`. Click calls `window.manfred` with `location: "menu"`.
10. The email link has `href="mailto:hello@studiomanfred.com"`. The phone number shows as plain text, `079 — 336 29 10`, as in the footer.

Implementation notes:

- The panel has its own header: a wordmark link to `/` and a close button. The geometry is the one in the spec ("No-jump rule").
- The panel has a visually hidden `SheetTitle` ("Menu").
- Do not add `cursor-white` or any `cursor-*` class. The M cursor comes from `CustomCursor` and `cursor: none` in `globals.css`. Do not use a native `<dialog>`.
- Use `motion-safe:` for every transition.
- Use the DS `Logo` with `variant="wordmark"` and `color="white"`. Do not draw the wordmark again.
- Commit after steps 3, 6 and 10: `feat(nav): ... (STU-1181)`.

## Task 6. `HomeMenu`: bar visibility

Add to `HomeMenu.test.tsx`:

1. The bar is hidden while the hero is in view. The hidden bar is `aria-hidden` and has `visibility: hidden`, so a screen reader and the Tab key skip the wordmark link.
2. The test stubs `IntersectionObserver` and fires the callback with a past-the-hero entry. The bar becomes visible.
3. The trigger button stays in the same element before and after the bar shows. The button is not rendered twice.
4. The observer disconnects on unmount.

Implementation notes:

- The observer watches the hero element. Use `threshold: 0`. A higher value breaks on tall elements (see the comment in `FadeIn.tsx`).
- The bar fades in with `motion-safe:transition-opacity`. Users with reduced motion get no fade.
- If `Section` takes no `id`, observe `main > section:first-child`, or add an `id` prop to the hero wrapper.
- Commit: `feat(nav): sticky bar after the hero (STU-1181)`.

## Task 7. Mount on `/`

- File: `app/page.tsx`. Render `<HomeMenu />` before `<main>`, so the trigger is early in the tab order. The skip link stays first.
- Check that no other route renders `HomeMenu`.
- Check that `<main id="main" tabIndex={-1}>` is unchanged.
- Commit: `feat(nav): hamburger menu on the home page (STU-1181)`.

## Task 8. End-to-end tests

File: `e2e/home-menu.spec.ts`. Runs on both projects (desktop and mobile).

1. At the top of the page the bar is hidden and the trigger is visible.
2. After a scroll past the hero the bar is visible.
3. **No-jump test.** In the sticky state, record the bounding boxes of the wordmark and the trigger. Open the menu. Record the wordmarks and the close button. Each pair is equal within 1 px.
4. Keyboard: Tab to the trigger, Enter opens, Tab stays inside the panel, Escape closes, focus returns.
5. The page behind does not scroll while the panel is open.
6. At 667 px height the panel scrolls and "Get in touch" is reachable.
7. Axe: no serious or critical violation with the menu closed and open. Add to `e2e/a11y.spec.ts`.
8. The focus ring shows on the trigger and on the close button (the `:focus-visible` rule in `globals.css`).
9. **Cursor test.** With the panel open, the computed `cursor` is `none` on the panel, on each link, on the close button and on the "Get in touch" button. The M element is visible and has a higher `z-index` than the panel. After `page.mouse.move` over the panel, the M `transform` changes. Run the same checks with the menu closed, so the two states match.
10. With `prefers-reduced-motion: reduce` the OS cursor returns, and links show the pointer, in the open panel too.

Commit: `test(nav): end-to-end tests for the home menu (STU-1181)`.

## Task 9. Docs (same PR)

- `CHANGELOG.md`: one line under `## [Unreleased]`.
- `CLAUDE.md`:
  - Replace the "`/` is intentionally nav-less" paragraph. State the new decision and keep the STU-315 history.
  - Add `HomeMenu` to "Page anatomy".
  - Add `Sheet` and `Icon` to the DS re-export section.
  - Correct the `cursor-white` text. It is a no-op. The M comes from `CustomCursor`.
- `README.md`: update only if it lists components or routes.
- `MEMORY.md`: where this work stopped.
- Commit: `docs: home menu decision and components (STU-1181)`.

## Task 10. Verify and open the PR

1. `npm run lint`, `npx tsc --noEmit`, `npm test`.
2. `npm run test:coverage`. The ratchet fails if coverage drops more than 0.5 %. `HomeMenu.tsx` must have tests.
3. `npm run build`. It needs the Supabase variables in `.env.local`.
4. `npm run e2e`.
5. Use the `responsive-check` skill at 390, 768 and 1440 px. Compare each state with the `.pen` frames.
6. Manual check with a screen reader (VoiceOver) and with the keyboard only. Note the result in the PR.
7. Open the PR. Title: `feat(nav): hamburger menu on the home page (STU-1181)`. The body ends with a Test plan checklist. Use `Closes STU-1181`.
8. Ask you before the PR opens, and before any merge.

## Risks

| Risk | Mitigation |
|---|---|
| `Sheet` does not fill the viewport. | Task 0 decides early. Fallback is `Dialog`. |
| The wordmark jumps between bar and panel. | The panel header copies the bar geometry. Task 8 measures it. |
| The OS cursor shows next to the M inside the panel. | The DS sets no `cursor-*` class on `Sheet` and `Button`. The cursor test in Task 8 guards it. Check by hand in a real browser. |
| The hero observer never fires on a tall hero. | `threshold: 0`. Same lesson as `FadeIn`. |
| Coverage ratchet fails. | Tests come first in every task. |
| CLAUDE.md still says blue pages need `cursor-white`. | Correct it in Task 9. The class is a no-op. |
