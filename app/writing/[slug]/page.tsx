import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { getArticle, getArticles } from "@/lib/articles";

export async function generateStaticParams() {
  const articles = await getArticles()
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Studio Manfred`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageNav variant="blue" />
      <main className="bg-[var(--color-business-blue)] min-h-screen">

        {/* Hero */}
        <section style={{ padding: "160px 60px 80px" }}>
          <div style={{ maxWidth: "812px", margin: "0 auto" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: "24px" }}>
              {new Date(article.published_at).toLocaleDateString("en-GB")} {" · "} {article.author}
            </p>
            <h1
              className="font-light text-white tracking-[var(--letter-spacing-tight)]"
              style={{ fontSize: "86px", lineHeight: 1.0, marginBottom: "48px" }}
            >
              {article.title}
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.image}
              alt={article.title}
              style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }}
            />
          </div>
        </section>

        {/* Body */}
        <section style={{ padding: "0 60px 120px" }}>
          <div style={{ maxWidth: "812px", margin: "0 auto", color: "white", fontWeight: 300 }}>
            {article.content ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
                {article.excerpt}
              </p>
            )}

            <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "40px" }}>
              
                <a href="/writing"
                className="font-light"
                style={{ fontSize: "24px", color: "#efd6d3", textDecoration: "underline", textUnderlineOffset: "4px" }}
              >
                ← All writing
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}