# MEMORY.md — Studio Manfred website

Quick-start notes for future sessions. Audit this before editing — recent changes may have invalidated parts of it.

## 2026-10-23 — Home hero intro (STU-1183, branch `markus/stu-1183-animated-manfred-wordmark-intro-on-the-home-hero-lottie`)
- Where it stopped: code, unit tests and e2e tests are done and committed. The PR is not open (the owner reviews the text first). Spec and plan: `docs/superpowers/specs|plans/2026-10-23-hero-wordmark-intro.md`. It branches from `main`, so it does not have the menu from PR #58 (STU-1181). Both touch the hero and CLAUDE.md, CHANGELOG.md and MEMORY.md: expect small conflicts, and rebase after #58 merges.
- The owner's source files are outside the repo: `~/Downloads/manfred-logo-white-vector.lottie` and `.json` (a trace), `~/Downloads/Comp 1 1.gif` and `~/Desktop/manfred-logo-white-transparent.gif` (the GIF it came from). To rebuild the stencil: `node scripts/build-wordmark-stencil.mjs ~/Downloads/manfred-logo-white-vector.json 0 71`.
- Decisions: 1.5× speed (1.89 s), the real wordmark through a stencil (no player library), the headline after the wordmark is fully drawn, the button 0.3 s later, every visit. The owner found the Lottie "chopped" at the top of the "d": that is the trace, not the GIF.
- Gotchas found: the pen draws the "d" stem last, so the word is complete at frame 71, not 62; `useId()` gives colons, so strip them for an SVG `url(#id)`; the DS `Logo` takes no mask, so `lib/wordmark.ts` copies its paths; in `next dev` the first frame can show the whole wordmark for ~100 ms (CSS arrives late) but not in the production build; `preview_start` navigates the tab to `/` once it is ready, so navigate again to a temp page.
- Open: a stroke-based export (trim paths) from the designer would allow a real handwriting reveal, with no stencil.

