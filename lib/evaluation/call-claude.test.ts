import { beforeEach, describe, expect, it, vi } from "vitest";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";

const parse = vi.fn();
vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    beta = { messages: { parse } };
  },
}));

const { MODEL, callClaude } = await import("./evaluate");

const ctx = {
  ind: INDUSTRIES.hotel,
  input: { industry: "hotel" as const, archetypes: ["family_planner"], phase: 1, task: "Book a room", screenshots: [], criteria: ["h-status"] },
  page: null,
};

beforeEach(() => parse.mockReset());

describe("callClaude", () => {
  it("asks the model for a structured report and returns it", async () => {
    const report = { summary: "Fine.", findings: [] };
    parse.mockResolvedValue({ stop_reason: "end_turn", parsed_output: report });
    await expect(callClaude(ctx)).resolves.toEqual(report);
    const req = parse.mock.calls[0][0];
    expect(req.model).toBe(MODEL);
    expect(req.output_config.format).toBeDefined();
    expect(req.messages[0].content.at(-1).text).toContain("Book a room");
  });

  it("fails when the model declines", async () => {
    parse.mockResolvedValue({ stop_reason: "refusal", parsed_output: null });
    await expect(callClaude(ctx)).rejects.toThrow(/declined/);
  });

  it("fails when the answer can't be read", async () => {
    parse.mockResolvedValue({ stop_reason: "max_tokens", parsed_output: null });
    await expect(callClaude(ctx)).rejects.toThrow(/could not be read/);
  });
});
