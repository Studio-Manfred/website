import { expect, test } from "@playwright/test";

// STU-295: the DS Button uses Radix Slot when `asChild` is set, wrapping a
// child <a>. We verify three things on a representative instance:
//   1. The rendered element is <a> (not <button>) — i.e. Slot actually fired.
//   2. The accessible name comes through (axe / AT see the label text).
//   3. The :focus-visible outline still renders on the underlying <a>.
//
// `/training-and-courses` is a good probe — its main CTA is
//   <Button variant="inverse" size="lg" asChild>
//     <a href="mailto:hello@studiomanfred.com">Get in touch</a>
//   </Button>

test("DS Button asChild renders an <a> with accessible name and focus ring", async ({ page }) => {
  await page.goto("/training-and-courses");
  await page.waitForLoadState("networkidle");

  const cta = page.getByRole("link", { name: "Get in touch" }).first();
  await expect(cta).toBeVisible();

  // (1) Tag is <a>
  const tag = await cta.evaluate((el) => el.tagName);
  expect(tag).toBe("A");

  // (2) Accessible name is the link text (not lost when Slot merged props)
  const accessibleName = await cta.evaluate((el) => {
    return el.getAttribute("aria-label") ?? (el.textContent ?? "").trim();
  });
  expect(accessibleName.toLowerCase()).toContain("get in touch");

  // (3) Focus-visible draws a real outline on the <a>
  await cta.focus();
  const outline = await cta.evaluate((el) => {
    const cs = getComputedStyle(el);
    return { style: cs.outlineStyle, width: cs.outlineWidth };
  });
  expect(outline.style, "Button asChild <a> has no focus outline").not.toBe("none");
  expect(parseFloat(outline.width)).toBeGreaterThanOrEqual(2);
});
