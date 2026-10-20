#!/usr/bin/env node
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(
  readFileSync(join(here, "..", "test", "fixtures", "blog-posts.json"), "utf8"),
);

const caseFixture = JSON.parse(
  readFileSync(join(here, "..", "test", "fixtures", "cases.json"), "utf8"),
);

const sharedCv = JSON.parse(
  readFileSync(join(here, "..", "test", "fixtures", "shared-cv.json"), "utf8"),
);

const PORT = Number(process.env.MOCK_PORT ?? 54321);
const ALLOWED_QUERY_KEYS = new Set(["select", "published", "order", "slug"]);

function listPublishedPosts(url) {
  const publishedFilter = url.searchParams.get("published");
  const order = url.searchParams.get("order");
  let posts = [...fixture];
  if (publishedFilter === "eq.true") {
    posts = posts.filter((p) => p.published);
  }
  if (order === "published_at.desc") {
    posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  }
  return posts;
}

function json(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  if (url.pathname === "/health") {
    res.writeHead(200).end("ok");
    return;
  }

  // Supabase functions (POST /rest/v1/rpc/<name>): shared CVs (STU-1155) and
  // locked cases (STU-1156). The case fixture keeps the plain `password`.
  if (url.pathname.startsWith("/rest/v1/rpc/") && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const args = (() => { try { return JSON.parse(body || "{}"); } catch { return {}; } })();
      const fn = url.pathname.slice("/rest/v1/rpc/".length);
      const locked = (c) => c.published && "password" in c;
      if (fn === "get_shared_cv") return json(res, 200, args.p_token === sharedCv.token ? sharedCv.cv : null);
      if (fn === "case_is_locked") return json(res, 200, caseFixture.some((c) => c.slug === args.p_slug && locked(c)));
      if (fn === "get_locked_case") {
        const c = caseFixture.find((x) => x.slug === args.p_slug && locked(x) && x.password === args.p_password);
        return json(res, 200, c ? { slug: c.slug, title: c.title, category_line: c.category_line, intro: c.intro, blocks: c.blocks, sidebar: c.sidebar } : null);
      }
      if (fn === "list_case_summaries") {
        return json(res, 200, caseFixture.filter((c) => c.published).map((c) => ({
          slug: c.slug, title: c.title, category_line: c.category_line, consultants: c.sidebar.consultants, locked: "password" in c,
        })));
      }
      json(res, 404, { message: `mock-supabase: unknown function ${fn}` });
    });
    return;
  }

  // STU-1146: case pages. Published rows only (RLS), by slug, with limit.
  if (url.pathname === "/rest/v1/cases" && req.method === "GET") {
    // RLS since STU-1156: published AND not password-protected.
    let rows = caseFixture.filter((c) => c.published && !("password" in c));
    const slug = url.searchParams.get("slug");
    if (slug?.startsWith("eq.")) rows = rows.filter((c) => c.slug === slug.slice(3));
    const limit = Number(url.searchParams.get("limit") ?? rows.length);
    json(res, 200, rows.slice(0, limit));
    return;
  }

  if (url.pathname !== "/rest/v1/blog_posts" || req.method !== "GET") {
    json(res, 404, { message: "mock-supabase: route not found" });
    return;
  }

  for (const key of url.searchParams.keys()) {
    if (!ALLOWED_QUERY_KEYS.has(key)) {
      json(res, 500, { message: "mock-supabase: unexpected query key", key });
      return;
    }
  }

  const slugFilter = url.searchParams.get("slug");
  const isSingleObject =
    req.headers.accept === "application/vnd.pgrst.object+json";

  if (slugFilter?.startsWith("eq.")) {
    const slug = slugFilter.slice(3);
    const match = fixture.find((p) => p.slug === slug);
    if (isSingleObject) {
      if (!match) {
        json(res, 406, {
          code: "PGRST116",
          message: "JSON object requested, multiple (or no) rows returned",
        });
        return;
      }
      json(res, 200, match);
      return;
    }
    json(res, 200, match ? [match] : []);
    return;
  }

  json(res, 200, listPublishedPosts(url));
});

server.listen(PORT, () => {
  console.log(`mock-supabase listening on http://localhost:${PORT}`);
});
