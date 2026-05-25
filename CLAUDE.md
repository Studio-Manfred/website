@AGENTS.md

# Studio Manfred website

Marketing site for Studio Manfred. Production: https://studiomanfred.com. Source
of truth for project context is [MEMORY.md](MEMORY.md) — read it at session
start.

## Stack

- Next.js **16.2.4** (App Router, Turbopack) on React **19.2.4**, TypeScript 5.
- Tailwind **v4** via `@tailwindcss/postcss` — no `tailwind.config.*`. Tokens
  come from `@studio-manfred/manfred-design-system/styles` imported in
  [app/layout.tsx](app/layout.tsx).
- Design system: `@studio-manfred/manfred-design-system` from **GitHub
  Packages**.
- Data: `@supabase/supabase-js` reading the `blog_posts` table from the intranet
  Supabase project.
- No test framework. No `vercel.json` / `vercel.ts` — Vercel picks up
  `next build` automatically.

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

- **Top nav**: every public route except `/` uses [components/PageNav.tsx](components/PageNav.tsx) — `variant="blue"` on `/writing`, `/writing/[slug]`, `/training-and-courses`, `/join-us`, `/privacy-policy`; `variant="white"` inside [components/CourseDetail.tsx](components/CourseDetail.tsx).
- **`/` is intentionally nav-less.** The Hero's 100 px wordmark IS the nav — the dramatic full-viewport hero is part of the brand impression and a sticky bar would compete with it. Decision recorded under STU-315 (2026-05-25) after `NavBar.tsx` lived as dead code for several weeks. Don't reintroduce a top-bar on home without a separate decision.
- **`<main>` requirements** (a11y baseline below): every route's `<main>` must have `id="main"` and `tabIndex={-1}` so the skip-link lands focus. Blue-background `<main>`s also need `cursor-white` (custom-cursor system).

### Section primitive + typography tokens (STU-312, 2026-05-25)

- **[components/Section.tsx](components/Section.tsx)** — the single page-level
  layout primitive. Composes the DS `Container` (semantic max-width wrapper)
  inside a `<section>` (or `<main>` / `<article>` via `as`). Props: `background`
  (`transparent` / `white` / `blue` / `cream`), `width` (`narrow` 720 / `default`
  960 / `wide` 1200 px), `padding` (`first` / `default` / `tight` / `roomy` /
  `none`), `align`. `blue` background auto-includes `cursor-white`.
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
- **Coverage ratchet**: [scripts/coverage-ratchet.mjs](scripts/coverage-ratchet.mjs) reads `coverage/coverage-summary.json`, compares to [.coverage-baseline.json](.coverage-baseline.json), fails if any of statements / branches / functions / lines drops > 0.5%. Auto-bump on `main` is currently a manual step (see STU-310).

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

## Known fragile areas

- **[components/Marquee.tsx](components/Marquee.tsx)** — canvas-based,
  SSR/client height was a source of hydration errors (commit `e1ed5dc`). Keep
  initial canvas dimensions consistent between server and client.
- **Custom cursor system** ([app/globals.css](app/globals.css) `*` selector) —
  overrides default cursors globally. If you re-introduce interactive elements,
  double-check `cursor: pointer` isn't lost; see Linear STU-291.
- **[components/CursorBlob.tsx](components/CursorBlob.tsx)** — `aria-hidden`,
  must stay decorative; AT users see nothing.
- **Writing pages** depend on Supabase reachability at build time. Lose the env
  vars → build fails at "Collecting page data".

## Sessions

When closing a session, update [MEMORY.md](MEMORY.md) with where you stopped and
any new learnings worth carrying forward.
