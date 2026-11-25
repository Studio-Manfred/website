import type Anthropic from "@anthropic-ai/sdk";
import { z } from "zod";
import { GROUP_COMPANIES } from "@/lib/group";

export const MAX_QUESTION = 500;
export const MAX_TURNS = 6;

export type Answers = Record<string, string>;
export interface Turn {
  question: string;
  answers: Answers;
}
export interface AskInput {
  question: string;
  history: Turn[];
}

const ids = GROUP_COMPANIES.map((c) => c.id);

const AnswersSchema = z.object(Object.fromEntries(ids.map((id) => [id, z.string().min(1)])));

const BodySchema = z.object({
  question: z.string().trim().min(1).max(MAX_QUESTION),
  history: z
    .array(z.object({ question: z.string().max(MAX_QUESTION), answers: z.record(z.string(), z.string()) }))
    .default([]),
});

export function parseAskBody(body: unknown): AskInput | null {
  const parsed = BodySchema.safeParse(body);
  if (!parsed.success) return null;
  return { question: parsed.data.question, history: parsed.data.history.slice(-MAX_TURNS) };
}

export function buildSystemPrompt(): string {
  const profiles = GROUP_COMPANIES.map(
    (c) =>
      `<company id="${c.id}">
Name: ${c.name}
Role in the group: ${c.role}
Tagline: ${c.tagline}
About: ${c.intro}
Strengths:
${c.talents.map((t) => `- ${t.title}: ${t.text}`).join("\n")}
Website: ${c.url}
Voice: ${c.voice}
</company>`,
  ).join("\n\n");

  return `You speak for the three companies in SeventyOne Group, a Stockholm collective. A visitor asks a question and every company answers it in its own voice, as "we".

${profiles}

How to answer:
- Write one answer per company, each 30 to 90 words, in the visitor's language (Swedish question, Swedish answers). Write it the way a native speaker would; never translate the English taglines word for word.
- Each answer must sound unmistakably like that company's voice. Readers should be able to tell them apart without the names.
- Stick to the facts above. Don't invent prices, client names, numbers or people. If you don't know, say so in the company's voice and point to its website.
- Where it fits, a company may point to a sister company for something it doesn't do itself.
- If the question has nothing to do with the companies, answer briefly and kindly in each voice and steer back to what you can help with.
- Plain text: no headings, no lists, no other markdown. The one exception: in each answer, wrap the 1–3 words or short phrases that matter most in **double asterisks** so the page can highlight them. Never more than three, never a whole sentence.`;
}

const outputSchema = {
  type: "object",
  properties: Object.fromEntries(ids.map((id) => [id, { type: "string" }])),
  required: ids,
  additionalProperties: false,
};

export async function askGroup(client: Anthropic, { question, history }: AskInput): Promise<Answers> {
  const messages: Anthropic.Beta.BetaMessageParam[] = history.flatMap((t) => [
    { role: "user" as const, content: t.question },
    { role: "assistant" as const, content: JSON.stringify(t.answers) },
  ]);
  messages.push({ role: "user", content: question });

  const response = await client.beta.messages.create({
    model: "claude-opus-5-5",
    max_tokens: 8000,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    system: [{ type: "text", text: buildSystemPrompt(), cache_control: { type: "ephemeral" } }],
    output_config: { effort: "low", format: { type: "json_schema", schema: outputSchema } },
    messages,
  });

  if (response.stop_reason === "refusal") throw new Error("The model declined to answer");
  const text = response.content.find((b) => b.type === "text");
  if (!text || text.type !== "text") throw new Error("No text in the model reply");
  return AnswersSchema.parse(JSON.parse(text.text)) as Answers;
}

export interface EmphasisPart {
  text: string;
  em: boolean;
}

/** Splits an answer on **double-asterisk** pairs; anything unmatched stays plain. */
export function emphasisParts(text: string): EmphasisPart[] {
  const parts: EmphasisPart[] = [];
  let last = 0;
  for (const m of text.matchAll(/\*\*([^*]+?)\*\*/g)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), em: false });
    parts.push({ text: m[1], em: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), em: false });
  return parts;
}
