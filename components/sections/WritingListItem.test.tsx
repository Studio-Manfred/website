import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { WritingListItem } from "./WritingListItem";
import type { Article } from "@/lib/articles";

const article: Article = {
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

describe("WritingListItem", () => {
  it("renders the article card with title, excerpt, and a slug-scoped link", () => {
    render(<WritingListItem article={article} />);
    expect(
      screen.getByRole("heading", { level: 2, name: /Hello, world/ }),
    ).toBeInTheDocument();
    expect(screen.getByText(/A first & gentle intro post\./)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/writing/hello-world");
  });
});
