import { describe, expect, it, vi } from "vitest";
import { askGroup, buildSystemPrompt, emphasisParts, parseAskBody, MAX_QUESTION, MAX_TURNS } from "./group-ask";
import { GROUP_COMPANIES } from "./group";

const answers = {
  "seventyone-consulting": "Vi får människor och organisationer att växa.",
  "studio-manfred": "Customer research? Of course.",
  "mather-studio": "GREAT PEOPLE. PERFECTLY MATCHED.",
};

function fakeClient(response: unknown) {
  const create = vi.fn().mockResolvedValue(response);
  return { client: { beta: { messages: { create } } }, create };
}

describe("parseAskBody", () => {
  it("accepts a question and trims it", () => {
    expect(parseAskBody({ question: "  Vilka är ni? " })).toEqual({ question: "Vilka är ni?", history: [] });
  });

  it("rejects empty, missing and too long questions", () => {
    expect(parseAskBody({ question: "   " })).toBeNull();
    expect(parseAskBody({})).toBeNull();
    expect(parseAskBody(null)).toBeNull();
    expect(parseAskBody({ question: "x".repeat(MAX_QUESTION + 1) })).toBeNull();
  });

  it("keeps only the last turns of a well-formed history", () => {
    const turn = { question: "q", answers };
    const history = Array.from({ length: MAX_TURNS + 3 }, () => turn);
    expect(parseAskBody({ question: "Hej", history })?.history).toHaveLength(MAX_TURNS);
    expect(parseAskBody({ question: "Hej", history: [{ question: 1 }] })).toBeNull();
  });
});

describe("buildSystemPrompt", () => {
  it("describes every company with its voice", () => {
    const prompt = buildSystemPrompt();
    for (const c of GROUP_COMPANIES) {
      expect(prompt).toContain(c.name);
      expect(prompt).toContain(c.voice);
    }
  });
});

describe("emphasis", () => {
  it("asks each company to highlight a few key words with double asterisks", () => {
    expect(buildSystemPrompt()).toMatch(/\*\*/);
  });

  it("splits an answer into plain and emphasised parts", () => {
    expect(emphasisParts("We build **product teams** that **last**.")).toEqual([
      { text: "We build ", em: false },
      { text: "product teams", em: true },
      { text: " that ", em: false },
      { text: "last", em: true },
      { text: ".", em: false },
    ]);
  });

  it("leaves text without markers, or with an unclosed marker, as plain text", () => {
    expect(emphasisParts("Just text.")).toEqual([{ text: "Just text.", em: false }]);
    expect(emphasisParts("Open **end")).toEqual([{ text: "Open **end", em: false }]);
    expect(emphasisParts("Empty **** pair")).toEqual([{ text: "Empty **** pair", em: false }]);
  });
});

describe("askGroup", () => {
  it("returns one answer per company from the JSON reply", async () => {
    const { client, create } = fakeClient({
      stop_reason: "end_turn",
      content: [{ type: "text", text: JSON.stringify(answers) }],
    });
    await expect(askGroup(client as never, { question: "Vilka är ni?", history: [] })).resolves.toEqual(answers);
    const params = create.mock.calls[0][0];
    expect(params.model).toBe("claude-opus-5-5");
    expect(params.output_config.format.type).toBe("json_schema");
    expect(params.messages.at(-1)).toEqual({ role: "user", content: "Vilka är ni?" });
  });

  it("replays earlier turns as conversation history", async () => {
    const { client, create } = fakeClient({
      stop_reason: "end_turn",
      content: [{ type: "text", text: JSON.stringify(answers) }],
    });
    await askGroup(client as never, { question: "Och priset?", history: [{ question: "Vilka är ni?", answers }] });
    const { messages } = create.mock.calls[0][0];
    expect(messages).toEqual([
      { role: "user", content: "Vilka är ni?" },
      { role: "assistant", content: JSON.stringify(answers) },
      { role: "user", content: "Och priset?" },
    ]);
  });

  it("throws on a refusal or a malformed reply", async () => {
    const refused = fakeClient({ stop_reason: "refusal", content: [] });
    await expect(askGroup(refused.client as never, { question: "x", history: [] })).rejects.toThrow();
    const broken = fakeClient({ stop_reason: "end_turn", content: [{ type: "text", text: "{}" }] });
    await expect(askGroup(broken.client as never, { question: "x", history: [] })).rejects.toThrow();
  });
});
