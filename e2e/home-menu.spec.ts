import { expect, test, type Locator, type Page } from "@playwright/test";

const openMenuButton = (page: Page) => page.getByRole("button", { name: "Open menu" });
const bar = (page: Page) => page.getByTestId("home-menu-bar");
const panel = (page: Page) => page.getByRole("dialog", { name: "Menu" });

async function scrollPastHero(page: Page) {
  await page.evaluate(() => {
    const hero = document.getElementById("hero");
    window.scrollTo(0, (hero?.offsetHeight ?? 0) + 200);
  });
  await expect(bar(page)).toBeVisible();
}

async function openPanel(page: Page) {
  await openMenuButton(page).click();
  await expect(panel(page)).toBeVisible();
  // The panel slides in; wait until it rests at the top of the viewport.
  await expect.poll(async () => (await panel(page).boundingBox())?.y).toBe(0);
}

async function box(locator: Locator) {
  const result = await locator.boundingBox();
  if (!result) throw new Error("element has no bounding box");
  return result;
}

function expectSameBox(
  actual: { x: number; y: number; width: number; height: number },
  expected: { x: number; y: number; width: number; height: number },
) {
  for (const key of ["x", "y", "width", "height"] as const) {
    expect(Math.abs(actual[key] - expected[key]), key).toBeLessThanOrEqual(1);
  }
}

test.describe("home menu", () => {
  test("shows the menu button and no bar at the top of the page", async ({ page }) => {
    await page.goto("/");
    await expect(openMenuButton(page)).toBeVisible();
    await expect(bar(page)).toHaveAttribute("aria-hidden", "true");
    await expect(bar(page)).toBeHidden();
  });

  test("shows the bar after the hero has scrolled past", async ({ page }) => {
    await page.goto("/");
    await scrollPastHero(page);
    await expect(bar(page)).toHaveAttribute("aria-hidden", "false");
    await expect(bar(page).getByRole("img", { name: "Manfred home" })).toBeVisible();
  });

  test("is not on other pages", async ({ page }) => {
    await page.goto("/writing");
    await expect(openMenuButton(page)).toHaveCount(0);
  });

  test("keeps the wordmark and the button in place when the menu opens", async ({ page }) => {
    await page.goto("/");
    await scrollPastHero(page);

    const barWordmark = await box(bar(page).getByRole("img", { name: "Manfred home" }));
    const menuButton = await box(openMenuButton(page));

    await openPanel(page);

    const panelWordmark = await box(panel(page).getByRole("img", { name: "Manfred home" }));
    const closeButton = await box(panel(page).getByRole("button", { name: "Close menu" }));

    expectSameBox(panelWordmark, barWordmark);
    expectSameBox(closeButton, menuButton);
  });

  test("opens and closes with the keyboard and returns focus", async ({ page }) => {
    await page.goto("/");
    await openMenuButton(page).focus();
    await page.keyboard.press("Enter");
    await expect(panel(page)).toBeVisible();

    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const inside = await page.evaluate(
        () => !!document.activeElement?.closest('[role="dialog"]'),
      );
      expect(inside).toBe(true);
    }

    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
    await expect(openMenuButton(page)).toBeFocused();
  });

  test("does not scroll the page behind the open panel", async ({ page }) => {
    await page.goto("/");
    await openPanel(page);
    await page.mouse.move(200, 300);
    await page.mouse.wheel(0, 600);
    expect(await page.evaluate(() => window.scrollY)).toBe(0);
  });

  test("scrolls inside the panel on a short screen", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 600 });
    await page.goto("/");
    await openPanel(page);
    const cta = panel(page).getByRole("link", { name: "Get in touch" });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
  });

  test("closes on Home and scrolls to the top", async ({ page }) => {
    await page.goto("/");
    await scrollPastHero(page);
    await openPanel(page);
    await panel(page).getByRole("link", { name: /^Home/ }).click();
    await expect(panel(page)).toBeHidden();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThanOrEqual(1);
  });
});

test.describe("home menu cursor", () => {
  const mCursor = (page: Page) => page.locator('div[style*="mix-blend-mode"]');

  async function computedCursor(locator: Locator) {
    return locator.evaluate((el) => getComputedStyle(el).cursor);
  }

  test("hides the OS cursor on every part of the menu", async ({ page }) => {
    await page.goto("/");
    expect(await computedCursor(openMenuButton(page))).toBe("none");

    await openPanel(page);
    const p = panel(page);
    for (const target of [
      p,
      p.getByRole("link", { name: /^Writing/ }),
      p.getByRole("button", { name: "Close menu" }),
      p.getByRole("link", { name: "Get in touch" }),
    ]) {
      expect(await computedCursor(target)).toBe("none");
    }
  });

  test("draws the Manfred M above the panel and moves it with the mouse", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "No cursor on touch screens");
    await page.goto("/");
    await openPanel(page);

    await expect(mCursor(page)).toBeVisible();
    const zIndexes = await page.evaluate(() => {
      const m = document.querySelector('div[style*="mix-blend-mode"]');
      const dialog = document.querySelector('[role="dialog"]');
      return [m, dialog].map((el) => Number(getComputedStyle(el as Element).zIndex));
    });
    expect(zIndexes[0]).toBeGreaterThan(zIndexes[1]);

    await page.mouse.move(300, 300);
    await expect
      .poll(() => mCursor(page).evaluate((el) => (el as HTMLElement).style.transform))
      .toContain("278px, 278px");
    await page.mouse.move(600, 420);
    await expect
      .poll(() => mCursor(page).evaluate((el) => (el as HTMLElement).style.transform))
      .toContain("578px, 398px");
  });

  test("gives the OS cursor back to reduced-motion users inside the panel", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await openPanel(page);
    expect(await computedCursor(panel(page))).toBe("auto");
    expect(await computedCursor(panel(page).getByRole("link", { name: /^Writing/ }))).toBe(
      "pointer",
    );
  });
});
