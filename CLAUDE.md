@AGENTS.md

# Studio Manfred website

Marketing site for Studio Manfred. Production: https://studiomanfred.com. Source
of truth for project context is [MEMORY.md](MEMORY.md) — read it at session
start.

## Stack

- Next.js **16.2.6** (App Router, Turbopack) on React **19.2.4**, TypeScript 5.
- Tailwind **v4** via `@tailwindcss/postcss` — no `tailwind.config.*`. Tokens
  come from `@studio-manfred/manfred-design-system/styles` imported in
  [app/layout.tsx](app/layout.tsx).
- Design system: `@studio-manfred/manfred-design-system` **v0.37.1** from
  **GitHub Packages** — Dependabot auto-bumps weekly (see
  [`.github/dependabot.yml`](.github/dependabot.yml)).
- Data: `@supabase/supabase-js` reading the `blog_posts` and (STU-1146) published `cases` tables, and (STU-1155) shared CVs via the `get_shared_cv` function, from the intranet
  Supabase project.
- No `vercel.json` / `vercel.ts` — Vercel picks up `next build` automatically.
  URL rewrites live in [`next.config.ts`](next.config.ts) (see "Analytics
  own-domain proxy" below).

## Commands

```bash
npm install           # needs NPM_RC_TOKEN for GitHub Packages (see below)
npm run dev           # next dev (Turbopack)
npm run build         # next build — fails without Supabase env vars
npm run start         # serve production build
npm run lint          # eslint flat config
```

Local build needs the Supabase keys present in `.env.local`. Vercel pulls them
at build time; locally pull them with
`vercel env pull .env.local --environment=preview` (Development env doesn't
carry them).

## Code conventions

- **Import DS primitives via [components/ds.tsx](components/ds.tsx)**, never
  directly from `@studio-manfred/manfred-design-system`. That file is the
  `"use client"` boundary Radix needs.
- Path alias `@/*` → repo root (set in [tsconfig.json](tsconfig.json)).
- Tailwind utility classes + inline `style` mixed intentionally — the
  `clamp()`-based fluid type lives in `style` props. Don't refactor inline
  styles to pure Tailwind without checking design intent.
- Token usage: prefer CSS vars from the DS (`var(--color-business-blue)`,
  `var(--size-container-2xl)`, `var(--letter-spacing-tight)`, etc.) over hex
  literals. The exception is [app/globals.css](app/globals.css), which can
  introduce raw values.
- Static content (courses, fixed copy) belongs in `lib/` as typed arrays
  ([lib/courses.ts](lib/courses.ts) pattern). CMS-backed content (writing) goes
  through `lib/articles.ts` + Supabase.
- Defaults: no comments unless the _why_ is non-obvious. No unused imports, no
  dead code, no speculative abstractions.

## Page anatomy

- **Top nav**: every public route except `/` uses [components/PageNav.tsx](components/PageNav.tsx) — `variant="blue"` on `/writing`, `/writing/[slug]`, `/training-and-courses`, `/join-us`, `/privacy-policy`; `variant="white"` inside [components/CourseDetail.tsx](components/CourseDetail.tsx). The nav row's max-width defaults to 960 px; pass `width` (a key of `WIDTH_PX` in [lib/layout.ts](lib/layout.ts), shared with `Section`) to match a page's content width — `/cv/[token]`, `/cases`, `/cases/[slug]` and [CourseDetail](components/CourseDetail.tsx) use `wide` (1200 px), `/join-us` uses `xl` (1100 px), `/writing` and `/privacy-policy` use `narrow` (720 px), so nav and content share outer edges. Left at the 960 px default: `/training-and-courses` and `/writing/[slug]` (their content is 960 px), and the case password form (a centred 560 px card).
- **`/` has no top bar over the hero, and a hamburger menu instead (STU-1181, 2026-10-23).** The Hero's 100 px wordmark is its nav (STU-315, 2026-05-25). [components/HomeMenu.tsx](components/HomeMenu.tsx) adds a hamburger button top right (absolute, so it scrolls away with the page; **no sticky bar**, decided 2026-10-23) and a full-screen DS `Sheet` panel. The menu is on `/` only. Other pages keep `PageNav`. Do not add a top bar over the hero.
- **SiteMenu rules (STU-1185).** [components/SiteMenu.tsx](components/SiteMenu.tsx) is the one menu (button + full-screen panel). `HomeMenu` is a thin wrapper that places it on the home page; `PageNav` places it on the other pages (all except the shared CV, which passes `menu={false}`): logo, Get in touch, then the menu button last, in the same row, with the wordmark (44 px high on a phone, 56 px from `md`) and the M ([components/Monogram.tsx](components/Monogram.tsx), a tight box around the glyph from [lib/monogram.ts](lib/monogram.ts)) only below 340 px, where the row is too tight. The nav row is one height (48 px, 56 px from `md`) and the panel header copies the row (same padding and max width), so the close button sits exactly where the menu button was; `e2e/page-menu.spec.ts` measures it on six page kinds. Links: Home ("Back to start."), Writing, Training & Courses, Cases ("Work we're proud of. Mostly."). The link to the page you are on is hidden (exact path from `usePathname()`; an article `/writing/x` keeps Writing). The panel is always brand blue, also from a white page; the menu button follows the page (`tone="white"` on blue, `tone="blue"` on white). The menu button and the close button are bare icons: no ring and no fill (owner decision 2026-10-26). The icon is three lines ([components/MenuIcon.tsx](components/MenuIcon.tsx)); the close button is the same three lines resting as a cross, and they morph (600 ms) when the panel opens and back (350 ms, so it ends with the panel) when it closes (CSS in `app/globals.css`, driven by Radix `data-state`). The panel wipes in with a `clip-path` instead of sliding, so the close button sits still while it morphs. Then the rows and the Get in touch block fade in and rise 8 px (350 ms, the first after 100 ms, 50 ms apart; `.menu-reveal` and `--menu-reveal-index`); closing has no such animation, so it stays fast. Reduced motion: no wipe, the cross at once. **Optical alignment:** the wordmark's letters sit about 10 % inside its box and the lines 12 px (16 px from `md`) inside the button box, so the wordmark has `-ml-[9.5px]` (`md:-ml-[12px]`) and both buttons have `-mr-[12px]` (`md:-mr-[16px]`); then the visible letters and lines are flush with the content edges (`e2e/page-menu.spec.ts` measures it). There is no Manfred wordmark in the panel; the header holds only the close button (STU-1184). The page gives the menu its own geometry (`triggerClassName`, `headerClassName`) so the close button sits where the menu button was. Get in touch uses `GetInTouchLink location="menu"`. Email and phone come from [lib/contact.ts](lib/contact.ts); the phone is plain text, as in the footer. **No-jump rule:** the close button in the panel sits exactly where the menu button was (same size and position; e2e test `e2e/home-menu.spec.ts` measures it). Rows invert on hover, focus and tap (white fill, blue text). The panel closes from component state, because Next's `Link` prevents the default click and Radix `SheetClose` skips prevented clicks. Sizes that switch at `md` use arbitrary values (see "Known fragile areas"). **Panel colour:** the opposite of the page: white panel on blue pages (`tone="white"`: home, writing, training list), blue panel on white pages (`tone="blue"`: cases, course detail). The DS sheet overlay is cleared by `body:has(.menu-panel)` in [app/globals.css](app/globals.css); left alone it fades in 50 % black under the wipe and shows as a dark band.
- **`<main>` requirements** (a11y baseline below): every route's `<main>` must have `id="main"` and `tabIndex={-1}` so the skip-link lands focus. `cursor-white` is a no-op now (the M cursor is the `CustomCursor` component), so new markup does not need it.

### Section primitive + typography tokens (STU-312, 2026-05-25)

- **[components/Section.tsx](components/Section.tsx)** — the single page-level
  layout primitive. Composes the DS `Container` (semantic max-width wrapper)
  inside a `<section>` (or `<main>` / `<article>` via `as`). Props: `background`
  (`transparent` / `white` / `blue` / `cream`), `width` (`narrow` 720 / `default`
  960 / `wide` 1200 px), `padding` (`first` / `default` / `tight` / `roomy` /
  `none`), `align`. `blue` background auto-includes `cursor-white` (a no-op now).
- **DS `Container` size presets** (`sm` 640 / `md` 768 / `lg` 1024 / `xl` 1280 /
  `2xl` 1536 px) don't align with our 720 / 960 / 1200 widths (chosen for
  line-length, not container bands), so we use `Container` as the semantic
  shell and override `maxWidth` via inline `style`.
