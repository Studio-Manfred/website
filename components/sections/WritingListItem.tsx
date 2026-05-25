import Link from "next/link";
import type { Article } from "@/lib/articles";
import { fontSize } from "@/lib/typography";

interface WritingListItemProps {
  article: Article;
}

export function WritingListItem({ article }: WritingListItemProps) {
  return (
    <Link
      href={`/writing/${article.slug}`}
      style={{ textDecoration: "none" }}
    >
      <article>
        <p
          style={{
            fontSize: "14px",
            color: "var(--color-text-on-brand-muted)",
            fontWeight: 300,
            marginBottom: "12px",
          }}
        >
          {new Date(article.published_at).toLocaleDateString("en-GB")}
          {" · "}
          {article.author}
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
            color: "var(--color-text-link-on-brand)",
            marginTop: "12px",
            fontWeight: 300,
            textDecoration: "underline",
            textUnderlineOffset: "4px",
          }}
        >
          Read more →
        </p>
      </article>
    </Link>
  );
}
