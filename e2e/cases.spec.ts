import { expect, test } from "@playwright/test";

// STU-1146: case pages come from the intranet's Case CMS. The mock Supabase
// serves test/fixtures/cases.json and, like RLS, only published rows.
test("a published case renders its blocks and sidebar", async ({ page }) => {
  await page.goto("/cases/example-case");
  await expect(page.getByRole("heading", { level: 1, name: "Example Client" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Process & Methods" })).toBeVisible();
  await page.getByRole("button", { name: "Validation" }).click();
  await expect(page.getByText("We surveyed many users.")).toBeVisible();
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
