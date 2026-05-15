import { expect, test } from "@playwright/test";

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

for (const route of ROUTES) {
  test(`route smoke: ${route}`, async ({ page }) => {
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (err) => pageErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() !== "error") return;
      const text = msg.text();
      // Filter generic resource-load 404s — those are missing assets in
      // test fixtures, not JS bugs. `pageerror` still catches any thrown
      // JS error.
      if (text.includes("Failed to load resource")) return;
      consoleErrors.push(text);
    });

    const response = await page.goto(route);
    expect(response, `no response for ${route}`).not.toBeNull();
    expect(response!.status(), `${route} returned ${response!.status()}`).toBe(
      200,
    );

    await expect(page.locator("h1").first()).toBeVisible();

    expect(pageErrors, `${route} pageerror: ${pageErrors.join("; ")}`).toEqual(
      [],
    );
    expect(
      consoleErrors,
      `${route} console errors: ${consoleErrors.join("; ")}`,
    ).toEqual([]);
  });
}
