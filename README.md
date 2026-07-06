# studiomanfred.com

Marketing site for [Studio Manfred](https://studiomanfred.com). Home, writing,
training-and-courses, join-us, privacy-policy — plus a writing CMS backed by
Supabase.

## Stack

- **Next.js 16.2.6** (App Router, Turbopack) on **React 19.2.4**, TypeScript 5.
- **Tailwind v4** via `@tailwindcss/postcss` — no `tailwind.config.*`. Tokens
  come from `@studio-manfred/manfred-design-system/styles` imported in
  [app/layout.tsx](app/layout.tsx).
- **Design system**: [`@studio-manfred/manfred-design-system`](https://github.com/Studio-Manfred/manfred-design-system)
  from **GitHub Packages** (currently v0.33.0). Auto-bumped weekly by
  Dependabot; other deps are manual.
- **Data**: `@supabase/supabase-js` reading the `blog_posts` table from the
  intranet Supabase project (writing pages only).
- **Tests**: Vitest + React Testing Library + `@testing-library/jest-dom` for
  unit / component; Playwright (chromium desktop + mobile) + `@axe-core/playwright`
  for E2E + runtime a11y. Coverage ratchet at [scripts/coverage-ratchet.mjs](scripts/coverage-ratchet.mjs).
- **Hosting**: Vercel (`manfred-website` project under the `studio-manfred`
  team). Production auto-deploys from `main`; every PR gets a Preview URL.

## Local setup

**Node**: 20.x (matches CI).

**GitHub Packages auth** — required to install the DS.

```bash
export NPM_RC_TOKEN="$(gh auth token)"   # gh must have read:packages scope
# or store a dedicated PAT in your shell profile
npm install
```

`.npmrc` is committed and references `${NPM_RC_TOKEN}` for the `@studio-manfred`
scope. If your `gh` token lacks `read:packages`, generate a classic PAT with
that single scope at https://github.com/settings/tokens and export it.

**Supabase env** — required for `next build` and any dev traffic to
`/writing*`.

```bash
vercel env pull .env.local --environment=preview
# Or manually seed:
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...   (public-by-design; ships in the bundle)
```

Note: on some laptops Vercel returns encrypted values as empty strings; if
`.env.local` looks blank, paste the values in manually. For E2E work you can
use the mock Supabase server at [`e2e/mock-supabase.mjs`](e2e/mock-supabase.mjs)
(auto-started by Playwright).

## Commands

```bash
npm run dev            # next dev (Turbopack)
npm run build          # next build — fails without Supabase env vars
npm run start          # serve production build
npm run lint           # eslint flat config

npm test               # vitest run (~2s, 100+ tests)
npm run test:watch     # vitest interactive
npm run test:coverage  # writes coverage/ + summary; ratchet reads it

npm run e2e            # playwright test (chromium desktop + mobile, ~2 min)
npm run e2e:ui         # playwright in UI mode
```

Single-test workflow:

```bash
npx vitest run components/sections/Hero.test.tsx
```

## Architecture

### Page composition

Every page is built out of two locally-defined primitives (the DS ships more,
but see the "DS consumption" note below):

- **[`<Section>`](components/Section.tsx)** — the single page-level layout
  primitive. `background` (transparent / white / cream / blue), `width`
  (narrow=720 / default=960 / xl=1100 / wide=1200 px), `padding` (first /
  default / tight / roomy / none), `align` (left / center), `as` (section /
  main / article / div). Blue background auto-includes `cursor-white`.
- **[`lib/typography.ts`](lib/typography.ts)** — `clamp()` font-size tokens
  for hero-scale text the DS doesn't yet ship as fluid variants.

Home ([`app/page.tsx`](app/page.tsx)) composes `Hero → Tagline → Mission →
Services → Marquee → Team → WhatElse → JoinUs → Footer`. All except
`Team` are on `Section`; `Team` opts out because its rave-mode floating-emoji
overlays need to sit outside the max-width wrapper.

### Nav story

- `/` **has no top nav** — the Hero's 100 px wordmark IS the nav (dramatic
  first-impression brand moment). Do not reintroduce a top-bar on home
  without discussion.
- All other public routes use [`<PageNav variant="blue"|"white">`](components/PageNav.tsx).

### Analytics

Own-domain proxy so ad-blockers can't catch events by hostname. The tracker
script is served from `studiomanfred.com/js/t.js` (rewritten to
`manfred-analytics.vercel.app/t.js`), and it POSTs to
`studiomanfred.com/api/event` (rewritten to the analytics `/api/event`
endpoint). Config in [`next.config.ts`](next.config.ts).

Custom events fire via the [`<GetInTouchLink>`](components/GetInTouchLink.tsx)
client component, which wraps `window.manfred?.("Get in touch", { props: ... })`.

### Data

Writing routes call Supabase directly from server components. Everything else
is static (home, training, join-us, privacy).

## Accessibility baseline

- `<html lang="en">` in the root layout; the skip-link is the first focusable
  element of `<body>`.
- Every `<main>` has `id="main"` and `tabIndex={-1}` so the skip-link lands
  focus.
- A `:focus-visible` rule in [`app/globals.css`](app/globals.css) draws a 2 px
  `currentColor` outline on every interactive element — the ring stays
  ≥ 3:1 contrast against white, cream, and brand-blue backgrounds.
- Runtime axe (via `@axe-core/playwright`) hard-fails the build on
  serious/critical violations. Set `AXE_ENFORCE=0` to temporarily revert to
  warn-only.

Open a11y work: Linear epic **STU-286**.

## Testing rule (short)

Vitest for unit / component. Playwright for routes + a11y.

**TDD-required** when a diff touches `lib/`, stateful components, route
handlers, data fetches, or modules with state / intervals / regex / redirects.
Purely presentational JSX, copy edits, config tweaks, and docs are exempt.

The coverage ratchet at [scripts/coverage-ratchet.mjs](scripts/coverage-ratchet.mjs)
compares `coverage/coverage-summary.json` to
[`.coverage-baseline.json`](.coverage-baseline.json) and fails if any of
statements / branches / functions / lines drops > 0.5 pp. The `--update`
flag only bumps UP — if you add uncovered code, exclude it in
[`vitest.config.ts`](vitest.config.ts) (following the pattern for
`layout.tsx` / `page.tsx` / `opengraph-image.tsx`) or add a test.

## Deploying

`main` is the only long-lived branch; Vercel auto-deploys production from it.
`vercel --prod` also works from a clean local main.

Preview URLs are auth-protected (Vercel deployment protection).

**Environment variables** (Vercel project settings):

| Variable | Where | Purpose |
| --- | --- | --- |
| `NPM_RC_TOKEN` | Preview + Production | Classic PAT with `read:packages` for DS install from GitHub Packages |
| `NEXT_PUBLIC_SUPABASE_URL` | Preview + Production | Supabase project URL (used by writing routes) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Preview + Production | Supabase anon key (public-by-design; ships in bundle) |

**GitHub repo Secrets** (for Actions):

- `NPM_RC_TOKEN` — same PAT as Vercel (CI installs DS)
- `SLACK_WEBHOOK_URL` — monthly site-audit alert channel

**When you rotate a PAT**: check GitHub Actions workflows, GitHub repo Secrets,
**and Vercel env vars**. The three stores are independent; a token can be
referenced by one and missed by a workflow grep.

## Commits and PRs

- **Conventional Commits**: `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`,
  `test:`, `style:`, `perf:`. Reference the Linear ticket in the subject when
  the work maps to one (`feat(a11y): add skip-to-content link (STU-292)`).
- Squash-merge by default. The resulting single-line commit becomes the
  changelog entry.
- Body explains **why**, not what.
- Never `git commit --amend` on published commits. Never `git push --force` on
  `main`.

## Known fragile areas

- **[`components/Marquee.tsx`](components/Marquee.tsx)** — canvas-based,
  SSR/client hydration was historically finicky. Keep initial canvas dimensions
  consistent between server and client.
- **Custom cursor system** ([`app/globals.css`](app/globals.css) `*` selector) —
  overrides default cursors globally. Re-introducing interactive elements can
  silently drop `cursor: pointer`.
- **[`components/CursorBlob.tsx`](components/CursorBlob.tsx)** — `aria-hidden`,
  must stay decorative.
- **Writing pages** depend on Supabase reachability at build time. Blank env
  vars → build fails at "Collecting page data".

## Where to look for more

- [`CLAUDE.md`](CLAUDE.md) — instructions for AI collaborators; captures the
  finer-grained architectural conventions and current in-flight decisions.
- [`MEMORY.md`](MEMORY.md) — session hand-off notes.
- [`design-system-audits/`](design-system-audits/) — periodic audits of how
  the site is consuming the DS ([latest: 2026-05-25](design-system-audits/website-2026-05-25.md)).
- Linear: [Web project](https://linear.app/studio-manfred/project/web).
