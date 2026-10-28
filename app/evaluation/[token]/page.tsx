import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { EvaluationService } from "@/components/evaluation/EvaluationService";
import { isEvalToken } from "@/lib/evaluation/access";

// The evaluation service prototype, at an unlisted address. Not linked from
// anywhere, not indexed, and a 404 for any token but the one in
// EVAL_LINK_TOKEN. No referrer, so the address doesn't leak to sites it links to.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Evaluation service — Studio Manfred",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default async function EvaluationPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isEvalToken(token)) notFound();
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <EvaluationService token={token} live={Boolean(process.env.ANTHROPIC_API_KEY)} />
      </main>
      <Footer />
    </>
  );
}
