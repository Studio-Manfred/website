import { describe, expect, it } from "vitest";
import fixture from "../fixtures/blog-posts.json";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

describe("Supabase MSW handlers", () => {
  it("returns published posts ordered by published_at desc on the list query", async () => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/blog_posts`);
    url.searchParams.set("select", "*,profiles(full_name)");
    url.searchParams.set("published", "eq.true");
    url.searchParams.set("order", "published_at.desc");

    const res = await fetch(url, {
      headers: { apikey: "test-anon-key" },
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as Array<{ slug: string; published_at: string }>;
    expect(data.map((d) => d.slug)).toEqual(["hello-world", "wp-shortcodes", "ghost-author"]);
    for (let i = 1; i < data.length; i++) {
      expect(data[i - 1].published_at >= data[i].published_at).toBe(true);
    }
  });

  it("returns a single post by slug when Accept asks for a single object", async () => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/blog_posts`);
    url.searchParams.set("select", "*,profiles(full_name)");
    url.searchParams.set("slug", "eq.wp-shortcodes");

    const res = await fetch(url, {
      headers: {
        apikey: "test-anon-key",
        Accept: "application/vnd.pgrst.object+json",
      },
    });
    expect(res.status).toBe(200);
    const data = (await res.json()) as { slug: string; content: string };
    expect(data.slug).toBe("wp-shortcodes");
    expect(data.content).toContain("[caption");
  });

  it("returns 406 when the slug filter matches no rows under single-object Accept", async () => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/blog_posts`);
    url.searchParams.set("select", "*,profiles(full_name)");
    url.searchParams.set("slug", "eq.does-not-exist");

    const res = await fetch(url, {
      headers: {
        apikey: "test-anon-key",
        Accept: "application/vnd.pgrst.object+json",
      },
    });
    expect(res.status).toBe(406);
  });

  it("returns 500 on an unexpected query shape so missing tests can't pass silently", async () => {
    const url = new URL(`${SUPABASE_URL}/rest/v1/blog_posts`);
    url.searchParams.set("select", "*");
    url.searchParams.set("title", "ilike.%hello%");

    const res = await fetch(url, {
      headers: { apikey: "test-anon-key" },
    });
    expect(res.status).toBe(500);
  });

  it("exposes the fixture's three published posts", () => {
    expect(fixture).toHaveLength(3);
    expect(fixture.every((p) => p.published)).toBe(true);
  });
});
