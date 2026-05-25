import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { WhatElse } from "./WhatElse";

describe("WhatElse", () => {
  it("renders the section heading and the three outbound links", () => {
    render(<WhatElse />);
    expect(
      screen.getByRole("heading", { level: 2, name: /What else\?/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /courses & training/i }),
    ).toHaveAttribute("href", "/training-and-courses");
    expect(
      screen.getByRole("link", { name: /write stuff\./i }),
    ).toHaveAttribute("href", "/writing");
    expect(
      screen.getByRole("link", { name: /like a book\./i }),
    ).toHaveAttribute("target", "_blank");
  });
});
