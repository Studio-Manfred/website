import Link from "next/link";
import type { CaseSummary } from "@/lib/cases";

// The /cases overview (STU-1148): every published case from the intranet's
// Case CMS, with its consultant. Same type scale as the case pages.

export function CaseList({ cases }: { cases: CaseSummary[] }) {
  return (
    <section className="bg-white px-6 md:px-12 py-20 md:py-32">
      <div className="mx-auto" style={{ maxWidth: "1200px" }}>
        <h1
          className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-16"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Cases
        </h1>

        {cases.length === 0 && (
          <p className="font-light text-[var(--color-text-secondary)]">No cases yet.</p>
        )}

        <ul className="grid gap-8 md:grid-cols-2">
          {cases.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/cases/${c.slug}`}
                className="group block h-full border-t-4 border-[var(--color-business-blue)] pt-6 pb-8"
              >
                {c.categoryLine && (
                  <p className="text-sm font-light text-[var(--color-text-muted)] mb-3">{c.categoryLine}</p>
                )}
                <h2
                  className="font-extrabold text-[var(--color-text-primary)] group-hover:text-[var(--color-business-blue)] transition-colors mb-6"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
                >
                  {c.title}
                </h2>
                {c.locked && (
                  <p className="flex items-center gap-2 text-sm font-light text-[var(--color-text-muted)] mb-4">
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="4" y="11" width="16" height="10" rx="2" />
                      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                    </svg>
                    Password protected
                  </p>
                )}
                {c.consultants.map((p, i) => (
                  <div key={i} className="flex items-center gap-3 mt-2">
                    {p.photoUrl && (
                      <div style={{ width: "40px", height: "40px", borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
                        {/* The name is right beside it, so the photo is decorative. */}
                        <img src={p.photoUrl} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                      </div>
                    )}
                    <div>
                      <p className="font-extrabold text-[var(--color-text-primary)] text-sm">{p.name}</p>
                      {p.title && <p className="font-light text-[var(--color-text-secondary)] text-sm">{p.title}</p>}
                    </div>
                  </div>
                ))}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
