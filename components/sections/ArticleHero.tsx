import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";
import { ArticleMeta } from "@/components/sections/ArticleMeta";
import type { Article } from "@/lib/articles";
import { fontSize } from "@/lib/typography";

interface ArticleHeroProps {
  article: Article;
}

export function ArticleHero({ article }: ArticleHeroProps) {
  return (
    <Section padding="first">
      <FadeIn>
        <ArticleMeta article={article} />
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
      </FadeIn>
      {article.image && (
        <FadeIn delay={1}>
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
        </FadeIn>
      )}
    </Section>
  );
}
