import { fontSize } from "@/lib/typography";

interface WritingHeaderProps {
  title: string;
  subtitle?: string;
}

export function WritingHeader({ title, subtitle }: WritingHeaderProps) {
  return (
    <header style={{ marginBottom: "80px" }}>
      <h1
        className="font-extrabold text-white tracking-[var(--letter-spacing-tight)]"
        style={{
          fontSize: fontSize.pageHero,
          lineHeight: 1.0,
          marginBottom: subtitle ? "16px" : 0,
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          className="font-light"
          style={{
            color: "var(--color-text-on-brand-muted)",
            fontSize: fontSize.lead,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
