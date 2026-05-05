import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Writing — Studio Manfred",
  description: "Thoughts, articles, and insights from the Studio Manfred team.",
};

export default function WritingPage() {
  return (
    <>
      <PageNav variant="blue" />
      <main className="bg-[var(--color-business-blue)] min-h-screen">
        <section style={{ padding: "0 60px" }} className="pt-32 md:pt-44 pb-24 md:pb-40">
          <div>
            {articles.map((article, i) => (
              <FadeIn key={article.title} delay={(i % 3) as 0 | 1 | 2}>
                <div style={{ paddingTop: "28px", paddingBottom: "40px" }}>
                  {/* Row */}
                  <a
                    href={`/writing/${article.slug}`}
                    className="group"
                    style={{ display: "flex", gap: "32px", alignItems: "flex-start", textDecoration: "none" }}
                  >
                    {/* Thumbnail */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.image}
                      alt={article.title}
                      style={{
                        flexShrink: 0,
                        width: "325px",
                        height: "325px",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Text */}
                    <div style={{ flex: 1 }}>
                      <p
                        style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginBottom: "14px", fontWeight: 300 }}
                      >
                        {article.date}
                      </p>
                      <h2
                        className="font-light text-white tracking-[var(--letter-spacing-tight)]"
                        style={{ fontSize: "62px", lineHeight: 1.05, marginBottom: "16px" }}
                      >
                        {article.title}
                      </h2>
                      <p
                        className="font-light text-white/75"
                        style={{ fontSize: "24px", lineHeight: 1.4, marginBottom: "20px" }}
                      >
                        {article.excerpt}
                      </p>
                      <span
                        style={{ fontSize: "24px", color: "#efd6d3", textDecoration: "underline", textUnderlineOffset: "3px", fontWeight: 300 }}
                      >
                        Read more
                      </span>
                    </div>
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
