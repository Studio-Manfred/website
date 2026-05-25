import type { Article } from "@/lib/articles";

interface ArticleMetaProps {
  article: Pick<Article, "published_at" | "author">;
}

export function ArticleMeta({ article }: ArticleMetaProps) {
  return (
    <p
      style={{
        fontSize: "14px",
        color: "var(--color-text-on-brand-muted)",
        fontWeight: 300,
        marginBottom: "24px",
      }}
    >
      {new Date(article.published_at).toLocaleDateString("en-GB")}
      {" · "}
      {article.author}
    </p>
  );
}
