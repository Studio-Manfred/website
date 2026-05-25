import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { WritingHeader } from "./WritingHeader";

describe("WritingHeader", () => {
  it("renders the title as the h1", () => {
    render(<WritingHeader title="Writing" />);
    const h1 = screen.getByRole("heading", { level: 1 });
    expect(h1).toHaveTextContent("Writing");
  });

  it("renders the subtitle when provided", () => {
    render(<WritingHeader title="Writing" subtitle="Notes and essays." />);
    expect(screen.getByText("Notes and essays.")).toBeInTheDocument();
  });

  it("omits the subtitle paragraph when not provided", () => {
    const { container } = render(<WritingHeader title="Writing" />);
    expect(container.querySelector("p")).toBeNull();
  });
});
