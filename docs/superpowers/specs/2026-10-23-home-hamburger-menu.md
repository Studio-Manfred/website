# Home page hamburger menu (STU-1181)

## Update 2026-10-23: no sticky bar

After the first PR was ready, the owner dropped the sticky bar. What changed:

- There is no bar. State B (scrolled, with a bar) is gone. The menu button is `absolute` at the top right of the page, so it scrolls away with the page.
- `lib/hero-exit.ts` and the `IntersectionObserver` are removed. The hero no longer needs `id="hero"`.
- The no-jump rule now covers the close button only: it sits where the menu button was. The wordmark exists only in the panel header.
- The rest of this document describes the earlier plan. Where it talks about the bar, read it as removed.

Status: draft for review. Design source: `manfred-website-hanburger-menu.pen` (pen.dev).

## Goal

Add a hamburger menu to the home page (`/`) of studiomanfred.com. The menu opens a full-screen blue panel with the main links.

## Decisions

- The menu exists on `/` only. Other pages keep `PageNav`.
- This replaces the STU-315 decision that `/` has no nav. Update CLAUDE.md in the same PR.
- The sticky bar appears after the user scrolls past the hero.
- Menu links are in English. Cases and Home are out (decided 2026-10-23). Cases may return later.
- The menu has no "Join us" or "Privacy policy" link.
- The "Get in touch" button stays at the bottom of the menu.

## States (from the design)

| State | What the user sees |
|---|---|
| A. Top | The hero as it is today. A white hamburger button sits at the top right. There is no bar. |
| B. Scrolled | A blue bar, 104 px high on desktop (72 px on a phone), fixed at the top. It holds the wordmark (left) and the hamburger button. |
| C. Open | A full-screen blue panel. It starts with the same header as state B, with a close button instead of the hamburger. Below it: two links, the "Get in touch" button, the email and the phone number. |

## No-jump rule

Nothing moves when the menu opens or closes. The frames in the `.pen` file follow this rule.

| Element | Desktop (1440 px) | Mobile (390 px) |
|---|---|---|
| Wordmark in B and C | x 120, y 22, about 131×60 | x 20, y 14, 96×44 |
| Button in A, B and C | x 1264, y 24, 56×56 | x 322, y 12, 48×48 |
| Bar and menu header height | 104 px | 72 px |

- The wordmark is centered in the hero (A). It sits at the left in B and C. The bar fades in, so the wordmark does not appear to move.
- The open panel has its own header with the same geometry as the bar. The panel covers the page, so the hamburger button cannot stay in place. The close button takes its position.
- An end-to-end test measures these positions in both states.

## Approach

One client component, `components/HomeMenu.tsx`, mounted in `app/page.tsx`. It owns three things:

1. **The hamburger button.** It is fixed at the top right in every state. State A and state B use the same button.
2. **The bar.** It is fixed at the top. It fades in when the hero leaves the viewport.
3. **The menu panel.** It uses the design system `Sheet`.

### Bar visibility

- A sentinel element sits at the bottom of the hero.
- An `IntersectionObserver` watches the sentinel.
- The bar shows when the sentinel is above the viewport.
- Reason: the hero is `min-h-screen`, so a fixed scroll value would break on tall or short screens.

### Menu panel

- Use `Sheet`, `SheetTrigger`, `SheetContent` and `SheetClose` from the design system (v0.37.1 has them).
- `Sheet` is built on Radix. It gives a focus trap, Escape to close and focus return to the button.
- **Spike first:** confirm that `SheetContent` can fill the viewport with `className`. If it cannot, use `Dialog` instead.
- Use `Icon` names `menu`, `x` and `arrow-right`.
- Add `Sheet*` and `Icon` to `components/ds.tsx`. Do not import them from the package directly.

### Spike result

`Sheet` can fill the viewport. We tested it in a real browser at 1280×800 and 390×844. `Dialog` is not needed.

- Use `side="top"`, `showCloseButton={false}` and this `className` on `SheetContent`: `inset-0 h-dvh w-screen max-w-none gap-0 border-0 bg-[var(--color-business-blue)] p-0 shadow-none`.
- The DS merges classes with `tailwind-merge`. Our classes replace the side-panel defaults (`h-auto`, `border-b`, `p-6`, `shadow-lg`, `bg-background`).
- Result: the panel is exactly 1280×800 and 390×844, at position 0,0. The page does not scroll sideways.
- A close button in the panel header lands at x 322, y 12 (48×48) on mobile. This is the position in the design.
- The built-in close button is gone. The panel needs its own `SheetClose`.
- The M cursor is above the panel (`z-index` 10000 against 50). `cursor` is `none` on the panel and on the close button.
- Open question for the build: the default animation slides the whole panel down from the top. At full height this is a long movement. Check it by eye. A fade may feel smoother. Use `motion-safe:` only.
- Test note: a hidden Browser pane reports a viewport of 0×0. Set the viewport size before you measure.

### Content

| Link | Route | Subtitle |
|---|---|---|
| Writing | `/writing` | Thoughts from the messy middle. |
| Training & Courses | `/training-and-courses` | Steal our tricks. We won't mind. |

- The design subtitles were in Swedish. The English lines above are playful, in the site voice. The owner chose them on 2026-10-23.
- There is no Home link (removed 2026-10-23). The wordmark in the panel header links to `/`, closes the menu and scrolls to the top.
- "Get in touch" reuses `GetInTouchLink` with `location="menu"`. The analytics event stays the same.
- The email is `hello@studiomanfred.com`, as a `mailto:` link.
- The phone number is written as in `Footer.tsx`: `079 — 336 29 10`. It is plain text, as in the footer. It is not a link.

