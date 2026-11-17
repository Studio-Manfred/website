import { ProcessTimeline } from "@/components/ProcessTimeline";
import { CaseLightbox } from "@/components/CaseLightbox";
import type { CaseBlock, CaseStudy as Study } from "@/lib/cases";

// A case page built in the intranet's Case CMS (STU-1146). Same layout and
// type scale as the original hardcoded case pages (Fishbrain, Bokadirekt).

const bodyText = { fontSize: "clamp(1rem, 1.5vw, 1.2rem)", lineHeight: 1.75 };
const sidebarLabel = "text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3";

function BlockHeading({ children }: { children: string }) {
  if (!children) return null;
  return (
    <h2 className="font-extrabold text-[var(--color-text-primary)] mb-6" style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}>
      {children}
    </h2>
  );
}

function Paragraphs({ text }: { text: string }) {
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {paragraphs.map((p, i) => (
        <p key={i} className="font-light text-[var(--color-text-primary)] mb-6 whitespace-pre-line" style={bodyText}>
          {p}
        </p>
      ))}
    </>
  );
}

function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  if (!items.length) return null;
  return (
    <ul className={`flex flex-col gap-3 ${className}`} style={{ fontSize: bodyText.fontSize }}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-4 items-start">
          <span aria-hidden="true" className="mt-[0.6em] flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-business-blue)]" />
          <span className="font-light text-[var(--color-text-secondary)]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// The big key figure of an outcome (STU-1153). A leading minus is read as "minus".
function OutcomeFigure({ figure }: { figure: string }) {
  const spoken = figure.replace(/^[-\u2212]/, "minus ");
  return (
    <p className="font-extrabold text-[var(--color-business-blue)] text-[32px] @md:text-4xl leading-[1.1] tabular-nums whitespace-nowrap mb-2 min-h-12 flex items-center">
      <span aria-hidden={spoken !== figure || undefined}>{figure}</span>
      {spoken !== figure && <span className="sr-only">{spoken}</span>}
    </p>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "brief":
      return (
        <div>
          <BlockHeading>{block.heading}</BlockHeading>
          <Paragraphs text={block.text} />
          <Bullets items={block.bullets} />
        </div>
      );
    case "process":
      return (
        <ProcessTimeline
          heading={block.heading}
          steps={block.steps.map((s, i) => ({ ...s, id: i + 1 }))}
          stakeholders={block.stakeholders}
        />
      );
    case "deliverables":
      return (
        <div>
          <BlockHeading>{block.heading}</BlockHeading>
          <Paragraphs text={block.text} />
          <Bullets items={block.bullets} className="mb-10" />
          <div className="flex flex-col gap-8">
            {block.images.map((img, i) => (
              <CaseLightbox key={i} src={img.src} alt={img.alt} label={img.label} note={img.showNote && img.note ? img.note : null} />
            ))}
          </div>
        </div>
      );
    case "outcomes": {
      // Two columns once the block itself is wide enough (container query), because the
      // sidebar sits beside it from 769 px and leaves a narrow column at first.
      // Arbitrary values on purpose: the design system ships a full utility sheet (grid-cols-1,
      // hidden, h-0, ...) that can land after the container rules and win over them.
      const hasFigures = block.items.some((item) => item.figure?.trim());
      return (
        <div className="@container">
          <BlockHeading>{block.heading}</BlockHeading>
          <ul className="grid grid-cols-[minmax(0,1fr)] @md:grid-cols-[repeat(2,minmax(0,1fr))] list-none p-0 m-0">
            {block.items.map((item, i) => (
              <li
                key={i}
                className="border-t border-[var(--color-border-default)] py-5 @md:odd:pr-6 @md:even:pl-6 @md:even:border-l @md:last:odd:col-span-2 @md:last:odd:pr-0"
              >
                {item.figure?.trim() ? (
                  <OutcomeFigure figure={item.figure.trim()} />
                ) : (
                  hasFigures && <div data-testid="figure-gap" aria-hidden="true" className="h-[0px] @md:h-[48px] @md:mb-[8px]" />
                )}
                <p className="font-extrabold text-[var(--color-text-primary)] mb-2" style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)" }}>
                  {item.heading}
                </p>
                <p className="font-light text-[var(--color-text-secondary)]" style={{ fontSize: "15px", lineHeight: 1.6 }}>
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

export function CaseStudy({ study }: { study: Study }) {
  const { consultants, facts } = study.sidebar;
  const hasSidebar = consultants.length > 0 || facts.length > 0;

  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="mb-20">
          {study.categoryLine && (
            <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">{study.categoryLine}</p>
          )}
          <h1
            className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {study.title}
          </h1>
          {study.intro && (
            <p className="font-light text-[var(--color-text-primary)] max-w-3xl whitespace-pre-line" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)", lineHeight: 1.7 }}>
              {study.intro}
            </p>
          )}
          {study.heroImage && (
            // eslint-disable-next-line @next/next/no-img-element -- same plain <img> as the other case images
            <img src={study.heroImage.src} alt={study.heroImage.alt} className="w-full aspect-[2/1] object-cover rounded block mt-8 sm:mt-10" />
          )}
        </div>

        <div className="course-layout" style={{ display: "flex", gap: "5rem", alignItems: "flex-start" }}>
          <div className="flex-1 min-w-0 flex flex-col gap-16">
            {study.blocks.map((block) => (
              <Block key={block.id} block={block} />
            ))}
          </div>

          {hasSidebar && (
            <aside className="course-sidebar" style={{ width: "280px", flexShrink: 0 }}>
              <div className="flex flex-col gap-8">
                {consultants.length > 0 && (
                  <div className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className={`${sidebarLabel} mb-4`}>{consultants.length > 1 ? "Consultants" : "Consultant"}</p>
                    <div className="flex flex-col gap-4">
                      {consultants.map((c, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {c.photoUrl && (
                            <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                              <img src={c.photoUrl} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                            </div>
                          )}
                          <div>
                            <p className="font-extrabold text-[var(--color-text-primary)] text-sm">{c.name}</p>
                            {c.title && <p className="font-light text-[var(--color-text-secondary)] text-sm">{c.title}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {facts.map((f, i) => (
                  <div key={i} className="border-t-4 border-[var(--color-business-blue)] pt-5">
                    <p className={sidebarLabel}>{f.label}</p>
                    <div className="flex flex-col gap-1 text-sm font-light text-[var(--color-text-primary)]">
                      {f.items.map((item, k) => (
                        <p key={k}>{item}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
