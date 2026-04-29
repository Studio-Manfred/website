import Link from "next/link";
import Image from "next/image";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ds";
import type { Course } from "@/lib/courses";

export function CourseDetail({ course }: { course: Course }) {
  return (
    <>
      <PageNav variant="blue" />
      <main>
        {/* Hero */}
        <section className="cursor-white relative bg-[var(--color-business-blue)] px-6 md:px-12 py-32 md:py-52 min-h-[70vh] flex items-end overflow-hidden">
          {/* Background photo */}
          {course.heroImage && (
            <div className="absolute inset-0">
              <Image
                src={course.heroImage}
                alt=""
                fill
                className="object-cover object-center"
                priority
              />
              {/* Blue overlay to keep brand color */}
              <div className="absolute inset-0 bg-[var(--color-business-blue)]/75" />
            </div>
          )}

          <div className="relative mx-auto w-full" style={{ maxWidth: "960px" }}>
            <FadeIn>
              <Link
                href="/training-and-courses"
                className="inline-block font-light text-white/60 hover:text-white transition-colors mb-10 text-sm tracking-wide uppercase"
              >
                ← Training &amp; Courses
              </Link>
            </FadeIn>
            <FadeIn delay={1}>
              <h1
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {course.title}
              </h1>
            </FadeIn>
            <FadeIn delay={2}>
              <p
                className="font-light text-white/80"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
              >
                {course.tagline}
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Main content */}
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <div className="flex flex-col md:flex-row gap-16 md:gap-24">

              {/* Left: description + curriculum + audience + instructors */}
              <div className="flex-1 min-w-0">
                <FadeIn>
                  <p
                    className="font-light text-[var(--color-text-primary)] leading-relaxed mb-16"
                    style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.5rem)", lineHeight: 1.7 }}
                  >
                    {course.description}
                  </p>
                </FadeIn>

                {course.curriculum.length > 0 && (
                  <FadeIn delay={1}>
                    <div className="mb-16">
                      <h2
                        className="font-extrabold text-[var(--color-business-blue)] mb-6"
                        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                      >
                        What you&apos;ll learn
                      </h2>
                      <ul className="flex flex-col gap-3">
                        {course.curriculum.map((item) => (
                          <li key={item} className="flex gap-4 items-start">
                            <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
                            <span
                              className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )}

                {course.audience.length > 0 && (
                  <FadeIn delay={2}>
                    <div className="mb-16">
                      <h2
                        className="font-extrabold text-[var(--color-business-blue)] mb-6"
                        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                      >
                        Who is it for?
                      </h2>
                      <ul className="flex flex-col gap-3">
                        {course.audience.map((item) => (
                          <li key={item} className="flex gap-4 items-start">
                            <span className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
                            <span
                              className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                              style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                )}

                {course.instructors.length > 0 && (
                  <FadeIn>
                    <div>
                      <h2
                        className="font-extrabold text-[var(--color-business-blue)] mb-8"
                        style={{ fontSize: "clamp(1.25rem, 2vw, 1.75rem)" }}
                      >
                        Instructors
                      </h2>
                      <div className="flex flex-col gap-10">
                        {course.instructors.map((instructor) => (
                          <div key={instructor.name} className="flex gap-6 items-start">
                            {instructor.photo && (
                              <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 overflow-hidden">
                                <Image
                                  src={instructor.photo}
                                  alt={instructor.name}
                                  width={96}
                                  height={96}
                                  className="w-full h-full object-cover object-top"
                                />
                              </div>
                            )}
                            <div>
                              <p
                                className="font-extrabold text-[var(--color-text-primary)] mb-1"
                                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                              >
                                {instructor.name}
                              </p>
                              <p
                                className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                                style={{ fontSize: "clamp(0.875rem, 1.25vw, 1.1rem)" }}
                              >
                                {instructor.bio}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </FadeIn>
                )}
              </div>

              {/* Right: details panel */}
              <FadeIn>
                <div className="md:w-72 flex-shrink-0">
                  <div className="bg-[var(--color-bg-muted)] p-8 flex flex-col gap-6">
                    {[
                      { label: "Duration", value: course.duration },
                      { label: "Price", value: course.price },
                      { label: "Class size", value: course.classSize },
                      { label: "Location", value: course.location },
                      { label: "Language", value: course.language },
                      { label: "Dates", value: course.dates },
                      { label: "Includes", value: course.includes },
                      { label: "Cancellation", value: course.cancellation },
                    ].map(({ label, value }) => (
                      <div key={label} className="border-b border-[var(--color-border-default)] pb-6 last:border-0 last:pb-0">
                        <p className="text-xs font-light text-[var(--color-text-muted)] uppercase tracking-wide mb-1">{label}</p>
                        <p className="font-light text-[var(--color-text-primary)] text-sm leading-relaxed">{value}</p>
                      </div>
                    ))}

                    {course.note && (
                      <p className="text-xs font-light text-[var(--color-text-muted)] leading-relaxed italic">{course.note}</p>
                    )}

                    <Button variant="brand" size="lg" asChild>
                      <a href="mailto:hello@studiomanfred.com">Register interest</a>
                    </Button>
                  </div>
                </div>
              </FadeIn>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
