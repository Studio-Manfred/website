import { expect, test, type Locator, type Page } from "@playwright/test";

const BLUE = "rgb(44, 40, 236)";
const WHITE = "rgb(255, 255, 255)";

// One page of each kind: a blue nav and a white nav, and each width.
const PAGES = [
  { path: "/writing", nav: "blue", hides: "Writing" },
  { path: "/training-and-courses", nav: "blue", hides: "Training & Courses" },
  { path: "/join-us", nav: "blue", hides: null },
  { path: "/cases", nav: "white", hides: "Cases" },
  { path: "/privacy-policy", nav: "white", hides: null },
  { path: "/training-and-courses/designops", nav: "white", hides: null },
] as const;

const ALL_LINKS = ["Home", "Writing", "Training & Courses", "Cases"];

const menuButton = (page: Page) =>
  page.getByRole("button", { name: "Open menu" });
const panel = (page: Page) => page.getByRole("dialog", { name: "Menu" });

async function box(locator: Locator) {
  const result = await locator.boundingBox();
  if (!result) throw new Error("element has no bounding box");
  return result;
}

for (const { path, nav, hides } of PAGES) {
  test.describe(`menu in the nav on ${path}`, () => {
    test("has the menu button after Get in touch, as a ring in the nav's colour", async ({
      page,
    }) => {
      await page.goto(path);
      const button = menuButton(page);
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS("border-top-width", "2px");
      await expect(button).toHaveCSS(
        "border-top-color",
        nav === "blue" ? WHITE : BLUE,
      );

      const touch = await box(
        page.getByRole("link", { name: "Get in touch" }).first(),
      );
      const menu = await box(button);
      expect(touch.x + touch.width).toBeLessThanOrEqual(menu.x);
    });

    test("opens a blue panel with the close button exactly where the menu button was", async ({
      page,
    }) => {
      await page.goto(path);
      const before = await box(menuButton(page));
      await menuButton(page).click();
      await expect(panel(page)).toBeVisible();
      // The panel slides in; wait until it rests at the top of the viewport.
      await expect
        .poll(async () => (await panel(page).boundingBox())?.y)
        .toBe(0);
      await expect(panel(page)).toHaveCSS("background-color", BLUE);

      const after = await box(
        panel(page).getByRole("button", { name: "Close menu" }),
      );
      for (const key of ["x", "y", "width", "height"] as const) {
        expect(Math.abs(after[key] - before[key]), key).toBeLessThanOrEqual(1);
      }
    });

    test("hides the link to this page and shows the others", async ({
      page,
    }) => {
      await page.goto(path);
      await menuButton(page).click();
      const links = panel(page)
        .getByRole("navigation", { name: "Primary" })
        .getByRole("link");
      const expected = ALL_LINKS.filter((name) => name !== hides);
      await expect(links).toHaveCount(expected.length);
      for (const name of expected) {
        await expect(
          links.filter({ hasText: new RegExp(`^${name}`) }),
        ).toHaveCount(1);
      }
    });
  });
}

test.describe("menu on the shared CV", () => {
  test("is not there, and Get in touch is", async ({ page }) => {
    await page.goto("/cv/testtokentesttokentesttokentesttokentesttok");
    await expect(menuButton(page)).toHaveCount(0);
    await expect(
      page.getByRole("link", { name: "Get in touch" }).first(),
    ).toBeVisible();
  });
});

test.describe("the nav on a phone", () => {
  test("shows the M instead of the wordmark and does not overflow", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Phone only");
    await page.goto("/writing");
    const logo = page.getByRole("img", { name: "Manfred home" });
    await expect(logo).toHaveCount(1);
    expect((await box(logo)).width).toBeLessThan(60);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("shows the wordmark on a laptop", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-desktop", "Desktop only");
    await page.goto("/writing");
    const logo = page.getByRole("img", { name: "Manfred home" });
    await expect(logo).toHaveCount(1);
    expect((await box(logo)).width).toBeGreaterThan(100);
  });
});
