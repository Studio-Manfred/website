import { expect, test } from "@playwright/test";

// Each entry exercises one of the three background contexts the focus
// indicator must work against (white / cream / brand-blue). The selector
// is the first interactive element on the route after the skip-link.
const TARGETS = [
  { route: "/", label: "home (white bg, nav link)" },
  { route: "/training-and-courses", label: "courses (cream bg, nav link)" },
  { route: "/writing", label: "writing (brand-blue bg, article link)" },
] as const;

for (const { route, label } of TARGETS) {
  test(`focus-visible: ${label}`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    // Tab past the skip-link onto the first real interactive element.
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");

    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLElement | null;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return {
        tag: el.tagName,
        outlineStyle: cs.outlineStyle,
        outlineWidth: cs.outlineWidth,
        outlineColor: cs.outlineColor,
      };
    });

    expect(focused, `${route}: no element focused after Tab`).not.toBeNull();
    expect(
      focused!.outlineStyle,
      `${route}: ${focused!.tag} has no outline-style on :focus-visible`,
    ).not.toBe("none");
    const widthPx = parseFloat(focused!.outlineWidth);
    expect(
      widthPx,
      `${route}: ${focused!.tag} outline-width is ${focused!.outlineWidth}`,
    ).toBeGreaterThanOrEqual(2);
  });
}
