import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { TripleDiamondRoles } from "@/components/TripleDiamondRoles";
import { getCase } from "@/lib/cases";
import { TD_CASE_SLUG } from "@/lib/triple-diamond";
import { TD_DR_GUIDE, TD_DR_META } from "@/lib/triple-diamond-design-research";

// Unlisted copy of the Triple Diamond guide: Researcher and Designer only, in
// Swedish, for one client team. No case row of its own, so it is not listed
// under Cases; the long slug and noindex keep it out of search. The
// consultant is borrowed from the original guide's case row.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: `${TD_DR_META.title} — Studio Manfred`,
  description: TD_DR_META.intro,
  robots: { index: false, follow: false },
};

export default async function TripleDiamondDesignResearchPage() {
  const c = await getCase(TD_CASE_SLUG);
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <TripleDiamondRoles {...TD_DR_META} consultants={c?.sidebar.consultants ?? []} guide={TD_DR_GUIDE} />
      </main>
      <Footer />
    </>
  );
}
