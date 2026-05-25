import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { ArticleMeta } from "./ArticleMeta";

describe("ArticleMeta", () => {
  it("renders en-GB date · author", () => {
    render(
      <ArticleMeta
        article={{ published_at: "2026-04-01T00:00:00Z", author: "Moa Wedin" }}
      />,
    );
    expect(screen.getByText(/01\/04\/2026/)).toBeInTheDocument();
    expect(screen.getByText(/Moa Wedin/)).toBeInTheDocument();
  });
});
