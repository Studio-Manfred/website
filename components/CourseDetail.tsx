import Link from "next/link";
import Image from "next/image";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ds";
import type { Course, ContentBlock } from "@/lib/courses";

function Block({ block }: { block: ContentBlock }) {
  if (block.kind === "text") {
    return (
      <div>
        {block.heading && (
          <h2
            className="font-extrabold text-[var(--color-text-primary)] mb-3"
            style={{ fontSize: "clamp(1.1rem, 1.75vw, 1.5rem)" }}
          >
            {block.heading}
          </h2>
        )}
        <p
          className="font-light text-[var(--color-text-primary)] leading-relaxed"
          style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.4rem)", lineHeight: 1.75 }}
        >
          {block.text}
        </p>
      </div>
    );
  }

  if (block.kind === "list") {
    return (
      <div>
        <h2
          className="font-extrabold text-[var(--color-text-primary)] mb-3"
          style={{ fontSize: "clamp(1.1rem, 1.75vw, 1.5rem)" }}
        >
          {block.heading}
        </h2>
        {block.intro && (
          <p
            className="font-light text-[var(--color-text-secondary)] mb-4"
            style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)", lineHeight: 1.65 }}
          >
            {block.intro}
          </p>
        )}
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-4 items-start">
              <span className="mt-[0.6em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
              <span
                className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.kind === "testimonial") {
    return (
      <blockquote className="border-l-4 border-[var(--color-business-blue)] pl-6">
        <p
          className="font-light text-[var(--color-text-primary)] leading-relaxed mb-3"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75, fontStyle: "italic" }}
        >
          &ldquo;{block.quote}&rdquo;
        </p>
        <cite className="font-extrabold text-[var(--color-text-primary)] not-italic text-sm">
          — {block.author}
        </cite>
      </blockquote>
    );
  }

  if (block.kind === "alumni") {
    return (
      <div>
        <h2
          className="font-extrabold text-[var(--color-text-primary)] mb-3"
          style={{ fontSize: "clamp(1.1rem, 1.75vw, 1.5rem)" }}
        >
          {block.heading}
        </h2>
        {block.intro && (
          <p className="font-light text-[var(--color-text-secondary)] mb-3" style={{ fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)" }}>
            {block.intro}
          </p>
        )}
        <p
          className="font-light text-[var(--color-text-secondary)]"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
        >
          {block.items.join(", ")}
        </p>
      </div>
    );
  }

  if (block.kind === "fine-print") {
    return (
      <div className="border-t border-[var(--color-border-default)] pt-8 mt-4">
        <h2
          className="font-extrabold text-[var(--color-text-primary)] mb-5"
          style={{ fontSize: "clamp(1.1rem, 1.75vw, 1.5rem)" }}
        >
          The Fine Print!
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {block.items.map((item, i) => (
            <p
              key={i}
              className="font-light text-[var(--color-text-secondary)] leading-relaxed"
              style={{ fontSize: "clamp(0.9rem, 1.3vw, 1rem)" }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export function CourseDetail({ course }: { course: Course }) {
  return (
    <>
      <PageNav variant="white" />
      <main>
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>

            {/* Page title */}
            <div className="mb-16">
              <Link
                href="/training-and-courses"
                className="inline-block font-light text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 text-sm tracking-wide uppercase"
              >
                ← Training &amp; Courses
              </Link>
              <h1
                className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                {course.title}
              </h1>
            </div>

            <div style={{ display: "flex", flexDirection: "row", gap: "5rem", alignItems: "flex-start" }}>

              {/* Left: content blocks in order */}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "3rem" }}>
                {course.content.map((block, i) => (
                  <FadeIn key={i}>
                    <Block block={block} />
                  </FadeIn>
                ))}
              </div>

              {/* Right sidebar */}
              <div style={{ width: "320px", flexShrink: 0 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>

                  {/* When and where */}
                  {course.whenAndWhere && (
                    <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-2">When and where</p>
                      <p className="font-light text-[var(--color-text-primary)] text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                        {course.whenAndWhere}
                      </p>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5 flex flex-col gap-4">
                    <div>
                      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-2">Pricing</p>
                      <p className="font-light text-[var(--color-text-primary)] text-sm leading-relaxed" style={{ whiteSpace: "pre-line" }}>
                        {course.price}
                      </p>
                    </div>
                    <Button variant="brand" size="lg" asChild>
                      <a href="mailto:hello@studiomanfred.com">Register interest</a>
                    </Button>
                  </div>

                  {/* Instructors */}
                  {course.instructors.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                      <h2
                        className="font-extrabold text-[var(--color-text-primary)]"
                        style={{ fontSize: "clamp(1rem, 1.4vw, 1.25rem)", borderTop: "4px solid var(--color-business-blue)", paddingTop: "1.5rem" }}
                      >
                        Instructors
                      </h2>
                      {course.instructors.map((instructor) => (
                        <div key={instructor.name}>
                          {instructor.photo && (
                            <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden", marginBottom: "1rem" }}>
                              <Image
                                src={instructor.photo}
                                alt={instructor.name}
                                width={320}
                                height={320}
                                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                              />
                            </div>
                          )}
                          <p className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", marginBottom: "0.25rem" }}>
                            {instructor.name}
                          </p>
                          <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.8rem, 1vw, 0.9rem)", lineHeight: 1.6 }}>
                            {instructor.bio}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
