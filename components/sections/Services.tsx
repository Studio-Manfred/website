import { FadeIn } from "@/components/FadeIn";

export function Services() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "960px" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)] mb-12 md:mb-16"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What we do?
          </h2>
        </FadeIn>
        <FadeIn delay={1}>
          <p
            className="font-light leading-relaxed text-[var(--color-text-primary)] text-center mx-auto"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", maxWidth: "70ch" }}
          >
            <strong className="font-extrabold">Product, UX and Service Design?</strong> Yep.
            <br /><br />
            <strong className="font-extrabold">Customer Research?</strong> Of course.
            <br /><br />
            <strong className="font-extrabold">Design &amp; Product Leadership?</strong> Just when you need it.
            <br /><br />
            We bring some of that Manfred Magic of smart work, sharp thinking,
            and a bit of fun. We&apos;ve worked in product teams, messy scale-ups,
            suit-heavy orgs, and everything in between. We&apos;ve delivered impact
            and long relationships with our customers.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
