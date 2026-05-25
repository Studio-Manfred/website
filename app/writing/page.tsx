import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { getArticles } from "@/lib/articles";
import { fontSize } from "@/lib/typography";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const articles = await getArticles();

  return (
    <>
      <PageNav variant="blue" />
      <main id="main" tabIndex={-1} className="cursor-white bg-[var(--color-business-blue)] min-h-screen">
        <Section width="narrow" padding="first">
          <h1
            className="font-extrabold text-white tracking-[var(--letter-spacing-tight)]"
            style={{
              fontSize: fontSize.pageHero,
              lineHeight: 1.0,
              marginBottom: "80px",
            }}
          >
            Writing
          </h1>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "60px" }}
          >
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/writing/${article.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "var(--color-text-on-brand-muted)",
                      fontWeight: 300,
                      marginBottom: "12px",
                    }}
                  >
                    {new Date(article.published_at).toLocaleDateString("en-GB")}{" "}
                    {" · "} {article.author}
                  </p>
                  <h2
                    className="font-extrabold text-white"
                    style={{
                      fontSize: fontSize.articleCardTitle,
                      lineHeight: 1.05,
                      marginBottom: "16px",
                    }}
                  >
                    {article.title}
                  </h2>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "var(--color-text-on-brand-muted)",
                      fontWeight: 300,
                    }}
                  >
                    {article.excerpt}
                  </p>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#efd6d3",
                      marginTop: "12px",
                      fontWeight: 300,
                      textDecoration: "underline",
                      textUnderlineOffset: "4px",
                    }}
                  >
                    Read more →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
