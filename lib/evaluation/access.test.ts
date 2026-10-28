import { describe, expect, it } from "vitest";
import { isEvalToken } from "./access";

const secret = "a-long-unguessable-token-123";

describe("isEvalToken", () => {
  it("accepts only the exact token", () => {
    expect(isEvalToken(secret, secret)).toBe(true);
    expect(isEvalToken(secret + "x", secret)).toBe(false);
    expect(isEvalToken(secret.slice(0, -1), secret)).toBe(false);
    expect(isEvalToken("", secret)).toBe(false);
    expect(isEvalToken(null, secret)).toBe(false);
  });

  it("is closed when no token is set, or the set one is too short to be secret", () => {
    expect(isEvalToken("anything", undefined)).toBe(false);
    expect(isEvalToken("", "")).toBe(false);
    expect(isEvalToken("short", "short")).toBe(false);
  });
});
