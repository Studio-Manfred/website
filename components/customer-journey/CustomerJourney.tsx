"use client";

import { useState } from "react";
import { INDUSTRIES } from "@/lib/customer-journey/datasets";
import {
  buildInsights,
  buildWatch,
  deliveryCurve,
  emotionCurve,
  expectCurve,
  metricsFor,
  rankOpportunities,
  resolveValue,
  visibleGroups,
} from "@/lib/customer-journey/engine";
import type {
  IndustryId,
  MatrixCell,
  MatrixRow,
} from "@/lib/customer-journey/types";
import {
  ROW_STEP,
  SECTION_STEP,
  inStep,
  type Step,
} from "@/lib/customer-journey/levels";
import type { Consultant } from "@/lib/cases";
import { CJ_CASE_DEFAULTS } from "@/lib/customer-journey/case";
import { EmotionChart, GapChart } from "./charts";
import { AskBar } from "./AskBar";
import { CellDialog, InsightsDialog, type CellDetail } from "./dialogs";
import { FilterBar, ROLES, type PersonaChoice } from "./FilterBar";
import { StepTag } from "./steps";
import { InfoTip } from "./InfoTip";
import {
  BLUE,
  OPPORTUNITY,
  SENTIMENT,
  label,
  pad2,
  personaColor,
  personaTint,
} from "./theme";

// The Customer Journey Intelligence demo as a case page. Rebuilt in React from
// the stand-alone demo (customer-journey-demo/index.html) in the site's brand:
// filters at the top, the complexity roadmap, then the gap analysis and the
// journey instrument (emotion curve, touchpoints and the metrics matrix). The
// complexity filter shows what each step of the roadmap gives you. All data
// is synthetic.

const LIST = Object.values(INDUSTRIES);
const STAT_LABELS: Record<string, string> = {
  customers: "Customers",
  nps: "NPS median",
  retention: "12-month retention",
  interviews: "Interviews",
  appstore: "App Store",
};
const KIND = {
  quant: { name: "Quantitative", color: BLUE },
  qual: { name: "Qualitative", color: "var(--color-chart-2)" },
  behaviour: { name: "Behaviour", color: "var(--color-chart-4)" },
} as const;
const TREND = { up: "↑", down: "↓", flat: "→" } as const;

// Label column plus six phase columns; the journey scrolls sideways on phones.
const GRID = "grid grid-cols-[180px_repeat(6,minmax(0,1fr))]";

type Props = {
  title?: string;
  intro?: string;
  categoryLine?: string;
  consultants?: Consultant[];
};

