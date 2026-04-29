import { FadeIn } from "@/components/FadeIn";

export function Tagline() {
  return (
    <section className="bg-white min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="mx-auto text-center" style={{ maxWidth: "960px" }}>
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
      </div>
    </section>
  );
}
