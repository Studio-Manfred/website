import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CaseLightbox } from "@/components/CaseLightbox";
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
              Cases
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
  <p className="font-light text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}>
    Bokadirekt needed to better understand their B2B merchant base — who they were, what drove them, and where the product was falling short.
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

                <ProcessTimeline
  steps={[
    {
      id: 1,
      title: "Qualitative Research",
      methods: ["Stakeholder workshops", "User interviews", "Observation sessions", "AI-assisted analysis"],
      description: "Designed and executed a qualitative research framework built around close collaboration with internal stakeholders. Ran workshops to align on research questions and business priorities, followed by in-depth interviews and observation sessions with B2B clients. AI tools were used to support thematic analysis and pattern recognition across large volumes of qualitative data.",
    },
    {
      id: 2,
      title: "Customer Panel",
      methods: ["Recruited long-term panel", "Ongoing check-ins", "Iterative feedback loops"],
      description: "Established a long-term user panel to create an efficient, ongoing feedback mechanism for future product iterations. The panel enabled the team to validate hypotheses quickly and maintain a continuous pulse on merchant needs without running full research cycles each time.",
    },
    {
      id: 3,
      title: "Quantitative Survey",
      methods: ["Survey design", "Broad distribution", "Statistical analysis", "Segment validation"],
      description: "Distributed a large-scale survey combining qualitative and quantitative questions to validate findings across all B2B customer segments. The survey was designed to stress-test hypotheses from the qualitative phase and surface patterns across the broader merchant base.",
    },
    {
      id: 4,
      title: "Synthesis & Business Mapping",
      methods: ["Data triangulation", "ICP framework", "Business metric mapping", "Segment prioritization"],
      description: "Analysed and merged all data streams — qualitative findings, survey results, and historical product data — to build a comprehensive picture of the B2B customer landscape. User pains and needs were mapped against business metrics including GMV, NPS, and churn risk to enable data-driven prioritization and strategic decision-making.",
    },
  ]}
  stakeholders={["Product Managers", "UX Designers", "Chief Product Officer", "Head of Data Science", "Marketing"]}
/>

                <div>
                  <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
                    Deliverables
                  </h2>
                  <p className="font-light text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 }}>
  Tech team roadmaps & prioritization backlogs covering critical fixes, long-term feature enhancements, and estimated retention impact per segment.
  <br /><br />
  Consumer journey map & feature wishlist across existing B2C services.
  <br /><br />
  Comprehensive ICP & segment analysis framework — categorizing segments by drivers, challenges, digital maturity, GMV, NPS, and churn risk..
<br /><br />
Research operations toolkit — standardized templates and guidelines enabling product teams to run research independently.
<br /><br />
</p>

                  <div className="flex flex-col gap-8">

                    <div>

                      <div style={{ position: "relative" }}>
                        <CaseLightbox src="/cases/bokadirekt/bokadirekt-matrix.png" alt="B2B Segment Matrix" label="B2B Segment Matrix" />
                        
                        
                      </div>
                
                    </div>

                    <div>
                      <CaseLightbox src="/cases/bokadirekt/bokadirekt-distribution.png" alt="Segment Distribution" label="Segment Distribution" />
                    </div>

                    <div>
                      <CaseLightbox src="/cases/bokadirekt/bokadirekt-icp-example.png" alt="ICP Deep Dive" label="ICP Deep Dive — Example" />
                    </div>

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
