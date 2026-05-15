import { describe, expect, it } from "vitest";
import { cleanContent, getArticle, getArticles, stripHtml } from "./articles";

describe("cleanContent", () => {
  it("replaces WordPress [caption] shortcodes with <figure> tags", () => {
    const input =
      '[caption id="attachment_1" align="alignnone" width="640"]<img src="x.jpg" /> A caption[/caption]';
    const output = cleanContent(input);
    expect(output).toContain("<figure>");
    expect(output).toContain("</figure>");
    expect(output).not.toContain("[caption");
    expect(output).not.toContain("[/caption]");
  });

  it("leaves real HTML tags untouched", () => {
    const input = "<p>Hello <strong>world</strong> from <em>Manfred</em>.</p>";
    expect(cleanContent(input)).toBe(input);
  });

  it("strips generic shortcodes with no replacement", () => {
    const input =
      '[gallery ids="1,2,3"]<p>Body</p>[/embed]';
    const output = cleanContent(input);
    expect(output).not.toContain("[gallery");
    expect(output).not.toContain("[/embed]");
    expect(output).toContain("<p>Body</p>");
  });

  it("handles empty input without throwing", () => {
    expect(() => cleanContent("")).not.toThrow();
    expect(cleanContent("")).toBe("");
  });
});

describe("stripHtml", () => {
  it("removes nested tags", () => {
    expect(stripHtml("<p><strong>hi</strong></p>")).toBe("hi");
  });

  it("leaves HTML entities intact (current behaviour)", () => {
    expect(stripHtml("<p>A first &amp; gentle intro</p>")).toBe(
      "A first &amp; gentle intro",
    );
  });

  it("trims surrounding whitespace", () => {
    expect(stripHtml("   <p>hi</p>   ")).toBe("hi");
  });
});

describe("getArticles (against MSW)", () => {
  it("returns published posts with cover_image_url mapped to image and HTML stripped from excerpt", async () => {
    const articles = await getArticles();
    expect(articles).toHaveLength(3);
    const first = articles[0];
    expect(first.slug).toBe("hello-world");
    expect(first.image).toBe("https://cdn.example.com/hello.jpg");
    expect(first.excerpt).toBe("A first &amp; gentle intro post.");
    expect(first.author).toBe("Moa Wedin");
  });

  it("falls back to 'Unknown' when a post has no profile row", async () => {
    const articles = await getArticles();
    const ghost = articles.find((a) => a.slug === "ghost-author");
    expect(ghost?.author).toBe("Unknown");
  });

  it("returns posts ordered by published_at descending", async () => {
    const articles = await getArticles();
    const dates = articles.map((a) => a.published_at);
    const sorted = [...dates].sort((a, b) => (a < b ? 1 : -1));
    expect(dates).toEqual(sorted);
    expect(articles.map((a) => a.slug)).toEqual([
      "hello-world",
      "wp-shortcodes",
      "ghost-author",
    ]);
  });

  it("maps cover_image_url to image across every row", async () => {
    const articles = await getArticles();
    expect(articles.every((a) => typeof a.image === "string" && a.image.length > 0)).toBe(true);
    const bySlug = Object.fromEntries(articles.map((a) => [a.slug, a.image]));
    expect(bySlug["hello-world"]).toBe("https://cdn.example.com/hello.jpg");
    expect(bySlug["wp-shortcodes"]).toBe("https://cdn.example.com/wp.jpg");
    expect(bySlug["ghost-author"]).toBe("https://cdn.example.com/ghost.jpg");
  });
});

describe("getArticle (against MSW)", () => {
  it("cleans WordPress shortcodes out of the returned content", async () => {
    const article = await getArticle("wp-shortcodes");
    expect(article).not.toBeNull();
    expect(article?.content).toContain("<figure>");
    expect(article?.content).not.toContain("[caption");
    expect(article?.content).not.toContain("[gallery");
  });

  it("returns null when the slug does not exist", async () => {
    const article = await getArticle("does-not-exist");
    expect(article).toBeNull();
  });
});
