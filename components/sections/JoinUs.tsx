import { Button } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { Section } from "@/components/Section";
import { fontSize } from "@/lib/typography";

export function JoinUs() {
  return (
    <Section background="white" align="center">
      <FadeIn>
        <h2
          className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)] mb-6"
          style={{ fontSize: fontSize.sectionTitle }}
        >
          Want to join us?
        </h2>
      </FadeIn>
      <FadeIn delay={1}>
        <p
          className="font-light text-[var(--color-text-primary)] mx-auto mb-12"
          style={{ fontSize: fontSize.lead, maxWidth: "52ch", lineHeight: 1.6 }}
        >
          We&apos;re on the lookout for product &amp; design peeps with great
          skills and big hearts. You like consulting? Cool. Been at a few
          product companies? You want to work with teams that care about what
          they ship? Even better. You don&apos;t take yourself too seriously,
          but you take the craft seriously.
        </p>
      </FadeIn>
      <FadeIn delay={2}>
        <Button variant="brand" size="lg" asChild>
          <GetInTouchLink location="home-join-us" />
        </Button>
      </FadeIn>
    </Section>
  );
}
