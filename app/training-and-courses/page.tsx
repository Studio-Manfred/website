"use client";

import { useState, useRef } from "react";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ds";
import { courses } from "@/lib/courses";

export default function TrainingPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function toggle(slug: string) {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (open === slug) {
      // Close current
      setOpen(null);
      return;
    }

    if (open) {
      // Close current first, then open next after transition
      setPending(slug);
      setOpen(null);
      timerRef.current = setTimeout(() => {
        setOpen(slug);
        setPending(null);
      }, 450);
    } else {
      setOpen(slug);
    }
  }

  return (
    <>
      <PageNav variant="blue" />
      <main className="cursor-white bg-[var(--color-business-blue)] min-h-screen">

        {/* Hero */}
        <section className="px-6 md:px-12 pt-24 md:pt-40 pb-16 md:pb-24">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <h1
              className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Training &amp; Courses
            </h1>
            <p
              className="font-light text-white"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
            >
              We offer open classes, custom-made training and workshops — just to keep you and your organisation up to date with the basics and the latest.
            </p>
          </div>
        </section>

        {/* Accordion list */}
        <section className="px-6 md:px-12 pb-24 md:pb-40">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <div className="border-t border-[#efd6d3]/40">
              {courses.map((course) => {
                const isOpen = open === course.slug;
                const isPending = pending === course.slug;
                return (
                  <div key={course.slug} className="border-b border-[#efd6d3]/40">
                    {/* Accordion header */}
                    <button
                      onClick={() => toggle(course.slug)}
                      className="w-full flex items-center justify-between gap-8 py-7 md:py-9 text-left group"
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
                          transform: isOpen || isPending ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      >
                        +
                      </span>
                    </button>

                    {/* Accordion body */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isOpen ? "600px" : "0px" }}
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
          </div>
        </section>

        {/* Custom training */}
        <section className="px-6 md:px-12 pb-40">
          <div className="mx-auto pt-16" style={{ maxWidth: "960px" }}>
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
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
