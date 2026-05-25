import { expect, test } from "@playwright/test";

// Article-body links must be visually distinguishable from surrounding
// body text. Tailwind v4 Preflight strips the browser default underline
// on <a>, so the imported WordPress markup (which carries no class on
// its anchors) ends up looking like plain text unless globals.css adds
// the rule back. WCAG 1.4.1 "Use of Color" / axe link-in-text-block.
test("article-body anchors render with a visible underline", async ({ page }) => {
  await page.goto("/writing/hello-world");
  await page.waitForLoadState("networkidle");

  const link = page.locator(".article-body a").first();
  await expect(link).toBeVisible();

  const decoration = await link.evaluate((el) => {
    const cs = getComputedStyle(el);
    return {
      line: cs.textDecorationLine,
      style: cs.textDecorationStyle,
    };
  });

  expect(
    decoration.line,
    `expected text-decoration-line to include "underline", got "${decoration.line}"`,
  ).toContain("underline");
});
