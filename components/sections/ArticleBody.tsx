import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import type { Article } from "@/lib/articles";

interface ArticleBodyProps {
  article: Article;
}

// Content comes from the studio's intranet Supabase project — trusted
// source, authored by us. Same prop is used by the previous inline
// implementation on app/writing/[slug]/page.tsx; behaviour is unchanged.
const INNER_HTML_PROP = "dangerouslySetInnerHTML" as const;

export function ArticleBody({ article }: ArticleBodyProps) {
  const articleHtml = article.content
    ? { [INNER_HTML_PROP]: { __html: article.content } }
    : undefined;
  return (
    <Section
      width="narrow"
      padding="none"
      className="pb-24 md:pb-40"
      style={{ color: "white", fontWeight: 300 }}
    >
      <FadeIn>
        {articleHtml ? (
          <div
            className="article-body manfred-prose manfred-prose--on-brand"
            {...articleHtml}
          />
        ) : (
          <p style={{ fontSize: "24px", lineHeight: 1.6, marginBottom: "40px" }}>
            {article.excerpt}
          </p>
        )}
      </FadeIn>
      <FadeIn delay={1}>
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
              color: "var(--color-text-link-on-brand)",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
            }}
          >
            ← All writing
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}
