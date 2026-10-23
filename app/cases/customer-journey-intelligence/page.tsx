import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { CustomerJourney } from "@/components/customer-journey/CustomerJourney";
import { getCase } from "@/lib/cases";
import { CJ_CASE_DEFAULTS, CJ_CASE_SLUG } from "@/lib/customer-journey/case";

// The Customer Journey Intelligence tool as a case, on the same pattern as the
// Triple Diamond page: this static route wins over /cases/[slug]; a case row in
// the intranet lists it under Cases and gives the title, intro and consultant.
export const dynamic = "force-dynamic";

async function load() {
  const c = await getCase(CJ_CASE_SLUG);
  return {
    title: c?.title || CJ_CASE_DEFAULTS.title,
    intro: c?.intro || CJ_CASE_DEFAULTS.intro,
    categoryLine: c?.categoryLine || CJ_CASE_DEFAULTS.categoryLine,
    consultants: c?.sidebar.consultants ?? [],
  };
}

export async function generateMetadata(): Promise<Metadata> {
  const { title, intro } = await load();
  return { title: `${title} — Studio Manfred`, description: intro };
}

export default async function CustomerJourneyCasePage() {
  const content = await load();
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <CustomerJourney {...content} />
      </main>
      <Footer />
    </>
  );
}
