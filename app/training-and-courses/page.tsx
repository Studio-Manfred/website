import type { Metadata } from "next";
import Link from "next/link";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ds";
import { courses } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Training & Courses — Studio Manfred",
  description:
    "Open classes, custom-made training and workshops to keep you and your organisation up to date with the basics and the latest.",
};

export default function TrainingPage() {
  return (
    <>
      <PageNav />
      <main>
        {/* Hero */}
        <section className="cursor-white bg-[var(--color-business-blue)] px-6 md:px-12 py-24 md:py-40 min-h-[60vh] flex items-end">
          <div className="mx-auto w-full" style={{ maxWidth: "960px" }}>
            <FadeIn>
              <h1
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Training &amp; Courses
              </h1>
            </FadeIn>
            <FadeIn delay={1}>
              <p
                className="font-light text-white/80"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
              >
                We offer open classes, custom-made training and workshops — just to keep you and your organisation up to date with the basics and the latest.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Course list */}
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <div className="flex flex-col divide-y divide-[var(--color-border-default)]">
              {courses.map((course, i) => (
                <FadeIn key={course.slug} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/training-and-courses/${course.slug}`}
                    className="group py-10 md:py-14 flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-16"
                  >
                    <div className="flex-1">
                      <h2
                        className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] mb-3 group-hover:underline underline-offset-4 transition-all"
                        style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                      >
                        {course.title}
                      </h2>
                      <p
                        className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                      >
                        {course.tagline}
                      </p>
                    </div>
                    <div className="flex-shrink-0 flex flex-col gap-1 md:text-right">
                      <p className="text-sm font-light text-[var(--color-text-muted)]">{course.duration}</p>
                      <p className="text-sm font-extrabold text-[var(--color-text-primary)]">{course.price}</p>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Custom training CTA */}
        <section className="bg-white px-6 md:px-12 pb-24 md:pb-40">
          <div
            className="cursor-white mx-auto rounded-none bg-[var(--color-business-blue)] px-8 py-16 md:px-16 md:py-20 text-center"
            style={{ maxWidth: "960px" }}
          >
            <FadeIn>
              <h2
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Yeah, we do custom stuff too
              </h2>
            </FadeIn>
            <FadeIn delay={1}>
              <p
                className="font-light text-white/80 mx-auto mb-10"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
              >
                Custom-made training or programmes for product companies. Product Discovery, Design Thinking, Impact Mapping, Customer Journey Mapping, Design Sprints, DesignOps — say the word and we come running.
              </p>
            </FadeIn>
            <FadeIn delay={2}>
              <Button variant="inverse" size="lg" asChild>
                <a href="mailto:hello@studiomanfred.com">Ping us</a>
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
