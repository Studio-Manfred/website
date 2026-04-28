import type { Metadata } from "next";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ds";

export const metadata: Metadata = {
  title: "Training & Courses — Studio Manfred",
  description:
    "Open classes, custom-made training and workshops to keep you and your organisation up to date with the basics and the latest.",
};

const courses = [
  {
    title: "Design Leadership",
    description:
      "For design leaders and managers seeking to increase organisational design maturity through strategic capability development.",
  },
  {
    title: "Product Discovery",
    description:
      "Focused on preventing product failure by validating market demand and user needs before development begins.",
  },
  {
    title: "Customer Journey Mapping and Customer-Centricity",
    description:
      "Uses data and insights to align teams and improve customer experience and business outcomes.",
  },
  {
    title: "Business Design",
    description:
      "Teaches innovation and business development through practical frameworks and methodology.",
  },
  {
    title: "DesignOps",
    description:
      "Covers building, scaling, and streamlining design organisational structures and workflows.",
  },
  {
    title: "Design Thinking for HR",
    description:
      "Applies design methodology in workplace settings for creative problem-solving and culture change.",
  },
  {
    title: "CX Management and Specialist",
    description:
      "A two-year education partnership with IHM business school covering customer experience integration across the organisation.",
  },
];

export default function TrainingPage() {
  return (
    <>
      <PageNav />
      <main>
        {/* Hero */}
        <section className="bg-[var(--color-business-blue)] px-6 md:px-12 py-24 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <FadeIn>
              <h1
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Training &amp; Courses
              </h1>
            </FadeIn>
            <FadeIn delay={1}>
              <p
                className="font-light text-white/80 mt-6"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch" }}
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
                <FadeIn key={course.title} delay={(i % 3) as 0 | 1 | 2}>
                  <div className="py-10 md:py-14">
                    <h2
                      className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] mb-4"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
                    >
                      {course.title}
                    </h2>
                    <p
                      className="font-light text-[var(--color-text-secondary)] leading-relaxed"
                      style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                    >
                      {course.description}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* Custom training CTA */}
        <section className="bg-white px-6 md:px-12 pb-24 md:pb-40">
          <div
            className="mx-auto rounded-[var(--radius-sm)] bg-[var(--color-business-blue)] px-8 py-16 md:px-16 md:py-20 text-center"
            style={{ maxWidth: "960px" }}
          >
            <FadeIn>
              <h2
                className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Need something custom?
              </h2>
            </FadeIn>
            <FadeIn delay={1}>
              <p
                className="font-light text-white/80 mx-auto mb-10"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "48ch", lineHeight: 1.6 }}
              >
                We design bespoke training for product companies — Design Sprints, Impact Mapping, organisational consulting, and more.
              </p>
            </FadeIn>
            <FadeIn delay={2}>
              <Button variant="inverse" size="lg" asChild>
                <a href="mailto:hello@studiomanfred.com">Get in touch</a>
              </Button>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