- **[lib/typography.ts](lib/typography.ts)** — `clamp()` font-size tokens for the
  fluid hero scales the DS `Typography` variants don't ship. Reach for the DS
  `Typography` component for everyday text (`body`, `bodySmall`, `large`,
  `caption`); reach for these tokens when you need a `clamp()` size that stays
  fluid across the breakpoint range. Don't introduce new inline `clamp()`
  literals — add a new token, or pick an existing one.
- **Local first, graduate later.** Section + size tokens live in this repo
  on purpose. Once STU-313 / STU-314 / STU-316 have shaken the shape out
  across three different page types, the stable parts may graduate to the
  DS as a v0.11 surface. Do not pre-emptively move them — STU-312 is
  deliberately local.

### DS re-export chokepoint (STU-448, 2026-05-25)

An audit ([`design-system-audits/website-2026-05-25.md`](design-system-audits/website-2026-05-25.md))
found the site consumes **3 of ~99 DS components** in JSX (Button,
Container, Logo) and **0 of the layout primitives** (Stack / HStack /
VStack / Grid). Root cause: [`components/ds.tsx`](components/ds.tsx)
re-exports only 4 components, so per the "import DS primitives via
`@/components/ds`" rule everything else is structurally unreachable.

`components/ds.tsx` now also re-exports `Icon` and the `Sheet` family
(`Sheet`, `SheetClose`, `SheetContent`, `SheetTitle`, `SheetTrigger`) for the
home menu (STU-1181).

