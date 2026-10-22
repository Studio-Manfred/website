import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { TripleDiamondRoles } from "@/components/TripleDiamondRoles";
import { getCase } from "@/lib/cases";
import { TD_CASE_DEFAULTS, TD_CASE_SLUG } from "@/lib/triple-diamond";

// The Triple Diamond page as a case (STU-1179). This static route wins over
// /cases/[slug]: the case row (published from Moa's account in the intranet)
// lists it under Cases and gives the title, intro and consultant; the page
// itself is the interactive guide, not the case template.
export const dynamic = "force-dynamic";

async function load() {
  const c = await getCase(TD_CASE_SLUG);
  return {
    title: c?.title || TD_CASE_DEFAULTS.title,
    intro: c?.intro || TD_CASE_DEFAULTS.intro,
    categoryLine: c?.categoryLine || TD_CASE_DEFAULTS.categoryLine,
    consultants: c?.sidebar.consultants ?? [],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { title, intro } = await load();
  return { title: `${title} — Studio Manfred`, description: intro };
}

export default async function TripleDiamondCasePage() {
  const content = await load();
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <TripleDiamondRoles {...content} />
      </main>
      <Footer />
    </>
  );
}
