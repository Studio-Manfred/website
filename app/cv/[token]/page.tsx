import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { SharedCv } from "@/components/SharedCv";
import { getSharedCv } from "@/lib/cv";

// A CV shared from the intranet (STU-1155). Private by default: only reachable
// with the unguessable token in the link, never indexed, and gone (404) as
// soon as the owner stops sharing. Read on every request.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const cv = await getSharedCv((await params).token);
  return {
    title: cv ? `${cv.name} — CV — Studio Manfred` : "CV — Studio Manfred",
    robots: { index: false, follow: false },
  };
}

export default async function SharedCvPage({ params }: { params: Promise<{ token: string }> }) {
  const cv = await getSharedCv((await params).token);
  if (!cv) notFound();
  return (
    <>
      <div className="print-hidden">
        <PageNav variant="white" width="wide" menu={false} />
      </div>
      <main id="main" tabIndex={-1}>
        <SharedCv cv={cv} />
      </main>
      <div className="print-hidden">
        <Footer />
      </div>
    </>
  );
}
