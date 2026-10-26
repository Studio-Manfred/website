import { expect, test } from "@playwright/test";

// The home hero wordmark easter egg: hover (desktop) or tap (phone) and the
// word Manfred changes typeface. Nothing may load before the first hover/tap.

const wordmark = '[role="img"][aria-label="Manfred"]';
const eggText = `${wordmark} text`;

async function openHome(page: import("@playwright/test").Page) {
  const fonts: string[] = [];
  page.on("request", (request) => {
    if (/\.(woff2?|ttf)(\?|$)/.test(request.url())) fonts.push(request.url());
  });
  await page.goto("/");
  await page.waitForSelector('[data-intro="done"]');
  return fonts;
}

test("hover: other typefaces appear, the box stays the same size, and leaving restores the wordmark", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "hover is a desktop input");
  const fonts = await openHome(page);
  expect(fonts).toHaveLength(0);

  const box = await page.locator(wordmark).boundingBox();
  await page.locator(wordmark).hover();
  await expect(page.locator(eggText)).toHaveText("Manfred", { timeout: 8_000 });
  expect(await page.locator(wordmark).boundingBox()).toEqual(box);
  expect(fonts.length).toBeGreaterThan(0);

  const first = await page.locator(eggText).evaluate((el) => (el as SVGElement).style.fontFamily);
  await expect
    .poll(() => page.locator(eggText).evaluate((el) => (el as SVGElement).style.fontFamily), { timeout: 3_000 })
    .not.toBe(first);

  await page.mouse.move(5, 5);
  await expect(page.locator(eggText)).toHaveCount(0);
});

test("tap: starts the typefaces, and a second tap stops them", async ({ page, isMobile }) => {
  test.skip(!isMobile, "tap is a touch input");
  const fonts = await openHome(page);
  expect(fonts).toHaveLength(0);

  await page.locator(wordmark).tap();
  await expect(page.locator(eggText)).toHaveText("Manfred", { timeout: 8_000 });
  await page.locator(wordmark).tap();
  await expect(page.locator(eggText)).toHaveCount(0);
});
