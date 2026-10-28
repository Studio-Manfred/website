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

async function box(locator: Locator) {
  const result = await locator.boundingBox();
  if (!result) throw new Error("element has no bounding box");
  return result;
}

for (const { path, nav, hides } of PAGES) {
  test.describe(`menu in the nav on ${path}`, () => {
    test("has the menu button after Get in touch, as a bare icon in the nav's colour", async ({
      page,
    }) => {
      await page.goto(path);
      const button = menuButton(page);
      await expect(button).toBeVisible();
      await expect(button).toHaveCSS("border-top-width", "0px");
      await expect(button).toHaveCSS("color", nav === "blue" ? WHITE : BLUE);

      const touch = await box(
        page.getByRole("link", { name: "Get in touch" }).first(),
      );
      const menu = await box(button);
      expect(touch.x + touch.width).toBeLessThanOrEqual(menu.x);
    });

    test("opens a panel in the opposite colour of the page, with the close button exactly where the menu button was", async ({
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
      // The panel is the opposite of the page, so the wipe is always seen.
      await expect(panel(page)).toHaveCSS(
        "background-color",
        nav === "blue" ? WHITE : BLUE,
      );
      await expect(
        panel(page).getByRole("button", { name: "Close menu" }),
      ).toHaveCSS("color", nav === "blue" ? BLUE : WHITE);

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

test.describe("the nav and the open menu are as wide on every page", () => {
  const SIZES = [
    { width: 1440, height: 900 },
    { width: 1024, height: 800 },
    { width: 390, height: 800 },
  ];

  for (const size of SIZES) {
    test(`the nav row is the same on every page at ${size.width} px`, async ({
      page,
    }, testInfo) => {
      test.skip(
        testInfo.project.name !== "chromium-desktop",
        "Sets its own size",
      );
      await page.setViewportSize(size);
      const rows: { path: string; x: number; width: number }[] = [];
      for (const { path } of PAGES) {
        await page.goto(path);
        const row = await box(page.locator("nav > div").first());
        rows.push({ path, x: row.x, width: row.width });
      }
      for (const row of rows) {
        expect(row.x, row.path).toBeCloseTo(rows[0].x, 0);
        expect(row.width, row.path).toBeCloseTo(rows[0].width, 0);
      }
    });

    for (const { path } of PAGES) {
      test(`the menu rows line up with the nav row on ${path} at ${size.width} px`, async ({
        page,
      }, testInfo) => {
        test.skip(
          testInfo.project.name !== "chromium-desktop",
          "Sets its own size",
        );
        await page.setViewportSize(size);
        await page.goto(path);
        const nav = await box(page.locator("nav > div").first());
        await menuButton(page).click();
        await settled(page);
        const link = panel(page)
          .getByRole("navigation", { name: "Primary" })
          .getByRole("link")
          .first();
        const title = await box(link.locator("span span").first());
        const arrow = await box(link.locator("> span").last());
        expect(Math.abs(title.x - nav.x), "row text left").toBeLessThanOrEqual(
          1,
        );
        expect(
          Math.abs(arrow.x + arrow.width - (nav.x + nav.width)),
          "arrow right",
        ).toBeLessThanOrEqual(1);
      });
    }
  }
});

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
  test("shows the wordmark (not the M) on a normal phone and does not overflow", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Phone only");
    await page.goto("/writing");
    await expect(page.getByTestId("monogram")).toBeHidden();
    const logo = page.getByRole("img", { name: "Manfred home" });
    await expect(logo).toHaveCount(1);
    expect((await box(logo)).width).toBeGreaterThan(80);
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

test.describe("optical alignment of the nav", () => {
  for (const { path } of PAGES) {
    test(`the letters and the lines are flush with the content edges on ${path}`, async ({
      page,
    }) => {
      await page.goto(path);
      const row = await box(page.locator("nav > div").first());
      const glyph = await box(
        page.locator("nav a svg path").locator("visible=true").first(),
      );
      const lines = await box(menuButton(page).locator("svg"));
      expect(Math.abs(glyph.x - row.x), "wordmark left").toBeLessThanOrEqual(
        1.5,
      );
      expect(
        Math.abs(lines.x + lines.width - (row.x + row.width)),
        "lines right",
      ).toBeLessThanOrEqual(1);
    });
  }
});

test.describe("the logo in the nav on narrow screens", () => {
  test("shows the M below 340 px, flush with the content edge", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Sets its own size",
    );
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto("/writing");
    const mark = page.getByTestId("monogram");
    await expect(mark).toBeVisible();
    await expect(page.getByRole("img", { name: "Manfred home" })).toHaveCount(
      1,
    );
    const row = await box(page.locator("nav > div").first());
    const m = await box(mark);
    expect(Math.abs(m.x - row.x)).toBeLessThanOrEqual(1);
    expect(m.height).toBeGreaterThan(21);
    expect(m.height).toBeLessThan(25);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });

  test("shows the wordmark from 340 px, with room to Get in touch", async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium-desktop",
      "Sets its own size",
    );
    await page.setViewportSize({ width: 340, height: 640 });
    await page.goto("/writing");
    await expect(page.getByTestId("monogram")).toBeHidden();
    const wordmark = await box(page.getByRole("img", { name: "Manfred home" }));
    const touch = await box(
      page.getByRole("link", { name: "Get in touch" }).first(),
    );
    expect(touch.x - (wordmark.x + wordmark.width)).toBeGreaterThanOrEqual(16);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
});

test.describe("the hamburger turns into a cross", () => {
  const top = (locator: Locator) => locator.locator(".menu-icon__top");

  test("the menu button rests as three lines and the panel's close button as a cross", async ({
    page,
  }) => {
    await page.goto("/writing");
    await expect(top(menuButton(page))).toHaveCSS("transform", "none");
    await menuButton(page).click();
    await settled(page);
    const close = panel(page).getByRole("button", { name: "Close menu" });
    await expect(top(close)).not.toHaveCSS("transform", "none");
    await expect(close.locator(".menu-icon__middle")).toHaveCSS("opacity", "0");
  });

  test("the panel wipes in and the lines animate while it opens", async ({
    page,
  }) => {
    await page.goto("/writing");
    await menuButton(page).click();
    await expect(panel(page)).toBeVisible();
    const names = await page.evaluate(() =>
      document.getAnimations().map((a) => (a as CSSAnimation).animationName),
    );
    expect(names).toContain("menu-panel-in");
    expect(names).toContain("menu-icon-top-in");
  });

  test("the cross takes 600 ms to form, and 350 ms to turn back", async ({
    page,
  }) => {
    await page.goto("/writing");
    await menuButton(page).click();
    await expect(panel(page)).toBeVisible();
    const duration = (name: string) =>
      page.evaluate((n) => {
        const a = document
          .getAnimations()
          .find((x) => (x as CSSAnimation).animationName === n);
        return a ? a.effect?.getTiming().duration : null;
      }, name);
    expect(await duration("menu-icon-top-in")).toBe(600);
    expect(await duration("menu-icon-middle-in")).toBe(360);
    expect(await duration("menu-panel-in")).toBe(400);
    await settled(page);
    await page.keyboard.press("Escape");
    await expect.poll(() => duration("menu-icon-top-out")).toBe(350);
    expect(await duration("menu-icon-middle-out")).toBe(210);
    expect(await duration("menu-panel-out")).toBe(350);
  });

  test("the content fades in after the wipe, row by row, and not when closing", async ({
    page,
  }) => {
    await page.goto("/writing");
    await menuButton(page).click();
    await expect(panel(page)).toBeVisible();
    const reveals = () =>
      page.evaluate(() =>
        document
          .getAnimations()
          .filter((a) => (a as CSSAnimation).animationName === "menu-reveal-in")
          .map((a) => {
            const t = a.effect?.getTiming();
            return [Math.round(Number(t?.delay)), t?.duration];
          }),
      );
    // /writing hides Writing: three rows (Home, Training, Cases) and the Get in touch block.
    expect(await reveals()).toEqual([
      [100, 350],
      [150, 350],
      [200, 350],
      [250, 350],
    ]);
    await settled(page);
    await page.keyboard.press("Escape");
    await expect
      .poll(() =>
        page.evaluate(() =>
          document
            .getAnimations()
            .some(
              (a) => (a as CSSAnimation).animationName === "menu-panel-out",
            ),
        ),
      )
      .toBe(true);
    expect(await reveals()).toEqual([]);
  });

  test("with reduced motion the cross shows at once and nothing animates", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/writing");
    await menuButton(page).click();
    await expect(panel(page)).toBeVisible();
    const close = panel(page).getByRole("button", { name: "Close menu" });
    await expect(top(close)).not.toHaveCSS("transform", "none");
    const names = await page.evaluate(() =>
      document.getAnimations().map((a) => (a as CSSAnimation).animationName),
    );
    expect(names.filter((n) => n.startsWith("menu-"))).toEqual([]);
  });

  test("closing turns the cross back into three lines on the page's own button", async ({
    page,
  }) => {
    await page.goto("/writing");
    await menuButton(page).click();
    await settled(page);
    await page.keyboard.press("Escape");
    await expect(panel(page)).toBeHidden();
    await expect(top(menuButton(page))).toHaveCSS("transform", "none");
  });
});
