import { Button, Logo, Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function Hero() {
  return (
    <section className="cursor-white bg-[var(--color-business-blue)] min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="mx-auto w-full text-center" style={{ maxWidth: "960px" }}>
        <FadeIn>
          <div className="flex justify-center mb-16">
            <Logo variant="wordmark" color="white" height={100} />
          </div>
        </FadeIn>
        <FadeIn delay={1}>
          <h1
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white mb-16"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", whiteSpace: "nowrap" }}
          >
            Building Better Product Companies
          </h1>
        </FadeIn>
        <FadeIn delay={2}>
          <Button variant="inverse" size="lg" asChild>
            <a href="mailto:hello@studiomanfred.com">Get in touch</a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