## Accessibility

- The button has `aria-label` ("Open menu") and `aria-expanded`.
- The panel has a `SheetTitle` ("Menu"). It can be visually hidden.
- The links sit in a `<nav aria-label="Primary">`.
- The design uses white at 70 % opacity for the subtitles and the phone number. This fails the project rule. Use `var(--color-text-on-brand-muted)` (80 %).
- The Manfred M cursor must look and behave the same in the bar and in the open panel. See "Custom cursor" below.
- Animation uses `motion-safe:` only. Reuse `lib/prefers-reduced-motion.ts` if the code needs the value.
- Add one test for each rule that can break: focus return, Escape, and `aria-expanded`.

## Typography and layout

- The link size is 48 px at 1440 px and up, and 32 px at 390 px, weight 800. It was 72 px in the design, then 60 px, then 48 px after two local reviews. One fluid `clamp()` token in `lib/typography.ts` sets it. The subtitle is 18 px on desktop and 15 px on a phone.
- The side padding is 120 px at 1440 px and 20 px at 390 px. Use a fluid value.

## Custom cursor

The site hides the OS cursor and draws a Manfred M instead. We checked how it works, so the menu keeps it.

- `components/CustomCursor.tsx` is mounted once in `app/layout.tsx`. It is a fixed `div` with `z-index: 10000` and `mix-blend-mode: difference`. It follows `mousemove` on `window`.
- `app/globals.css` sets `cursor: none` on every element. The `cursor-white` class is a no-op now. Do not add it to new markup. CLAUDE.md still mentions it, so correct that text in the same PR.
- The DS `Sheet` renders in a Radix portal, not in the browser top layer. Its overlay and content use `z-50`. The M (10000) stays above the panel.
- The exception in `globals.css` for `dialog` (OS cursor, STU-1171) does not apply. Do not use a native `<dialog>` for the menu.
- The DS `Button`, `Sheet` and `Dialog` set no `cursor-*` class, so `cursor: none` holds on them.
- Touch screens, reduced motion and forced colors show the OS cursor. The panel follows the same rules as the rest of the site.
- A test checks all of this in the open panel. See "Tests".

## Row hover (added after the first local review)

The designer review of the first build set these values.

- A whole row inverts on hover: white fill, blue title (`#2C28EC`, 8.0:1 on white), blue subtitle at 80 % (`--color-text-on-white-muted`, 5.4:1). The 80 % white subtitle is 1.0:1 on white, so it cannot stay.
- The fill reaches the screen edges. The text does not move. The link carries the side padding, not the nav.
- The arrow takes the blue and moves 8 px to the right.
- The change takes 200 ms with ease-out, only with `motion-safe:`.
- Keyboard focus gives the same inversion. The focus ring sits inside the row (`outline-offset: -4px`, set in `globals.css` because the global `a:focus-visible` rule would win over a utility class).
- Touch screens have no hover. A tap gives the same inversion with `active:`.
- The 1 px divider between rows stays inset by the gutter. A white row hides its own divider.

## Mobile

The design covers 1440 px only. The menu must work on phones too.

- The open menu fills the whole viewport, edge to edge, at every width. This is the usual phone pattern.
- Side padding: 120 px at 1440 px, 24 px at 390 px. Use a fluid value.
- Link size: fluid `clamp()` token, about 36 px on a phone and 72 px on desktop.
- The contact block moves below the "Get in touch" button on narrow screens.
- The panel scrolls inside itself when the content is taller than the viewport. The page behind does not scroll.
- Tap targets are at least 44 px high. The hamburger button is 56 px.
- The bar is 104 px high on desktop and 72 px on a phone.
- The mobile frames exist in the `.pen` file (390×844, states A, B and C). They set the sizes above.
- At 844 px height the whole panel fits. At 667 px height (iPhone SE) the panel scrolls a little.

## Tests (write them first)

- `HomeMenu.test.tsx`:
  - The bar is hidden while the sentinel is in view.
  - The bar shows when the sentinel leaves the view.
  - Click on the button opens the panel. The button then has `aria-expanded="true"`.
  - Escape closes the panel and returns focus to the button.
  - The panel has two links with the right `href` values.
  - Click on "Get in touch" calls `window.manfred` with `location: "menu"`.
- `test/setup.ts` already has an inert `IntersectionObserver` mock. Each test stubs its own observer so it can fire the callback.
- `e2e/home-menu.spec.ts`: in the open panel, the computed `cursor` of the panel, the links and the close button is `none`. The M element is visible, has a higher `z-index` than the panel, and follows the mouse.
- `e2e/home-menu.spec.ts`: measure the wordmark and the button in state B and state C. The positions must match (see "No-jump rule").
- `e2e/a11y.spec.ts`: run axe on `/` with the menu closed and open.

## Docs in the same PR

- CHANGELOG.md: one line under `## [Unreleased]`.
- CLAUDE.md: change the "`/` is intentionally nav-less" paragraph. Add `HomeMenu` to "Page anatomy".
- CLAUDE.md: add `Sheet` and `Icon` to the re-export list.
- MEMORY.md: where the work stopped.

## Out of scope

- Other pages. They keep `PageNav`.
- A dark theme for the menu.
- Changes to the hero content.

## Open items

1. **Mobile frames.** Done in the `.pen` file. They need your approval.
2. **Full-screen `Sheet`.** Resolved by the spike (2026-10-23): use `Sheet`. See "Spike result" below.
3. **English subtitles.** Approved by you.
4. **Branch name.** Linear suggests `markus/stu-1181-hamburger-menu-for-studiomanfredcom`. Project text suggests `studio-manfred/stu-XXX-...`. Keep the Linear name.
