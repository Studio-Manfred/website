import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleBody } from "./ArticleBody";
import type { Article } from "@/lib/articles";

const base: Article = {
  id: "id-1",
  slug: "hello-world",
  title: "Hello, world",
  excerpt: "Fallback excerpt copy.",
  content: "",
  image: "",
  author_id: "author-1",
  published: true,
  published_at: "2026-04-01T00:00:00Z",
  created_at: "2026-04-01T00:00:00Z",
  author: "Moa Wedin",
};

describe("ArticleBody", () => {
  it("renders article.content as HTML when present", () => {
    const { container } = render(
      <ArticleBody article={{ ...base, content: "<p>Body paragraph.</p>" }} />,
    );
    const body = container.querySelector(".article-body");
    expect(body).not.toBeNull();
    expect(body?.innerHTML).toContain("<p>Body paragraph.</p>");
  });

  it("falls back to the excerpt when content is missing", () => {
    render(<ArticleBody article={base} />);
    expect(screen.getByText("Fallback excerpt copy.")).toBeInTheDocument();
  });

  it("always renders the back link to /writing", () => {
    render(<ArticleBody article={base} />);
    expect(
      screen.getByRole("link", { name: /All writing/i }),
    ).toHaveAttribute("href", "/writing");
  });
});
