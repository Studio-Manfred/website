import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function FishbrainCase() {
  return (
    <>
      <PageNav variant="white" />
      <main>
        <section className="bg-white px-6 md:px-12 py-20 md:py-32">
          <div className="mx-auto" style={{ maxWidth: "1200px" }}>

            <Link
              href="/cases"
              className="inline-block font-light text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors mb-6 text-sm tracking-wide uppercase"
            >
              ← Cases
            </Link>

            <div className="mb-20">
              <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">
                Consumer App · UX Research · Service Design
              </p>
              <h1
                className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Fishbrain
              </h1>
              <p
                className="font-light text-[var(--color-text-primary)] max-w-3xl"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 1.7 }}
              >
                Establishing a customer-centric, data-driven product culture — mapping user segments, uncovering conversion drivers, and aligning the entire organization around a shared understanding of their anglers.
              </p>
            </div>

            <div className="course-layout" style={{ display: "flex", gap: "5rem", alignItems: "flex-start" }}>

              <div className="flex-1 min-w-0 flex flex-col gap-16">

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Brief
                  </h2>
                  <p className="font-light text-[var(--color-text-primary)] mb-4" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}>
                    Fishbrain needed to shift from a feature-driven to a user-centric product approach. The objectives were threefold:
                  </p>
                  <ul className="flex flex-col gap-3" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
                    {[
                      "Establish a customer-centric, data-driven mindset and framework across internal product teams.",
                      "Deepen the understanding of existing user groups to drive app adoption and retention.",
                      "Provide data-backed recommendations to guide product prioritization and business decisions.",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 items-start">
                        <span className="mt-[0.6em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
                        <span className="font-light text-[var(--color-text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Process
                  </h2>
                  <p className="font-light text-[var(--color-text-secondary)] mb-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}>
                    A mixed-methods approach combining deep qualitative discovery with large-scale quantitative validation across Fishbrain's core markets in Sweden and the US.
                  </p>
                  {[
                    { heading: "Qualitative discovery", text: "Conducted in-depth interviews and user observation sessions with both Pro (paid) and non-Pro (free) members in Sweden and the US, analysing real-time app interactions to surface friction points and motivators." },
                    { heading: "Quantitative validation", text: "Distributed and analysed a large-scale survey to validate behavioral trends across the broader international user base." },
                    { heading: "Data synthesis", text: "Cross-analysed qualitative and quantitative findings with historical product data to map user behavior comprehensively across segments." },
                    { heading: "Cross-functional collaboration", text: "Partnered closely with the CPO, CTO, Data Science, Product Designers, PMs, and Marketing to align business goals with user insights throughout the process." },
                  ].map((item) => (
                    <div key={item.heading} className="border-t border-[var(--color-border-default)] py-5">
                      <p className="font-extrabold text-[var(--color-text-primary)] mb-2" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>{item.heading}</p>
                      <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  ))}
                  <div className="mt-10">
                    <p className="font-extrabold text-[var(--color-text-primary)] mb-4" style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)" }}>
                      Stakeholder collaboration
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["CPO", "CTO", "Product Managers", "Product Designers", "Data Science", "Marketing"].map((s) => (
                        <span key={s} className="font-light text-[var(--color-business-blue)] border border-[var(--color-business-blue)] rounded-full px-4 py-1" style={{ fontSize: "13px" }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Deliverables
                  </h2>
                  <ul className="flex flex-col gap-3 mb-10" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
                    {[
                      "Segmented user journey map visualizing key friction points and conversion drivers to optimize the funnel from free users to Pro subscribers.",
                      "Executive & Board presentation delivering strategic insights connecting user needs with revenue potential directly to C-level executives and the Board of Directors.",
                      "Product & research roadmap prioritizing feature concepts designed to increase long-term retention for Pro members.",
                      "Continuous research toolbox — standardized templates and guidelines for internal teams to maintain research practices independently.",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 items-start">
                        <span className="mt-[0.6em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
                        <span className="font-light text-[var(--color-text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">
                      User Journey & Service Blueprint
                    </p>
                    <iframe
                      src="/cases/fishbrain/fishbrain-blueprint.html"
                      className="w-full border border-[var(--color-border-default)] rounded"
                      style={{ height: "620px" }}
                      title="Fishbrain Service Blueprint"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Outcomes
                  </h2>
                  {[
                    { heading: "Increased Pro subscriptions", text: "Uncovered key triggers that directly drove higher conversion rates from free users to Pro members." },
                    { heading: "Higher organisational maturity", text: "Significantly improved internal understanding and adoption of customer-driven product development methodologies across all teams." },
                    { heading: "Long-term retention strategy", text: "Established a clearer product direction focused on mitigating churn among paying members." },
                  ].map((item) => (
                    <div key={item.heading} className="border-t border-[var(--color-border-default)] py-5">
                      <p className="font-extrabold text-[var(--color-text-primary)] mb-2" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>{item.heading}</p>
                      <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", lineHeight: 1.7 }}>{item.text}</p>
                    </div>
                  ))}
                </div>

              </div>

              <div className="course-sidebar" style={{ width: "280px", flexShrink: 0 }}>
                <div className="flex flex-col gap-8">

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-4">Consultant</p>
                    <div className="flex items-center gap-3">
                      <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                        <img src="/team/moa.jpg" alt="Moa Bogren" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      </div>
                      <div>
                        <p className="font-extrabold text-[var(--color-text-primary)] text-sm">Moa Bogren</p>
                        <p className="font-light text-[var(--color-text-secondary)] text-sm">UX Lead / Researcher & Service Designer</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Client</p>
                    <p className="font-light text-[var(--color-text-primary)] text-sm">Fishbrain</p>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Role</p>
                    <p className="font-light text-[var(--color-text-primary)] text-sm">UX Lead / Researcher & Service Designer</p>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Methods</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-[var(--color-text-primary)]">
                      {["User interviews", "Observational studies", "Large-scale survey", "User journey mapping", "Service blueprint", "Research operations"].map((m) => (
                        <p key={m}>{m}</p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Markets</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-[var(--color-text-primary)]">
                      {["Sweden", "United States"].map((m) => (
                        <p key={m}>{m}</p>
                      ))}
                    </div>
                  </div>

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