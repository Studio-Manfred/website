"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import { CompanyAvatar } from "@/components/GroupChat";
import { BRANDS } from "@/components/group-brands";
import { GROUP_COMPANIES, GROUP_PEOPLE, GROUP_SKILLS, type GroupPerson, type GroupSkill } from "@/lib/group";
import { STATUS_LABEL, type PersonStatus } from "@/lib/group-status";
import { layoutNetwork } from "@/lib/network";
import { fontSize } from "@/lib/typography";

const COMPANY_NAME = Object.fromEntries(GROUP_COMPANIES.map((c) => [c.id, c.name]));
const LAYOUT = layoutNetwork(GROUP_PEOPLE, GROUP_SKILLS);
const pct = (v: number) => `${v * 100}%`;

const CHIP = "rounded-full border border-[var(--color-text-primary)] px-4 py-2 text-sm";
const CHIP_ON = "bg-[var(--color-text-primary)] text-white";
const CHIP_OFF = "bg-white text-[var(--color-text-primary)] hover:bg-[var(--color-text-primary)] hover:text-white";

const STATUS_DOT: Record<PersonStatus, string> = {
  available: "bg-[var(--color-feedback-success-fg)]",
  soon: "bg-[var(--color-feedback-warning-fg)]",
  busy: "bg-[var(--color-text-secondary)]",
};

