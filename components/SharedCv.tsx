import Link from "next/link";
import { PrintButton } from "@/components/PrintButton";
import type { SharedCv as Cv } from "@/lib/cv";

// A shared CV (STU-1155), in the case-page style: name in the blue heading,
// the CV text on the left, a sidebar with the consultant, contact and linked
// cases. The print stylesheet (app/globals.css) turns it into an A4 PDF.

const LABELS = {
  en: { kicker: "Curriculum Vitae · Studio Manfred", consultant: "Consultant", contact: "Contact", cases: "Cases", pdf: "Download PDF" },
  sv: { kicker: "CV · Studio Manfred", consultant: "Konsult", contact: "Kontakt", cases: "Case", pdf: "Ladda ner PDF" },
} as const;

const boxLabel = "text-xs font-extrabold text-[var(--color-business-blue)] uppercase tracking-widest mb-3";
const INNER_HTML_PROP = "dangerouslySetInnerHTML" as const;

export function SharedCv({ cv }: { cv: Cv }) {
  const t = LABELS[cv.language];
  return (
    <section className="cv-page bg-white px-6 md:px-12 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <div className="relative mb-16 flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">{t.kicker}</p>
            <h1
              className="cv-name font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-4"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {cv.name}
            </h1>
            {cv.title && (
              <p className="font-light text-[var(--color-text-primary)]" style={{ fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)" }}>
                {cv.title}
              </p>
            )}
          </div>
          <PrintButton label={t.pdf} />
        </div>

        <div className="course-layout" style={{ display: "flex", gap: "5rem", alignItems: "flex-start" }}>
          {/* CV text is sanitized in lib/cv.ts (sanitizeCvHtml) before it gets here. */}
          <div className="cv-body flex-1 min-w-0" {...{ [INNER_HTML_PROP]: { __html: cv.contentHtml } }} />

          <aside className="course-sidebar" style={{ width: "280px", flexShrink: 0 }}>
            <div className="flex flex-col gap-8">
              <div className="cv-box border-t-4 border-[var(--color-business-blue)] pt-5">
                <p className={`${boxLabel} mb-4`}>{t.consultant}</p>
                <div className="flex items-center gap-3">
                  {cv.avatarUrl && (
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                      <img src={cv.avatarUrl} alt={cv.name} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                    </div>
                  )}
                  <div>
                    <p className="font-extrabold text-[var(--color-text-primary)] text-sm">{cv.name}</p>
                    {cv.role && <p className="text-sm font-light text-[var(--color-text-primary)]">{cv.role}</p>}
                  </div>
                </div>
              </div>
              {cv.email && (
                <div className="cv-box border-t-4 border-[var(--color-business-blue)] pt-5">
                  <p className={boxLabel}>{t.contact}</p>
                  <a href={`mailto:${cv.email}`} className="text-sm font-light text-[var(--color-text-primary)] underline break-all">{cv.email}</a>
                </div>
              )}
              <div className="cv-box border-t-4 border-[var(--color-business-blue)] pt-5">
                <p className={boxLabel}>Studio Manfred</p>
                <p className="text-sm font-light text-[var(--color-text-primary)]">Stockholm</p>
              </div>
              {cv.cases.length > 0 && (
                <div className="cv-box border-t-4 border-[var(--color-business-blue)] pt-5">
                  <p className={boxLabel}>{t.cases}</p>
                  <ul className="flex flex-col gap-1 text-sm font-light">
                    {cv.cases.map((c) => (
                      <li key={c.slug}>
                        <Link href={`/cases/${c.slug}`} className="text-[var(--color-business-blue)] underline">{c.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
