import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { CaseStudy } from "@/components/CaseStudy";
import { CasePasswordGate } from "@/components/CasePasswordGate";
import { getCase, isCaseLocked } from "@/lib/cases";
import { unlockCase } from "./actions";
import { caseFromUnlockCookie } from "./unlock";

// Case pages from the intranet's Case CMS (STU-1146). Read on every request,
// like /writing, so publishing in the intranet shows up here straight away.
// A password-protected case (STU-1156) shows a password form until this
// browser has unlocked it.
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ wrong?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const open = await getCase(slug);
  if (open) return { title: `${open.title} — Studio Manfred`, description: open.intro || undefined };
  const unlocked = await caseFromUnlockCookie(slug);
  if (unlocked) return { title: `${unlocked.title} — Studio Manfred`, robots: { index: false, follow: false } };
  if (await isCaseLocked(slug)) return { title: "Password protected case — Studio Manfred", robots: { index: false, follow: false } };
  return {};
}

export default async function CasePage({ params, searchParams }: Props) {
  const { slug } = await params;
  const study = (await getCase(slug)) ?? (await caseFromUnlockCookie(slug));

  if (!study && !(await isCaseLocked(slug))) notFound();

  return (
    <>
      <PageNav variant="white" width={study ? "wide" : "default"} />
      <main id="main" tabIndex={-1}>
        {study ? (
          <CaseStudy study={study} />
        ) : (
          <CasePasswordGate action={unlockCase.bind(null, slug)} wrong={(await searchParams).wrong === "1"} />
        )}
      </main>
      <Footer />
    </>
  );
}
