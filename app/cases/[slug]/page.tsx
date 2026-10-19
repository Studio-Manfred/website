import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { CaseStudy } from "@/components/CaseStudy";
import { getCase } from "@/lib/cases";

// Case pages from the intranet's Case CMS (STU-1146). Read on every request,
// like /writing, so publishing in the intranet shows up here straight away.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const study = await getCase((await params).slug);
  if (!study) return {};
  return { title: `${study.title} — Studio Manfred`, description: study.intro || undefined };
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const study = await getCase((await params).slug);
  if (!study) notFound();
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <CaseStudy study={study} />
      </main>
      <Footer />
    </>
  );
}