## 2026-10-23 — Home hamburger menu (STU-1181, branch `markus/stu-1181-hamburger-menu-for-studiomanfredcom`)
- Where it stopped: code, unit tests and e2e tests are done and committed. The PR is not open. Specs: `docs/superpowers/specs/2026-10-23-home-hamburger-menu.md`; plan: `docs/superpowers/plans/2026-10-23-home-hamburger-menu.md` (tasks 0–9 done, task 10 = full checks + PR, ask before opening).
- Design source: `manfred-website-hanburger-menu.pen` (pen.dev, in `~/.pencil/documents/`). It has desktop and mobile frames for the three states. Its values changed after local reviews: link text 48 px (design had 72), rows invert on hover, and there is **no sticky bar** (the owner dropped it on 2026-10-23, so frame B and the 104 px bar are gone; the menu button is `absolute` and scrolls away). The `.pen` file still shows the old design.
- `HomeMenu` is on `/` only. Links: Writing and Training & Courses. Home and Cases are out (the owner may bring Cases back). The panel has no wordmark and no link home (STU-1184, owner decision 2026-10-23): the header is only the close button. Subtitles are playful, in the site voice: "Thoughts from the messy middle." and "Steal our tricks. We won't mind." (owner's pick, 2026-10-23). Phone is plain text, as in the footer.
- Gotchas found: the DS stylesheet repeats Tailwind utilities, so `md:` variants lose to a DS base class (use arbitrary values); Next's `Link` prevents the default click, so Radix `SheetClose` does not close (close from state); the global focus rule beats a `focus-visible:outline-offset-*` utility; `cursor-white` is a no-op; a hidden Browser pane reports a 0×0 viewport, so set the size before you measure.
- To run the e2e tests locally: start `node e2e/mock-supabase.mjs`, build with `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key npm run build`, then `npx playwright test` (needs `npx playwright install chromium` once). Stop any dev server on port 3000 first.

## 2026-10-21 — Shared CV: role under the name, outline Download PDF (STU-1164, PR #42)
- `lib/cv-header.ts` `splitCvHeader` mirrors the intranet's (PDF) one, but on sanitized HTML with string matching (no DOM on the server). `getSharedCv` returns `role` and the text without the header; `SharedCv` shows the role under the name in the Consultant box.
- `PrintButton` is the DS `Button variant="outline" size="sm"` with an inline down-arrow SVG (the DS has no download icon yet). On phones (`max-sm:`) it is absolutely placed top right of the header block, 40px round, label `sr-only`. The header div is `relative` for that.
- Preview deploys show the normal site: to see a shared CV take a share link from the intranet and swap the domain for the preview's (`.../cv/<token>`).
- CodeQL flagged the tag-stripping regex in `textOf` (incomplete multi-character sanitization); it now strips until stable.

## Stack
- **Next.js 16.2.6** App Router on **React 19.2.4**, **TypeScript 5**, **Tailwind v4** (PostCSS plugin, no `tailwind.config` — tokens live in the design system CSS).
- `@studio-manfred/manfred-design-system@^0.37.1` pulled from **GitHub Packages** (see [.npmrc](.npmrc), [.github/dependabot.yml](.github/dependabot.yml) auto-bumps it weekly).
- Data layer: **Supabase** (`@supabase/supabase-js`) — only `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY`. The CMS itself lives in a separate "intranet" project (commit `19642c4`).
- Test suite: Vitest + RTL + jest-dom (100+ unit tests, `npm test`), Playwright + `@axe-core/playwright` (E2E + runtime a11y, `npm run e2e`). Coverage ratchet at [scripts/coverage-ratchet.mjs](scripts/coverage-ratchet.mjs). No `vercel.json` / `vercel.ts`.
- Scripts: `dev / build / start / lint / test / test:watch / test:coverage / e2e / e2e:ui`. ESLint flat config extends `next/core-web-vitals` + `next/typescript`. tsconfig path alias `@/*` → repo root.
- `package.json` name is still `studio-manfred-scaffold` (predates the rename).
- **AGENTS.md warning**: "This is NOT the Next.js you know." Consult `node_modules/next/dist/docs/` before writing App Router / framework code — don't trust training-data memory.

## Routes ([app/](app/))
- `/` — single-page composition in [app/page.tsx](app/page.tsx): `Hero → Tagline → Mission → Services → Marquee → Team → WhatElse → JoinUs → Footer`.
- `/training-and-courses` — accordion landing ([page.tsx](app/training-and-courses/page.tsx)) + 7 course sub-pages (business-design, customer-journey-mapping, cx-management, design-leadership, design-thinking-for-hr, designops, product-discovery). Each sub-page renders a shared [CourseDetail](components/CourseDetail.tsx) from `courses.find(...)`.
- `/writing` and `/writing/[slug]` — Supabase-backed blog ([lib/articles.ts](lib/articles.ts) reads `blog_posts` + `profiles`, strips WP shortcodes via `cleanContent`).
- `/cases/[slug]` — case pages from the intranet's **Case CMS** (STU-1143/1146): [lib/cases.ts](lib/cases.ts) reads one **published** `cases` row (RLS: anon sees published only), [components/CaseStudy.tsx](components/CaseStudy.tsx) renders the blocks (brief / process via `ProcessTimeline` / deliverables via `CaseLightbox` / outcomes) and the sidebar. `force-dynamic`, so publishing in the intranet shows at once. Unknown block types are skipped. Fishbrain and Bokadirekt moved into the CMS in STU-1147 (2026-10-19); their old static pages are gone, and the source visualisations stay in `public/cases/`. `/cases` ([app/cases/page.tsx](app/cases/page.tsx), STU-1148) lists every published case with title and consultant via `listCases()`.
- **Locked cases (STU-1156):** a published case with a password isn't readable from the table (RLS). `/cases/[slug]` falls back to the `case_unlock_<slug>` httpOnly cookie (30 days, path-scoped; the password itself, re-checked with `get_locked_case` on every visit), else shows `CasePasswordGate` (form → Server Function `unlockCase` in app/cases/[slug]/actions.ts). `/cases` lists via `list_case_summaries()` with a `locked` flag. Locked pages are `noindex`.
- `/cv/[token]` — a CV shared from the intranet (STU-1155): [lib/cv.ts](lib/cv.ts) calls the intranet Supabase function `get_shared_cv(token)` (no table access; a token is 32+ url-safe chars), sanitizes the CV HTML with `sanitize-html` (allowlist), [components/SharedCv.tsx](components/SharedCv.tsx) renders it in the case-page style. `noindex`, `force-dynamic`, 404 when unknown or no longer shared. **Download PDF** = `window.print()` with the A4 print stylesheet at the end of app/globals.css (`.print-hidden` hides nav, footer and the button).
- `/news` — pure `redirect("/writing")` ([app/news/page.tsx](app/news/page.tsx)).
- `/join-us`, `/privacy-policy` — static content pages.

## Components ([components/](components/))
- [ds.tsx](components/ds.tsx) — single `"use client"` re-export of `Button`, `Container`, `Icon`, `Logo`, `Sheet*`, `Typography` from the DS. Required because Radix needs Client Components. **Always import DS primitives via `@/components/ds`, never directly from the package.**
- [PageNav.tsx](components/PageNav.tsx) — the single nav primitive. `variant="blue"` on every sub-page, `variant="white"` on the course-detail surface. Home has no `PageNav`: the Hero's wordmark is its nav, plus [HomeMenu](components/HomeMenu.tsx), a hamburger menu (STU-315, STU-1181; no sticky bar).
- [Footer.tsx](components/Footer.tsx) — large blue footer block; mentions Mather Studio network.
- [CursorBlob.tsx](components/CursorBlob.tsx) — global cursor-follower mounted in `RootLayout`.
- [Marquee.tsx](components/Marquee.tsx) — canvas-based wave marquee. Commit `e1ed5dc` enforced consistent SSR/client canvas height to fix hydration errors — be careful when touching it.
- [FadeIn.tsx](components/FadeIn.tsx), [LoopingPhoto.tsx](components/LoopingPhoto.tsx), [VibesGrid.tsx](components/VibesGrid.tsx), [VibesMarquee.tsx](components/VibesMarquee.tsx) — visual flourishes.
- [sections/](components/sections/) — one file per home-page section; mostly inline-styled, heavy use of `clamp()` for responsive type.

## Data ([lib/](lib/))
- [lib/supabase.ts](lib/supabase.ts) — single browser client from public env keys.
- [lib/articles.ts](lib/articles.ts) — `Article` type, `getArticles()` / `getArticle(slug)`, HTML stripping + WP shortcode cleanup.
- [lib/cases.ts](lib/cases.ts) — `CaseStudy` type, tolerant `parseCase`, `getCase(slug)`. Shapes mirror the intranet's `src/lib/case-model.ts`: change both repos together.
- [lib/courses.ts](lib/courses.ts) — `Course[]` with discriminated `ContentBlock` union (`text | list | testimonial | alumni | fine-print`). Courses are static, not in Supabase.

## Styling conventions
- Tailwind v4 in [app/globals.css](app/globals.css): `@import "tailwindcss";` + `@import "@studio-manfred/manfred-design-system/tokens.css";` + `@source` for the DS dist (STU-944). The prebuilt DS stylesheet is still imported in [layout.tsx](app/layout.tsx). Check the setup with `npx @studio-manfred/manfred-ds-cli@latest doctor` (auth via `NPM_RC_TOKEN`).
- Heavy reliance on CSS variables from the DS: `var(--color-business-blue)`, `var(--size-container-2xl)`, `var(--letter-spacing-tight)`, `var(--line-height-tight)`, `var(--color-interactive-brand-bg)`.
- `html` is locked to `lang="en"` + `className="h-full light"` — no dark-mode toggle yet.
- Custom cursor system: the M is the fixed `CustomCursor` div (`z-index` 10000, `mix-blend-mode: difference`); `globals.css` sets `cursor: none` everywhere. `.cursor-white` is a no-op. A native `<dialog>` gets the OS cursor (STU-1171).
- Scroll reveal uses `.fade-up` + `.in-view` toggled by IntersectionObserver, with `fade-up-delay-1..3` for staggering.
- `.article-body` class styles WordPress-imported HTML (figures, iframes, captions) — used by the writing slug page.

## Things to watch
- The "Next.js you know" caveat in AGENTS.md is load-bearing — don't assume App Router APIs from memory.
- Dependabot only auto-PRs the design system; everything else (Next, React, Supabase) is manual.
- `.npmrc` is gitignored locally but a committed version drives Vercel installs (commits `bcc5f03`, `f5180b0`).
- No test infrastructure — verification has to be manual / via dev server.
- Inline-style + Tailwind mix is intentional (clamp-based fluid type); don't refactor to pure Tailwind without checking the design intent.

## Recent direction (May 2026)
Last commits focused on polish: team segment update, responsiveness on course sub-pages, hero title & blog page padding, Vercel deploy fix via `.npmrc`. No active feature branch — `main` is clean. Next likely areas: more content in `/writing` (Supabase-driven), continued responsive polish on training pages.

---

## A11y QA audit (2026-05-15, static scan)

Mode: static (source review against WCAG 2.2 AA). No dev server / axe-core runtime run — automated rules catch ~30–40% of issues; runtime axe pass + screen-reader sweep still pending.

### Passes (no action)
- `<html lang="en">` set in [app/layout.tsx](app/layout.tsx).
- All `<img>` / `<Image>` tags carry an `alt` attribute (8 instances across [Mission](components/sections/Mission.tsx), [Team](components/sections/Team.tsx), [CourseDetail](components/CourseDetail.tsx), [LoopingPhoto](components/LoopingPhoto.tsx), [VibesGrid](components/VibesGrid.tsx), [VibesMarquee](components/VibesMarquee.tsx), [join-us](app/join-us/page.tsx), [writing/[slug]](app/writing/[slug]/page.tsx)). Alt-text quality (meaningful vs decorative `alt=""`) not yet reviewed.
- All external links (`target="_blank"`) include `rel="noopener noreferrer"`.
- Canvas-based marquee correctly exposes a text alternative: `role="img"` + `aria-label="Boka Direkt, Mentimeter, …"` ([Marquee.tsx:169-170](components/Marquee.tsx#L169-L170)).
- Decorative cursor blob marked `aria-hidden` ([CursorBlob.tsx:44](components/CursorBlob.tsx#L44)).
- Semantic landmarks present: `<main>`, `<section>`, `<header>`, `<footer>` on every page.
- No `onClick` handlers found on non-interactive elements (`div`, `span`, etc.).
- No form elements (no input/textarea/select/label) so no label-association risks today.
- Each route has exactly one `<h1>`; subsequent sections start at `<h2>` and step to `<h3>/<h4>` without skipping levels.

### Findings

**Serious**
1. **Training accordion buttons lack `aria-expanded` / `aria-controls`** — [app/training-and-courses/page.tsx:48](app/training-and-courses/page.tsx#L48). Native `<button>` is used (good), but screen-reader users can't tell whether a course panel is open. Add `aria-expanded={isOpen}`, give each panel an `id`, and reference it via `aria-controls`. WCAG 4.1.2.
2. **No visible focus styles in app CSS** — [app/globals.css](app/globals.css) has no `:focus` / `:focus-visible` rule. Custom cursor system (`*` selector at line 5) doesn't kill focus rings, but the burden is fully on the DS to provide them. Verify each DS `Button`/link has a visible focus indicator with ≥3:1 contrast; add a baseline `:focus-visible { outline: 2px solid …; outline-offset: 2px }` for plain `<a>` tags inside the footer, training list, and writing list. WCAG 2.4.7.
3. **Low-contrast text on the blue background** — multiple places use white at 50–70% opacity on `var(--color-business-blue)`:
   - `rgba(255,255,255,0.5)` for article figcaption ([globals.css:94](app/globals.css#L94)) and writing-page dates/meta ([writing/page.tsx:38,61](app/writing/page.tsx#L38), [writing/[slug]/page.tsx:45](app/writing/[slug]/page.tsx#L45)).
   - `text-white/70`, `text-white/80`, `text-white/90` in [Footer.tsx:14,43](components/Footer.tsx#L14) and others.
   At 50% opacity on a saturated brand blue, body-size text almost certainly fails the 4.5:1 ratio. Verify with a contrast checker; for non-decorative text, lift to ≥80% opacity or use a token. WCAG 1.4.3.

**Moderate**
4. **No `prefers-reduced-motion` handling** — fade-up reveal, marquee scroll keyframes ([globals.css:39](app/globals.css#L39)), accordion height transitions, and the cursor blob all animate unconditionally. Add `@media (prefers-reduced-motion: reduce) { .fade-up, .fade-up.in-view { transition: none; transform: none; opacity: 1 } @keyframes marquee-scroll { … paused state … } }` and gate `CursorBlob` activation on `matchMedia("(prefers-reduced-motion: reduce)")`. WCAG 2.3.3 / 2.2.2.
5. **Custom cursor overrides default for all elements** — `*, *::before, *::after { cursor: url('/m-cursor.svg') 22 22, auto }` ([globals.css:3-5](app/globals.css#L3-L5)). Side effects: (a) users who rely on OS cursor scaling / high-contrast cursors lose them; (b) browsers that fail to load the SVG fall back to `auto`, so links don't get `cursor: pointer`; (c) `[WhatElse]` sets `cursor: none` on photos, hiding the pointer entirely (the blob substitutes, but it's `aria-hidden`, so AT/keyboard users have no equivalent). Consider: scoping `.cursor-white` only to sections that need it, restoring `cursor: pointer` on `a`, `button`, `[role="button"]`, and disabling the system under `prefers-reduced-motion`.
6. **No skip link** — sticky [NavBar](components/NavBar.tsx) + 8 home sections force keyboard users to tab through everything to reach content. Add `<a href="#main" className="sr-only focus:not-sr-only …">Skip to content</a>` in `RootLayout` and give the page `<main id="main" tabIndex={-1}>`. WCAG 2.4.1.

**Minor / Manual review needed**
7. **Image alt-text quality** — script confirmed every `<img>`/`<Image>` has *an* alt, but I didn't read each value. Photos in [Team.tsx](components/sections/Team.tsx), [LoopingPhoto.tsx](components/LoopingPhoto.tsx), [VibesGrid.tsx](components/VibesGrid.tsx), [VibesMarquee.tsx](components/VibesMarquee.tsx) and join-us are likely decorative — they should use `alt=""`, not file-name-derived strings. The blog hero uses `alt={article.title}` which is fine.
8. **Native `<img>` (not `next/image`) on the writing slug page** — [writing/[slug]/page.tsx:65](app/writing/[slug]/page.tsx#L65) with an inline lint-disable. Performance/CLS concern, not a11y blocker, but worth migrating.
9. **DS button + anchor pattern** — `<Button asChild><a href="mailto:…">Get in touch</a></Button>` is used everywhere. Confirm the DS preserves focus styles and exposes an accessible name when wrapped this way (Radix `Slot` semantics depend on the DS implementation).

### Not yet covered (manual checklist owed)
- Runtime axe-core scan against `next dev` (the skill recommends this as the default mode; needs browser automation).
- Keyboard-only walk-through of every page (tab order, accordion open/close, link reachability).
- Screen-reader pass (VoiceOver on macOS; verify Marquee `aria-label` reads correctly and CursorBlob stays silent).
- 400% zoom + 320 px viewport reflow check.
- Touch-target audit (≥24×24 px, ideally ≥44×44 px) — particularly the accordion header chevrons and footer mailto links.

---

## Testing infrastructure (2026-05-15, epic STU-297)

Built out top-to-bottom in one session. Tracks:

| Layer | Stack | Where |
|---|---|---|
| Unit / component | Vitest + RTL + jest-dom + user-event | `vitest.config.ts`, `test/setup.ts` |
| HTTP mocking (unit) | MSW v2 | `test/msw/handlers.ts`, `test/fixtures/blog-posts.json` |
| E2E | Playwright (chromium-desktop + chromium-mobile via Pixel 5) | `playwright.config.ts`, `e2e/` |
| Mock Supabase for E2E | Node http server emulating PostgREST | `e2e/mock-supabase.mjs` |
| Runtime a11y | `@axe-core/playwright` (warn-only until 2026-05-29) | `e2e/a11y.spec.ts` |
| Coverage ratchet | `@vitest/coverage-v8` + custom script | `scripts/coverage-ratchet.mjs`, `.coverage-baseline.json` |
| CI | GitHub Actions, two jobs (`verify` + `e2e`) | `.github/workflows/ci.yml` |
| PR template | TDD rule + test-added checkbox | `.github/pull_request_template.md` |

**Current shape on `main`:**
- 57 unit/component tests across 11 files.
- 58 Playwright specs (smoke + redirects + skip-link + 26 a11y warn-only).
- Coverage baseline: `statements 55.53 / branches 77.23 / functions 57.57 / lines 55.53`. `lib/` is 100% statements & lines.
- CI ~3m 15s wall-clock (verify ~50s, e2e ~2m 25s).

**Tickets shipped under STU-297:** STU-298 (Vitest foundation), STU-299 (CI verify), STU-300 (coverage ratchet), STU-301 (MSW), STU-302 (stateful component tests), STU-303 (accordion ARIA + STU-287 fix), STU-304 (lib unit tests), STU-305 (Playwright setup), STU-306 (E2E smoke), STU-307 (axe a11y), STU-308 (CI e2e job), STU-309 (PR template + this doc).

**Deferred:** STU-310 (auto-bump coverage baseline on main — blocked by org `default_workflow_permissions: read`).

**Known a11y backlog still open** (axe is currently surfacing these in warn-only):
- STU-288 — `:focus-visible` styles (axe rule: not directly flagged, manual)
- STU-289 — low-contrast white-on-blue text (axe: `color-contrast`, 3 nodes on /writing, 1 on /writing/hello-world)
- STU-290 — `prefers-reduced-motion`
- STU-291 — custom-cursor system
- "link-in-text-block" (serious, ~3 nodes per page) — links rely on colour alone to distinguish from surrounding text. Probably folded into STU-289 fix.

When STU-288 + STU-289 land, set `AXE_ENFORCE=1` in [.github/workflows/ci.yml](.github/workflows/ci.yml) e2e job env to flip axe from warn-only to merge-blocking.

### Local commands cheat sheet

```bash
npm test                 # unit + component
npm run test:coverage    # writes coverage/coverage-summary.json
npm run e2e              # full Playwright run (auto-spins mock-supabase + next start)
npm run e2e:ui           # Playwright UI mode
node scripts/coverage-ratchet.mjs           # check against committed baseline
node scripts/coverage-ratchet.mjs --update  # bump baseline locally if it rose
```

The Playwright `webServer` pipes `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321` into `next start`. If `.next/` is stale from earlier dev runs, `next start` can fall back into dev-mode runtime — `rm -rf .next && npm run build` clears that.

---

## Analytics CTA tracking (2026-05-21, STU-364)

Manfred Analytics tracker is loaded via `<script defer>` in [app/layout.tsx](app/layout.tsx) (`fdda68d`). On top of pageviews, "Get in touch" CTA clicks now fire a custom event:

```ts
window.manfred?.("Get in touch", { props: { location, page: window.location.pathname } });
```

- Single client component owns the call: [components/GetInTouchLink.tsx](components/GetInTouchLink.tsx). Mailto href is hard-coded inside it.
- `Window.manfred` typed in [app/manfred.d.ts](app/manfred.d.ts).
- Five placements, five `location` values: `nav` (both [PageNav.tsx](components/PageNav.tsx) variants on subpages — home has no nav per STU-315), `hero` ([sections/Hero.tsx](components/sections/Hero.tsx)), `home-join-us` ([sections/JoinUs.tsx](components/sections/JoinUs.tsx)), `what-else` ([sections/WhatElse.tsx](components/sections/WhatElse.tsx)), `join-us-cta` ([app/join-us/page.tsx](app/join-us/page.tsx)). The `page` prop disambiguates which subpage the `nav` placement fired from in the dashboard.
- 4 unit tests in [components/GetInTouchLink.test.tsx](components/GetInTouchLink.test.tsx) cover render, tracker call shape, no-throw on missing tracker, and `className` / children passthrough.
- Out of scope (not "Get in touch" CTAs): the Footer email link (renders the address itself), `CourseDetail` "Register interest", training page "Ping us", privacy-policy inline email mentions. They get their own ticket if we want them tracked.

**Open follow-up:** in an incognito window after deploy lands, click each placement and verify the `Get in touch` event appears in the [Custom events](https://manfred-analytics.vercel.app/sites/studiomanfred.com) accordion within minutes — first real conversion signal we get from the site.

---

## Supabase anon key rotation (2026-05-22, STU-365)

`/writing` was 500-ing for ≥3 days (earliest log 2026-05-18 23:02 UTC) because Supabase had stopped accepting the legacy JWT-format anon key — error JSON started with `{"message":"Legacy A…`. Bug pre-dated STU-364 entirely; ruled out via log timestamps.

Fix: generated a new publishable key in Supabase Studio (`sb_publishable_…`), then via Vercel CLI:

```bash
vercel env rm NEXT_PUBLIC_SUPABASE_ANON_KEY production --yes
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production --value '<new>' --yes
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview "" --value '<new>' --yes
vercel redeploy https://manfred-website-git-main-studio-manfred.vercel.app --target production
```

Notes worth remembering:
- **One delete cleared both environments** when the var was registered as a single `Preview, Production` entry. After re-adding, it shows as two separate rows (same value) — cosmetic.
- **CLI 50.38.2 quirk**: `vercel env add NAME preview --value X --yes` loops with `git_branch_required` even though `--yes` should accept the "all branches" default. Workaround: pass an explicit empty positional — `vercel env add NAME preview "" --value X --yes`. Likely fixed in 54.x; the session hook is nagging to upgrade.
- `supabase-js` accepts both `eyJ…` (legacy JWT) and `sb_publishable_…` formats transparently — no code change required, just the env-var value.
- Supabase is mid-deprecation on legacy keys; expect the same `"Legacy A…"` error on any other project still using JWT-format anon/service keys. The Studio toggle for "Disable legacy API keys" is the quick rollback if needed.

---

## Monthly site audit (2026-05-22)

Headless Playwright crawl runs on the **1st of each month at 08:00 UTC** via [.github/workflows/site-audit.yml](.github/workflows/site-audit.yml). Source: [scripts/audit-404.mjs](scripts/audit-404.mjs) (the crawler) + [scripts/audit-404-notify.mjs](scripts/audit-404-notify.mjs) (the Slack poster). Both are unit-tested ([scripts/audit-404.test.mjs](scripts/audit-404.test.mjs), [scripts/audit-404-notify.test.mjs](scripts/audit-404-notify.test.mjs)) — 14 cases covering URL normalization, finding classification, and Slack-message shape.

Behaviour:
- BFS-walks every page reachable from `https://studiomanfred.com/`, capped at 200 pages.
- For external links, does a `HEAD` (falls back to `GET` on 405/403) with a 12s timeout.
- Reports as **broken** = HTTP 404 _or_ fetch-error (status 0 / DNS / abort). 403 is treated as bot filtering and ignored.
- Posts a Slack message to the channel bound to **`SLACK_WEBHOOK_URL`** (repo secret) only when at least one broken URL is found. Clean runs are silent.
- Always uploads `audit-report.json` as a 90-day artifact, so historical state is reviewable from the Actions tab.

Manual trigger: Actions → **Monthly site audit** → Run workflow. Useful right after fixes (e.g. STU-366) to verify 0 findings.

Required secret: `SLACK_WEBHOOK_URL` — a Slack incoming webhook bound to the alert channel. Workflow skips the notify step with an explicit error if findings exist and the secret is missing.

**End-to-end verified 2026-05-22** ([STU-367](https://linear.app/studio-manfred/issue/STU-367), Done). Secret set + workflow manually dispatched ([run 26271002393](https://github.com/Studio-Manfred/website/actions/runs/26271002393)) → crawler found the 9 known `/news/<slug>` 404s from STU-366 → Slack notify posted (`Posted Slack alert: 9 broken URLs.`) → message landed in channel. GitHub masked the webhook value as `***` in run logs as expected.

**Security follow-up**: the webhook URL was pasted in chat during setup, so it lives in conversation logs. Rotating it in Slack and re-running `gh secret set SLACK_WEBHOOK_URL --repo Studio-Manfred/website --body "<new>"` is the clean move.

---

## Legacy /news/<slug> redirects (2026-05-25, STU-366)

WordPress migration left `/news/<slug>` cross-links inside imported article bodies; the new App Router only exposes `/writing/<slug>-<timestamp>` so all 9 were 404-ing. Fixed via Option A — a single dynamic route at [app/news/[slug]/page.tsx](app/news/[slug]/page.tsx) that does a Supabase prefix lookup (`ilike '<slug>-%'`, published, newest first, limit 1) and `redirect()`s to `/writing/<full-slug>`. Falls back to `notFound()` if nothing matches. LIKE wildcards (`%`, `_`, `\`) in the slug parameter are escaped before interpolation.

5 unit tests in [app/news/[slug]/page.test.tsx](app/news/[slug]/page.test.tsx) cover happy path, Supabase query shape, both `notFound()` paths (no row + error), and the LIKE escape.

The slug-less `/news` page ([app/news/page.tsx](app/news/page.tsx)) is unchanged — still `redirect("/writing")`.

---

## Session hand-off 2026-07-06

**Shipped in this session (3 PRs)**:

- **[#25] DS 0.22.0 → 0.33.0** (Dependabot bump). No breaking changes to our consumed surface (Button/Container/Logo/Typography — the audit confirms we consume only 3 of ~99). PR had failed CI earlier when `NPM_RC_TOKEN` was invalidated; rebased once the token was rotated and the coverage baseline was fixed.
- **[#26] Own-domain analytics proxy** ([next.config.ts](next.config.ts) rewrites + [app/layout.tsx](app/layout.tsx) script src). Ad-blockers previously caught `manfred-analytics.vercel.app/api/event` by hostname. Now serves the tracker from `/js/t.js` on our own origin; the tracker derives its POST endpoint from `new URL(scriptSrc).origin + "/api/event"` so events auto-route to `/api/event`, which forwards to the analytics service. See [CLAUDE.md § Analytics own-domain proxy](CLAUDE.md).
- **[#26 co-fix] Exclude `app/opengraph-image.tsx` from coverage**. STU-470 (opengraph-image) had been silently dropping the coverage aggregate below baseline for weeks; the auto-bump job only bumps UP so the baseline never adjusted. Same rationale as the existing `layout.tsx`/`page.tsx` exclusions.

**Ops**:

- **`NPM_RC_TOKEN` rotated** in Vercel. Deleting an "orphan-looking" fine-grained PAT (`bump job`) broke Vercel builds; production had been silently stuck at a 40-day-old build because Preview builds were reusing cached `node_modules`. Lesson: check `vercel env ls` and external integrations, not just `.github/workflows/` grep, when auditing whether a token is orphan. New classic PAT scoped to `read:packages` installed.
- **DS over-override audit filed as [STU-448](https://linear.app/studio-manfred/issue/STU-448)** ([full report](design-system-audits/website-2026-05-25.md)). Root cause is [`components/ds.tsx`](components/ds.tsx) re-exporting only 4 components. Three concrete child fixes recommended: widen the re-export, migrate headings to `<Typography>`, migrate training accordion to DS Accordion.
- **CHANGELOG.md created** (was missing per CLAUDE.md's own requirement). README.md rewritten from the create-next-app template.
- **GitHub labels `dependencies` + `design-system` created** to unblock Dependabot's PR-labelling.

**Next up** (Web backlog, all assigned to Jens):

- [STU-448](https://linear.app/studio-manfred/issue/STU-448) — DS over-override umbrella (Medium).
- DS project: [STU-444](https://linear.app/studio-manfred/issue/STU-444) border-on-brand-soft token, [STU-445](https://linear.app/studio-manfred/issue/STU-445) `.manfred-prose a` transition, [STU-169](https://linear.app/studio-manfred/issue/STU-169) DS "use client" for RSC.
- Intranet project: [STU-372](https://linear.app/studio-manfred/issue/STU-372) audit umbrella, [STU-402](https://linear.app/studio-manfred/issue/STU-402) `vercel.ts` migration.

Production at `40aca69` (main HEAD). All health checks green.

**End-to-end verified** (PR [#6](https://github.com/Studio-Manfred/website/pull/6) merged 2026-05-25): live curl confirmed `307` redirects for two known broken paths and `404` for a bogus slug; the monthly audit was re-dispatched ([run 26397806553](https://github.com/Studio-Manfred/website/actions/runs/26397806553)) and reported `Audit clean — no Slack message sent.`

## Session hand-off 2026-10-01
- DS bumped 0.36 → 0.37.1 (#30) and deployed to production.
- CI was red on `main` from #29 until the coverage-ratchet fix PR. The ratchet failed because `ProcessTimeline` + `CaseLightbox` (case-studies commit `2667f25`) shipped untested; tests added, coverage back to ~74/72/79/76 vs baseline 70/66/74/72. The baseline only auto-bumps up and the auto-bump job is disabled, so untested new components will trip it again. To run E2E locally: start `node e2e/mock-supabase.mjs`, build with `NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321 NEXT_PUBLIC_SUPABASE_ANON_KEY=test-anon-key`, stop the mock, then `npm run e2e` (68 tests).
- Added [ONBOARDING.md](ONBOARDING.md) for new hire Markus. His first task is adding himself to `team` in [components/sections/Team.tsx](components/sections/Team.tsx). Team now accepts a `members` prop, and rave styles cycle with `i % length` (previously a 5th member crashed rave mode).

## 2026-10-20 — Case redesign (STU-1153, branch feat/stu-1153-case-process-hero-outcomes)
- Mirrors the intranet PR of the same ticket: `ProcessTimeline` is now an accordion (copy of the intranet `case-process-timeline.tsx`, inline chevron instead of lucide), `CaseStudy` shows `heroImage` under the intro and outcomes with an optional `figure`, `lib/cases.ts` reads `hero_image` and `figure`. Keyframes `halo-pulse` in `app/globals.css`.
- Outcomes use a container query (`@container` + `@md:`), not `sm:`: the sidebar sits beside the blocks from 769 px, so the column is narrow there. The intranet preview uses `sm:` because its sidebar only moves beside at `lg`.
- Needs `cases.hero_image` (intranet migration `20261020_cases_hero_image.sql`); `select("*")` is fine before it is applied. Merge the intranet PR first, then this one, same day.
- Local e2e needs `npx playwright install` (not installed on this Mac); CI runs it.
