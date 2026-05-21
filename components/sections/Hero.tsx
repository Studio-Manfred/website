import { Button, Logo } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";
import { GetInTouchLink } from "@/components/GetInTouchLink";

export function Hero() {
  return (
    <section className="cursor-white bg-[var(--color-business-blue)] min-h-screen flex items-center px-6 md:px-12 py-24">
      <div className="mx-auto w-full text-center" style={{ maxWidth: "1200px" }}>
        <FadeIn>
          <div className="flex justify-center mb-24 md:mb-32">
            <Logo variant="wordmark" color="white" height={100} />
          </div>
        </FadeIn>
        <FadeIn delay={1}>
          <h1
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white text-center mb-20"
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}
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
    </section>
  );
}
