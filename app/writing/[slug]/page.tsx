import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { ArticleHero } from "@/components/sections/ArticleHero";
import { ArticleBody } from "@/components/sections/ArticleBody";
import { getArticle } from "@/lib/articles";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  if (!article) return {};
  return { title: `${article.title} — Studio Manfred`, description: article.excerpt };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  return (
    <>
      <PageNav variant="blue" />
      <main id="main" tabIndex={-1} className="cursor-white bg-[var(--color-business-blue)] min-h-screen">
        <ArticleHero article={article} />
        <ArticleBody article={article} />
      </main>
      <Footer />
    </>
  );
}