Widening the re-export (add Typography variants, layout primitives,
Accordion family) unblocks Typography adoption and lets the training-page
accordion migrate to DS Accordion. See STU-448 for the umbrella + child
tickets. Do not add a wider workaround; take the widen-re-export path.

### Analytics own-domain proxy (2026-07-06)

The Manfred Analytics tracker script and event beacon are both proxied
through studiomanfred.com so ad-blockers can't catch them by hostname.
Two rewrites live in [`next.config.ts`](next.config.ts):

| Public path | Destination |
| --- | --- |
| `/js/t.js` | `https://manfred-analytics.vercel.app/t.js` |
| `/api/event` | `https://manfred-analytics.vercel.app/api/event` |

The tracker computes its POST endpoint from
`new URL(scriptSrc).origin + "/api/event"`, so serving the script from
own domain automatically routes events to own domain. **Don't** hardcode
`manfred-analytics.vercel.app` into the layout script tag again — it will
work but restore the ad-blocker-catches-us problem.

### Home hero intro (STU-1183, 2026-10-23)

The hero wordmark draws itself, then the headline and the button rise.
[components/HeroIntro.tsx](components/HeroIntro.tsx) runs it; [components/WordmarkReveal.tsx](components/WordmarkReveal.tsx) draws.

- **Phases** (`lib/hero-intro.ts`): `pending` → `playing` → `done`. Reduced motion (`skip`), a failed stencil load (`error`) and a 4 s timeout all end in `done`, so the hero is never empty. The headline starts when the drawing is done, the button 300 ms later, both with the existing `FadeIn` (its `start` prop holds the rise). Speed is 25 fps × 1.75, so the word takes 1.62 s.
- **The picture is the real wordmark.** `lib/wordmark.ts` is a typed copy of the DS `Logo` paths (the DS `Logo` cannot take a mask). `lib/wordmark.test.tsx` fails if the DS changes the artwork. A mask shows it only where the pen is, frame by frame, from `lib/wordmark-stencil.json` (72 frames, 12.6 KB gzip, loaded lazily). Nothing is swapped at the end: the mask is removed.
- **Why a stencil and not the Lottie.** The owner's Lottie is a coarse trace of a GIF (292 points in whole pixels), so the round top of the "d" looks chopped. It also ends empty (it erases the word). We use it only for the pen path. The Lottie and the GIF are not in the repo. Regenerate the stencil with `node scripts/build-wordmark-stencil.mjs <lottie.json> 0 71`. The hold frame is 71 because the pen draws the "d" stem last (the stencil covers 99.7 % of the wordmark there, 96.4 % at frame 62).
- **First paint.** The server renders the whole hero. `globals.css` hides the wordmark while `data-intro="pending"` under `@media (scripting: enabled)`, so it does not flash before it draws. Another rule, `@media (scripting: none)`, shows `.fade-up` content, since nothing can add `.in-view` without JavaScript. The home menu button shows from the first frame; it does not wait for the intro.
- Tests: `e2e/hero-intro.spec.ts` records the hero on every frame to check the order, that the whole wordmark never shows early, and the box size. Run it with `--repeat-each=10` after you touch the timing.

