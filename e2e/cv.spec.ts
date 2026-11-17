import { expect, test } from "@playwright/test";

// STU-1155: a CV shared from the intranet. The mock serves
// test/fixtures/shared-cv.json for its token; anything else is null → 404.
const TOKEN = "testtokentesttokentesttokentesttokentesttok";

test("a shared CV renders, sanitized, and is not indexed", async ({ page }) => {
  await page.goto(`/cv/${TOKEN}`);
  await expect(page.getByRole("heading", { level: 1, name: "Moa Bogren" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Introduction" })).toBeVisible();
  await expect(page.getByRole("complementary").getByRole("link", { name: "Example Client" })).toHaveAttribute("href", "/cases/example-case");
  await expect(page.locator(".cv-body script, .cv-body img")).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("print view: just the CV, no nav, footer or button", async ({ page }) => {
  await page.goto(`/cv/${TOKEN}`);
  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("button", { name: /Download PDF/ })).toBeHidden();
  await expect(page.getByRole("contentinfo")).toBeHidden();
  await expect(page.getByRole("heading", { level: 1, name: "Moa Bogren" })).toBeVisible();
});

test("an unknown or malformed token is a 404", async ({ page }) => {
  expect((await page.goto(`/cv/${"x".repeat(43)}`))?.status()).toBe(404);
  expect((await page.goto("/cv/short"))?.status()).toBe(404);
});
