import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { getArticle, articles } from "@/lib/articles";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
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
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <>
      <PageNav variant="blue" />
      <main className="bg-[var(--color-business-blue)] min-h-screen">

        {/* Hero */}
        <section style={{ padding: "160px 60px 80px" }}>
          <div style={{ maxWidth: "812px", margin: "0 auto" }}>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", fontWeight: 300, marginBottom: "24px" }}>
              {article.date} &nbsp;·&nbsp; {article.author}
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
          <div
            style={{ maxWidth: "812px", margin: "0 auto", color: "white", fontWeight: 300 }}
          >
            {article.content ? (
              <div
                className="article-body"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            ) : (
              /* Placeholder typography demo until real content is added */
              <>
                <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
                  {article.excerpt}
                </p>
                <h2 className="font-light text-white" style={{ fontSize: "62px", lineHeight: 1.05, marginBottom: "32px", marginTop: "64px" }}>
                  Section heading
                </h2>
                <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
                  Add your article content here. This paragraph style is 24px with a line height of 1.6 — comfortable for long-form reading.
                </p>
                <h3 className="font-light text-white" style={{ fontSize: "48px", lineHeight: 1.1, marginBottom: "24px", marginTop: "56px" }}>
                  Sub-section heading
                </h3>
                <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
                  Continue with body copy here. Each paragraph uses the same 24px size throughout the article.
                </p>
                <h4 className="font-light text-white" style={{ fontSize: "36px", lineHeight: 1.15, marginBottom: "20px", marginTop: "48px" }}>
                  Smaller heading
                </h4>
                <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
                  Body text continues at 24px. You can use h4 to introduce shorter subsections or callouts within the article.
                </p>
              </>
            )}

            {/* Back link */}
            <div style={{ marginTop: "80px", borderTop: "1px solid rgba(255,255,255,0.2)", paddingTop: "40px" }}>
              <a
                href="/writing"
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
