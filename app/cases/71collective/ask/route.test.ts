import { beforeEach, describe, expect, it, vi } from "vitest";
import { GROUP_COMPANIES } from "@/lib/group";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));
vi.mock("@anthropic-ai/sdk", () => ({
  default: class {
    beta = { messages: { create } };
  },
}));

const { POST } = await import("./route");

const answers = Object.fromEntries(GROUP_COMPANIES.map((c) => [c.id, `Svar från ${c.name}`]));

function post(body: unknown) {
  return POST(new Request("http://localhost/cases/71collective/ask", { method: "POST", body: JSON.stringify(body) }));
}

describe("POST /cases/71collective/ask", () => {
  beforeEach(() => create.mockReset());

  it("answers a valid question", async () => {
    create.mockResolvedValue({ stop_reason: "end_turn", content: [{ type: "text", text: JSON.stringify(answers) }] });
    const res = await post({ question: "Vilka är ni?" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ answers });
  });

  it("rejects an invalid body with 400", async () => {
    const res = await post({ question: "" });
    expect(res.status).toBe(400);
    expect(create).not.toHaveBeenCalled();
  });

  it("returns 502 when the model call fails", async () => {
    create.mockResolvedValue({ stop_reason: "refusal", content: [] });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await post({ question: "Vilka är ni?" });
    expect(res.status).toBe(502);
  });
});
