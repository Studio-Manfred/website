import { notFound, redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";

function escapeLikePattern(s: string): string {
  return s.replace(/[\\%_]/g, "\\$&");
}

export default async function NewsSlugRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("slug")
    .ilike("slug", `${escapeLikePattern(slug)}-%`)
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data?.slug) notFound();
  redirect(`/writing/${data.slug}`);
}
