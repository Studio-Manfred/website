import { Typography } from "@/components/ds";
import { FadeIn } from "@/components/FadeIn";

export function WhatElse() {
  return (
    <section className="bg-[var(--color-business-blue)] py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "var(--size-container-lg)" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-white mb-16 md:mb-20"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What else?
          </h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/20">
          <FadeIn>
            <div className="bg-[var(--color-business-blue)] p-10 md:p-14 h-full text-left">
              <Typography variant="headline4" color="inverse" as="h3" className="mb-4">
                Upplevelseblomman
              </Typography>
              <Typography variant="body" color="inverse" as="p" className="opacity-60 font-light leading-relaxed mb-8">
                Our book on customer experience design — a practical guide to
                building products people love.
              </Typography>
              <a
                href="mailto:hello@studiomanfred.com"
                className="text-sm font-semibold text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
              >
                Learn more
              </a>
            </div>
          </FadeIn>
          <FadeIn delay={1}>
            <div className="bg-[var(--color-business-blue)] p-10 md:p-14 h-full text-left">
              <Typography variant="headline4" color="inverse" as="h3" className="mb-4">
                Thought Leadership
              </Typography>
              <Typography variant="body" color="inverse" as="p" className="opacity-60 font-light leading-relaxed mb-8">
                Strategic writings, articles, and insights from the Manfred
                team on product, design, and research.
              </Typography>
              <a
                href="mailto:hello@studiomanfred.com"
                className="text-sm font-semibold text-white border-b border-white/40 pb-0.5 hover:border-white transition-colors"
              >
                Read more
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
