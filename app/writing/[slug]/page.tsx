import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { getArticle } from "@/lib/articles";
import { fontSize } from "@/lib/typography";

export const dynamic = "force-dynamic";

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
      <main id="main" tabIndex={-1} className="cursor-white bg-[var(--color-business-blue)] min-h-screen">
        {/* Hero */}
        <Section padding="first">
          <p
            style={{
              fontSize: "14px",
              color: "var(--color-text-on-brand-muted)",
              fontWeight: 300,
              marginBottom: "24px",
            }}
          >
            {new Date(article.published_at).toLocaleDateString("en-GB")}{" "}
            {" · "} {article.author}
          </p>
          <h1
            className="font-extrabold text-white tracking-[var(--letter-spacing-tight)]"
            style={{
              fontSize: fontSize.pageHero,
              lineHeight: 1.05,
              marginBottom: "16px",
            }}
          >
            {article.title}
          </h1>
          {article.image && (
            <div style={{ position: "relative", width: "100%", height: "480px" }}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(max-width: 1000px) 100vw, 1000px"
                style={{ objectFit: "cover", display: "block" }}
              />
            </div>
          )}
        </Section>

        {/* Body */}
        <Section
          width="narrow"
          padding="none"
          className="pb-24 md:pb-40"
          style={{ color: "white", fontWeight: 300 }}
        >
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

          <div
            style={{
              marginTop: "80px",
              borderTop: "1px solid rgba(255,255,255,0.2)",
              paddingTop: "40px",
            }}
          >
            <Link
              href="/writing"
              className="font-light"
              style={{
                fontSize: "24px",
                color: "#efd6d3",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              ← All writing
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
