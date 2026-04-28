import { Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function Services() {
  return (
    <section className="bg-[var(--color-business-blue)] py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "var(--size-container-lg)" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white mb-16 md:mb-20"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What we do?
          </h2>
        </FadeIn>
        <FadeIn delay={1}>
          <p
            className="text-white leading-[var(--line-height-relaxed)]"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          >
            <strong className="font-bold">Product, UX and Service Design?</strong> Yep.
            <br /><br />
            <strong className="font-bold">Customer Research?</strong> Of course.
            <br /><br />
            <strong className="font-bold">Design &amp; Product Leadership?</strong> Just when you need it.
            <br /><br />
            <Typography variant="body" color="inverse" as="span" className="opacity-70 font-light">
              We bring some of that Manfred Magic of smart work, sharp thinking,
              and a bit of fun. We&apos;ve worked in product teams, messy scale-ups,
              suit-heavy orgs, and everything in between. We&apos;ve delivered impact
              and long relationships with our customers.
            </Typography>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
