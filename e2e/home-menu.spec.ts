import { expect, test, type Locator, type Page } from "@playwright/test";

const openMenuButton = (page: Page) =>
  page.getByRole("button", { name: "Open menu" });
const bar = (page: Page) => page.getByTestId("home-menu-bar");
const panel = (page: Page) => page.getByRole("dialog", { name: "Menu" });

// Waits for the finite animations (the panel wipe and the icon morph) to finish.
async function settled(page: Page) {
  await page.evaluate(() =>
    Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getComputedTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => undefined)),
    ),
  );
}

async function openPanel(page: Page) {
  await openMenuButton(page).click();
  await expect(panel(page)).toBeVisible();
  await settled(page);
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
  test("shows the menu button at the top of the page, with no bar", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(openMenuButton(page)).toBeVisible();
    await expect(bar(page)).toHaveCount(0);
  });

  test("has no sticky bar: the menu button scrolls away with the page", async ({
    page,
  }) => {
    await page.goto("/");
    // Scroll again on each try: a scroll before hydration can be undone by the router.
    await expect(async () => {
      await page.evaluate(() => window.scrollTo(0, 1200));
      await expect(openMenuButton(page)).not.toBeInViewport({ timeout: 1_000 });
    }).toPass({ timeout: 10_000 });
    await expect(bar(page)).toHaveCount(0);
  });

  test("lists Writing, Training & Courses and Cases, and hides Home on the home page", async ({
    page,
  }) => {
    await page.goto("/");
    await openPanel(page);
    const nav = panel(page).getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link")).toHaveCount(3);
    await expect(nav.getByRole("link", { name: /^Cases/ })).toHaveAttribute(
      "href",
      "/cases",
    );
    await expect(nav.getByRole("link", { name: /^Home/ })).toHaveCount(0);
  });

  test("draws both buttons as a bare icon: no ring, no fill", async ({
    page,
  }) => {
    await page.goto("/");
    const menuButton = openMenuButton(page);
    await expect(menuButton).toHaveCSS("border-top-width", "0px");
    await expect(menuButton).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
    await openPanel(page);
    const close = panel(page).getByRole("button", { name: "Close menu" });
    await expect(close).toHaveCSS("border-top-width", "0px");
    await expect(close).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  });

  test("keeps the button in place when the menu opens", async ({ page }) => {
    await page.goto("/");
    const menuButton = await box(openMenuButton(page));
    await openPanel(page);
    const closeButton = await box(
      panel(page).getByRole("button", { name: "Close menu" }),
    );
    expectSameBox(closeButton, menuButton);
  });

  test("opens and closes with the keyboard and returns focus", async ({
    page,
  }) => {
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

  test("has no wordmark in the open panel", async ({ page }) => {
    await page.goto("/");
    await openPanel(page);
    await expect(panel(page).getByRole("img", { name: /Manfred/ })).toHaveCount(
      0,
    );
  });
});

test.describe("home menu rows", () => {
  const row = (page: Page) =>
    panel(page).getByRole("link", { name: /^Writing/ });

  test("inverts the whole row on hover and keeps the text in place", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "No hover on touch screens",
    );
    await page.goto("/");
    await openPanel(page);

    const title = row(page).getByText("Writing", { exact: true });
    const before = await box(title);
    await row(page).hover();

    await expect(row(page)).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(title).toHaveCSS("color", "rgb(44, 40, 236)");
    expectSameBox(await box(title), before);

    const rowBox = await box(row(page));
    const viewport = page.viewportSize();
    expect(rowBox.x).toBe(0);
    expect(rowBox.width).toBe(viewport?.width);
  });

  test("inverts the row on keyboard focus and keeps the ring inside it", async ({
    page,
  }) => {
    await page.goto("/");
    await openPanel(page);
    await page.keyboard.press("Tab");
    await row(page).focus();

    await expect(row(page)).toBeFocused();
    await expect(row(page)).toHaveCSS("background-color", "rgb(255, 255, 255)");
    await expect(row(page)).toHaveCSS("outline-offset", "-4px");
  });

  test("leaves a resting row blue", async ({ page }) => {
    await page.goto("/");
    await openPanel(page);
    await expect(row(page)).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
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
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "No cursor on touch screens",
    );
    await page.goto("/");
    await openPanel(page);

    await expect(mCursor(page)).toBeVisible();
    const zIndexes = await page.evaluate(() => {
      const m = document.querySelector('div[style*="mix-blend-mode"]');
      const dialog = document.querySelector('[role="dialog"]');
      return [m, dialog].map((el) =>
        Number(getComputedStyle(el as Element).zIndex),
      );
    });
    expect(zIndexes[0]).toBeGreaterThan(zIndexes[1]);

    await page.mouse.move(300, 300);
    await expect
      .poll(() =>
        mCursor(page).evaluate((el) => (el as HTMLElement).style.transform),
      )
      .toContain("278px, 278px");
    await page.mouse.move(600, 420);
    await expect
      .poll(() =>
        mCursor(page).evaluate((el) => (el as HTMLElement).style.transform),
      )
      .toContain("578px, 398px");
  });

  test("gives the OS cursor back to reduced-motion users inside the panel", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await openPanel(page);
    expect(await computedCursor(panel(page))).toBe("auto");
    expect(
      await computedCursor(panel(page).getByRole("link", { name: /^Writing/ })),
    ).toBe("pointer");
  });
});
