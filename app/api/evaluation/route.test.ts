// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/evaluation/evaluate", async (orig) => {
  const actual = await orig<typeof import("@/lib/evaluation/evaluate")>();
  return { ...actual, runEvaluation: vi.fn() };
});

import { POST } from "./route";
import { EvaluationInputError, runEvaluation } from "@/lib/evaluation/evaluate";

const TOKEN = "test-token-that-is-long-enough";
const body = { industry: "hotel", archetypes: ["family_planner"], phase: 1, task: "Book a room", url: "https://hotel.example" };
const call = (b: unknown, token = TOKEN) =>
  POST(new Request("http://localhost/api/evaluation", { method: "POST", headers: { "x-eval-token": token, "content-type": "application/json" }, body: JSON.stringify(b) }));

beforeEach(() => vi.stubEnv("EVAL_LINK_TOKEN", TOKEN));
afterEach(() => {
  vi.unstubAllEnvs();
  vi.mocked(runEvaluation).mockReset();
});

describe("POST /api/evaluation", () => {
  it("is a 404 without the right token, or when no token is set", async () => {
    expect((await call(body, "wrong-token-wrong-token")).status).toBe(404);
    vi.stubEnv("EVAL_LINK_TOKEN", "");
    expect((await call(body)).status).toBe(404);
    expect(runEvaluation).not.toHaveBeenCalled();
  });

  it("runs the evaluation with the checked input", async () => {
    vi.mocked(runEvaluation).mockResolvedValue({ mode: "demo", summary: "s", findings: [], page: null });
    const res = await call(body);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ mode: "demo" });
    expect(runEvaluation).toHaveBeenCalledWith({ ...body, screenshots: [] });
  });

  it("refuses bad input: unknown industry, no archetypes, a bad phase, a huge or non-base64 screenshot", async () => {
    for (const bad of [
      { ...body, industry: "airline" },
      { ...body, archetypes: [] },
      { ...body, phase: 9 },
      { ...body, screenshots: [{ mediaType: "image/png", data: "A".repeat(1_400_001) }] },
      { ...body, screenshots: [{ mediaType: "image/gif", data: "AAAA" }] },
      { ...body, screenshots: [{ mediaType: "image/png", data: "<script>" }] },
    ]) {
      expect((await call(bad)).status).toBe(400);
    }
    expect(runEvaluation).not.toHaveBeenCalled();
  });

  it("passes on input errors as 400 with the reason, and hides other errors", async () => {
    vi.mocked(runEvaluation).mockRejectedValueOnce(new EvaluationInputError("Private addresses are not allowed."));
    const res = await call(body);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: "Private addresses are not allowed." });

    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    vi.mocked(runEvaluation).mockRejectedValueOnce(new Error("secret internals"));
    const res2 = await call(body);
    expect(res2.status).toBe(500);
    expect(JSON.stringify(await res2.json())).not.toContain("secret");
    spy.mockRestore();
  });

  it("refuses a body that is not JSON", async () => {
    const res = await POST(new Request("http://localhost/api/evaluation", { method: "POST", headers: { "x-eval-token": TOKEN }, body: "not json" }));
    expect(res.status).toBe(400);
  });
});
