import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { maybeSingle, supabaseChain } = vi.hoisted(() => {
  const maybeSingle = vi.fn();
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  chain.from = vi.fn(() => chain);
  chain.select = vi.fn(() => chain);
  chain.ilike = vi.fn(() => chain);
  chain.eq = vi.fn(() => chain);
  chain.order = vi.fn(() => chain);
  chain.limit = vi.fn(() => chain);
  chain.maybeSingle = maybeSingle;
  return { maybeSingle, supabaseChain: chain };
});

vi.mock("@/lib/supabase", () => ({ supabase: supabaseChain }));

const navMocks = vi.hoisted(() => ({
  redirect: vi.fn((url: string) => {
    const e = new Error(`__REDIRECT__:${url}`);
    (e as Error & { digest?: string }).digest = `NEXT_REDIRECT;${url}`;
    throw e;
  }),
  notFound: vi.fn(() => {
    throw new Error("__NOTFOUND__");
  }),
}));

vi.mock("next/navigation", () => navMocks);

import NewsSlugRedirect from "./page";

beforeEach(() => {
  maybeSingle.mockReset();
  navMocks.redirect.mockClear();
  navMocks.notFound.mockClear();
  supabaseChain.from.mockClear();
  supabaseChain.select.mockClear();
  supabaseChain.ilike.mockClear();
  supabaseChain.eq.mockClear();
  supabaseChain.order.mockClear();
  supabaseChain.limit.mockClear();
});

afterEach(() => {
  vi.clearAllMocks();
});

function callPage(slug: string) {
  return NewsSlugRedirect({ params: Promise.resolve({ slug }) });
}

describe("/news/[slug] → /writing/<full-slug> redirect", () => {
  it("redirects to the matching /writing slug when Supabase returns a row", async () => {
    maybeSingle.mockResolvedValueOnce({
      data: { slug: "git-gud-through-data-and-boost-your-performance-1777974355216" },
      error: null,
    });

    await expect(callPage("git-gud-through-data-and-boost-your-performance")).rejects.toThrow(
      "__REDIRECT__:/writing/git-gud-through-data-and-boost-your-performance-1777974355216",
    );

    expect(navMocks.redirect).toHaveBeenCalledWith(
      "/writing/git-gud-through-data-and-boost-your-performance-1777974355216",
    );
    expect(navMocks.notFound).not.toHaveBeenCalled();
  });

  it("queries blog_posts with a prefix ilike + published filter and limit 1", async () => {
    maybeSingle.mockResolvedValueOnce({
      data: { slug: "deep-dive-qualitative-data-analysis-1777974355010" },
      error: null,
    });

    await expect(callPage("deep-dive-qualitative-data-analysis")).rejects.toThrow(
      /__REDIRECT__:/,
    );

    expect(supabaseChain.from).toHaveBeenCalledWith("blog_posts");
    expect(supabaseChain.select).toHaveBeenCalledWith("slug");
    expect(supabaseChain.ilike).toHaveBeenCalledWith(
      "slug",
      "deep-dive-qualitative-data-analysis-%",
    );
    expect(supabaseChain.eq).toHaveBeenCalledWith("published", true);
    expect(supabaseChain.limit).toHaveBeenCalledWith(1);
  });

  it("calls notFound() when no row matches", async () => {
    maybeSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(callPage("does-not-exist")).rejects.toThrow("__NOTFOUND__");
    expect(navMocks.notFound).toHaveBeenCalledTimes(1);
    expect(navMocks.redirect).not.toHaveBeenCalled();
  });

  it("calls notFound() when Supabase returns an error", async () => {
    maybeSingle.mockResolvedValueOnce({ data: null, error: { message: "boom" } });

    await expect(callPage("anything")).rejects.toThrow("__NOTFOUND__");
    expect(navMocks.notFound).toHaveBeenCalledTimes(1);
    expect(navMocks.redirect).not.toHaveBeenCalled();
  });

  it("escapes LIKE wildcards in the user-provided slug", async () => {
    maybeSingle.mockResolvedValueOnce({ data: null, error: null });

    await expect(callPage("weird_slug%name")).rejects.toThrow();
    expect(supabaseChain.ilike).toHaveBeenCalledWith(
      "slug",
      "weird\\_slug\\%name-%",
    );
  });
});
