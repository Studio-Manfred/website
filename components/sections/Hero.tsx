import { Button, Logo } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";
import { GetInTouchLink } from "@/components/GetInTouchLink";
import { Section } from "@/components/Section";
import { fontSize } from "@/lib/typography";

export function Hero() {
  return (
    <Section
      background="blue"
      width="wide"
      padding="none"
      align="center"
      className="min-h-screen flex items-center py-24"
    >
      <div className="w-full">
        <FadeIn>
          <div className="flex justify-center mb-24 md:mb-32">
            <Logo variant="wordmark" color="white" height={100} />
          </div>
        </FadeIn>
        <FadeIn delay={1}>
          <h1
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white text-center mb-20"
            style={{ fontSize: fontSize.heroDisplay }}
          >
            Building Better Product Companies
          </h1>
        </FadeIn>
        <FadeIn delay={2}>
          <Button variant="inverse" size="lg" asChild>
            <GetInTouchLink location="hero" />
          </Button>
        </FadeIn>
      </div>
    </Section>
  );
}
