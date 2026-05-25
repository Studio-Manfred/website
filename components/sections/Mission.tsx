import { FadeIn } from "@/components/FadeIn";
import { Section } from "@/components/Section";

export function Mission() {
  return (
    <>
      {/* Part 1: mission statement */}
      <Section background="white" padding="roomy" align="center">
        <FadeIn>
          <h2
            className="font-light leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Our mission is to make the product world{" "}
            <span className="font-extrabold text-[var(--color-business-blue)]">
              more customer driven
            </span>
          </h2>
        </FadeIn>
      </Section>

      {/* Part 2: Manfred Magic + image */}
      <Section background="white" padding="roomy" align="center">
        <div className="flex flex-col items-center gap-12">
          <FadeIn>
            <h2
              className="leading-[var(--line-height-snug)] tracking-[var(--letter-spacing-tight)]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              <span className="font-light text-[var(--color-text-primary)]">...with some </span>
              <span className="font-extrabold text-[var(--color-business-blue)]">Manfred Magic!</span>
            </h2>
          </FadeIn>
          <FadeIn delay={1}>
            <video
              width={313}
              height={557}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden
              className="rounded-[var(--radius-sm)]"
              style={{ width: "313px", height: "auto", display: "block" }}
            >
              <source src="/manfred-magic.webm" type="video/webm" />
              <source src="/manfred-magic.mp4" type="video/mp4" />
            </video>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
