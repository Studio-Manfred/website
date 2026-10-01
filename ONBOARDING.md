# Welcome, Markus 👋

This is the short path from zero to your first change live on
[studiomanfred.com](https://studiomanfred.com). The longer reference is
[README.md](README.md); you don't need to read it before you start.

**The flow in one line:** pull `main` → branch → change and check locally →
push → pull request → Vercel preview → merge → Vercel deploys production
automatically.

## 1. Get access (ask Jens)

- [ ] **GitHub**: membership in the `Studio-Manfred` org, with write access to
      [`Studio-Manfred/website`](https://github.com/Studio-Manfred/website).
- [ ] **Vercel**: a seat on the `studio-manfred` team, which owns the
      `manfred-website` project.
- [ ] **Linear**: access to the
      [Web project](https://linear.app/studio-manfred/project/web), where the
      tickets (`STU-…`) live.

## 2. Install the tools (once)

You need Node 20 (the version CI uses), git, and the GitHub and Vercel CLIs.

```bash
brew install node@20 gh
npm i -g vercel@latest

gh auth login                          # choose GitHub.com + HTTPS
gh auth refresh -s read:packages       # the design system is a private package
vercel login
```

## 3. Get the code running locally (once)

```bash
gh repo clone Studio-Manfred/website
cd website

export NPM_RC_TOKEN="$(gh auth token)"   # add this line to ~/.zshrc too
npm install

vercel link --yes --project manfred-website --scope studio-manfred
vercel env pull .env.local --environment=preview

npm run dev                             # → http://localhost:3000
```

If `/writing` errors locally, open `.env.local`. When
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` come back as
`""`, ask Jens for the values and paste them in. The rest of the site works
without them.

## 4. Every time you start working

```bash
git checkout main
git pull                                # always start from the latest main
git checkout -b markus/short-description
```

When you have a Linear ticket, use the branch name Linear suggests
(`studio-manfred/stu-123-…`). It links the work to the ticket automatically.

## 5. Check your change before pushing

```bash
npm run lint
npm test
```

Also click through the page you changed in the browser, and tab through it
with the keyboard. Accessibility is part of "done" here.

## 6. Push to production

```bash
git add -A
git commit -m "feat(team): add Markus to the team section"
git push -u origin HEAD
gh pr create --fill
```

1. **Pull request.** Within a minute, Vercel comments on the PR with a
   **preview URL**. That is your change running on real infrastructure. Check
   it there.
2. **Merge.** Use **Squash and merge** on GitHub, or run
   `gh pr merge --squash --delete-branch`.
3. **Production.** Vercel builds `main` and puts it live on
   studiomanfred.com, usually within a minute. Watch it with
   `vercel ls manfred-website --prod`.

To undo a bad deploy, open the Vercel dashboard → `manfred-website` →
Deployments. Pick the previous production deployment and choose
**Promote / Instant Rollback**. Then fix forward with a new PR.

Never push straight to `main` and never force-push it. Every change goes
through a PR.

## Your first task: add yourself to the team

The "Meet the Mmmms" grid on the home page lives in
[`components/sections/Team.tsx`](components/sections/Team.tsx).

1. Add a square photo, at least 800 × 800 px, as `public/team/markus.jpg`.
   The crop keeps the top of the image, so leave some headroom.
2. Add yourself to the `team` array at the top of `Team.tsx`:

   ```ts
   { name: "Markus <Lastname>", role: "<Your role>", photo: "/team/markus.jpg" },
   ```

3. Run `npm run dev` and check the grid on desktop and mobile widths. Then
   press **Make it rave 🎉**.
4. On desktop the grid has four columns, so a fifth person starts a new row.
   Check with Jens whether to keep that layout or adjust the grid.
5. Add a line under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md), for
   example `- **Team**: Markus joins the team section.`
6. Follow step 6 above to ship it.

## Conventions worth knowing on day one

- **Commit messages** follow
  [Conventional Commits](https://www.conventionalcommits.org/): `feat:`,
  `fix:`, `docs:`, `chore:`. Add the Linear ID when there is one, for example
  `fix(writing): broken link (STU-123)`.
- **Design system components** are imported from `@/components/ds`, never
  from the package directly.
- **Changelog:** anything a visitor can see gets one line in `CHANGELOG.md`.
- **Tests:** logic, state and data code need a test written first (see "TDD
  rule" in [CLAUDE.md](CLAUDE.md)). Copy and pure layout changes don't.
- **Asking for help:** ask Jens, or open a draft PR early and ask there.
