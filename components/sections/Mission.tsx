import { FadeIn } from "@/components/FadeIn";

export function Mission() {
  return (
    <>
      {/* Part 1: mission statement */}
      <section className="bg-white py-28 md:py-40 px-6 md:px-12">
        <div className="mx-auto text-center" style={{ maxWidth: "960px" }}>
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
        </div>
      </section>

      {/* Part 2: Manfred Magic + image */}
      <section className="bg-white pt-0 pb-28 md:pb-40 px-6 md:px-12">
        <div className="mx-auto text-center flex flex-col items-center gap-12" style={{ maxWidth: "960px" }}>
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/manfred-magic.gif"
              alt="Manfred Magic"
              className="rounded-[var(--radius-sm)]"
              style={{ width: "250px", height: "auto" }}
            />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
