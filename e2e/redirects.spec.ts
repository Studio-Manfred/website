import { expect, test } from "@playwright/test";

test("/news redirects to /writing", async ({ page }) => {
  await page.goto("/news");
  await expect(page).toHaveURL(/\/writing\/?$/);
  await expect(page.locator("h1").first()).toBeVisible();
});
