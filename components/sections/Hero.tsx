import { Button, Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function Hero() {
  return (
    <section className="bg-[var(--color-business-blue)] min-h-[85vh] flex items-center px-6 md:px-12 py-24">
      <div className="mx-auto w-full text-center" style={{ maxWidth: "var(--size-container-xl)" }}>
        <FadeIn>
          <h1
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white mb-8"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7rem)" }}
          >
            Building Better<br />Product Companies
          </h1>
        </FadeIn>
        <FadeIn delay={1}>
          <div className="mb-12 mx-auto max-w-[44ch]">
            <Typography variant="large" color="inverse" as="p" className="opacity-80">
              Manfred creates impact through leadership, customer research and
              product design.
            </Typography>
          </div>
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
