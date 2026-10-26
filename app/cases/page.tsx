import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { CaseList } from "@/components/CaseList";
import { listCases } from "@/lib/cases";

// Every published case from the intranet's Case CMS (STU-1148), read on each
// request like the case pages themselves.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Cases — Studio Manfred",
  description: "Selected work by Studio Manfred.",
};

export default async function CasesPage() {
  const cases = await listCases();
  return (
    <>
      <PageNav variant="white" width="wide" />
      <main id="main" tabIndex={-1}>
        <CaseList cases={cases} />
      </main>
      <Footer />
    </>
  );
}
