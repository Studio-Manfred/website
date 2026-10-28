import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { EvaluationService } from "@/components/evaluation/EvaluationService";

// The evaluation service prototype. Open to anyone with the address, but not
// linked from the site and not indexed.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Evaluation service — Studio Manfred",
  robots: { index: false, follow: false },
};

export default function EvaluationPage() {
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <EvaluationService live={Boolean(process.env.ANTHROPIC_API_KEY)} />
      </main>
      <Footer />
    </>
  );
}
