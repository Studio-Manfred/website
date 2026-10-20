import { http, HttpResponse } from "msw";
import fixture from "../fixtures/blog-posts.json";
import caseFixture from "../fixtures/cases.json";
import sharedCv from "../fixtures/shared-cv.json";

type Post = (typeof fixture)[number];

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "http://localhost:54321";

function isSingleObjectRequest(request: Request): boolean {
  return request.headers.get("Accept") === "application/vnd.pgrst.object+json";
}

function unknownQuery(url: URL): boolean {
  const allowed = new Set(["select", "published", "order", "slug"]);
  for (const key of url.searchParams.keys()) {
    if (!allowed.has(key)) return true;
  }
  return false;
}

function listPublishedPosts(url: URL): Post[] {
  const publishedFilter = url.searchParams.get("published");
  const order = url.searchParams.get("order");

  let posts: Post[] = [...fixture];
  if (publishedFilter === "eq.true") {
    posts = posts.filter((p) => p.published);
  }
  if (order === "published_at.desc") {
    posts.sort((a, b) => (a.published_at < b.published_at ? 1 : -1));
  }
  return posts;
}

export const handlers = [
  http.get(`${SUPABASE_URL}/rest/v1/blog_posts`, ({ request }) => {
    const url = new URL(request.url);

    if (unknownQuery(url)) {
      return HttpResponse.json(
        { message: "msw handler: unexpected query shape", url: url.toString() },
        { status: 500 },
      );
    }

    const slugFilter = url.searchParams.get("slug");

    if (slugFilter?.startsWith("eq.")) {
      const slug = slugFilter.slice(3);
      const match = fixture.find((p) => p.slug === slug);
      if (isSingleObjectRequest(request)) {
        if (!match) {
          return HttpResponse.json(
            { code: "PGRST116", message: "JSON object requested, multiple (or no) rows returned" },
            { status: 406 },
          );
        }
        return HttpResponse.json(match);
      }
      return HttpResponse.json(match ? [match] : []);
    }

    return HttpResponse.json(listPublishedPosts(url));
  }),
  // STU-1146: case pages. Mirrors PostgREST + RLS: only published rows,
  // filtered by slug (`eq.`), honouring `limit`.
  http.get(`${SUPABASE_URL}/rest/v1/cases`, ({ request }) => {
    const url = new URL(request.url);
    const allowed = new Set(["select", "slug", "published", "limit", "order"]);
    for (const key of url.searchParams.keys()) {
      if (!allowed.has(key)) {
        return HttpResponse.json({ message: "msw handler: unexpected cases query", url: url.toString() }, { status: 500 });
      }
    }
    // RLS since STU-1156: published AND not password-protected.
    let rows = caseFixture.filter((c) => c.published && !("password" in c));
    const slug = url.searchParams.get("slug");
    if (slug?.startsWith("eq.")) rows = rows.filter((c) => c.slug === slug.slice(3));
    const limit = Number(url.searchParams.get("limit") ?? rows.length);
    return HttpResponse.json(rows.slice(0, limit));
  }),
  // STU-1155: shared CVs. Like the real function, an unknown token → null.
  http.post(`${SUPABASE_URL}/rest/v1/rpc/get_shared_cv`, async ({ request }) => {
    const body = (await request.json()) as { p_token?: string };
    return HttpResponse.json(body.p_token === sharedCv.token ? sharedCv.cv : null);
  }),
  // STU-1156: locked cases. The fixture keeps the plain password (`password`)
  // where the database keeps a bcrypt hash.
  http.post(`${SUPABASE_URL}/rest/v1/rpc/case_is_locked`, async ({ request }) => {
    const { p_slug } = (await request.json()) as { p_slug?: string };
    return HttpResponse.json(caseFixture.some((c) => c.slug === p_slug && c.published && "password" in c));
  }),
  http.post(`${SUPABASE_URL}/rest/v1/rpc/get_locked_case`, async ({ request }) => {
    const { p_slug, p_password } = (await request.json()) as { p_slug?: string; p_password?: string };
    const c = caseFixture.find((x) => x.slug === p_slug && x.published && "password" in x && (x as { password?: string }).password === p_password);
    return HttpResponse.json(c ? { slug: c.slug, title: c.title, category_line: c.category_line, intro: c.intro, blocks: c.blocks, sidebar: c.sidebar } : null);
  }),
  http.post(`${SUPABASE_URL}/rest/v1/rpc/list_case_summaries`, () =>
    HttpResponse.json(
      caseFixture
        .filter((c) => c.published)
        .map((c) => ({ slug: c.slug, title: c.title, category_line: c.category_line, consultants: c.sidebar.consultants, locked: "password" in c })),
    ),
  ),
];
