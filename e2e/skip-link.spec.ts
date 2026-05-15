import { expect, test } from "@playwright/test";

test("STU-292 regression: skip link moves focus to <main>", async ({ page }) => {
  await page.goto("/");

  await page.keyboard.press("Tab");

  const skipLink = page.getByRole("link", { name: /Skip to content/i });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute("href", "#main");

  await page.keyboard.press("Enter");

  await expect(page).toHaveURL(/#main$/);
  const activeId = await page.evaluate(
    () => (document.activeElement as HTMLElement | null)?.id ?? "",
  );
  expect(activeId).toBe("main");
});
