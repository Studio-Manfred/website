import { FadeIn } from "@/components/FadeIn";

export function WhatElse() {
  return (
    <section className="bg-white py-28 md:py-40 px-6 md:px-12">
      <div className="mx-auto text-center" style={{ maxWidth: "960px" }}>
        <FadeIn>
          <h2
            className="font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)] mb-12 md:mb-16"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            What else?
          </h2>
        </FadeIn>
        <FadeIn delay={1}>
          <p
            className="font-light leading-relaxed text-[var(--color-text-primary)] mx-auto text-center"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)", maxWidth: "70ch" }}
          >
            We mainly do consulting.{" "}
            <strong className="font-extrabold">But also{" "}
              <a
                href="/training-and-courses"
                className="underline underline-offset-2"
              >
                courses &amp; training
              </a>
            </strong>
            , workshops, coaching, sparring, co-creating, winging it with a
            whiteboard… We do services, if that&apos;s what you&apos;re looking for.
            <br /><br />
            Want to make your org feel smarter and more human?{" "}
            <strong className="font-extrabold">
              <a
                href="mailto:hello@studiomanfred.com"
                className="underline underline-offset-2"
              >
                Get in touch.
              </a>
            </strong>
            <br /><br />
            Sometimes we{" "}
            <strong className="font-extrabold">
              <a
                href="/news"
                className="underline underline-offset-2"
              >
                write stuff.
              </a>
            </strong>{" "}
            Sometimes deep,{" "}
            <strong className="font-extrabold">
              <a
                href="https://www.upplevelseblomman.se/"
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                like a book.
              </a>
            </strong>
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
