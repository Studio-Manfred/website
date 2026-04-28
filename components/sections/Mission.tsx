import { Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function Mission() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "var(--size-container-lg)" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)] mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            Our mission is to make the product world more customer driven
          </h2>
        </FadeIn>
        <FadeIn delay={1}>
          <h2
            className="font-extrabold leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)] mb-12"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            ...with some Manfred Magic!
          </h2>
        </FadeIn>
        <FadeIn delay={2}>
          <Typography variant="large" color="muted" as="p" className="mx-auto font-light max-w-[52ch]">
            We bring smart work, sharp thinking, and a bit of fun. We&apos;ve
            worked in product teams, messy scale-ups, suit-heavy orgs, and
            everything in between. We&apos;ve delivered impact and long
            relationships with our customers.
          </Typography>
        </FadeIn>
      </div>
    </section>
  );
}
