import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageNav } from "@/components/PageNav";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { fontSize } from "@/lib/typography";
import { capabilities, cases, partners, pillars } from "@/lib/group";

export const metadata: Metadata = {
  title: "Group — SeventyOne, Manfred & Mather",
  description:
    "Three distinct companies, united by a purpose and shared values. A collective of senior consultants: our power is our independence; our strength is our collaboration.",
};

const sectionTitleClass =
  "font-extrabold leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-10";

const bodyClass = "font-light text-[var(--color-text-secondary)]";
const bodyStyle = { fontSize: fontSize.body, lineHeight: 1.6 };

export default function GroupPage() {
  return (
    <>
      <PageNav variant="blue" />
      <main id="main" tabIndex={-1}>
        <Section background="blue" width="default" padding="first">
          <h1
            className="font-extrabold text-white leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-10"
            style={{ fontSize: fontSize.sectionTitle }}
          >
            We are SeventyOne, Manfred, and Mather.
          </h1>
          <div
            className="font-light text-[var(--color-text-on-brand-muted)] flex flex-col gap-6"
            style={{ fontSize: fontSize.lead, lineHeight: 1.5 }}
          >
            <p>
              Three distinct companies, united by a purpose and shared values. We reject the
              &lsquo;parent company&rsquo; model. We are a collective of senior consultants. Our
              power is our independence; our strength is our collaboration.
            </p>
            <p>
              We move fast, remain adaptive, and deploy tailored expertise where it matters most:
              accelerating your organization&rsquo;s growth, change, and expertise through
              leadership, modern product capabilities, and the right people.
            </p>
            <p className="text-white font-normal">We rely on trust and keep things uncomplicated.</p>
          </div>
        </Section>

        <Section background="white" width="default">
          <h2
            className={`${sectionTitleClass} text-[var(--color-business-blue)]`}
            style={{ fontSize: fontSize.sectionTitle }}
          >
            Value is our only metric
          </h2>
          <p
            className="font-light text-[var(--color-text-primary)]"
            style={{ fontSize: fontSize.bodyLarge, lineHeight: 1.45 }}
          >
            We deliver senior-level expertise on your terms. We are not rigid, we are adaptive. We
            come in, listen, deliver, and build capability that lasts, focusing on tangible
            outcomes, not just output.
          </p>
        </Section>

        <Section background="white" width="default">
          <h2
            className={`${sectionTitleClass} text-[var(--color-business-blue)]`}
            style={{ fontSize: fontSize.sectionTitle }}
          >
            Our three pillars of value
          </h2>
          <ul className="grid gap-12 md:grid-cols-3" role="list">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="border-t-2 border-[var(--color-business-blue)] pt-6">
                <h3
                  className="font-extrabold text-[var(--color-business-blue)] mb-4"
                  style={{ fontSize: fontSize.eyebrow }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="font-semibold text-[var(--color-text-primary)] mb-4"
                  style={bodyStyle}
                >
                  {pillar.lead}
                </p>
                <p className={bodyClass} style={bodyStyle}>
                  {pillar.body}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        <Section background="white" width="default">
          <h2
            className={`${sectionTitleClass} text-[var(--color-business-blue)]`}
            style={{ fontSize: fontSize.sectionTitle }}
          >
            How we work
          </h2>
          <div
            className="font-light text-[var(--color-text-primary)] flex flex-col gap-6"
            style={{ fontSize: fontSize.lead, lineHeight: 1.5 }}
          >
            <p>
              We believe expertise should remove complexity. We work closely with your teams,
              shaping direction, sharpening decision-making, and enabling modern product practices
              that scale.
            </p>
            <p>You get senior specialists who are both strategic and hands-on.</p>
          </div>

          <h3
            className="font-extrabold text-[var(--color-text-primary)] mt-20 mb-8"
            style={{ fontSize: fontSize.eyebrow }}
          >
            Core capability areas
          </h3>
          <ul className="flex flex-col" role="list">
            {capabilities.map((capability) => (
              <ListRow key={capability.title} title={capability.title} level="h4">
                {capability.description}
              </ListRow>
            ))}
          </ul>
        </Section>

        <Section background="white" width="default">
          <h2
            className={`${sectionTitleClass} text-[var(--color-business-blue)]`}
            style={{ fontSize: fontSize.sectionTitle }}
          >
            Selected cases
          </h2>
          <ul className="flex flex-col" role="list">
            {cases.map((item) => (
              <ListRow key={item.title} title={item.title} level="h3">
                {item.description}
              </ListRow>
            ))}
          </ul>
        </Section>

        <Section background="white" width="default">
          <h2
            className={`${sectionTitleClass} text-[var(--color-business-blue)]`}
            style={{ fontSize: fontSize.sectionTitle }}
          >
            Selected partners
          </h2>
          <ul
            className="flex flex-wrap gap-x-8 gap-y-4 font-semibold text-[var(--color-text-primary)]"
            style={{ fontSize: fontSize.lead }}
            role="list"
          >
            {partners.map((partner) => (
              <li key={partner}>{partner}</li>
            ))}
          </ul>
        </Section>
      </main>
      <Footer />
    </>
  );
}

function ListRow({
  title,
  level,
  children,
}: {
  title: string;
  level: "h3" | "h4";
  children: ReactNode;
}) {
  const Heading = level;
  return (
    <li className="border-t border-[var(--color-border-default)] py-8 md:grid md:grid-cols-[2fr_3fr] md:gap-12">
      <Heading
        className="font-extrabold text-[var(--color-text-primary)] mb-3 md:mb-0"
        style={{ fontSize: fontSize.body, lineHeight: 1.4 }}
      >
        {title}
      </Heading>
      <p className={bodyClass} style={bodyStyle}>
        {children}
      </p>
    </li>
  );
}
