import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleHero } from "./ArticleHero";
import type { Article } from "@/lib/articles";

const base: Article = {
  id: "id-1",
  slug: "hello-world",
  title: "Hello, world",
  excerpt: "A first & gentle intro post.",
  content: "<p>body</p>",
  image: "",
  author_id: "author-1",
  published: true,
  published_at: "2026-04-01T00:00:00Z",
  created_at: "2026-04-01T00:00:00Z",
  author: "Moa Wedin",
};

describe("ArticleHero", () => {
  it("renders the article meta and h1, no hero image when image is empty", () => {
    const { container } = render(<ArticleHero article={base} />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Hello, world/ }),
    ).toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("renders the hero image when article.image is set", () => {
    render(<ArticleHero article={{ ...base, image: "/hero.jpg" }} />);
    expect(screen.getByRole("img", { name: /Hello, world/ })).toBeInTheDocument();
  });
});
