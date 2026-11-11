"use client";

import type { CSSProperties } from "react";
import type { Activity, Guide, GuideProcess, Role } from "@/lib/triple-diamond";
import { LevelTag, PHASE_BG, label } from "./triple-diamond-parts";

// The process roadmap (used when a guide has `process`): the client's triple
// diamond redrawn as HTML, with the activities placed under their phase in
// three steps. One DOM for every width, in reading order (phase by phase,
// then step by step). From lg the pieces are placed into one grid with a
// column per sub-phase: labels, diamonds, goals, then a row per step, so the
// diagram and the activities line up. Wrappers are `lg:contents` so their
// children become grid items there.

type Props = {
  guide: Guide & { process: GuideProcess };
  active: Role<string>[];
  visible: (acts: Activity[]) => Activity[];
  onOpen: (activity: Activity, role: string, phaseIndex: number, sub: string) => void;
};

// Grid rows from lg: groups, phase labels, diamonds, goals, then a header
// and a row of cells per step, then the assignment sizes.
const ROW = { groups: 1, labels: 2, diamonds: 3, goals: 4 };
const stepHeaderRow = (step: number) => 3 + step * 2;
const stepRow = (step: number) => 4 + step * 2;

const place = (col: string, row: number | string) => ({ "--c": col, "--r": String(row) }) as CSSProperties;
const placed = "lg:[grid-column:var(--c)] lg:[grid-row:var(--r)]";

function DiamondCell({ name, subs, before, after }: { name: string; subs: number; before: string; after?: string }) {
  const lines = Array.from({ length: subs - 1 }, (_, k) => ((k + 1) / subs) * 100);
  const milestone = "absolute top-[164px] max-w-[110px] text-[11px] font-extrabold leading-tight text-[var(--color-business-blue)]";
  const dot = "absolute top-[80px] -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[var(--color-business-blue)]";
  return (
    <div className="relative h-[200px]">
      <svg aria-hidden="true" viewBox="0 0 100 160" preserveAspectRatio="none" className="absolute inset-x-0 top-0 w-full h-[160px]">
        <line x1="0" y1="80" x2="100" y2="80" stroke="var(--color-business-blue)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        <polygon points="8,80 50,6 92,80 50,154" fill="white" fillOpacity="0.7" stroke="var(--color-business-blue)" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        {lines.map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="160" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="2 4" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <span aria-hidden="true" className={`${dot} left-0`} />
      <span className={`${milestone} left-0`}>{before}</span>
      {after && (
        <>
          <span aria-hidden="true" className={`${dot} right-0`} />
          <span className={`${milestone} right-0 text-right`}>{after}</span>
        </>
      )}
      <h2
        className="absolute inset-x-0 top-0 h-[160px] flex items-center justify-center text-center px-[20%] font-extrabold leading-[1.1] tracking-[var(--letter-spacing-tight)] text-[var(--color-business-blue)]"
        style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)" }}
      >
        {name}
      </h2>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <span aria-hidden="true" className="inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-full bg-[var(--color-business-blue)] text-white text-xs font-extrabold">
      {n}
    </span>
  );
}

