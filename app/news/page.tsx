import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "News — Studio Manfred",
  description: "Thoughts, articles, and insights from the Studio Manfred team.",
};

const articles = [
  {
    title: "Road to Average part 4 — did she make it?",
    author: "Moa Bogren",
    date: "December 20, 2024",
    excerpt:
      "This is the fourth and probably last part in this series, at least for a while.",
  },
  {
    title: "Critical Design — from theory to practice",
    author: "Moa Bogren",
    date: "December 6, 2024",
    excerpt:
      "A workshop facilitated during the Stockholm Xperience conference, exploring how critical design thinking translates into real-world practice.",
  },
  {
    title: "Critical and Ethical Design From Theory to Practice",
    author: "Moa Bogren",
    date: "November 11, 2024",
    excerpt:
      "On technology dependence, responsibility, and what it means to design with ethics at the center.",
  },
  {
    title: "To be a qualitative researcher, or just to be a researcher?",
    author: "Moa Bogren",
    date: "September 9, 2024",
    excerpt:
      "Exploring fixed vs. growth mindset theory and what it means for innovation and research practice.",
  },
  {
    title: "Road to Average part 3 — practice and updates",
    author: "Moa Bogren",
    date: "June 20, 2024",
    excerpt:
      "The ongoing experiment: documenting a skill-building journey through Counter Strike 2.",
  },
];

export default function NewsPage() {
  return (
    <>
      <PageNav />
      <main>
        {/* Hero */}
        <section className="bg-[var(--color-business-blue)] px-6 md:px-12 py-24 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <FadeIn>
              <h1
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                News
              </h1>
            </FadeIn>
            <FadeIn delay={1}>
              <p
                className="font-light text-white/80 mt-6"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)" }}
              >
                Thoughts, articles, and insights from the Manfred team.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Articles */}
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <div className="flex flex-col divide-y divide-[var(--color-border-default)]">
              {articles.map((article, i) => (
                <FadeIn key={article.title} delay={(i % 3) as 0 | 1 | 2}>
                  <article className="py-10 md:py-14">
                    <p className="text-xs font-light text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">
                      {article.author} &nbsp;·&nbsp; {article.date}
                    </p>
                    <h2
                      className="font-extrabold text-[var(--color-text-primary)] leading-[var(--line-height-tight)] mb-4"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                    >
                      {article.title}
                    </h2>
                    <p
                      className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                      style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                    >
                      {article.excerpt}
                    </p>
                  </article>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
