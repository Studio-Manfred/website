@AGENTS.md

# Studio Manfred website

Marketing site for Studio Manfred. Production: https://studiomanfred.com. Source of truth for project context is [MEMORY.md](MEMORY.md) — read it at session start.

## Stack
- Next.js **16.2.4** (App Router, Turbopack) on React **19.2.4**, TypeScript 5.
- Tailwind **v4** via `@tailwindcss/postcss` — no `tailwind.config.*`. Tokens come from `@studio-manfred/manfred-design-system/styles` imported in [app/layout.tsx](app/layout.tsx).
- Design system: `@studio-manfred/manfred-design-system` from **GitHub Packages**.
- Data: `@supabase/supabase-js` reading the `blog_posts` table from the intranet Supabase project.
- No test framework. No `vercel.json` / `vercel.ts` — Vercel picks up `next build` automatically.

## Commands

```bash
npm install           # needs NPM_RC_TOKEN for GitHub Packages (see below)
npm run dev           # next dev (Turbopack)
npm run build         # next build — fails without Supabase env vars
npm run start         # serve production build
npm run lint          # eslint flat config
```

Local build needs the Supabase keys present in `.env.local`. Vercel pulls them at build time; locally pull them with `vercel env pull .env.local --environment=preview` (Development env doesn't carry them).

## Code conventions
- **Import DS primitives via [components/ds.tsx](components/ds.tsx)**, never directly from `@studio-manfred/manfred-design-system`. That file is the `"use client"` boundary Radix needs.
- Path alias `@/*` → repo root (set in [tsconfig.json](tsconfig.json)).
- Tailwind utility classes + inline `style` mixed intentionally — the `clamp()`-based fluid type lives in `style` props. Don't refactor inline styles to pure Tailwind without checking design intent.
- Token usage: prefer CSS vars from the DS (`var(--color-business-blue)`, `var(--size-container-2xl)`, `var(--letter-spacing-tight)`, etc.) over hex literals. The exception is [app/globals.css](app/globals.css), which can introduce raw values.
- Static content (courses, fixed copy) belongs in `lib/` as typed arrays ([lib/courses.ts](lib/courses.ts) pattern). CMS-backed content (writing) goes through `lib/articles.ts` + Supabase.
- Defaults: no comments unless the *why* is non-obvious. No unused imports, no dead code, no speculative abstractions.

## Accessibility baseline
- `<html lang="en">` in [app/layout.tsx](app/layout.tsx); skip-link is the first focusable element of `<body>`.
- Every `<main>` must have `id="main"` and `tabIndex={-1}` so the skip-link can land focus. Pages: home, /join-us, /privacy-policy, /training-and-courses, /writing, /writing/[slug], plus `<main>` inside [components/CourseDetail.tsx](components/CourseDetail.tsx).
- Images: meaningful → descriptive `alt`; decorative photos → `alt=""`.
- External links use `target="_blank" rel="noopener noreferrer"`.
- Canvas/SVG content needs `role="img"` + `aria-label` (see [components/Marquee.tsx](components/Marquee.tsx)).
- Heading hierarchy: one `<h1>` per route, no level skips.
- Open work: see Linear epic **STU-286** for the live a11y audit + sub-issues.

## Commits
- **Conventional Commits.** `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`, `perf:`. Optional scope (`feat(a11y): …`, `fix(writing): …`).
- Reference Linear tickets in the subject when the work corresponds to one — e.g. `feat(a11y): add skip-to-content link (STU-292)`. Linear auto-links commits and PRs that mention the identifier.
- Body explains *why*, not *what*. The diff covers *what*.
- Never `--amend` published commits. Never `git push --force` to `main`.

## Branches and pull requests
- `main` is the only long-lived branch; Vercel auto-deploys production from it.
- Working branches follow Linear's suggested form (`jens-wedin/stu-292-add-skip-to-content-link-in-rootlayout`) — copy from the issue page.
- PRs into `main`: title in Conventional-Commit form; description ends with a `Test plan` checklist (manual screen-reader / keyboard / visual checks since there's no test suite).
- Squash-merge by default; the resulting commit becomes the changelog entry.

## CHANGELOG and README
- **CHANGELOG.md** — keep one at the repo root (currently missing). Format: [Keep a Changelog](https://keepachangelog.com/) with `## [Unreleased]` at the top, then dated entries on each production deploy. Add a line when shipping anything user-visible.
- **README.md** — at the root. Should answer: what is this site, how to run it locally (including the GitHub Packages token), how to deploy, what env vars exist. The current README is the default `create-next-app` template and needs replacing.

## GitHub
- [`.github/dependabot.yml`](.github/dependabot.yml) auto-PRs only `@studio-manfred/manfred-design-system` weekly. Everything else (Next, React, Supabase) requires a manual bump.
- [`.npmrc`](.npmrc) is committed and references `${NPM_RC_TOKEN}` for the `@studio-manfred` scope on GitHub Packages. Set this env var locally before `npm install`; in CI/Vercel it's set as a project secret.
- For a quick local install when `NPM_RC_TOKEN` isn't exported, `NPM_RC_TOKEN="$(gh auth token)" npm install` works as long as your `gh` token has `read:packages` scope.

## Vercel
- Project name: `manfred-website` under the `studio-manfred` team. Production URL: studiomanfred.com.
- `vercel env pull .env.local` defaults to the **Development** environment, which only has `VERCEL_OIDC_TOKEN`. Use `--environment=preview` (or `--environment=production`) to fetch the Supabase keys.
- Note: depending on team permissions, encrypted values may come back as empty strings (`""`); in that case set them directly in `.env.local` (the anon key is public-by-design and ships in the browser bundle).
- `vercel link --yes --project manfred-website --scope studio-manfred` re-links a fresh checkout.
- Build command and output are Next.js defaults. Don't add a `vercel.json` unless we need rewrites/redirects that can't be expressed in the App Router.

## Known fragile areas
- **[components/Marquee.tsx](components/Marquee.tsx)** — canvas-based, SSR/client height was a source of hydration errors (commit `e1ed5dc`). Keep initial canvas dimensions consistent between server and client.
- **Custom cursor system** ([app/globals.css](app/globals.css) `*` selector) — overrides default cursors globally. If you re-introduce interactive elements, double-check `cursor: pointer` isn't lost; see Linear STU-291.
- **[components/CursorBlob.tsx](components/CursorBlob.tsx)** — `aria-hidden`, must stay decorative; AT users see nothing.
- **Writing pages** depend on Supabase reachability at build time. Lose the env vars → build fails at "Collecting page data".

## Sessions
When closing a session, update [MEMORY.md](MEMORY.md) with where you stopped and any new learnings worth carrying forward.
