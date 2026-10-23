import { expect, test, type Page } from "@playwright/test";

interface Row {
  t: number;
  phase: string | null;
  opacity: string | null;
  masked: boolean;
  headline: boolean;
  button: boolean;
}

// Records the hero's state on every animation frame, from before the page's own
// scripts run, so the order and the first paint can be checked.
async function recordIntro(page: Page) {
  await page.addInitScript(() => {
    const rows: Row[] = [];
    (window as unknown as { __intro: Row[] }).__intro = rows;
    const t0 = performance.now();
    const tick = () => {
      const root = document.querySelector("[data-intro]");
      if (root) {
        const wordmark = root.querySelector('[role="img"]');
        const fades = root.querySelectorAll(".fade-up");
        const row: Row = {
          t: performance.now() - t0,
          phase: root.getAttribute("data-intro"),
          opacity: wordmark ? getComputedStyle(wordmark).opacity : null,
          masked: !!root.querySelector("g[mask]"),
          headline: !!fades[0]?.classList.contains("in-view"),
          button: !!fades[1]?.classList.contains("in-view"),
        };
        rows.push(row);
        if (row.button) return;
      }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

async function finishedRows(page: Page): Promise<Row[]> {
  await page.waitForFunction(() =>
    (window as unknown as { __intro: Row[] }).__intro.some((row) => row.button),
  );
  return page.evaluate(() => (window as unknown as { __intro: Row[] }).__intro);
}

const wordmark = (page: Page) => page.locator("[data-intro] [role='img']");
const headline = (page: Page) => page.getByRole("heading", { level: 1 });
const button = (page: Page) =>
  page.getByRole("link", { name: "Get in touch" }).first();

test.describe("hero intro", () => {
  test("ends with the wordmark, the headline and the button in view", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.locator('[data-intro="done"]')).toBeVisible();
    await expect(wordmark(page)).toHaveAccessibleName("Manfred");
    await expect(wordmark(page)).toHaveCSS("opacity", "1");
    await expect(page.locator("[data-intro] g[mask]")).toHaveCount(0);
    await expect(headline(page).locator("xpath=..")).toHaveCSS("opacity", "1");
    await expect(
      button(page).locator("xpath=ancestor::div[contains(@class,'fade-up')]"),
    ).toHaveCSS("opacity", "1");
  });

  test("draws the wordmark first, then the headline, then the button", async ({
    page,
  }) => {
    await recordIntro(page);
    await page.goto("/");
    const rows = await finishedRows(page);
    const at = (test: (row: Row) => boolean) => rows.find(test)?.t ?? Infinity;

    const playing = at((row) => row.phase === "playing");
    const done = at((row) => row.phase === "done");
    const headlineIn = at((row) => row.headline);
    const buttonIn = at((row) => row.button);

    expect(playing).toBeLessThan(done);
    expect(done - playing).toBeGreaterThan(1500);
    expect(headlineIn).toBeGreaterThanOrEqual(done);
    expect(buttonIn - headlineIn).toBeGreaterThanOrEqual(250);
  });

  test("never shows the whole wordmark before it is drawn", async ({
    page,
  }) => {
    await recordIntro(page);
    await page.goto("/");
    const rows = await finishedRows(page);
    const early = rows.filter(
      (row) => row.phase !== "done" && !row.masked && row.opacity !== "0",
    );
    expect(early).toEqual([]);
  });

  test("keeps the wordmark box the same size before and after", async ({
    page,
  }) => {
    await page.goto("/");
    const before = await wordmark(page).boundingBox();
    await expect(page.locator('[data-intro="done"]')).toBeVisible();
    const after = await wordmark(page).boundingBox();
    expect(before).not.toBeNull();
    expect(after).not.toBeNull();
    for (const key of ["x", "y", "width", "height"] as const) {
      expect(
        Math.abs((before?.[key] ?? 0) - (after?.[key] ?? 0)),
      ).toBeLessThanOrEqual(1);
    }
  });
});

test.describe("hero intro with reduced motion", () => {
  test("shows everything at once, with no drawing", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await recordIntro(page);
    await page.goto("/");
    await expect(page.locator('[data-intro="done"]')).toBeVisible();
    const rows = await finishedRows(page);
    expect(rows.some((row) => row.phase === "playing")).toBe(false);
    expect(rows.some((row) => row.masked)).toBe(false);
    const done = rows.find((row) => row.phase === "done")?.t ?? Infinity;
    const buttonIn = rows.find((row) => row.button)?.t ?? Infinity;
    expect(buttonIn - done).toBeLessThan(250);
  });
});

test.describe("hero intro without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("shows the wordmark, the headline and the button", async ({ page }) => {
    await page.goto("/");
    await expect(wordmark(page)).toHaveCSS("opacity", "1");
    await expect(headline(page)).toBeVisible();
    await expect(headline(page).locator("xpath=..")).toHaveCSS("opacity", "1");
    await expect(button(page)).toBeVisible();
    await expect(
      button(page).locator("xpath=ancestor::div[contains(@class,'fade-up')]"),
    ).toHaveCSS("opacity", "1");
  });
});
