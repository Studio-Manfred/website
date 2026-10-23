import { afterEach, describe, expect, it, vi } from "vitest";

async function loadRewrites(origin?: string) {
  vi.resetModules();
  if (origin === undefined) delete process.env.AI_LANDING_ORIGIN;
  else process.env.AI_LANDING_ORIGIN = origin;
  const { default: config } = await import("./next.config");
  return (await config.rewrites!()) as { source: string; destination: string }[];
}

describe("next.config rewrites", () => {
  afterEach(() => {
    delete process.env.AI_LANDING_ORIGIN;
  });

  it("keeps the analytics proxy rewrites", async () => {
    const rewrites = await loadRewrites();
    expect(rewrites.map((r) => r.source)).toEqual(
      expect.arrayContaining(["/js/t.js", "/api/event"]),
    );
  });

  it("adds no /ai rewrite when AI_LANDING_ORIGIN is unset", async () => {
    const rewrites = await loadRewrites();
    expect(rewrites.some((r) => r.source.startsWith("/ai"))).toBe(false);
  });

  it("forwards /ai and /ai/:path* to the configured origin", async () => {
    const rewrites = await loadRewrites("https://example-ai.vercel.app");
    expect(rewrites).toEqual(
      expect.arrayContaining([
        { source: "/ai", destination: "https://example-ai.vercel.app/ai" },
        { source: "/ai/:path*", destination: "https://example-ai.vercel.app/ai/:path*" },
      ]),
    );
  });

  it("ignores a trailing slash on the origin", async () => {
    const rewrites = await loadRewrites("https://example-ai.vercel.app/");
    expect(rewrites.find((r) => r.source === "/ai")?.destination).toBe(
      "https://example-ai.vercel.app/ai",
    );
  });
});

describe("next.config redirects", () => {
  it("sends both old Triple Diamond share links to the case page (STU-1167, STU-1179)", async () => {
    vi.resetModules();
    const { default: config } = await import("./next.config");
    const redirects = await config.redirects!();
    for (const source of ["/share/triple-diamond-roles-jj0fmd7u.html", "/share/triple-diamond-roles-jj0fmd7u"])
      expect(redirects).toContainEqual({ source, destination: "/cases/ai-activities-triple-diamond", permanent: true });
  });
});
