import { beforeEach, describe, expect, it, vi } from "vitest";

const store = new Map<string, string>();
const set = vi.fn();
vi.mock("next/headers", () => ({
  cookies: async () => ({ get: (name: string) => (store.has(name) ? { value: store.get(name) } : undefined), set }),
}));
const redirect = vi.fn((url: string) => {
  throw new Error(`REDIRECT ${url}`);
});
vi.mock("next/navigation", () => ({ redirect: (url: string) => redirect(url) }));

import { unlockCase } from "./actions";
import { caseFromUnlockCookie, UNLOCK_MAX_AGE, unlockCookieName } from "./unlock";

const form = (password: string) => {
  const f = new FormData();
  f.set("password", password);
  return f;
};

describe("unlocking a password-protected case (STU-1156)", () => {
  beforeEach(() => {
    store.clear();
    set.mockClear();
    redirect.mockClear();
  });

  it("the right password sets a 30-day httpOnly cookie for this case and reloads it", async () => {
    await expect(unlockCase("locked-case", form("open-sesame"))).rejects.toThrow("REDIRECT /cases/locked-case");
    expect(set).toHaveBeenCalledWith("case_unlock_locked-case", "open-sesame", expect.objectContaining({
      httpOnly: true,
      sameSite: "lax",
      maxAge: UNLOCK_MAX_AGE,
      path: "/cases/locked-case",
    }));
    expect(UNLOCK_MAX_AGE).toBe(60 * 60 * 24 * 30);
  });

  it("a wrong password sets nothing and comes back with ?wrong=1", async () => {
    await expect(unlockCase("locked-case", form("nope"))).rejects.toThrow("REDIRECT /cases/locked-case?wrong=1");
    expect(set).not.toHaveBeenCalled();
  });

  it("the cookie opens the case while its password still matches", async () => {
    expect(await caseFromUnlockCookie("locked-case")).toBeNull();
    store.set(unlockCookieName("locked-case"), "open-sesame");
    expect((await caseFromUnlockCookie("locked-case"))?.title).toBe("Locked Client");
    store.set(unlockCookieName("locked-case"), "old-password");
    expect(await caseFromUnlockCookie("locked-case")).toBeNull();
  });
});
