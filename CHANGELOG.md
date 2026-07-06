# Changelog

All notable changes to studiomanfred.com are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project doesn't
version-tag releases, so dates below correspond to production deploys of `main`.

## [Unreleased]

## [2026-07-06]

### Added

- **Own-domain analytics proxy** (#26). `next.config.ts` now rewrites
  `/js/t.js` and `/api/event` to `manfred-analytics.vercel.app` so
  ad-blockers can't catch the tracker by hostname. Home layout serves the
  script from `/js/t.js`; the tracker derives its POST endpoint from the
  script's own origin, so events automatically route back through our own
  domain. Zero coordination with the analytics repo needed.

### Changed

- **DS bumped `0.22.0 → 0.33.0`** (#25, Dependabot). Adds `Tabs`
  `overflow="scroll"`, `SplitButton`, `Button` `destructive` variant, and 8
  other releases of accumulated additive changes. Website surface consumed
  (Button, Container, Logo, Typography) unaffected. `react-day-picker` peer
  bump v9 → v10 (0.32.0) is a no-op for us — we don't use it directly.

### Fixed

- **`app/opengraph-image.tsx` excluded from coverage aggregate** (#26). Its
  10 uncovered statements had been silently dropping the aggregate below
  baseline since STU-470; the auto-bump job only bumps UP so the baseline
  never adjusted. Same rationale as the existing `layout.tsx` / `page.tsx`
  exclusions — Next.js file-based metadata isn't application logic.

### Ops

- **`NPM_RC_TOKEN` rotated in Vercel**. Deleting an unused-looking PAT broke
  Vercel builds (production was silently stuck 40 days behind main); grepping
  workflows alone misses env vars in Vercel + external services. New classic
  PAT with `read:packages` installed.
- **GitHub labels created** — `dependencies` and `design-system` (referenced
  by `dependabot.yml` but hadn't been created). Future Dependabot PRs stop
  emitting the "labels not found" warning.

## [2026-05-25]

### Added

- **Section primitive smoke-tests** (#20, STU-447). 11 new Vitest tests
  covering the previously-0%-coverage presentational cohort (Hero, Tagline,
  Mission, Services, WhatElse, JoinUs, WritingHeader, WritingListItem,
  ArticleMeta, ArticleHero, ArticleBody). Coverage: statements 62.81 →
  **68.24 %**, branches 59.06 → **64.91 %**, functions 56.96 → **72.72 %**,
  lines 63.70 → **69.79 %**. Dead `Clients.tsx` deleted.
- **Home sections migrated onto `Section` primitive** (#19, STU-311). Tagline,
  Mission, Services, WhatElse, JoinUs now use the primitive; `Team` documented
  as the intentional exception (its rave-mode overlays need siblings outside
  the max-width wrapper).

### Changed

- **`.article-body` typography → `clamp()`** (#18, STU-314). Replaces static
  `px` (24 / 48 / 36 / 28 / 22) with `clamp()` ranges; drops the
  `@media (max-width: 768px)` override. Mobile h2:body ratio drops from
  2.67× → 1.78×; desktop identical.

### Fixed

- **Coverage baseline reflects post-STU-313 reality** (#17). Baseline
  adjusted from 57.49 / 80.57 / 64.86 / 57.49 → 62.81 / 59.06 / 56.96 /
  63.70 after STU-313 added five presentational writing-page components.

## [2026-05-15]

### Added

- **Manfred wordmark for Open Graph preview** (#21, STU-470). Home page's
  OG image now uses the brand wordmark.
- **White-M-on-brand-blue favicon** (#16, STU-446). Replaces the default
  Next.js favicon; auto-detected file-based icon convention (`app/icon.png`,
  `app/apple-icon.png`, `app/favicon.ico`).

### Changed

- **DS `0.10.1 → 0.22.0`** (#15, STU-443). Consumes the new `.manfred-prose`
  layer for article-body anchor styling; replaces `#efd6d3` peach literals
  with `var(--color-text-link-on-brand)` from the DS.

### Fixed

- **`FadeIn` intersection threshold** — dropped to 0 so tall wrappers fire
  reliably (#13, STU-313 regression fix).

## Earlier

Before 2026-05-15, individual deploys weren't tracked in a changelog. See
`git log` for the full history. Notable milestones:

- **Testing infrastructure** (STU-297): Vitest + RTL + MSW for unit;
  Playwright + axe for E2E. `AXE_ENFORCE=1` gates PR merges on
  serious/critical a11y violations.
- **Section primitive + typography tokens** (STU-312): the layout primitive
  used across the site.
- **Component-ify writing pages** (STU-313): writing list + writing/[slug]
  moved from inline JSX to named sections.
- **Section sweep** (STU-316): join-us / training / privacy / Footer moved
  onto the primitive.
- **Analytics event tracking** (STU-364): `<GetInTouchLink>` custom event
  fires from every CTA placement.
- **DS 0.22 consumption** (STU-443): peach + prose migration.
- **News → writing redirect** (STU-366): `/news/<slug>` → `/writing/<slug>`.
