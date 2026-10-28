import { describe, expect, it } from "vitest";
import { isSameOrigin } from "./access";

const req = (headers: Record<string, string>) => new Request("https://studiomanfred.com/api/evaluation", { method: "POST", headers });

describe("isSameOrigin", () => {
  it("accepts requests from the site's own pages", () => {
    expect(isSameOrigin(req({ origin: "https://studiomanfred.com", host: "studiomanfred.com" }))).toBe(true);
    expect(isSameOrigin(req({ origin: "http://localhost:3000", host: "localhost:3000" }))).toBe(true);
    expect(isSameOrigin(req({ origin: "https://studiomanfred.com", host: "internal:1234", "x-forwarded-host": "studiomanfred.com" }))).toBe(true);
  });

  it("refuses other sites, missing or broken origins", () => {
    expect(isSameOrigin(req({ origin: "https://evil.example", host: "studiomanfred.com" }))).toBe(false);
    expect(isSameOrigin(req({ host: "studiomanfred.com" }))).toBe(false);
    expect(isSameOrigin(req({ origin: "null", host: "studiomanfred.com" }))).toBe(false);
    expect(isSameOrigin(req({ origin: "https://studiomanfred.com" }))).toBe(false);
  });
});
