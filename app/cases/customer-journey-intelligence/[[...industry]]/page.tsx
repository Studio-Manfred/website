import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { CustomerJourney } from "@/components/customer-journey/CustomerJourney";
import { getCase } from "@/lib/cases";
import { CJ_CASE_DEFAULTS, CJ_CASE_SLUG } from "@/lib/customer-journey/case";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import { industryFromSegments, industryPath } from "@/lib/customer-journey/slugs";

// The Customer Journey Intelligence tool as a case, on the same pattern as the
// Triple Diamond page: this static route wins over /cases/[slug]; a case row in
// the intranet lists it under Cases and gives the title, intro and consultant.
// An optional last segment opens an industry: /cases/<slug>/hotel.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ industry?: string[] }> };

async function load() {
  const c = await getCase(CJ_CASE_SLUG);
  return {
    title: c?.title || CJ_CASE_DEFAULTS.title,
    intro: c?.intro || CJ_CASE_DEFAULTS.intro,
    categoryLine: c?.categoryLine || CJ_CASE_DEFAULTS.categoryLine,
    consultants: c?.sidebar.consultants ?? [],
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { industry } = await params;
  const id = industryFromSegments(industry);
  if (!id) return {};
  const { title, intro } = await load();
  // The case address alone keeps its plain title; an industry link names it.
  const named = industry?.length ? `${title} · ${INDUSTRIES[id].name}` : title;
  return {
    title: `${named} — Studio Manfred`,
    description: intro,
    alternates: { canonical: industry?.length ? industryPath(id) : `/cases/${CJ_CASE_SLUG}` },
  };
}

export default async function CustomerJourneyCasePage({ params }: Props) {
  const { industry } = await params;
  const id = industryFromSegments(industry);
  if (!id) notFound();
  const content = await load();
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <CustomerJourney {...content} initialIndustry={id} />
      </main>
      <Footer />
    </>
  );
}
