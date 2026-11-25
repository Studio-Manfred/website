import type { Metadata } from "next";
import { GroupLanding } from "@/components/GroupLanding";
import { GROUP_PEOPLE } from "@/lib/group";
import { fetchGroupStatuses } from "@/lib/group-status";
import { groupFontVars } from "./fonts";

// Unlisted on purpose: no case row, so /cases doesn't show it, and noindex
// keeps it out of search. Share the URL directly. No nav or footer: a clean
// landing page for the three companies together, not a Studio Manfred page.
export const metadata: Metadata = {
  title: "SeventyOne Group",
  description: "SeventyOne Consulting, Studio Manfred and Mather Studio: we grow through differences.",
  robots: { index: false, follow: false },
};

// Assignment status from the group sheet: the page is rebuilt at most every
// five minutes. Without PUBLIC_STATUS_KEY, or if the intranet can't answer,
// the page shows no status.
export const revalidate = 300;

export default async function SeventyOneGroupPage() {
  const statuses = await fetchGroupStatuses(GROUP_PEOPLE, {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    statusKey: process.env.PUBLIC_STATUS_KEY,
  });
  return (
    <div data-plain-cursor className={`min-h-svh bg-white ${groupFontVars}`}>
      <GroupLanding statuses={statuses} />
    </div>
  );
}