export function TripleDiamondProcess({ guide, active, visible, onOpen }: Props) {
  const { phases, process } = guide;
  const counts = phases.map((p) => p.subs.length);
  const total = counts.reduce((a, b) => a + b, 0);
  const starts = counts.map((_, i) => counts.slice(0, i).reduce((a, b) => a + b, 0));
  const stops = phases.map((_, i) => {
    const from = (starts[i] / total) * 100;
    const to = ((starts[i] + counts[i]) / total) * 100;
    return `${PHASE_BG[i % PHASE_BG.length]} ${from}% ${to}%`;
  });
  const gridStyle = {
    "--cols": `repeat(${total}, minmax(0, 1fr))`,
    "--tints": `linear-gradient(to right, ${stops.join(", ")})`,
  } as CSSProperties;
  const subLabel = (s: { name: string; tag?: string }) => (s.tag ? `${s.tag} · ${s.name}` : s.name);

  const groups = process.groups.map((g, gi) => {
    const from = process.groups.slice(0, gi).reduce((n, x) => n + x.phases, 0);
    return { g, items: phases.slice(from, from + g.phases).map((p, k) => ({ p, pi: from + k })) };
  });

  return (
    <div>
      <div className="mb-10">
        <p className={`${label} mb-4`}>{process.stepsTitle}</p>
        <dl className="grid gap-4 sm:grid-cols-3">
          {process.steps.map((s) => (
            <div key={s.id} className="flex gap-3">
              <StepBadge n={s.id} />
              <div>
                <dt className="font-extrabold text-sm">
                  {process.step} {s.id}: {s.name}
                </dt>
                <dd className="text-sm font-light text-[var(--color-text-secondary)] mt-1">{s.description}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      <div style={gridStyle} className="lg:grid lg:[grid-template-columns:var(--cols)] lg:[background:var(--tints)] lg:rounded-2xl">
        {groups.map(({ g, items: groupPhases }) => {
          const first = groupPhases[0].pi;
          const span = groupPhases.reduce((n, { pi }) => n + counts[pi], 0);
          return (
            <div key={g.name} className="lg:contents">
              <div style={place(`${starts[first] + 1} / span ${span}`, ROW.groups)} className={`${placed} max-lg:mt-8 max-lg:mb-4 lg:px-3 lg:pt-6`}>
                <p className="font-extrabold text-xl text-[var(--color-text-primary)]">{g.name}</p>
                <p className="text-sm font-light text-[var(--color-text-secondary)] pb-2 border-b-2 border-[var(--color-text-primary)]">{g.sub}</p>
              </div>

              {groupPhases.map(({ p, pi }) => {
                const col = `${starts[pi] + 1} / span ${counts[pi]}`;
                return (
                  <section key={p.name} aria-label={p.name} style={{ background: PHASE_BG[pi % PHASE_BG.length] }} className="lg:contents max-lg:rounded-2xl max-lg:p-4 max-lg:mb-4">
                    <div style={place(col, ROW.diamonds)} className={`${placed} lg:px-3`}>
                      <DiamondCell
                        name={p.name}
                        subs={counts[pi]}
                        before={process.milestones[pi]}
                        after={pi === phases.length - 1 ? process.milestones[pi + 1] : undefined}
                      />
                    </div>
                    {p.goal && (
                      <div style={place(col, ROW.goals)} className={`${placed} mt-4 lg:mt-0 lg:px-3 lg:pb-4`}>
                        <p className={`${label} mb-1`}>{guide.copy.goal}</p>
                        <p className="text-sm font-light text-[var(--color-text-primary)]" style={{ lineHeight: 1.6 }}>
                          {p.goal}
                        </p>
                      </div>
                    )}

                    {p.subs.map((s, k) => {
                      const c = String(starts[pi] + k + 1);
                      const sep = k > 0 ? "lg:border-l lg:border-dashed lg:border-black/15" : "";
                      return (
                        <div key={s.name} className="lg:contents">
                          <h3 style={place(c, ROW.labels)} className={`${placed} ${sep} max-lg:mt-6 max-lg:pt-4 max-lg:border-t max-lg:border-black/10 lg:px-3 lg:pt-3 font-extrabold text-[var(--color-text-primary)] text-sm`}>
                            {s.tag && <span className="block text-xs font-extrabold text-[var(--color-business-blue)]">{s.tag}</span>}
                            {s.name}
                          </h3>
                          {process.steps.map((st) => {
                            const items = active.flatMap((r) => visible((s.acts[r.id] ?? []).filter((a) => a.step === st.id)).map((a) => ({ a, r })));
                            return (
                              <div key={st.id} style={place(c, stepRow(st.id))} className={`${placed} ${sep} lg:px-2 lg:pb-3 ${items.length ? "max-lg:mt-4" : "max-lg:hidden"}`}>
                                <p className="lg:sr-only flex items-center gap-2 text-xs font-extrabold mb-2">
                                  <StepBadge n={st.id} />
                                  {process.step} {st.id}: {st.name}
                                </p>
                                {items.length > 0 && (
                                  <ul aria-label={`${subLabel(s)}, ${process.step} ${st.id}`} className="space-y-2">
                                    {items.map(({ a, r }) => (
                                      <li key={a.title}>
                                        <button
                                          type="button"
                                          onClick={() => onOpen(a, r.name, pi, subLabel(s))}
                                          className="group w-full text-left rounded-lg bg-white border border-black/10 hover:border-[var(--color-business-blue)] px-3 py-2"
                                        >
                                          <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-[var(--color-business-blue)]">
                                            {r.short ?? r.name}
                                          </span>
                                          <span className="block text-sm font-light text-[var(--color-text-primary)] group-hover:text-[var(--color-business-blue)] group-hover:underline underline-offset-4" style={{ lineHeight: 1.45 }}>
                                            {a.title}
                                          </span>
                                          {a.level && guide.levels.length > 0 && (
                                            <span className="block mt-1">
                                              <LevelTag guide={guide} id={a.level} />
                                            </span>
                                          )}
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </section>
                );
              })}
            </div>
          );
        })}

        {/* The step rows' headers, from lg only: each cell names its step for screen readers. */}
        {process.steps.map((st) => (
          <div
            key={st.id}
            aria-hidden="true"
            style={place("1 / -1", stepHeaderRow(st.id))}
            className={`${placed} max-lg:hidden lg:flex items-center gap-2 px-3 pt-4 pb-2 border-t border-[color-mix(in_srgb,var(--color-business-blue)_40%,transparent)] text-sm font-extrabold`}
          >
            <StepBadge n={st.id} />
            {process.step} {st.id}: {st.name}
          </div>
        ))}

        {process.sizes && process.sizes.length > 0 && (
          <>
            <p style={place("1 / -1", stepRow(3) + 1)} className={`${placed} ${label} max-lg:mt-8 mb-2 lg:mb-0 lg:px-3 lg:pt-6 lg:pb-2`}>
              {process.sizesLabel}
            </p>
            {process.sizes.map((z, i) => (
              <div key={z.name} style={place(`${z.from + 1} / ${z.to + 2}`, stepRow(3) + 2 + i)} className={`${placed} lg:px-2 pb-2 ${i === process.sizes!.length - 1 ? "lg:pb-5" : ""}`}>
                <p className="rounded-lg border-2 border-[var(--color-business-blue)] bg-white/70 text-center text-sm py-1.5">
                  {z.name}
                  {z.range && <span className="font-light text-[var(--color-text-muted)]"> · {z.range}</span>}
                </p>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