// Everyone in the group as one network: each skill is a hub, the hubs are
// joined into one ring, and each person is linked to the hubs of their skills,
// so people who share skills sit where those skills overlap. A skill chip dims
// everyone else, and with statuses (from the group's assignment sheet) so does
// "Visa tillgängliga". Clicking a person opens a panel about them. Photos are
// greyscale so the three sites' portraits read as one set.
export function GroupPeople({ statuses = {} }: { statuses?: Record<string, PersonStatus> }) {
  const [skill, setSkill] = useState<GroupSkill | null>(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const hasStatuses = Object.keys(statuses).length > 0;
  const [selected, setSelected] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  const person = GROUP_PEOPLE.find((p) => p.name === selected);
  const focus = hovered ?? selected;

  function open(name: string) {
    const next = selected === name ? null : name;
    setSelected(next);
    // Below the network on small screens the panel can be out of view.
    if (next && window.matchMedia?.("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView?.({ behavior: "smooth", block: "nearest" }));
    }
  }

  const lineState = (p: GroupPerson, s: GroupSkill) => {
    if (focus) return p.name === focus ? "on" : "off";
    if (skill) return s === skill ? "on" : "off";
    return "idle";
  };

  return (
    <section aria-labelledby="people-heading" className="mt-24 md:mt-36">
      <h2
        id="people-heading"
        className="font-extrabold tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]"
        style={{ fontSize: fontSize.sectionTitle, lineHeight: 1 }}
      >
        People
      </h2>
      <p className="mt-4 max-w-xl font-light text-[var(--color-text-primary)]" style={{ fontSize: fontSize.lead }}>
        Different roles, overlapping strengths. One whole that holds together.
      </p>

      <div role="group" aria-label="Filtrera på förmåga" className="mt-8 flex flex-wrap gap-2 md:mt-10">
        {[null, ...GROUP_SKILLS].map((s) => (
          <button
            key={s ?? "all"}
            type="button"
            aria-pressed={skill === s}
            onClick={() => setSkill(s)}
            className={`${CHIP} ${skill === s ? CHIP_ON : CHIP_OFF}`}
          >
            {s ?? "All"}
          </button>
        ))}
        {hasStatuses && (
          <button
            type="button"
            aria-pressed={onlyAvailable}
            onClick={() => setOnlyAvailable((v) => !v)}
            className={`${CHIP} inline-flex items-center gap-2 sm:ml-4 ${onlyAvailable ? CHIP_ON : CHIP_OFF}`}
          >
            <span aria-hidden className={`size-2.5 rounded-full ${STATUS_DOT.available}`} />
            Visa tillgängliga
          </button>
        )}
      </div>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="relative mx-auto aspect-square w-full max-w-[760px]">
          <div
            aria-hidden
            className="absolute inset-[2%] rounded-[50%_46%_52%_48%/48%_52%_46%_54%] bg-[var(--color-bg-subtle)]"
          />
          <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
            {/* The skills joined into one ring: every skill is part of the whole. */}
            {LAYOUT.ring.map((s, i) => {
              const next = LAYOUT.ring[(i + 1) % LAYOUT.ring.length];
              const a = LAYOUT.hubs[s];
              const b = LAYOUT.hubs[next];
              return (
                <line
                  key={`ring-${s}`}
                  data-ring={`${s}|${next}`}
                  x1={a.x * 100}
                  y1={a.y * 100}
                  x2={b.x * 100}
                  y2={b.y * 100}
                  vectorEffect="non-scaling-stroke"
                  strokeDasharray="2 6"
                  strokeLinecap="round"
                  className="stroke-[var(--color-text-primary)] [stroke-opacity:0.55] [stroke-width:2px]"
                />
              );
            })}
            {GROUP_PEOPLE.flatMap((p) =>
              p.skills.map((s) => {
                const a = LAYOUT.people[p.name];
                const b = LAYOUT.hubs[s];
                const state = lineState(p, s);
                return (
                  <line
                    key={`${p.name}-${s}`}
                    x1={a.x * 100}
                    y1={a.y * 100}
                    x2={b.x * 100}
                    y2={b.y * 100}
                    vectorEffect="non-scaling-stroke"
                    className={`stroke-[var(--color-text-primary)] transition-[stroke-opacity,stroke-width] duration-300 ${
                      state === "on" ? "[stroke-opacity:0.9] [stroke-width:2px]" : state === "off" ? "[stroke-opacity:0.08] [stroke-width:1px]" : "[stroke-opacity:0.3] [stroke-width:1px]"
                    }`}
                  />
                );
              }),
            )}
          </svg>

          <ul aria-label="People" className="absolute inset-0">
            {GROUP_PEOPLE.map((p) => {
              const pos = LAYOUT.people[p.name];
              const status = statuses[p.name];
              const dimmed =
                (skill !== null && !p.skills.includes(skill)) || (onlyAvailable && status !== "available" && status !== "soon");
              const isSelected = selected === p.name;
              return (
                <li
                  key={p.name}
                  data-dimmed={dimmed}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${dimmed ? "opacity-25" : ""} ${isSelected ? "z-10" : ""}`}
                  style={{ left: pct(pos.x), top: pct(pos.y) }}
                >
                  <button
                    type="button"
                    aria-label={`${p.name}, ${p.role}, ${COMPANY_NAME[p.company]}${status ? `, ${STATUS_LABEL[status]}` : ""}`}
                    aria-expanded={isSelected}
                    aria-controls={panelId}
                    onClick={() => open(p.name)}
                    onPointerEnter={() => setHovered(p.name)}
                    onPointerLeave={() => setHovered(null)}
                    className="group flex flex-col items-center"
                  >
                    <span
                      className={`relative block size-9 rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110 sm:size-14 lg:size-[68px] ${
                        isSelected ? "scale-110 ring-[3px] ring-[var(--color-text-primary)]" : "ring-2 ring-white"
                      }`}
                    >
                      <Image src={p.photo} alt="" fill sizes="68px" className="rounded-full object-cover grayscale" />
                      {status && (
                        <span
                          data-status={status}
                          className={`absolute -top-0.5 -left-0.5 size-3 rounded-full ring-2 ring-white sm:size-4 ${STATUS_DOT[status]}`}
                        />
                      )}
                      <span className="absolute -right-1.5 -bottom-1.5 max-sm:hidden">
                        <span className="block origin-bottom-right scale-75">
                          <CompanyAvatar id={p.company} small />
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1.5 w-[4.75rem] text-center text-[11px] leading-tight font-semibold text-[var(--color-text-primary)] max-md:hidden"
                    >
                      {p.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Hub labels sit above the people so a photo never hides a skill. */}
          {GROUP_SKILLS.map((s) => {
            const h = LAYOUT.hubs[s];
            const dim = skill !== null && skill !== s;
            return (
              <span
                key={s}
                aria-hidden
                className={`pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-text-primary)] px-2.5 py-1 text-[10px] font-bold tracking-wide whitespace-nowrap text-white uppercase transition-opacity duration-300 md:px-3 md:text-xs ${dim ? "opacity-25" : ""}`}
                style={{ left: pct(h.x), top: pct(h.y) }}
              >
                {s}
              </span>
            );
          })}
        </div>

        <div ref={panelRef} id={panelId} aria-live="polite" className="lg:sticky lg:top-8">
          {person ? (
            <PersonPanel key={person.name} person={person} status={statuses[person.name]} onClose={() => setSelected(null)} />
          ) : (
            <p className="rounded-2xl border border-dashed border-[var(--color-text-primary)]/30 p-6 text-[var(--color-text-secondary)]">
              Klicka på en person i nätverket för att läsa mer. Linjerna visar vilka förmågor var och en har, och var de möts.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function PersonPanel({ person, status, onClose }: { person: GroupPerson; status?: PersonStatus; onClose: () => void }) {
  const headingId = useId();
  const firstName = person.name.split(" ")[0];
  return (
    <section aria-labelledby={headingId} className="relative motion-safe:animate-msg-in">
      <button
        type="button"
        onClick={onClose}
        aria-label="Stäng"
        className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-white text-lg text-[var(--color-text-primary)] shadow-sm hover:bg-[var(--color-text-primary)] hover:text-white"
      >
        <span aria-hidden>×</span>
      </button>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[var(--color-bg-muted)]">
        <Image src={person.photo} alt="" fill sizes="340px" className="object-cover grayscale" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <CompanyAvatar id={person.company} small />
        <span className={BRANDS[person.company].name}>{COMPANY_NAME[person.company]}</span>
      </div>
      <h3 id={headingId} className="mt-3 text-2xl font-extrabold tracking-[var(--letter-spacing-tight)] text-[var(--color-text-primary)]">
        {person.name}
      </h3>
      <p className="mt-1 text-[var(--color-text-secondary)]">{person.role}</p>
      {status && (
        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-muted)] px-3 py-1 text-sm font-semibold text-[var(--color-text-primary)]">
          <span aria-hidden className={`size-2.5 rounded-full ${STATUS_DOT[status]}`} />
          {STATUS_LABEL[status]}
        </p>
      )}
      <ul aria-label="Förmågor" className="mt-4 flex flex-wrap gap-1.5">
        {person.skills.map((s) => (
          <li key={s} className="rounded-full bg-[var(--color-text-primary)] px-3 py-1 text-xs font-semibold text-white">
            {s}
          </li>
        ))}
      </ul>
      {person.bio && <p className="mt-4 leading-relaxed text-[var(--color-text-primary)]">{person.bio}</p>}
      {person.profile && (
        <a
          href={person.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 font-semibold text-[var(--color-text-primary)] underline underline-offset-4"
        >
          Läs mer om {firstName}
          <span aria-hidden>↗</span>
        </a>
      )}
    </section>
  );
}
