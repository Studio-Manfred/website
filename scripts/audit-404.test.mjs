import { describe, expect, it } from "vitest";
import { normalizeUrl, classifyFinding } from "./audit-404.mjs";

describe("normalizeUrl", () => {
  it("strips trailing slash from the pathname (except root)", () => {
    expect(normalizeUrl("https://studiomanfred.com/writing/")).toBe(
      "https://studiomanfred.com/writing",
    );
  });

  it("keeps the root path as the bare origin", () => {
    expect(normalizeUrl("https://studiomanfred.com/")).toBe(
      "https://studiomanfred.com/",
    );
  });

  it("strips the hash fragment", () => {
    expect(normalizeUrl("https://studiomanfred.com/writing#top")).toBe(
      "https://studiomanfred.com/writing",
    );
  });

  it("returns null for non-URL input", () => {
    expect(normalizeUrl("not a url")).toBeNull();
  });

  it("preserves the query string", () => {
    expect(normalizeUrl("https://studiomanfred.com/x?a=1&b=2")).toBe(
      "https://studiomanfred.com/x?a=1&b=2",
    );
  });
});

describe("classifyFinding", () => {
  it("flags a 404 as broken", () => {
    expect(classifyFinding({ status: 404 }).broken).toBe(true);
  });

  it("ignores a 200", () => {
    expect(classifyFinding({ status: 200 }).broken).toBe(false);
  });

  it("ignores 3xx redirects", () => {
    expect(classifyFinding({ status: 301 }).broken).toBe(false);
  });

  it("treats fetch errors (status 0) as broken", () => {
    expect(classifyFinding({ status: 0, error: "ECONNREFUSED" }).broken).toBe(
      true,
    );
  });

  it("does not treat a 403 as broken (likely bot filtering)", () => {
    expect(classifyFinding({ status: 403 }).broken).toBe(false);
  });
});
