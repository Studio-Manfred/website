import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Mirrors the smoke list in routes.spec.ts. Kept duplicated rather than
// shared so each spec is independently readable.
const ROUTES = [
  "/",
  "/training-and-courses",
  "/training-and-courses/business-design",
  "/training-and-courses/customer-journey-mapping",
  "/training-and-courses/cx-management",
  "/training-and-courses/design-leadership",
  "/training-and-courses/design-thinking-for-hr",
  "/training-and-courses/designops",
  "/training-and-courses/product-discovery",
  "/writing",
  "/writing/hello-world",
  "/join-us",
  "/privacy-policy",
] as const;

const WCAG_TAGS = [
  "wcag2a",
  "wcag2aa",
  "wcag21a",
  "wcag21aa",
  "wcag22aa",
];

// STU-288 (focus styles) and STU-289 (low-contrast text) landed
// 2026-05-15 — serious/critical violations now hard-fail the build.
// `AXE_ENFORCE=0` flips back to warn-only if a temporary regression
// needs to ship.
const AXE_ENFORCE = process.env.AXE_ENFORCE !== "0";

for (const route of ROUTES) {
  test(`a11y: ${route}`, async ({ page }, testInfo) => {
    await page.goto(route);
    await page.waitForLoadState("networkidle");

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    const blocking = results.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    );

    await testInfo.attach("axe-violations.json", {
      body: JSON.stringify(
        {
          route,
          total: results.violations.length,
          serious_or_critical: blocking.length,
          violations: results.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            help: v.help,
            helpUrl: v.helpUrl,
            nodes: v.nodes.length,
          })),
        },
        null,
        2,
      ),
      contentType: "application/json",
    });

    if (blocking.length > 0) {
      const summary = blocking
        .map((v) => `${v.id} (${v.impact}, ${v.nodes.length} node${v.nodes.length === 1 ? "" : "s"})`)
        .join("; ");

      testInfo.annotations.push({
        type: AXE_ENFORCE ? "a11y-fail" : "a11y-warn",
        description: `${blocking.length} serious/critical: ${summary}`,
      });

      if (AXE_ENFORCE) {
        expect(blocking, `${route}: serious/critical violations — ${summary}`).toEqual([]);
      } else {
        console.warn(`axe (warn-only) ${route}: ${summary}`);
      }
    }
  });
}
