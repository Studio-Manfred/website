import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

export function Tagline() {
  return (
    <Section
      background="white"
      align="center"
      padding="none"
      className="min-h-screen flex items-center py-24"
    >
      <FadeIn>
        <p
          className="font-light leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
        >
          Manfred creates impact through{" "}
          <span className="text-[var(--color-business-blue)] font-extrabold">leadership</span>,{" "}
          <span className="text-[var(--color-business-blue)] font-extrabold">customer research</span>{" "}
          and{" "}
          <span className="text-[var(--color-business-blue)] font-extrabold">product design</span>.
        </p>
      </FadeIn>
    </Section>
  );
}
