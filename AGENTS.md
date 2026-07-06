<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## For agents working in this repo

- **Primary brief**: [CLAUDE.md](CLAUDE.md) — architecture, conventions, decisions, current in-flight tickets. Read it at session start.
- **Session state**: [MEMORY.md](MEMORY.md) — where the last session stopped, live gotchas. Update it when closing a session with anything worth carrying forward.
- **User-visible ship = changelog line**: any PR that ships a user-visible change (feature, fix, brand tweak, redirect, etc.) gets one line under `## [Unreleased]` in [CHANGELOG.md](CHANGELOG.md). Config/test/docs changes don't need one.
- **Documentation drift**: when you change how something works, update its section in CLAUDE.md and README.md in the same PR. Don't leave the docs stale for a follow-up.
