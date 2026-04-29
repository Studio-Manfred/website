"use client";

import { useState } from "react";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { courses } from "@/lib/courses";

export default function TrainingPage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <>
      <PageNav />
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
              className="font-light text-white/70"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
            >
              We offer open classes, custom-made training and workshops — just to keep you and your organisation up to date with the basics and the latest.
            </p>
          </div>
        </section>

        {/* Accordion list */}
        <section className="px-6 md:px-12 pb-24 md:pb-40">
          <div className="mx-auto" style={{ maxWidth: "960px" }}>
            <div className="border-t border-white/20">
              {courses.map((course) => {
                const isOpen = open === course.slug;
                return (
                  <div key={course.slug} className="border-b border-white/20">
                    {/* Accordion header */}
                    <button
                      onClick={() => setOpen(isOpen ? null : course.slug)}
                      className="w-full flex items-center justify-between gap-8 py-7 md:py-9 text-left group"
                    >
                      <h2
                        className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] group-hover:text-white/80 transition-colors"
                        style={{ fontSize: "clamp(1.25rem, 2.5vw, 2.25rem)" }}
                      >
                        {course.title}
                      </h2>
                      <span
                        className="flex-shrink-0 text-white/60 text-3xl font-light leading-none transition-transform duration-300"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>

                    {/* Accordion body */}
                    <div
                      className="overflow-hidden transition-all duration-500 ease-in-out"
                      style={{ maxHeight: isOpen ? "2000px" : "0px" }}
                    >
                      <div className="pb-12 flex flex-col md:flex-row gap-12 md:gap-20">

                        {/* Left: description + curriculum + audience + instructors */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="font-light text-white/80 leading-relaxed mb-10"
                            style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.75 }}
                          >
                            {course.description}
                          </p>

                          {course.curriculum.length > 0 && (
                            <div className="mb-10">
                              <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 opacity-60">
                                What you&apos;ll learn
                              </h3>
                              <ul className="flex flex-col gap-3">
                                {course.curriculum.map((item) => (
                                  <li key={item} className="flex gap-4 items-start">
                                    <span className="mt-[0.55em] flex-shrink-0 w-1 h-1 rounded-full bg-white/60" />
                                    <span
                                      className="font-light text-white/70 leading-relaxed"
                                      style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.1rem)" }}
                                    >
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {course.audience.length > 0 && (
                            <div className="mb-10">
                              <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 opacity-60">
                                Who is it for
                              </h3>
                              <ul className="flex flex-col gap-3">
                                {course.audience.map((item) => (
                                  <li key={item} className="flex gap-4 items-start">
                                    <span className="mt-[0.55em] flex-shrink-0 w-1 h-1 rounded-full bg-white/60" />
                                    <span
                                      className="font-light text-white/70 leading-relaxed"
                                      style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.1rem)" }}
                                    >
                                      {item}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {course.instructors.length > 0 && (
                            <div>
                              <h3 className="font-extrabold text-white text-sm uppercase tracking-widest mb-5 opacity-60">
                                Instructors
                              </h3>
                              <div className="flex flex-col gap-6">
                                {course.instructors.map((instructor) => (
                                  <div key={instructor.name}>
                                    <p className="font-extrabold text-white mb-1"
                                      style={{ fontSize: "clamp(0.9rem, 1.25vw, 1.1rem)" }}>
                                      {instructor.name}
                                    </p>
                                    <p className="font-light text-white/60 leading-relaxed"
                                      style={{ fontSize: "clamp(0.85rem, 1.1vw, 1rem)" }}>
                                      {instructor.bio}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Right: details */}
                        <div className="md:w-64 flex-shrink-0">
                          <div className="flex flex-col gap-5">
                            {[
                              { label: "Price", value: course.price },
                              { label: "Duration", value: course.duration },
                              { label: "Class size", value: course.classSize },
                              { label: "Location", value: course.location },
                              { label: "Dates", value: course.dates },
                              { label: "Includes", value: course.includes },
                            ].map(({ label, value }) => (
                              <div key={label} className="border-b border-white/15 pb-5 last:border-0">
                                <p className="text-xs font-light text-white/40 uppercase tracking-widest mb-1">{label}</p>
                                <p className="font-light text-white/80 text-sm leading-relaxed">{value}</p>
                              </div>
                            ))}
                            {course.note && (
                              <p className="text-xs font-light text-white/40 leading-relaxed italic">{course.note}</p>
                            )}
                            <a
                              href="mailto:hello@studiomanfred.com"
                              className="inline-block mt-2 font-extrabold text-white border border-white/40 hover:border-white hover:bg-white hover:text-[var(--color-business-blue)] transition-all px-6 py-3 text-sm text-center"
                            >
                              Register interest →
                            </a>
                          </div>
                        </div>

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
          <div className="mx-auto border-t border-white/20 pt-16" style={{ maxWidth: "960px" }}>
            <h2
              className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Yeah, we do custom stuff too
            </h2>
            <p
              className="font-light text-white/70 mb-10"
              style={{ fontSize: "clamp(1.125rem, 2vw, 1.5rem)", maxWidth: "52ch", lineHeight: 1.6 }}
            >
              Custom-made training or programmes for product companies. Product Discovery, Design Thinking, Impact Mapping, Customer Journey Mapping, Design Sprints, DesignOps — say the word and we come running.
            </p>
            <a
              href="mailto:hello@studiomanfred.com"
              className="inline-block font-extrabold text-[var(--color-business-blue)] bg-white hover:bg-white/90 transition-colors px-8 py-4 text-sm"
            >
              Ping us →
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
