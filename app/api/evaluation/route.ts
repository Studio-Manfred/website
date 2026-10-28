import { NextResponse } from "next/server";
import { z } from "zod";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import type { IndustryId } from "@/lib/customer-journey/types";
import { isEvalToken } from "@/lib/evaluation/access";
import { EvaluationInputError, runEvaluation } from "@/lib/evaluation/evaluate";

// Runs one evaluation for the unlisted evaluation page. The page sends its
// token in a header; without the right one this route doesn't exist.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 300;

const industryIds = Object.keys(INDUSTRIES) as [IndustryId, ...IndustryId[]];

// Screenshots are downscaled in the browser; 3 × 1.4 MB of base64 stays
// under the platform's request size limit.
const Body = z.object({
  industry: z.enum(industryIds),
  archetypes: z.array(z.string().max(64)).min(1).max(6),
  phase: z.number().int().min(0).max(5),
  task: z.string().trim().min(3).max(600),
  url: z.string().trim().max(2000).optional().transform((u) => u || undefined),
  screenshots: z
    .array(
      z.object({
        mediaType: z.enum(["image/png", "image/jpeg", "image/webp"]),
        data: z.string().max(1_400_000).regex(/^[A-Za-z0-9+/]+=*$/),
      }),
    )
    .max(3)
    .default([]),
});

export async function POST(req: Request) {
  if (!isEvalToken(req.headers.get("x-eval-token"))) return new NextResponse(null, { status: 404 });

  const parsed = Body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Some of the input is missing or too large." }, { status: 400 });

  try {
    return NextResponse.json(await runEvaluation(parsed.data));
  } catch (e) {
    if (e instanceof EvaluationInputError) return NextResponse.json({ error: e.message }, { status: 400 });
    console.error("evaluation:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "The evaluation failed. Try again." }, { status: 500 });
  }
}
