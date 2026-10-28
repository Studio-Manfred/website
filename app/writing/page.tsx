import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { FadeIn } from "@/components/FadeIn";
import { WritingHeader } from "@/components/sections/WritingHeader";
import { WritingListItem } from "@/components/sections/WritingListItem";
import { getArticles } from "@/lib/articles";

export const dynamic = "force-dynamic";

export default async function WritingPage() {
  const articles = await getArticles();
  return (
    <>
      <PageNav variant="blue" />
      <main id="main" tabIndex={-1} className="cursor-white bg-[var(--color-business-blue)] min-h-screen">
        <Section width="narrow" padding="first">
          <FadeIn><WritingHeader title="Writing" /></FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
            {articles.map((article, i) => (
              <FadeIn key={article.id} delay={(i % 4) as 0 | 1 | 2 | 3}><WritingListItem article={article} /></FadeIn>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