### AI landing page under /ai

`/ai` is served by a separate Next.js app (`web/` in
`Studio-Manfred/manfred-ai-in-da-box`, `basePath: "/ai"`). Two rewrites in
[`next.config.ts`](next.config.ts) forward `/ai` and `/ai/:path*` to
`$AI_LANDING_ORIGIN`. The rewrites exist only when `AI_LANDING_ORIGIN` is set
(for example `https://<project>.vercel.app`, no trailing slash needed). Without
it, `/ai` is a 404 and nothing else changes. Set the variable in the Vercel
project for each environment that should serve the page.

## Accessibility baseline

- `<html lang="en">` in [app/layout.tsx](app/layout.tsx); skip-link is the first
  focusable element of `<body>`.
- Every `<main>` must have `id="main"` and `tabIndex={-1}` so the skip-link can
  land focus. Pages: home, /join-us, /privacy-policy, /training-and-courses,
  /writing, /writing/[slug], plus `<main>` inside
  [components/CourseDetail.tsx](components/CourseDetail.tsx).
- Images: meaningful → descriptive `alt`; decorative photos → `alt=""`.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Canvas/SVG content needs `role="img"` + `aria-label` (see
  [components/Marquee.tsx](components/Marquee.tsx)).
- Heading hierarchy: one `<h1>` per route, no level skips.
- Open work: see Linear epic **STU-286** for the live a11y audit + sub-issues.

## Testing & TDD

