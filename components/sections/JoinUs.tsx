import { Button, Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function JoinUs() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "var(--size-container-lg)" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)] mb-6"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Want to join us?
          </h2>
        </FadeIn>
        <FadeIn delay={1}>
          <Typography variant="large" color="muted" as="p" className="mx-auto font-light mb-12 max-w-[48ch]">
            We&apos;re always looking for talented product and design
            professionals who want to do consulting work with mission-driven
            teams. If that sounds like you, let&apos;s talk.
          </Typography>
        </FadeIn>
        <FadeIn delay={2}>
          <Button variant="brand" size="lg" asChild>
            <a href="mailto:hello@studiomanfred.com">Get in touch</a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
