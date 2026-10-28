import { describe, expect, it } from "vitest";
import { menuGutter, pageInset } from "./menu-layout";

describe("pageInset", () => {
  it("is the space the nav row leaves each side: the page gutter, or half of what is over the page width", () => {
    expect(pageInset(1200)).toBe("max(24px, calc((100% - 1200px) / 2))");
    expect(pageInset(960)).toBe("max(24px, calc((100% - 960px) / 2))");
  });
});

describe("menuGutter", () => {
  it("stays the home menu's own clamp", () => {
    expect(menuGutter).toContain("clamp(20px");
  });
});
