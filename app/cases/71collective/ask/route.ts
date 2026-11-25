import Anthropic from "@anthropic-ai/sdk";
import { askGroup, parseAskBody } from "@/lib/group-ask";

export async function POST(request: Request) {
  const input = parseAskBody(await request.json().catch(() => null));
  if (!input) return Response.json({ error: "Invalid question" }, { status: 400 });

  try {
    const answers = await askGroup(new Anthropic(), input);
    return Response.json({ answers });
  } catch (error) {
    console.error("[group-ask]", error);
    return Response.json({ error: "Could not answer right now" }, { status: 502 });
  }
}
