import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { TripleDiamondRoles } from "@/components/TripleDiamondRoles";

// Unlisted share page (STU-1167): the random suffix keeps it unguessable; not
// in the nav, noindex. Temporary until it gets a real home on the site.
export const metadata: Metadata = {
  title: "Triple Diamond Roles — Studio Manfred",
  description: "Where each role can use AI in the triple diamond.",
  robots: { index: false, follow: false },
};

export default function TripleDiamondRolesPage() {
  return (
    <>
      <PageNav variant="white" />
      <main id="main" tabIndex={-1}>
        <TripleDiamondRoles />
      </main>
      <Footer />
    </>
  );
}
