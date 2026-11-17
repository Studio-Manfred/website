import { describe, expect, it } from "vitest";
import fixture from "@/test/fixtures/shared-cv.json";
import { getSharedCv, isShareToken, sanitizeCvHtml } from "./cv";

describe("isShareToken (STU-1155)", () => {
  it("accepts 32+ url-safe characters only", () => {
    expect(isShareToken(fixture.token)).toBe(true);
    expect(isShareToken("short")).toBe(false);
    expect(isShareToken("x".repeat(40) + "/../")).toBe(false);
  });
});

describe("sanitizeCvHtml (STU-1155)", () => {
  it("keeps CV formatting, drops scripts, handlers and non-http links", () => {
    const html = sanitizeCvHtml(fixture.cv.content);
    expect(html).toContain("<h2>Introduction</h2>");
    expect(html).toContain("<strong>researcher</strong>");
    expect(html).toContain("<li>Research</li>");
    expect(html).toContain('<a href="https://studiomanfred.com"');
    expect(html).not.toMatch(/script|onerror|javascript:|<img/);
  });
});

describe("getSharedCv (STU-1155)", () => {
  it("returns the shared CV with sanitized text and its cases", async () => {
    const cv = await getSharedCv(fixture.token);
    expect(cv).toMatchObject({
      title: "Senior UX @ Example Bank",
      name: "Moa Bogren",
      email: "moa@studiomanfred.com",
      cases: [{ title: "Example Client", slug: "example-case" }],
    });
    expect(cv?.contentHtml).not.toContain("script");
  });

  it("null for an unknown or malformed token, without asking the database for a malformed one", async () => {
    expect(await getSharedCv("x".repeat(43))).toBeNull();
    expect(await getSharedCv("bad")).toBeNull();
  });
});
