import { expect, test } from "@playwright/test";

// STU-1146: case pages come from the intranet's Case CMS. The mock Supabase
// serves test/fixtures/cases.json and, like RLS, only published rows.
test("a published case renders its blocks and sidebar", async ({ page }) => {
  await page.goto("/cases/example-case");
  await expect(page.getByRole("heading", { level: 1, name: "Example Client" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Process & Methods" })).toBeVisible();
  // STU-1153: Process is an accordion; step 01 is open and several steps can be open together.
  await expect(page.getByRole("button", { name: "Discovery" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("We talked to users.")).toBeVisible();
  await page.getByRole("button", { name: "Validation" }).click();
  await expect(page.getByText("We surveyed many users.")).toBeVisible();
  await expect(page.getByText("We talked to users.")).toBeVisible();
  await expect(page.getByAltText("A laptop on a desk")).toBeVisible();
  await expect(page.getByText("+28%")).toBeVisible();
  await expect(page.getByRole("complementary").getByText("Moa Bogren")).toBeVisible();
});

test("a draft case is a 404", async ({ page }) => {
  const response = await page.goto("/cases/secret-draft");
  expect(response?.status()).toBe(404);
});

test("an unknown case is a 404", async ({ page }) => {
  const response = await page.goto("/cases/no-such-case");
  expect(response?.status()).toBe(404);
});

test("the /cases overview lists published cases and links to them (STU-1148)", async ({ page }) => {
  await page.goto("/cases");
  await expect(page.getByRole("heading", { level: 1, name: "Cases" })).toBeVisible();
  await expect(page.getByRole("link", { name: /Secret|Draft/ })).toHaveCount(0);
  await page.getByRole("link", { name: /Example Client/ }).click();
  await expect(page).toHaveURL(/\/cases\/example-case$/);
  await expect(page.getByRole("heading", { level: 1, name: "Example Client" })).toBeVisible();
});

test.describe("password-protected case (STU-1156)", () => {
  test("is listed with a lock, asks for the password, rejects a wrong one, opens with the right one and stays open", async ({ page }) => {
    await page.goto("/cases");
    await expect(page.getByRole("link", { name: /Locked Client/ })).toContainText("Password protected");

    await page.goto("/cases/locked-case");
    await expect(page.getByRole("heading", { level: 1, name: "This case is password protected" })).toBeVisible();
    await expect(page.getByText("The secret brief.")).toHaveCount(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);

    await page.getByLabel("Password").fill("wrong");
    await page.getByRole("button", { name: "Open the case" }).click();
    await expect(page.locator("#case-password-error")).toContainText("doesn’t open this case");

    await page.getByLabel("Password").fill("open-sesame");
    await page.getByRole("button", { name: "Open the case" }).click();
    await expect(page.getByRole("heading", { level: 1, name: "Locked Client" })).toBeVisible();
    await expect(page.getByText("The secret brief.")).toBeVisible();

    await page.reload();
    await expect(page.getByRole("heading", { level: 1, name: "Locked Client" })).toBeVisible();
  });
});
