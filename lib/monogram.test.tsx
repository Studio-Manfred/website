import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { Logo } from "@/components/ds";
import { monogram } from "./monogram";

describe("monogram artwork", () => {
  it("equals what the design system Logo renders", () => {
    const { container } = render(<Logo variant="monogram" color="white" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("viewBox")).toBe(monogram.dsViewBox);
    const paths = [...(svg?.querySelectorAll("path") ?? [])].map((path) =>
      path.getAttribute("d"),
    );
    expect(paths).toEqual([monogram.path]);
  });

  it("has a tight box around the glyph, so it can sit flush with the page edge", () => {
    expect(monogram.tightViewBox).toBe("70 81 100.03 88.77");
  });
});
