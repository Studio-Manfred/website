# Changelog

All notable changes to studiomanfred.com are recorded here. Format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/); this project doesn't
version-tag releases, so dates below correspond to production deploys of `main`.

## [Unreleased]

### Changed

- **Top nav**: on wide screens the nav now lines up with the content's outer edges on the shared CV, `/cases`, case pages, course pages, `/join-us`, `/writing` and `/privacy-policy`.

### Added

- **Menu**: the menu button is a plain hamburger, with no ring, and it turns into a cross when the menu opens (and back when it closes). The menu wipes in from the top, and its links fade in one after the other. The logo and the menu button are now flush with the page content's edges. On phones the nav shows the full wordmark, and the M only on very narrow screens (below 340 px), where the M is bigger than before (STU-1185).
- **Menu**: every page has the menu now, in the top nav after Get in touch (all pages except the shared CV). On a phone the nav shows the M instead of the wordmark so everything fits. The nav is the same width as the page content. The menu is always blue, also from a white page, and the close button sits in the same place as the menu button (STU-1185).
- **Menu**: Cases is back in the home menu ("Work we're proud of. Mostly."), and the menu has a Home link ("Back to start.") that is hidden on the home page. The link to the page you are on is never shown. The menu is now one shared component, ready for the other pages (STU-1185).
- **Cases**: on the Customer Journey Intelligence case the gap analysis and journey instrument headings stand alone, with what they mean behind a small info button, for a tighter page.
- **Home**: the wordmark in the hero draws itself when the page loads, in 1.6 s. When it is done, the headline rises, and the button 0.3 s later, with the same rise as before. Visitors who prefer reduced motion, visitors without JavaScript and a failed load all get the whole hero at once (STU-1183).
- **Home**: the open menu has no Manfred wordmark any more. The panel header holds only the close button, in the same place as the menu button (STU-1184).
- **Cases**: the AI Activities (Triple Diamond) page filters by level (Easy, Medium, Advanced) as well as by role (STU-1182).
- **Home**: a hamburger menu on the home page only. The button sits top right of the hero and scrolls away with the page: there is no sticky bar. The menu opens full screen with links to Writing and Training & Courses, a Get in touch button, the email and the phone number. A row turns white with blue text on hover, focus and tap. The close button takes the place of the menu button when the menu opens. Other pages keep their nav (STU-1181).
- **Cases**: the Customer Journey Intelligence demo is rebuilt in React in the site's brand at `/cases/customer-journey-intelligence`: industry switch (bank, insurer, grocery, e-commerce and hotel), filters in one panel at the top, gap analysis with ranked opportunities, emotion curve, touchpoints, metrics matrix, an Insights drawer, and build steps (step 1 easy to step 3 advanced) in a quiet row under the industry switch, folded away at first so the whole journey is easy to demo; opened, they filter the page to the parts of one step. The gap analysis and the journey instrument read as one section. Synthetic data, in English. It lists under Cases once a case row with that slug is published from the intranet.
- **Cases**: the Triple Diamond page is listed under Cases as "AI Activities throughout the triple diamond process" at `/cases/ai-activities-triple-diamond`, with title, intro, category and consultant from its case row (published from the intranet); the old share links redirect there (STU-1179).
- **Share**: a light line between the activities in each Triple Diamond Roles role group, and a blue tinted line between roles, so each activity is easy to tell apart (STU-1177).
- **Share**: on desktop the Triple Diamond Roles phase panels sit edge to edge with wider lanes (content up to 1600 px, less padding); phones keep the stacked panels (STU-1176).
- **Share**: three AI activities per role and sub-phase on the Triple Diamond Roles page, 126 in total, each with how, tools, an example and a level; the overview groups them under the role (STU-1175).
- **Share**: dashed lines connect the three Triple Diamond Roles diamonds, across on desktop and down between the stacked panels on phones (STU-1174).
- **Share**: each Triple Diamond Roles phase sits on its own brand tint (Light Beige, Blue 50, Human Pink), and the modal header uses the phase's tint (STU-1173).
- **Share**: Triple Diamond Roles activities have shorter titles and a difficulty level (Easy, Medium, Advanced), shown in the overview, explained in a legend and in the modal (STU-1172).
- **Share**: the Triple Diamond Roles overview shows each activity's title; selecting it opens a modal with how to work with it, tools and an example (STU-1171).
- **Share**: UX / Product Designer is a role on the Triple Diamond Roles page, with an AI activity in every sub-phase (STU-1170).
- **Share**: the Triple Diamond Roles page (where each role can use AI) on an unlisted, noindex share link under `/share/`, as a site page with the site's nav, footer and case-page type (STU-1167). The first `.html` link redirects there.
- **Shared CV**: the name, role and `---` the CV text starts with are taken out of the text; the role shows under the name in the Consultant box (STU-1164).
- **Cases**: an optional hero image under the intro of a case page, full width at 2:1 (STU-1153).
- **Cases**: outcomes can show a big key figure (for example +28%) in two columns, one column when narrow (STU-1153).
- **Cases**: the Process section is an accordion: several steps open at once, step 01 open first, a slowly pulsing ring on open steps (STU-1153).
- **Cases**: a case can be password protected; it's listed with a lock and opens with its password, remembered for 30 days (STU-1156).
- **CV**: CVs shared from the intranet open at `/cv/<link>` in the case-page style, with Download PDF (STU-1155).
- **Cases**: `/cases` lists every published case with its title and consultant (STU-1148).
- **Cases**: case pages at `/cases/<slug>` come from the intranet's Case CMS, live when published there (STU-1146).
- **Team**: Markus Dahlbom joins the team section.

### Fixed

- **Cases**: a consultant on the team shows their website team photo, not the intranet avatar the case editor copied (STU-1169).
- **Cases**: the process timeline's step names now meet WCAG AA contrast (they were light grey, 1.6:1) (STU-1146).

### Removed

- **Cases**: suggested tools and software are gone from the AI Activities (Triple Diamond) page, in the data, the modal and the copy (STU-1182).
- **Cases**: the hardcoded Fishbrain and Bokadirekt pages; both are now edited in the intranet's Case CMS (STU-1147).
- **Team**: Axel Nathorst-Böös has left Studio Manfred and is removed from the team section.

### Changed

- **Shared CV**: Download PDF is the design system's outline Button with a down arrow; on phones it is a round icon-only button next to the kicker line (STU-1164).
- **Design system 0.36 → 0.37.1.** Adds a `ColorPicker` component (not used on the site yet) and a packaging fix; no visible change.
- **Design system 0.33 → 0.36** (STU-944). The site's Tailwind entry now imports the DS `tokens.css` (so token utilities like `bg-muted` work in the site's own code) and has an `@source` for the DS `dist`, which keeps DS-only responsive classes in production builds. Added with `manfred-ds-cli doctor --fix`, which now reports 8/8 checks green. The custom cursor is unaffected: its unlayered `cursor: none` still beats the DS base-layer `cursor: pointer`.

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
