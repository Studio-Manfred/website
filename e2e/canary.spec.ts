import { expect, test } from "@playwright/test";

test.describe("Canary", () => {
  test("home page renders the hero headline and skip link", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page).toHaveTitle(/Studio Manfred/i);
    await expect(
      page.getByRole("heading", { level: 1, name: /Building Better Product Companies/i }),
    ).toBeVisible();

    const skipLink = page.getByRole("link", { name: /Skip to content/i });
    await expect(skipLink).toHaveAttribute("href", "#main");
  });
});