export function CustomerJourney({
  title = CJ_CASE_DEFAULTS.title,
  intro = CJ_CASE_DEFAULTS.intro,
  categoryLine = CJ_CASE_DEFAULTS.categoryLine,
  consultants = [],
}: Props = {}) {
  const [industryId, setIndustryId] = useState<IndustryId>("finance");
  const ind = INDUSTRIES[industryId];
  const [seg, setSeg] = useState(ind.segments[0].id);
  const [personaChoice, setPersonaChoice] = useState<PersonaChoice>(null);
  const [role, setRole] = useState("all");
  const [focus, setFocus] = useState<number | null>(null);
  const [gapPhase, setGapPhase] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [tpOpen, setTpOpen] = useState(false);
  const [closed, setClosed] = useState<Record<string, boolean>>({});
  const [cell, setCell] = useState<CellDetail | null>(null);
  const [insightsOpen, setInsightsOpen] = useState(false);
  // The build steps are folded away until asked for; closing them shows everything again.
  const [stepsOpen, setStepsOpen] = useState(false);
  const [step, setStep] = useState<Step | null>(null);
  const hideSteps = () => {
    setStepsOpen(false);
    setStep(null);
  };
  // Step tags only help while the steps are open and every step is shown.
  const tagsOn = stepsOpen && step === null;
  const gapOn = inStep(SECTION_STEP.gap, step);
  const askOn = inStep(SECTION_STEP.ask, step);
  const journeyOn = inStep(SECTION_STEP.journey, step);

  const compareAll = personaChoice === "all";
  const persona = ind.personas.find((p) => p.id === personaChoice) ?? null;
  const metrics = metricsFor(ind, seg, persona);
  const segLabel = ind.segments.find((s) => s.id === seg)?.label ?? "";
  const ranked = rankOpportunities(ind.opportunities, gapPhase);
  const markers = rankOpportunities(ind.opportunities, null);
  const groups = visibleGroups(role, step);

  const changeIndustry = (id: IndustryId) => {
    setIndustryId(id);
    setSeg(INDUSTRIES[id].segments[0].id);
    setPersonaChoice(null);
    setFocus(null);
    setGapPhase(null);
    setSelected(null);
  };
  const toggleFocus = (i: number) => setFocus((f) => (f === i ? null : i));

  const openCell = (row: MatrixRow, c: MatrixCell, i: number) =>
    setCell({
      title: c.headline || row.name,
      phase: `Phase ${i + 1} · ${ind.phases[i].name}`,
      quote: c.quote,
      details: c.details ?? [],
    });

  return (
    <section className="bg-white px-6 md:px-12 lg:px-8 pt-20 md:pt-32 pb-20">
      <div className="mx-auto" style={{ maxWidth: "1400px" }}>
        <header className="mb-16">
          {categoryLine && (
            <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">
              {categoryLine}
            </p>
          )}
          <h1
            className="font-extrabold text-[var(--color-business-blue)] leading-[var(--line-height-tight)] tracking-[var(--letter-spacing-tight)] mb-8 max-w-4xl"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            {title}
          </h1>
          <p
            className="font-light text-[var(--color-text-primary)] max-w-3xl"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
              lineHeight: 1.7,
            }}
          >
            {intro}
          </p>
          {consultants.map((c, i) => (
            <div key={i} className="flex items-center gap-3 mt-8">
              {c.photoUrl && (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  {/* The name is right beside it, so the photo is decorative. */}
                  <img
                    src={c.photoUrl}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>
              )}
              <div>
                <p className="font-extrabold text-[var(--color-text-primary)] text-sm">
                  {c.name}
                </p>
                {c.title && (
                  <p className="font-light text-[var(--color-text-secondary)] text-sm">
                    {c.title}
                  </p>
                )}
              </div>
            </div>
          ))}
        </header>

        <div>
          <FilterBar
            industries={LIST}
            industry={industryId}
            onIndustry={changeIndustry}
            segments={ind.segments}
            seg={seg}
            onSeg={setSeg}
            personas={ind.personas}
            persona={personaChoice}
            onPersona={setPersonaChoice}
            role={role}
            onRole={setRole}
            onInsights={() => setInsightsOpen(true)}
            insightsOn={inStep(SECTION_STEP.insights, step)}
            step={step}
            onStep={setStep}
            stepsOpen={stepsOpen}
            onToggleSteps={() => (stepsOpen ? hideSteps() : setStepsOpen(true))}
          />

          {persona && (
            <div
              className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl p-5"
              style={{ background: personaTint(persona.color) }}
            >
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl"
              >
                {persona.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-extrabold">
                  {persona.name}{" "}
                  <span className="font-light">· {persona.tagline}</span>
                </p>
                <p className="text-sm font-light text-[var(--color-text-secondary)]">
                  {persona.desc}
                </p>
              </div>
              <ul className="flex flex-wrap gap-2">
                {persona.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-white px-3 py-1 text-xs"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setPersonaChoice(null)}
                className="text-sm font-light underline underline-offset-4 hover:text-[var(--color-business-blue)]"
              >
                Clear persona
              </button>
            </div>
          )}

          {/* Industry overview */}
          <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className={`${label} mb-3`}>
                {ind.industry} · Journey overview
              </p>
              <h2
                className="font-extrabold leading-[1.1] tracking-[var(--letter-spacing-tight)] max-w-3xl"
                style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
              >
                The customer journey at{" "}
                <span className="text-[var(--color-business-blue)]">
                  {ind.name}
                </span>
              </h2>
              <p
                className="mt-4 max-w-2xl font-light text-[var(--color-text-secondary)]"
                style={{ lineHeight: 1.7 }}
              >
                {ind.description} Qualitative and quantitative signals in one
                instrument. Pick a phase to focus on it.
              </p>
            </div>
            <dl className="grid grid-cols-2 sm:grid-cols-5 gap-x-8 gap-y-4">
              {Object.entries(ind.stats).map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs font-light text-[var(--color-text-muted)]">
                    {STAT_LABELS[k] ?? k}
                  </dt>
                  <dd
                    className="font-extrabold text-[var(--color-business-blue)] order-first"
                    style={{ fontSize: "clamp(1.5rem, 2.2vw, 2rem)" }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {askOn && (
            <div className="mt-12">
              <AskBar
                key={industryId}
                examples={[
                  `Churn risk for ${ind.personas[1].name}`,
                  "Which phases have the biggest gap between expectation and delivery?",
                  `Compare NPS and retention for ${ind.personas[0].name} and ${ind.personas[3].name}`,
                  "What drives support tickets in onboarding?",
                  "Top 3 low-effort quick wins",
                ]}
              />
            </div>
          )}

          {/* Gap analysis */}
          {gapOn && (
            <section
              aria-labelledby="cj-gap"
              className="mt-16 border-t-4 border-[var(--color-business-blue)] pt-6"
            >
              <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3">
                    <h2
                      id="cj-gap"
                      className="font-extrabold leading-[1.15] tracking-[var(--letter-spacing-tight)]"
                      style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}
                    >
                      Gap: expectation against experience
                    </h2>
                    <InfoTip topic="the gap analysis">
                      What customers expect along the journey (solid line)
                      against what {ind.name} delivers (dashed). The shaded area
                      between the curves is the gap: the bigger it is, the bigger
                      the opportunity. Hover a phase for its numbers, and pick a
                      touchpoint to see effort and reward.
                    </InfoTip>
                  </div>
                  {tagsOn && (
                    <p className="mt-2">
                      <StepTag step={SECTION_STEP.gap} />
                    </p>
                  )}
                </div>
                <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-light">
                  <li className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="h-[3px] w-6 rounded"
                      style={{
                        background: compareAll
                          ? "var(--color-text-muted)"
                          : persona
                            ? personaColor(persona.color)
                            : BLUE,
                      }}
                    />
                    Expectation
                  </li>
                  <li className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="w-6 border-t-2 border-dashed border-[var(--color-text-primary)]"
                    />
                    Delivery
                  </li>
                  {(["crit", "quick", "watch"] as const).map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-3 w-3 rounded-full"
                        style={{ background: OPPORTUNITY[t].color }}
                      />
                      {OPPORTUNITY[t].label}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
                <div className="min-w-0 rounded-2xl bg-[var(--beige-light)] p-4 md:p-6">
                  <GapChart
                    phases={ind.phases}
                    expect={expectCurve(ind, persona)}
                    delivery={deliveryCurve(ind, seg, persona)}
                    expectColor={persona ? personaColor(persona.color) : BLUE}
                    compare={
                      compareAll
                        ? ind.personas.map((p) => ({
                            persona: p,
                            expect: expectCurve(ind, p),
                            delivery: deliveryCurve(ind, seg, p),
                          }))
                        : undefined
                    }
                    markers={markers}
                    selected={selected}
                    onSelect={(i) => setSelected((s) => (s === i ? null : i))}
                    moments={persona ? { persona } : undefined}
                  />
                  <div
                    role="group"
                    aria-label="Show opportunities for a phase"
                    className="mt-4 ml-12 grid grid-cols-3 sm:grid-cols-6"
                  >
                    {ind.phases.map((p, i) => (
                      <button
                        key={p.name}
                        type="button"
                        aria-pressed={gapPhase === i}
                        onClick={() => setGapPhase((g) => (g === i ? null : i))}
                        className={`rounded-xl px-2 py-2 text-center text-xs transition-colors ${gapPhase === i ? "bg-[var(--color-business-blue)] text-white" : "hover:bg-white"}`}
                      >
                        <span className="block font-light opacity-80">
                          {pad2(i)}
                        </span>
                        <span className="block font-extrabold">{p.name}</span>
                      </button>
                    ))}
                  </div>
                  {compareAll && (
                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-light">
                      {ind.personas.map((p) => (
                        <li key={p.id}>
                          <button
                            type="button"
                            onClick={() => setPersonaChoice(p.id)}
                            className="flex items-center gap-2 hover:text-[var(--color-business-blue)] hover:underline underline-offset-4"
                          >
                            <span
                              aria-hidden="true"
                              className="h-[3px] w-6 rounded"
                              style={{ background: personaColor(p.color) }}
                            />
                            <span aria-hidden="true">{p.emoji}</span>
                            {p.name}{" "}
                            <span className="text-[var(--color-text-muted)]">
                              {p.share}%
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className={`${label} mb-1`}>Opportunities</h3>
                  <p className="text-sm font-light text-[var(--color-text-muted)] mb-4">
                    Ranked by reward per effort
                    {gapPhase !== null && ` · ${ind.phases[gapPhase].name}`}
                  </p>
                  {ranked.length === 0 ? (
                    <p className="rounded-2xl border border-dashed border-[var(--color-border-default)] p-6 text-center text-sm font-light text-[var(--color-text-secondary)]">
                      No opportunities in this phase.
                    </p>
                  ) : (
                    <ul className="max-h-[480px] lg:max-h-[300px] space-y-3 overflow-y-auto pr-1">
                      {ranked.map((o) => {
                        const t = OPPORTUNITY[o.type];
                        const on = selected === o.index;
                        return (
                          <li key={o.index}>
                            <button
                              type="button"
                              aria-pressed={on}
                              onClick={() => setSelected(on ? null : o.index)}
                              className={`w-full rounded-2xl border p-4 text-left transition-colors ${on ? "border-[var(--color-business-blue)] bg-[var(--blue-50)]" : "border-[var(--color-border-default)] hover:border-[var(--color-business-blue)]"}`}
                              style={{
                                borderLeftWidth: 4,
                                borderLeftColor: t.color,
                              }}
                            >
                              <span className="flex items-center justify-between gap-3">
                                <span
                                  className="rounded-full px-2.5 py-0.5 text-xs"
                                  style={{ background: t.bg, color: t.fg }}
                                >
                                  {t.label}
                                </span>
                                <span className="text-xs font-light text-[var(--color-text-muted)]">
                                  {ind.phases[o.phase].name}
                                </span>
                              </span>
                              <span className="mt-2 block font-extrabold leading-snug">
                                {o.name}
                              </span>
                              <span className="mt-3 grid grid-cols-[56px_1fr_32px] items-center gap-x-2 gap-y-1.5 text-xs">
                                {(["reward", "effort"] as const).map((k) => (
                                  <span key={k} className="contents">
                                    <span className="font-light text-[var(--color-text-secondary)]">
                                      {k === "reward" ? "Reward" : "Effort"}
                                    </span>
                                    <span
                                      aria-hidden="true"
                                      className="h-1.5 rounded-full bg-[var(--color-border-default)]"
                                    >
                                      <span
                                        className="block h-full rounded-full"
                                        style={{
                                          width: `${(o[k] / 5) * 100}%`,
                                          background:
                                            k === "reward"
                                              ? BLUE
                                              : "var(--color-text-primary)",
                                        }}
                                      />
                                    </span>
                                    <span className="text-right font-extrabold">
                                      {o[k]}/5
                                    </span>
                                  </span>
                                ))}
                              </span>
                              {on && (
                                <span
                                  className="mt-3 block text-sm font-light text-[var(--color-text-secondary)]"
                                  style={{ lineHeight: 1.6 }}
                                >
                                  {o.desc}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* Journey instrument */}
          <section
            aria-labelledby="cj-journey"
            className={gapOn ? "mt-14" : "mt-16 border-t-4 border-[var(--color-business-blue)] pt-6"}
          >
            <div className="mb-6 flex items-center gap-3">
              <h2
                id="cj-journey"
                className="font-extrabold leading-[1.15] tracking-[var(--letter-spacing-tight)]"
                // Right under the gap analysis it reads as part of the same section.
                style={{ fontSize: gapOn ? "clamp(1.15rem, 1.6vw, 1.4rem)" : "clamp(1.4rem, 2.4vw, 2rem)" }}
              >
                Journey instrument
              </h2>
              <InfoTip topic="the journey instrument">
                The emotion curve, touchpoints and metrics for each phase of the
                journey. Pick a phase to highlight it, and a cell for its
                details. The view in the filter, and the build step when the
                steps are open, decide which rows you see.
              </InfoTip>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[var(--color-border-default)]">
              <div className="min-w-[980px]">
                <div
                  className={`${GRID} border-b border-[var(--color-border-default)] bg-[var(--beige-light)]`}
                >
                  <div />
                  {ind.phases.map((p, i) => (
                    <button
                      key={p.name}
                      type="button"
                      aria-pressed={focus === i}
                      onClick={() => toggleFocus(i)}
                      className={`border-l border-[var(--color-border-default)] px-4 py-4 text-left transition-colors ${focus === i ? "bg-[var(--color-business-blue)] text-white" : "hover:bg-white"}`}
                    >
                      <span className="block text-xs font-light opacity-80">
                        {pad2(i)}
                      </span>
                      <span className="block font-extrabold">{p.name}</span>
                      <span className="block text-xs font-light opacity-80">
                        {p.sub}
                      </span>
                    </button>
                  ))}
                </div>

                {journeyOn && (
                  <>
                    <div
                      className={`${GRID} border-b border-[var(--color-border-default)]`}
                    >
                      <div className="px-4 py-4">
                        <p className="font-extrabold text-sm">Emotion curve</p>
                        <p className="text-xs font-light text-[var(--color-text-muted)]">
                          Sentiment 0–100 · NPS and interviews
                        </p>
                        {tagsOn && (
                          <p className="mt-2">
                            <StepTag step={SECTION_STEP.journey} />
                          </p>
                        )}
                      </div>
                      <div className="col-span-6 px-0 py-4">
                        <EmotionChart
                          phases={ind.phases}
                          cards={ind.emotionCards}
                          curve={emotionCurve(ind, seg, persona)}
                          base={
                            persona ? emotionCurve(ind, seg, null) : undefined
                          }
                          compare={
                            compareAll
                              ? ind.personas.map((p) => ({
                                  persona: p,
                                  curve: emotionCurve(ind, seg, p),
                                }))
                              : undefined
                          }
                          focus={focus}
                          onFocus={toggleFocus}
                        />
                      </div>
                    </div>

                    <div
                      className={`${GRID} border-b border-[var(--color-border-default)]`}
                    >
                      <div />
                      {ind.emotionCards.map((e, i) => (
                        <button
                          key={i}
                          type="button"
                          aria-pressed={focus === i}
                          onClick={() => toggleFocus(i)}
                          className={`border-l border-[var(--color-border-default)] p-4 text-left text-sm transition-colors ${focus === i ? "bg-[var(--blue-50)]" : "hover:bg-[var(--color-bg-subtle)]"}`}
                        >
                          <span className="flex items-center gap-2 font-extrabold leading-snug">
                            <span
                              aria-hidden="true"
                              className="h-2.5 w-2.5 shrink-0 rounded-full"
                              style={{
                                background: SENTIMENT[e.sentiment].color,
                              }}
                            />
                            {e.emotion}
                          </span>
                          <span
                            className="mt-2 block font-light italic text-[var(--color-text-secondary)]"
                            style={{ lineHeight: 1.5 }}
                          >
                            {e.quote}
                          </span>
                          <span className="mt-3 block text-xs text-[var(--color-business-blue)]">
                            {e.moment}
                          </span>
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      aria-expanded={tpOpen}
                      onClick={() => setTpOpen((o) => !o)}
                      className="flex w-full items-center justify-between border-b border-[var(--color-border-default)] px-4 py-3 text-left text-sm hover:bg-[var(--color-bg-subtle)]"
                    >
                      <span className="flex items-center gap-4">
                        <span className={label}>Touchpoints</span>
                        {tagsOn && <StepTag step={SECTION_STEP.touchpoints} />}
                      </span>
                      <svg
                        aria-hidden="true"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className={`transition-transform ${tpOpen ? "rotate-180" : ""}`}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {tpOpen && (
                      <div
                        className={`${GRID} border-b border-[var(--color-border-default)]`}
                      >
                        <div className="px-4 py-4 text-xs font-light text-[var(--color-text-muted)]">
                          Per phase · satisfaction and notes
                        </div>
                        {ind.touchpoints.map((list, i) => (
                          <ul
                            key={i}
                            className={`space-y-2 border-l border-[var(--color-border-default)] p-3 ${focus === i ? "bg-[var(--blue-50)]" : ""}`}
                          >
                            {list.map((t) => {
                              const low =
                                t.sat !== "–" && parseFloat(t.sat) < 4;
                              return (
                                <li
                                  key={t.name}
                                  className="rounded-xl bg-[var(--color-bg-subtle)] p-3 text-xs"
                                >
                                  <p className="font-extrabold text-sm leading-snug">
                                    {t.name}
                                  </p>
                                  <p className="mt-1 font-light text-[var(--color-text-secondary)]">
                                    {t.sat !== "–" && (
                                      <span
                                        className={`mr-2 font-extrabold ${low ? "text-[var(--color-feedback-error-fg)]" : "text-[var(--color-text-primary)]"}`}
                                      >
                                        Satisfaction {t.sat}
                                      </span>
                                    )}
                                    {t.note}
                                  </p>
                                </li>
                              );
                            })}
                          </ul>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {groups.map((g) => {
                  const isOpen = !closed[g.label];
                  return (
                    <div key={g.label}>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() =>
                          setClosed((c) => ({ ...c, [g.label]: isOpen }))
                        }
                        className="flex w-full items-center gap-3 border-b border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] px-4 py-3 text-left hover:bg-[var(--blue-50)]"
                      >
                        <svg
                          aria-hidden="true"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          className={`transition-transform ${isOpen ? "" : "-rotate-90"}`}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                        <span className={label}>{g.label}</span>
                        <span className="text-xs font-light text-[var(--color-text-muted)]">
                          {g.rows.length} {g.rows.length === 1 ? "row" : "rows"}
                        </span>
                      </button>
                      {isOpen &&
                        g.rows.map((row) => (
                          <div
                            key={row.id}
                            className={`${GRID} border-b border-[var(--color-border-default)]`}
                          >
                            <div className="px-4 py-3">
                              <p className="font-extrabold text-sm leading-snug">
                                {row.name}
                              </p>
                              <p className="mt-0.5 flex items-center gap-1.5 text-xs font-light text-[var(--color-text-muted)]">
                                <span
                                  aria-hidden="true"
                                  className="h-2 w-2 rounded-full"
                                  style={{ background: KIND[row.kind].color }}
                                />
                                <span className="sr-only">
                                  {KIND[row.kind].name}:{" "}
                                </span>
                                {row.source}
                              </p>
                              {tagsOn && (
                                <p className="mt-1.5">
                                  <StepTag step={ROW_STEP[row.id]} />
                                </p>
                              )}
                            </div>
                            {row.cells.map((c, i) => {
                              const base = `min-w-0 border-l border-[var(--color-border-default)] p-3 text-left text-sm ${focus === i ? "bg-[var(--blue-50)]" : ""}`;
                              if (!c) return <div key={i} className={base} />;
                              const value = c.value
                                ? resolveValue(c.value, metrics)
                                : null;
                              const content = (
                                <>
                                  {value ? (
                                    <>
                                      <span
                                        className="block font-extrabold text-[var(--color-business-blue)]"
                                        style={{
                                          fontSize: "1.35rem",
                                          lineHeight: 1.1,
                                        }}
                                      >
                                        {value}
                                      </span>
                                      <span className="mt-1 block text-xs font-light text-[var(--color-text-secondary)]">
                                        {c.label}
                                      </span>
                                      {c.trendText && (
                                        <span
                                          className={`mt-2 block text-xs ${c.trend === "up" ? "text-[var(--color-feedback-success-fg)]" : c.trend === "down" ? "text-[var(--color-feedback-error-fg)]" : "text-[var(--color-text-muted)]"}`}
                                        >
                                          {TREND[c.trend ?? "flat"]}{" "}
                                          {c.trendText}
                                        </span>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      {c.headline && (
                                        <span className="block font-extrabold leading-snug">
                                          {c.headline}
                                        </span>
                                      )}
                                      {c.quote && (
                                        <span
                                          className="mt-1 block text-xs font-light text-[var(--color-text-secondary)] line-clamp-3"
                                          style={{ lineHeight: 1.5 }}
                                        >
                                          {c.quote}
                                        </span>
                                      )}
                                      {c.sentiment && (
                                        <span
                                          className="mt-2 inline-block rounded-full px-2 py-0.5 text-[11px]"
                                          style={{
                                            background:
                                              SENTIMENT[c.sentiment].bg,
                                            color: SENTIMENT[c.sentiment].fg,
                                          }}
                                        >
                                          {c.sentimentLabel}
                                        </span>
                                      )}
                                    </>
                                  )}
                                </>
                              );
                              const hasDetail = !!(
                                c.details?.length ||
                                c.quote ||
                                c.headline
                              );
                              return hasDetail ? (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => openCell(row, c, i)}
                                  className={`${base} hover:bg-[var(--blue-50)]`}
                                >
                                  {content}
                                </button>
                              ) : (
                                <div key={i} className={base}>
                                  {content}
                                </div>
                              );
                            })}
                          </div>
                        ))}
                    </div>
                  );
                })}

                <ul className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-4 text-xs font-light text-[var(--color-text-secondary)]">
                  {(["pos", "mixed", "neg"] as const).map((s) => (
                    <li key={s} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: SENTIMENT[s].color }}
                      />
                      {SENTIMENT[s].label}
                    </li>
                  ))}
                  {Object.values(KIND).map((k) => (
                    <li key={k.name} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full"
                        style={{ background: k.color }}
                      />
                      {k.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <p className="font-light text-sm text-[var(--color-text-muted)] max-w-[70ch] mt-16 pt-5 border-t border-[var(--color-border-default)]">
            All data in the tool is synthetic and shows what a customer journey
            instrument can look like. The industries, personas and figures are
            examples, not real customers.
          </p>
        </div>
      </div>

      <CellDialog cell={cell} onClose={() => setCell(null)} />
      <InsightsDialog
        open={insightsOpen}
        onClose={() => setInsightsOpen(false)}
        subtitle={`${ind.name} · ${segLabel} · ${ROLES.find((r) => r.id === role)?.name ?? ""}`}
        insights={buildInsights(metrics, ind)}
        watch={buildWatch(metrics, ind)}
      />
    </section>
  );
}
