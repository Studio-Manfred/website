import type { Metadata } from "next";
import Image from "next/image";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { FadeIn } from "@/components/FadeIn";
import { Button } from "@/components/ds";
import { LoopingPhoto } from "@/components/LoopingPhoto";
import { VibesMarquee } from "@/components/VibesMarquee";

export const metadata: Metadata = {
  title: "Recruitment, salary and benefits — Studio Manfred",
};

const reasons = [
  "We are a financially stable and secure company right from the start",
  "Our founders have experience in business development, design, and consulting",
  "Our culture and values start with empathy and the human perspective",
  "We are kind, humble, and like to have fun together",
  "We want to create something new in the market",
  "Our ambition is to attract exciting assignments, customers, and employees",
  "You can help build the company together with us if you'd like to",
  "Good compensation and benefits — salary, pension, insurance, tools, health, and well-being",
];

export default function JoinUsPage() {
  return (
    <>
      <PageNav variant="blue" />
      <main>

        {/* ── HERO ───────────────────────────────── */}
        <section className="cursor-white bg-[var(--color-business-blue)] px-6 md:px-12 py-20 md:py-32 text-center">
          <div className="mx-auto" style={{ maxWidth: "1100px" }}>
            <h1
              className="font-extrabold text-white leading-[0.9] tracking-[var(--letter-spacing-tight)] mb-10"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Recruitment,<br />salary and benefits
            </h1>
            <p
              className="font-light text-white mx-auto"
              style={{ fontSize: "clamp(1.125rem, 1.75vw, 1.4rem)", maxWidth: "40ch", lineHeight: 1.6 }}
            >
              We are a small transformation studio specializing in business development, innovation, and design — and we are looking for people who want to help build it with us.
            </p>
          </div>
        </section>

        {/* ── WHO WE RECRUIT ─────────────────────── */}
        <FadeIn>
          <section className="bg-white px-6 md:px-12 py-24 md:py-40">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>

              <div style={{ display: "flex", alignItems: "flex-start", gap: "60px", marginBottom: "56px" }}>
                <h2
                  className="font-extrabold text-[var(--color-text-primary)]"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", flexShrink: 0 }}
                >
                  Who are we<br />
                  <span className="text-[var(--color-business-blue)]">recruiting?</span>
                </h2>
                <p
                  className="font-light text-[var(--color-text-secondary)]"
                  style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.7, maxWidth: "38ch", paddingTop: "8px" }}
                >
                  We are mainly searching for people we have worked with, trust, and who can complement us in terms of skills, personality, and diversity.
                </p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", gap: "12px" }}>

                {/* Card 01 — cream */}
                <div style={{ backgroundColor: "#f5f3ee", borderRadius: "16px", padding: "32px" }}>
                  <h3 className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", lineHeight: 1.25, marginBottom: "24px" }}>
                    Primary expertise we&apos;re seeking.
                  </h3>
                  <ul style={{ listStyle: "disc", paddingLeft: "18px", margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["Strategic or tactical design", "Customer research", "Service design, CX or UX", "Innovation, business design and business development", "Operations (for example designops)"].map((item) => (
                      <li key={item} className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.5 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 02 — blue */}
                <div className="cursor-white" style={{ backgroundColor: "var(--color-business-blue)", borderRadius: "16px", padding: "32px" }}>
                  <h3 className="font-extrabold text-white" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", lineHeight: 1.25, marginBottom: "24px" }}>
                    We also value experience with:
                  </h3>
                  <ul style={{ listStyle: "disc", paddingLeft: "18px", margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                    {["Leadership", "Change management", "Communication", "Coaching", "Visualization", "Facilitation", "Education"].map((item) => (
                      <li key={item} className="font-light text-white/80" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.5 }}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card 03 — cream, wider */}
                <div style={{ backgroundColor: "#f5f3ee", borderRadius: "16px", padding: "32px" }}>
                  <h3 className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", lineHeight: 1.25, marginBottom: "16px" }}>
                    Roles we believe our employees have worked in.
                  </h3>
                  <p className="font-light text-[var(--color-text-secondary)] mb-6" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.65 }}>
                    We are looking for those who have worked as managers, leaders, or in tactical or strategic roles in business development, design, and innovation.
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {["Business Developer", "Service Designer or UX", "Design Lead, director or manager", "Strategic Designer", "Design Coach", "Innovation Coach", "CXO", "Head of…", "VP of…"].map((role) => (
                      <span key={role} className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "0.8rem", border: "1px solid var(--color-border-default)", borderRadius: "100px", padding: "4px 12px", whiteSpace: "nowrap" }}>
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── IMAGE STRIP ─────────────────────────── */}
        <FadeIn>
          <VibesMarquee />
        </FadeIn>

        {/* ── WHY JOIN ────────────────────────────── */}
        <FadeIn>
          <section className="bg-white px-6 md:px-12 py-24 md:py-40">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>
              <h2
                className="font-extrabold text-[var(--color-text-primary)]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", maxWidth: "12ch", marginBottom: "64px" }}
              >
                What can make people{" "}
                <span className="text-[var(--color-business-blue)]">start and stay</span>{" "}
                with us
              </h2>
              <div>
                {reasons.map((text, i) => (
                  <div
                    key={i}
                    style={{ display: "flex", alignItems: "center", borderTop: "1px solid var(--color-border-default)", padding: "22px 0", gap: "32px" }}
                  >
                    <span className="font-extrabold text-[var(--color-text-muted)]" style={{ width: "72px", flexShrink: 0, fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-light text-[var(--color-text-secondary)]" style={{ flex: 1, fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.6 }}>
                      {text}
                    </p>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid var(--color-border-default)" }} />
              </div>
            </div>
          </section>
        </FadeIn>

        {/* ── SALARY MODEL ────────────────────────── */}
        <FadeIn>
          <section className="bg-white px-6 md:px-12 pt-24 md:pt-40 pb-24 md:pb-40">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>

              {/* Heading */}
              <h2
                className="font-extrabold text-[var(--color-text-primary)] text-center"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "20px" }}
              >
                Our salary <span className="text-[var(--color-business-blue)]">model</span>
              </h2>
              <p className="font-light text-[var(--color-text-secondary)] mb-20 text-center mx-auto" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.75, maxWidth: "48ch" }}>
                Our model is basic, but different compared to many other companies.
              </p>

              {/* 4 points — editorial rows in 2 columns */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 60px" }}>
                {[
                  {
                    title: "A guaranteed salary, even between assignments.",
                    body: "Studio Manfred pays a guaranteed salary of 40.000:-, even if you as an employee have no assignment or are on holiday (this is when we use our financial buffer).",
                  },
                  {
                    title: "You decide your salary.",
                    body: "By selecting your assignments, how much you work, and how much you get paid by the customers. With this model, you don't need to have a salary discussion with your manager (Jens).",
                  },
                  {
                    title: "You decide your own levels.",
                    body: "You decide for yourself your own levels of education, equipment and pension, but have to pay for it yourself.",
                  },
                  {
                    title: "Manfred pays the collective part.",
                    body: "Studio Manfred pays for our collective part like administration, some general software, financial buffer and profit.",
                  },
                ].map(({ title, body }, i) => (
                  <div key={title} style={{ borderBottom: "1px solid var(--color-border-default)", padding: "32px 0" }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, color: "var(--color-business-blue)", marginBottom: "16px" }}><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                    <h3 className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", lineHeight: 1.3, marginBottom: "10px" }}>{title}</h3>
                    <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.75 }}>{body}</p>
                  </div>
                ))}
              </div>

              {/* Examples */}
              <div style={{ marginTop: "100px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "60px", marginBottom: "40px" }}>
                  <h3 className="font-extrabold text-[var(--color-business-blue)]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1, flexShrink: 0 }}>
                    Examples
                  </h3>
                  <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.75, maxWidth: "56ch", paddingTop: "4px" }}>
                    Here are examples of monthly salary depending on how much you are paid per hour by our customer. For example, if you work full-time at a customer and get paid{" "}
                    <strong className="font-extrabold text-[var(--color-text-primary)]">1.150:- exkl. tax</strong>, you get roughly{" "}
                    <strong className="font-extrabold text-[var(--color-text-primary)]">78.471:- per month before tax</strong>{" "}
                    (excluding cost for pension, equipment, and education).
                  </p>
                </div>

                <table className="w-full border-collapse" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid var(--color-border-default)" }}>
                      <th className="font-extrabold text-[var(--color-text-muted)] text-left text-xs uppercase tracking-widest py-3 pr-8">Payment level per hour</th>
                      <th className="font-extrabold text-[var(--color-text-muted)] text-right text-xs uppercase tracking-widest py-3">Salary per month</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["750 SEK", "51.089 SEK", false],
                      ["850 SEK", "57.901 SEK", false],
                      ["950 SEK", "64.713 SEK", false],
                      ["1.050 SEK", "71.592 SEK", false],
                      ["1.150 SEK", "78.471 SEK", true],
                      ["1.250 SEK", "85.350 SEK", false],
                      ["1.350 SEK", "92.229 SEK", false],
                      ["1.450 SEK", "99.860 SEK", false],
                      ["1.550 SEK", "109.146 SEK", false],
                    ].map(([rate, salary, highlight]) => (
                      <tr
                        key={rate as string}
                        style={{
                          borderBottom: "1px solid var(--color-border-default)",
                          backgroundColor: highlight ? "rgba(26,54,211, 0.05)" : "transparent",
                        }}
                      >
                        <td className="font-light text-[var(--color-text-secondary)] py-3 pr-8">{rate}</td>
                        <td
                          className="py-3 text-right"
                          style={{ fontWeight: highlight ? 800 : 300, color: highlight ? "var(--color-business-blue)" : "var(--color-text-primary)" }}
                        >
                          {salary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <p className="font-light italic text-[var(--color-text-muted)]" style={{ marginTop: "20px", fontSize: "clamp(0.8rem, 1vw, 0.9rem)", lineHeight: 1.7 }}>
                  * Full-time means 30 days holiday, 1 Manfred Magic day per month, full-time on assignment for the rest — holiday compensation included. Occupational pension and equipment are deducted from the above.
                </p>
              </div>

              {/* What goes to Manfred */}
              <div style={{ backgroundColor: "#f5f3ee", borderRadius: "16px", padding: "48px", marginTop: "60px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "60px", marginBottom: "40px" }}>
                  <h3
                    className="font-extrabold text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.1, flexShrink: 0 }}
                  >
                    What goes to{" "}
                    <span className="text-[var(--color-business-blue)]">Manfred?</span>
                  </h3>
                  <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.75, maxWidth: "36ch", paddingTop: "4px" }}>
                    As 42% of revenue goes to Manfred, we use it for…
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 60px" }}>
                  {[
                    {
                      title: "Buffer",
                      body: "The biggest post is financial buffer — to pay for when you are between assignments and to cover your salary when you are on vacation.",
                    },
                    {
                      title: "Social and fun",
                      body: "Dinners, conferences, trips, and social events. 20,000 SEK per person per year.",
                    },
                    {
                      title: "Administration",
                      body: "Office, insurances, licenses, accounting, healthcare and profit.",
                    },
                  ].map(({ title, body }) => (
                    <div key={title} style={{ paddingTop: "4px" }}>
                      <h4 className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", marginBottom: "10px" }}>{title}</h4>
                      <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.75 }}>{body}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>
        </FadeIn>

        {/* ── IMAGE CLUSTER ───────────────────────── */}
        <FadeIn>
          <div className="bg-white" style={{ padding: "40px 0 100px" }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 0 }}>
              <LoopingPhoto
                images={["/vibes/moa-katt.jpeg", "/vibes/manfred-unn.jpeg", "/vibes/IMG_3375.jpg"]}
                interval={2600}
                sizes="25vw"
                style={{ width: 260, height: 360, flexShrink: 0, position: "relative", zIndex: 1 }}
              />
              <LoopingPhoto
                images={["/vibes/IMG_3542.jpeg", "/vibes/moa-xconf.jpeg", "/vibes/axel-jens.jpeg"]}
                interval={2000}
                sizes="28vw"
                style={{ width: 300, height: 430, flexShrink: 0, position: "relative", zIndex: 3, marginLeft: -45, marginBottom: 30 }}
              />
              <LoopingPhoto
                images={["/vibes/moa%3C3.jpeg", "/vibes/ws-v\u00E4skan.jpeg", "/vibes/Image%20from%20iOS%20(6).jpg"]}
                interval={2400}
                sizes="24vw"
                style={{ width: 245, height: 375, flexShrink: 0, position: "relative", zIndex: 2, marginLeft: -45 }}
              />
            </div>
          </div>
        </FadeIn>

        {/* ── FINE DETAILS ────────────────────────── */}
        <FadeIn>
          <section className="bg-white px-6 md:px-12 py-24 md:py-40">
            <div className="mx-auto" style={{ maxWidth: "1100px" }}>

              {/* Large centered super-heading */}
              <h2
                className="font-extrabold text-[var(--color-text-primary)] text-center"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.0, letterSpacing: "-0.03em", marginBottom: "80px" }}
              >
                Everything you<br />
                <span className="text-[var(--color-business-blue)]">need to know</span>
              </h2>

              {/* Off-grid: narrow left gutter + right column with title + FAQ */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "60px", alignItems: "start" }}>

                {/* Left: "The fine details." anchored top-right of its column */}
                <div style={{ paddingTop: "4px" }}>
                  <h3
                    className="font-extrabold text-[var(--color-text-primary)]"
                    style={{ fontSize: "clamp(1rem, 1.4vw, 1.2rem)", lineHeight: 1.2, letterSpacing: "-0.01em" }}
                  >
                    The fine details
                  </h3>
                </div>

                {/* Right: FAQ entries */}
                <div>

                  {(() => {
                    const s = { fontSize: "clamp(0.875rem, 1.2vw, 1rem)", lineHeight: 1.8 };
                    const entry = (title: string, children: React.ReactNode, last = false, first = false) => (
                      <div key={title} style={{ borderTop: first ? "none" : "1px solid var(--color-border-default)", paddingTop: first ? "0" : "28px", paddingBottom: "28px", borderBottom: last ? "1px solid var(--color-border-default)" : "none" }}>
                        <p className="font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1rem, 1.4vw, 1.15rem)", marginBottom: "12px" }}>{title}</p>
                        <div className="font-light text-[var(--color-text-secondary)]" style={s}>{children}</div>
                      </div>
                    );
                    return [
                      entry("Financial security and salary", <>
                        <p className="mb-3">You are guaranteed a minimum salary of 40.000:- even when you are without assignments. We constantly strive to have a financial buffer, so everyone can be without assignments for up to 4 months without us getting nervous.</p>
                        <p className="italic">For example, if you start the 1st of October, and have an assignment from the first day, you still get paid 40.000:- the 25th of October, but what you earned in October will be paid in November.</p>
                      </>, false, true),
                      entry("Salary", <>
                        <p className="mb-3">Salary is paid monthly, on the 25th or the nearest business day before.</p>
                        <p className="mb-3">If your revenue does not cover your total cost (including the allocation to Manfred) and the guaranteed salary needs to be used (i.e., funds are taken from the buffer to pay the guaranteed salary), amortized costs for equipment and training will be moved.</p>
                        <p className="mb-3">However, your pension contribution will be deducted from the guaranteed salary unless you actively choose to pause it.</p>
                        <p>We have a general monthly cap on how much is allocated to Manfred. The cap is SEK 100,000/month.</p>
                      </>),
                      entry("Social and fun", <>
                        <p>Our ambition is to have fun together. We plan for 20,000 SEK per person per year to go out and eat or go on conference or do social and fun things together.</p>
                      </>),
                      entry("Flexibility and working hours", <>
                        <p>You can work as much or as little as you want, as long as you agree with your client.</p>
                      </>),
                      entry("Vacation", <>
                        <p className="mb-3">You are entitled to 30 days of vacation. You may save a maximum of 5 days per year for up to 5 years.</p>
                        <p className="mb-3">During the first year of employment, the number of vacation days is earned proportionally to the number of days employed.</p>
                        <p>Vacation pay is distributed semi-annually (see Vacation Pay section).</p>
                      </>),
                      entry("Vacation Pay", <>
                        <p className="mb-3">Manfred pays out vacation pay (semesterersättning) during the same year it is earned. This means that employees receive vacation pay directly from the start of employment. Payments are made twice a year, in the August and January salary. We follow the regulations as below.</p>
                        <p className="mb-2 font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "inherit" }}>The following vacation compensation is paid per vacation day:</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          <li className="mb-1">— On the fixed salary part: (Guaranteed Salary × 0.43%)</li>
                          <li>— On the variable salary part: (((Average monthly salary − Guaranteed salary) × 12%) × 12 months) / 30 vacation days</li>
                        </ul>
                      </>),
                      entry("Pension", <>
                        <p className="mb-3">We provide the opportunity to save for a pension through an occupational pension (tjänstepension via löneväxling). It is set aside monthly from your gross salary according to your wishes.</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 12px" }}>
                          <li className="mb-1">— <strong className="font-extrabold text-[var(--color-text-primary)]">Where:</strong> Avanza</li>
                          <li className="mb-1">— <strong className="font-extrabold text-[var(--color-text-primary)]">How:</strong> The consultant determines the amount.</li>
                          <li>— <strong className="font-extrabold text-[var(--color-text-primary)]">When:</strong> Money is deposited from your first full month or when you want to start saving (once a month). The money is deducted in the salary model the same month the deposit is made. The deposit is made at the end of the month.</li>
                        </ul>
                        <p className="italic">Example: A consultant wants to start setting aside 5,000 into an occupational pension from March. In the salary sheet, −5,000 is entered as a pension contribution from March onwards. The money ends up in the consultant&apos;s Avanza account at the end of March. Salary payments from April onwards will be lower.</p>
                      </>),
                      entry("Notice period", <>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          <li className="mb-1">— Employment period 0–2 years: 1 month</li>
                          <li className="mb-1">— Employment period 2–4 years: 2 months</li>
                          <li>— Employment period &gt; 4 years: 3 months</li>
                        </ul>
                      </>),
                      entry("Tools", <>
                        <p>You decide what equipment you need. The cost is deducted from your revenues according to the salary model.</p>
                      </>),
                      entry("Competence and education", <>
                        <p>We meet one day a month to learn from each other. You decide your own level of training and conferences. The cost is deducted from your revenues according to the salary model.</p>
                      </>),
                      entry("Extra parental leave", <>
                        <p>We pay out extra parental leave up to the guarantee level for 6 months.</p>
                      </>),
                      entry("Sickness", <>
                        <p className="mb-3">No waiting period (karensdag) or salary deduction during your first 14 sick days.</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          <li className="mb-1">— We pay salary as usual during sick days 1–14.</li>
                          <li>— From day 15: Salary deduction per day (Guaranteed Salary × 4.6%) — 4.6% of monthly salary = 1 working day.</li>
                        </ul>
                      </>),
                      entry("VAB", <>
                        <p>We follow the regulations below. From day 1: Salary deduction per day (Guaranteed Salary × 4.6%) — 4.6% of monthly salary = 1 working day.</p>
                      </>),
                      entry("Health and wellness", <>
                        <p className="mb-3">We have a number of benefits to make sure you stay well:</p>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          <li className="mb-2">— <strong className="font-extrabold text-[var(--color-text-primary)]">Health insurance:</strong> Add-on with a cost, via Länsförsäkringar.</li>
                          <li className="mb-2">— <strong className="font-extrabold text-[var(--color-text-primary)]">Training and wellness:</strong> You can purchase training and wellness (according to the tax authority&apos;s definition) where Studio Manfred covers up to 5,000 SEK according to the tax authority&apos;s regulations. If it costs more than 5,000 SEK you pay privately and will be reimbursed 5,000 SEK on your next salary.</li>
                          <li>— <strong className="font-extrabold text-[var(--color-text-primary)]">Health check-up:</strong> via Aleris.</li>
                        </ul>
                      </>, true),
                    ];
                  })()}

                </div>
              </div>{/* end grid */}
            </div>
          </section>
        </FadeIn>

        {/* ── CTA ─────────────────────────────────── */}
        <FadeIn>
          <section className="bg-white px-6 md:px-12 py-24 md:py-40">
            <div className="mx-auto text-center" style={{ maxWidth: "1100px" }}>
              <h2
                className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Sound like your kind of place?
              </h2>
              <p
                className="font-light text-[var(--color-text-secondary)] mb-10 mx-auto"
                style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)", lineHeight: 1.65, maxWidth: "40ch" }}
              >
                We&apos;d love to hear from you. Drop us a line and let&apos;s talk.
              </p>
              <Button variant="brand" size="lg" asChild>
                <a href="mailto:hello@studiomanfred.com">Get in touch</a>
              </Button>
            </div>
          </section>
        </FadeIn>

      </main>
      <Footer />
    </>
  );
}
