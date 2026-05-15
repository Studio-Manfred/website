import { describe, expect, it } from "vitest";
import { courses, type ContentBlock } from "./courses";

const SUBPAGE_SLUGS = [
  "business-design",
  "customer-journey-mapping",
  "cx-management",
  "design-leadership",
  "design-thinking-for-hr",
  "designops",
  "product-discovery",
] as const;

const CONTENT_KINDS: ReadonlyArray<ContentBlock["kind"]> = [
  "text",
  "list",
  "testimonial",
  "alumni",
  "fine-print",
];

describe("courses array", () => {
  it("has unique slugs", () => {
    const slugs = courses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has non-empty title, tagline and slug on every course", () => {
    for (const course of courses) {
      expect(course.slug, `slug missing on ${course.title}`).toBeTruthy();
      expect(course.title, `title missing on ${course.slug}`).toBeTruthy();
      expect(course.tagline, `tagline missing on ${course.slug}`).toBeTruthy();
    }
  });

  it("contains a matching entry for every training-and-courses sub-page slug", () => {
    const bySlug = new Set(courses.map((c) => c.slug));
    for (const slug of SUBPAGE_SLUGS) {
      expect(bySlug.has(slug), `missing course for sub-page slug "${slug}"`).toBe(true);
    }
  });

  it("only contains valid ContentBlock kinds", () => {
    for (const course of courses) {
      for (const block of course.content) {
        expect(
          CONTENT_KINDS,
          `unknown content kind "${block.kind}" on course "${course.slug}"`,
        ).toContain(block.kind);
      }
    }
  });
});
