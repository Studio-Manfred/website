#!/usr/bin/env node
import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const fixture = JSON.parse(
  readFileSync(join(here, "..", "test", "fixtures", "blog-posts.json"), "utf8"),
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
