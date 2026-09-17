import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export default function BokadirektCase() {
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
                B2B SaaS · User Research · Service Design
              </p>
              <h1
                className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Bokadirekt
              </h1>
              <p
                className="font-light text-[var(--color-text-primary)] max-w-3xl"
                style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 1.7 }}
              >
                Establishing a scalable UX research practice and mapping the full B2B customer landscape — connecting qualitative depth with quantitative business metrics to drive product prioritization and reduce churn.
              </p>
            </div>

            <div className="course-layout" style={{ display: "flex", gap: "5rem", alignItems: "flex-start" }}>

              <div className="flex-1 min-w-0 flex flex-col gap-16">

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Brief
                  </h2>
                  <p className="font-light text-[var(--color-text-primary)] mb-4" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}>
                    Bokadirekt needed to better understand their B2B merchant base — who they were, what drove them, and where the product was falling short. The task was threefold:
                  </p>
                  <ul className="flex flex-col gap-3" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}>
                    {[
                      "Establish a streamlined, scalable UX research process for designers and PMs.",
                      "Map Bokadirekt's B2B customer base by analysing segment-specific pains, gains, and Jobs-to-be-Done to prioritize SaaS product development.",
                      "Collaborate closely with Marketing to build a business-focused framework for mapping strategic target segments and Ideal Customer Profiles (ICPs).",
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
                    The project followed a mixed-methods approach designed to capture both deep qualitative insight and broad quantitative validation.
                  </p>
                  {[
                    { heading: "Qualitative research", text: "Designed and executed frameworks for ~30 interviews and observational studies with B2B clients, alongside interviews with end-consumers." },
                    { heading: "Continuous feedback loop", text: "Established a long-term user panel to create an efficient, ongoing feedback mechanism for future product iterations." },
                    { heading: "AI & operational efficiency", text: "Explored long-term AI capabilities to streamline internal customer-facing operations and workflows." },
                    { heading: "Quantitative survey", text: "Distributed a broad survey combining qualitative and quantitative questions to validate findings across all B2B customer segments." },
                    { heading: "Synthesis & business mapping", text: "Analysed and merged all data streams to identify future product needs across segments, aligning user pains with business potential to drive prioritization." },
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
                      {["Product Managers", "UX Designers", "Chief Product Officer", "Head of Data Science", "Marketing"].map((s) => (
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
                      "Tech team roadmaps & prioritization backlogs covering critical fixes, long-term feature enhancements, and estimated retention impact per segment.",
                      "Consumer journey map & feature wishlist across existing B2C services.",
                      "Comprehensive ICP & segment analysis framework — categorizing segments by drivers, challenges, digital maturity, GMV, NPS, and churn risk.",
                      "Research operations toolkit — standardized templates and guidelines enabling product teams to run research independently.",
                    ].map((item) => (
                      <li key={item} className="flex gap-4 items-start">
                        <span className="mt-[0.6em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
                        <span className="font-light text-[var(--color-text-secondary)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-8">
                    <div>
                      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">B2B Segment Matrix</p>
                      <iframe src="/cases/bokadirekt/bokadirekt-matrix.html" className="w-full border border-[var(--color-border-default)] rounded" style={{ height: "420px" }} title="Persona Matrix" />
                    </div>
                    <p className="font-light text-[var(--color-text-muted)] mt-2" style={{ fontSize: "12px" }}>
  No real numbers or data — the visualisations are examples with sample data only.
</p>
                    <div>
                      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Segment Distribution</p>
                      <iframe src="/cases/bokadirekt/bokadirekt-distribution.html" className="w-full border border-[var(--color-border-default)] rounded" style={{ height: "360px" }} title="Segment Distribution" />
                    </div>
                    <p className="font-light text-[var(--color-text-muted)] mt-2" style={{ fontSize: "12px" }}>
  No real numbers or data — the visualisations are examples with sample data only.
</p>
                    <div>
                      <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">ICP Deep Dive — Example</p>
                      <iframe src="/cases/bokadirekt/bokadirekt-icp-example.html" className="w-full border border-[var(--color-border-default)] rounded" style={{ height: "600px" }} title="ICP Deep Dive" />
                    </div>
                    <p className="font-light text-[var(--color-text-muted)] mt-2" style={{ fontSize: "12px" }}>
  No real numbers or data — the visualisations are examples with sample data only.
</p>
                  </div>
                </div>

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Outcomes
                  </h2>
                  {[
                    { heading: "Increased B2B retention", text: "Directly boosted retention within key, high-priority B2B customer segments by acting on critical product improvements." },
                    { heading: "Proactive churn reduction", text: "Identified key churn indicators and underlying drivers, equipping the business with actionable insights to reduce churn in critical segments." },
                    { heading: "Unified customer knowledge", text: "Democratized qualitative and quantitative customer insights across all departments — aligning tech, product, marketing, and leadership around shared user understanding." },
                    { heading: "Elevated research practice", text: "Raised the overall standard and frequency of continuous product research and user discovery across product teams." },
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
                        <p className="font-light text-[var(--color-text-secondary)] text-sm">Senior User Researcher / Service Designer</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Client</p>
                    <p className="font-light text-[var(--color-text-primary)] text-sm">Bokadirekt</p>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Role</p>
                    <p className="font-light text-[var(--color-text-primary)] text-sm">Senior User Researcher & Service Designer</p>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Methods</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-[var(--color-text-primary)]">
                      {["User interviews", "Observational studies", "Survey research", "Persona & ICP mapping", "Jobs-to-be-Done", "Research operations"].map((m) => (
                        <p key={m}>{m}</p>
                      ))}
                    </div>
                  </div>

                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className="text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3">Collaboration</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-[var(--color-text-primary)]">
                      {["Product", "UX Design", "Marketing", "Data Science", "Leadership"].map((m) => (
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