Test infrastructure landed via epic [STU-297](https://linear.app/studio-manfred/issue/STU-297):

- **Unit / component**: Vitest + React Testing Library + `@testing-library/jest-dom` + `@testing-library/user-event`. Setup file is [test/setup.ts](test/setup.ts); shims live there.
- **HTTP mocking in unit tests**: MSW with handlers at [test/msw/handlers.ts](test/msw/handlers.ts) and fixture at [test/fixtures/blog-posts.json](test/fixtures/blog-posts.json).
- **E2E**: Playwright (chromium-desktop + chromium-mobile) at [playwright.config.ts](playwright.config.ts), spawning `e2e/mock-supabase.mjs` alongside `next start` so the writing routes don't need real Supabase keys.
- **Runtime a11y**: `@axe-core/playwright` in [e2e/a11y.spec.ts](e2e/a11y.spec.ts). Serious/critical violations **hard-fail** the build (enforcement on since 2026-05-15 after STU-288 + STU-289 closed). Set `AXE_ENFORCE=0` to temporarily revert to warn-only.
- **Focus indicator**: a `:focus-visible` rule in [app/globals.css](app/globals.css) draws a 2px `currentColor` outline on every interactive element. currentColor inherits the foreground colour, which by definition has 4.5:1 with its background, so the ring stays ≥3:1 on white, cream, and brand-blue alike. [e2e/focus-visible.spec.ts](e2e/focus-visible.spec.ts) guards against accidental removal.
- **White-on-brand text**: use `var(--color-text-on-brand-muted)` (defined in [app/globals.css](app/globals.css)) — never inline `rgba(255,255,255,…)` below 0.8 opacity on `--color-business-blue`; lower values fail WCAG body-text contrast.
- **Coverage ratchet**: [scripts/coverage-ratchet.mjs](scripts/coverage-ratchet.mjs) reads `coverage/coverage-summary.json`, compares to [.coverage-baseline.json](.coverage-baseline.json), fails if any of statements / branches / functions / lines drops > 0.5%. Auto-bump on `main` runs after every merge, but it **only bumps UP** — if you add an uncovered file, the baseline stays put and the next PR fails the ratchet. Either exclude the file in [`vitest.config.ts`](vitest.config.ts) (the pattern for Next's file-based conventions: `layout.tsx`, `page.tsx`, `opengraph-image.tsx`) or add a test.

Scripts:

```bash
npm test               # vitest run
npm run test:watch     # vitest interactive
npm run test:coverage  # writes coverage/ + summary
npm run e2e            # playwright test (chromium desktop + mobile)
npm run e2e:ui         # playwright in UI mode
```

### TDD rule (mandatory)

When a diff touches **any** of:

- `lib/`
- stateful components (anything with `useState` / `useEffect` / `setInterval` / refs)
- route handlers (`app/**/route.ts`, server actions)
- data fetches (Supabase, fetch wrappers)
- modules with state / intervals / regex / redirects

…write the failing test **before** the implementation:

1. Red — assert the desired behaviour, watch it fail.
2. Green — implement the minimum code that turns it green.
3. Refactor.
4. Commit. Conventional Commits — `test:` for pure test additions, `feat(test): …` when scaffolding new infra, `feat(...): …` paired with a test when shipping new behaviour.

**Exempt**: purely presentational JSX changes, copy edits, config tweaks, docs.

The PR template (`.github/pull_request_template.md`) makes the rule explicit at review time; the ratchet enforces that coverage doesn't silently regress.

## Commits

- **Conventional Commits.** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`,
  `style:`, `perf:`. Optional scope (`feat(a11y): …`, `fix(writing): …`).
- Reference Linear tickets in the subject when the work corresponds to one —
  e.g. `feat(a11y): add skip-to-content link (STU-292)`. Linear auto-links
  commits and PRs that mention the identifier.
- Body explains _why_, not _what_. The diff covers _what_.
- Never `--amend` published commits. Never `git push --force` to `main`.

## Branches and pull requests

- `main` is the only long-lived branch; Vercel auto-deploys production from it.
- Working branches follow Linear's suggested form
  (`studio-manfred/stu-XXX-descriptive-name`) — copy from the issue page.
- PRs into `main`: title in Conventional-Commit form; description ends with a
  `Test plan` checklist (manual screen-reader / keyboard / visual checks since
  there's no test suite).
- Squash-merge by default; the resulting commit becomes the changelog entry.

## CHANGELOG and README

- **CHANGELOG.md** — keep one at the repo root. Format:
  [Keep a Changelog](https://keepachangelog.com/) with `## [Unreleased]` at the
  top, then dated entries on each production deploy. Add a line when shipping
  anything user-visible.
- **README.md** — at the root. Should answer: what is this site, how to run it
  locally (including the GitHub Packages token), how to deploy, what env vars
  exist. The current README is the default `create-next-app` template and needs
  replacing.

## GitHub

- [`.github/dependabot.yml`](.github/dependabot.yml) auto-PRs only
  `@studio-manfred/manfred-design-system` weekly. Everything else (Next, React,
  Supabase) requires a manual bump.
- [`.npmrc`](.npmrc) is committed and references `${NPM_RC_TOKEN}` for the
  `@studio-manfred` scope on GitHub Packages. Set this env var locally before
  `npm install`; in CI/Vercel it's set as a project secret.
- For a quick local install when `NPM_RC_TOKEN` isn't exported,
  `NPM_RC_TOKEN="$(gh auth token)" npm install` works as long as your `gh` token
  has `read:packages` scope.
- Workflows beyond CI:
  - **[`.github/workflows/site-audit.yml`](.github/workflows/site-audit.yml)** —
    monthly Playwright crawl of the live site (1st of each month, 08:00 UTC) +
    Slack alert via the **`SLACK_WEBHOOK_URL`** repo secret when broken URLs are
    found. Sources: [scripts/audit-404.mjs](scripts/audit-404.mjs) +
    [scripts/audit-404-notify.mjs](scripts/audit-404-notify.mjs). Manual run via
    Actions → "Monthly site audit" → Run workflow.

## Vercel

- Project name: `manfred-website` under the `studio-manfred` team. Production
  URL: studiomanfred.com.
- `vercel env pull .env.local` defaults to the **Development** environment,
  which only has `VERCEL_OIDC_TOKEN`. Use `--environment=preview` (or
  `--environment=production`) to fetch the Supabase keys.
- Note: depending on team permissions, encrypted values may come back as empty
  strings (`""`); in that case set them directly in `.env.local` (the anon key
  is public-by-design and ships in the browser bundle).
- `vercel link --yes --project manfred-website --scope studio-manfred` re-links
  a fresh checkout.
- Build command and output are Next.js defaults. Don't add a `vercel.json`
  unless we need rewrites/redirects that can't be expressed in the App Router.
- **Env vars** (Preview + Production):
  - `NPM_RC_TOKEN` — classic PAT with `read:packages` for GitHub Packages.
    Same PAT is also in the repo's Actions secrets. **When rotating**, check
    both stores plus any other Vercel projects that install `@studio-manfred/*`;
    `gh secret list` and `vercel env ls` are independent grep targets.
    Grepping `.github/workflows/**` alone misses env-var-only consumers and
    can lead to "orphan-looking" tokens that are actually load-bearing (this
    happened once — Vercel production silently stayed stuck at a 40-day-old
    build until the missing env var got noticed).
  - `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase
    intranet project; only writing routes need them.

## Known fragile areas

- **[components/Marquee.tsx](components/Marquee.tsx)** — canvas-based,
  SSR/client height was a source of hydration errors (commit `e1ed5dc`). Keep
  initial canvas dimensions consistent between server and client.
- **Custom cursor system** ([app/globals.css](app/globals.css) `*` selector) —
  overrides default cursors globally. If you re-introduce interactive elements,
  double-check `cursor: pointer` isn't lost; see Linear STU-291. The M is a fixed
  `div` (`CustomCursor`, `z-index` 10000) and the OS cursor is `cursor: none`.
  A native `<dialog>` sits in the top layer above the M, so it gets the OS
  cursor (STU-1171). Do not use a native `<dialog>` for new overlays. Radix
  portals (DS `Sheet`, `Dialog`) are fine. Do not add `cursor-*` classes.
- **DS stylesheet order** — the DS stylesheet repeats Tailwind utilities later
  in the same layer. A base class the DS also ships (`h-12`, `flex-col`,
  `w-full`) beats our `md:` variant, so the `md:` size never applies. For a
  size that switches at a breakpoint use arbitrary values (`h-[48px]
  md:h-[56px]`) or `max-md:`. `SiteMenu` shows the pattern.
- **Focus ring on full-bleed rows** — the global `a:focus-visible` rule is
  unlayered, so it beats a `focus-visible:outline-offset-*` utility. Use a class
  in `globals.css` (`.menu-row:focus-visible`).
- **[components/CursorBlob.tsx](components/CursorBlob.tsx)** — `aria-hidden`,
  must stay decorative; AT users see nothing.
- **Writing pages** depend on Supabase reachability at build time. Lose the env
  vars → build fails at "Collecting page data".

## Sessions

When closing a session, update [MEMORY.md](MEMORY.md) with where you stopped and
any new learnings worth carrying forward.
