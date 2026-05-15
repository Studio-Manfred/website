import { http, HttpResponse } from "msw";
import fixture from "../fixtures/blog-posts.json";

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
];
