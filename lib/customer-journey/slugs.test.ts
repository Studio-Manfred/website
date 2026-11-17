import { describe, expect, it } from "vitest";
import { INDUSTRIES } from "./datasets";
import { CJ_CASE_SLUG } from "./case";
import { INDUSTRY_SLUGS, industryFromSegments, industryPath } from "./slugs";
import type { IndustryId } from "./types";

describe("industry slugs", () => {
  it("every industry has its own readable slug", () => {
    const ids = Object.keys(INDUSTRIES) as IndustryId[];
    const slugs = ids.map((id) => INDUSTRY_SLUGS[id]);
    expect(new Set(slugs).size).toBe(ids.length);
    for (const s of slugs) expect(s).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it("an industry's path sits under the case", () => {
    expect(industryPath("hotel")).toBe(`/cases/${CJ_CASE_SLUG}/hotel`);
    expect(industryPath("ehandel")).toBe(`/cases/${CJ_CASE_SLUG}/e-commerce`);
  });

  it("no segment means the default industry", () => {
    expect(industryFromSegments(undefined)).toBe("finance");
    expect(industryFromSegments([])).toBe("finance");
  });

  it("a known slug gives its industry, round trip for every industry", () => {
    for (const id of Object.keys(INDUSTRIES) as IndustryId[]) {
      expect(industryFromSegments([INDUSTRY_SLUGS[id]])).toBe(id);
    }
  });

  it("an unknown slug, an internal id or extra segments give null", () => {
    expect(industryFromSegments(["airline"])).toBeNull();
    expect(industryFromSegments(["ehandel"])).toBeNull();
    expect(industryFromSegments(["Hotel"])).toBeNull();
    expect(industryFromSegments(["hotel", "extra"])).toBeNull();
  });
});
