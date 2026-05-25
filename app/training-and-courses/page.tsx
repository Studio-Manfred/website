"use client";

import { useState } from "react";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ds";
import { Section } from "@/components/Section";
import { courses } from "@/lib/courses";
import { fontSize } from "@/lib/typography";

export default function TrainingPage() {
  const [open, setOpen] = useState<string | null>(null);

  function toggle(slug: string) {
    setOpen((prev) => (prev === slug ? null : slug));
  }

  return (
    <>
      <PageNav variant="blue" />
      <main id="main" tabIndex={-1} className="cursor-white bg-[var(--color-business-blue)] min-h-screen">

        {/* Hero */}
        <Section padding="first">
          <h1
            className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
            style={{ fontSize: fontSize.sectionTitle }}
          >
            Training &amp; Courses
          </h1>
          <p
            className="font-light text-white"
            style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
          >
            We offer open classes, custom-made training and workshops — just to keep you and your organisation up to date with the basics and the latest.
          </p>
        </Section>

        {/* Accordion list */}
        <Section padding="none" className="pb-24 md:pb-40">
          <div className="border-t border-[#efd6d3]/40">
            {courses.map((course) => {
              const isOpen = open === course.slug;
              const panelId = `course-panel-${course.slug}`;
              return (
                <div key={course.slug} className="border-b border-[#efd6d3]/40">
                  {/* Accordion header */}
                  <button
                    onClick={() => toggle(course.slug)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-8 text-left"
                    style={{ padding: "28px 0", minHeight: "80px" }}
                  >
                    <h2
                      className="font-light text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)]"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
                    >
                      {course.title}
                    </h2>
                    <span
                      className="flex-shrink-0 text-white leading-none transition-transform duration-300"
                      style={{
                        fontSize: "3.5rem",
                        fontWeight: 100,
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}
                    >
                      +
                    </span>
                  </button>

                  {/* Accordion body */}
                  <div
                    id={panelId}
                    role="region"
                    aria-label={course.title}
                    className="overflow-hidden transition-all duration-400 ease-in-out"
                    style={{ maxHeight: isOpen ? "1000px" : "0px" }}
                  >
                    <div className="pb-10 max-w-2xl">
                      <p
                        className="font-light text-white leading-relaxed mb-8"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.75 }}
                      >
                        {course.tagline}
                      </p>
                      <a
                        href={`/training-and-courses/${course.slug}`}
                        className="font-extrabold text-white underline underline-offset-4 hover:text-white/70 transition-colors tracking-wide"
                        style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Custom training */}
        <Section padding="none" className="pb-40 pt-16">
          <h2
            className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Yeah, we do custom stuff too
          </h2>
          <p
            className="font-light text-white mb-10"
            style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
          >
            Custom-made training or programmes for product companies. Product Discovery, Design Thinking, Impact Mapping, Customer Journey Mapping, Design Sprints, DesignOps — say the word and we come running.
          </p>
          <Button variant="inverse" size="lg" asChild>
            <a href="mailto:hello@studiomanfred.com">Ping us</a>
          </Button>
        </Section>

      </main>
      <Footer />
    </>
  );
}
