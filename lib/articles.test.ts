import { describe, expect, it } from "vitest";
import { cleanContent, getArticle, getArticles } from "./articles";

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
