import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Logo } from "@/components/ds";
import { wordmark } from "./wordmark";

describe("wordmark artwork", () => {
  it("equals what the design system Logo renders", () => {
    const { container } = render(<Logo variant="wordmark" color="white" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("viewBox")).toBe(wordmark.viewBox);
    const paths = [...(svg?.querySelectorAll("path") ?? [])].map((path) =>
      path.getAttribute("d"),
    );
    expect(paths).toEqual([...wordmark.paths]);
  });
});
