"use client";

import { useState } from "react";
import { sentimentOf, smoothPath, type RankedOpportunity } from "@/lib/customer-journey/engine";
import type { EmotionCard, Persona, Phase } from "@/lib/customer-journey/types";
import { BLUE, INK, OPPORTUNITY, SENTIMENT, personaColor } from "./theme";

// Both charts draw in a 600 × 100 box stretched to the container
// (preserveAspectRatio none, strokes that don't scale). Phase i sits at the
// centre of column i of six, so the emotion curve lines up with the matrix
// columns below it. Dots and markers are HTML buttons placed in percent, so
// they stay round and can take focus.

const W = 600;
const xOf = (i: number) => (i + 0.5) * (W / 6);
const yOf = (v: number) => 92 - v * 0.84;
const pts = (curve: number[]): [number, number][] => curve.map((v, i) => [xOf(i), yOf(v)]);
const at = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${y}%` });

/** The smooth curve split into one path per phase-to-phase stretch. */
function stretches(curve: number[]): string[] {
  const p = pts(curve);
  const parts = smoothPath(p).split(" C").slice(1);
  return parts.map((c, i) => `M${p[i][0]},${p[i][1]} C${c}`);
}

function Grid() {
  return (
    <>
      {[0, 50, 100].map((v) => (
        <line key={v} x1="0" x2={W} y1={yOf(v)} y2={yOf(v)} stroke="var(--color-border-default)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
    </>
  );
}

function Tip({ x, y, children }: { x: number; y: number; children: React.ReactNode }) {
  const right = x > W * 0.6;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute z-20 w-60 rounded-xl bg-[var(--color-text-primary)] px-3 py-2 text-xs text-white shadow-lg"
      style={{ ...at(x, y), transform: `translate(${right ? "calc(-100% - 14px)" : "14px"}, -50%)` }}
    >
      {children}
    </div>
  );
}

type EmotionProps = {
  phases: Phase[];
  cards: EmotionCard[];
  curve: number[];
  /** The segment curve, drawn faint behind a persona's curve. */
  base?: number[];
  compare?: { persona: Persona; curve: number[] }[];
  focus: number | null;
  onFocus: (i: number) => void;
};

export function EmotionChart({ phases, cards, curve, base, compare, focus, onFocus }: EmotionProps) {
  const [hover, setHover] = useState<number | null>(null);
  const summary = phases.map((p, i) => `${p.name} ${Math.round(curve[i])}`).join(", ");

  return (
    <div className="relative h-[190px]">
      <svg role="img" aria-label={`Emotionskurva 0 till 100 per fas: ${summary}`} viewBox={`0 0 ${W} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <Grid />
        {focus !== null && <line x1={xOf(focus)} x2={xOf(focus)} y1="0" y2="100" stroke={BLUE} strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />}
        {(base || compare) && (
          <path d={smoothPath(pts(base ?? curve))} fill="none" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
        )}
        {compare
          ? compare.map(({ persona, curve: c }) => (
              <path key={persona.id} d={smoothPath(pts(c))} fill="none" stroke={personaColor(persona.color)} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            ))
          : stretches(curve).map((d, i) => (
              <path key={i} d={d} fill="none" stroke={SENTIMENT[sentimentOf((curve[i] + curve[i + 1]) / 2)].color} strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            ))}
      </svg>
      {!compare &&
        curve.map((v, i) => {
          const s = sentimentOf(v);
          return (
            <button
              key={i}
              type="button"
              aria-pressed={focus === i}
              aria-label={`${phases[i].name}: ${cards[i].emotion}, ${Math.round(v)} av 100. ${cards[i].moment}.`}
              onClick={() => onFocus(i)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_0_0_1.5px_var(--color-border-strong)] transition-transform hover:scale-125"
              style={{ ...at(xOf(i), yOf(v)), background: SENTIMENT[s].color }}
            />
          );
        })}
      {compare &&
        compare.flatMap(({ persona, curve: c }) =>
          c.map((v, i) => (
            <span
              key={`${persona.id}-${i}`}
              aria-hidden="true"
              className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white"
              style={{ ...at(xOf(i), yOf(v)), background: personaColor(persona.color) }}
            />
          )),
        )}
      {hover !== null && !compare && (
        <Tip x={xOf(hover)} y={yOf(curve[hover])}>
          <strong className="block font-extrabold">
            {cards[hover].moment} · {Math.round(curve[hover])}/100
          </strong>
          <span className="font-light">{cards[hover].quote}</span>
        </Tip>
      )}
    </div>
  );
}

type GapProps = {
  phases: Phase[];
  expect: number[];
  delivery: number[];
  expectColor: string;
  compare?: { persona: Persona; expect: number[]; delivery: number[] }[];
  markers: RankedOpportunity[];
  selected: number | null;
  onSelect: (index: number) => void;
  moments?: { persona: Persona };
};

function Shade({ expect, delivery, strength }: { expect: number[]; delivery: number[]; strength: number }) {
  return (
    <>
      {expect.slice(0, -1).map((e, i) => {
        const gap = (e - delivery[i] + expect[i + 1] - delivery[i + 1]) / 2;
        const points = [
          [xOf(i), yOf(e)],
          [xOf(i + 1), yOf(expect[i + 1])],
          [xOf(i + 1), yOf(delivery[i + 1])],
          [xOf(i), yOf(delivery[i])],
        ]
          .map((p) => p.join(","))
          .join(" ");
        return <polygon key={i} points={points} fill={gap > 0 ? SENTIMENT.neg.color : SENTIMENT.pos.color} fillOpacity={Math.min(strength, (Math.abs(gap) / 100) * strength * 3)} />;
      })}
    </>
  );
}

/** Delivery at a touchpoint: phase plus position within it, between the phase points. */
function deliveryAt(delivery: number[], phase: number, pos: number) {
  const t = Math.max(0, Math.min(5, phase + pos - 0.5));
  const i = Math.min(4, Math.floor(t));
  return delivery[i] + (delivery[i + 1] - delivery[i]) * (t - i);
}

export function GapChart({ phases, expect, delivery, expectColor, compare, markers, selected, onSelect, moments }: GapProps) {
  const [tip, setTip] = useState<{ x: number; y: number; title: string; text: string } | null>(null);
  const summary = phases.map((p, i) => `${p.name}: förväntning ${Math.round(expect[i])}, leverans ${Math.round(delivery[i])}`).join("; ");

  return (
    <div className="relative h-[260px]">
      <svg role="img" aria-label={`Förväntning mot leverans per fas. ${summary}`} viewBox={`0 0 ${W} 100`} preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
        <Grid />
        {compare ? (
          compare.map(({ persona, expect: e, delivery: d }) => (
            <g key={persona.id}>
              <Shade expect={e} delivery={d} strength={0.08} />
              <path d={smoothPath(pts(e))} fill="none" stroke={personaColor(persona.color)} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
              <path d={smoothPath(pts(d))} fill="none" stroke={personaColor(persona.color)} strokeWidth="1.5" strokeDasharray="5 4" strokeOpacity="0.7" vectorEffect="non-scaling-stroke" />
            </g>
          ))
        ) : (
          <>
            <Shade expect={expect} delivery={delivery} strength={0.22} />
            <path d={smoothPath(pts(expect))} fill="none" stroke={expectColor} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
            <path d={smoothPath(pts(delivery))} fill="none" stroke={INK} strokeWidth="2" strokeDasharray="6 4" vectorEffect="non-scaling-stroke" />
          </>
        )}
      </svg>
      {!compare &&
        expect.map((v, i) => (
          <span key={`e${i}`} aria-hidden="true" className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white" style={{ ...at(xOf(i), yOf(v)), background: expectColor }} />
        ))}
      {markers.map((m) => {
        const x = (m.phase + m.pos) * (W / 6);
        const y = yOf(deliveryAt(delivery, m.phase, m.pos));
        const t = OPPORTUNITY[m.type];
        const on = selected === m.index;
        return (
          <button
            key={m.index}
            type="button"
            aria-pressed={on}
            aria-label={`${t.label}: ${m.name}, gap ${m.gap > 0 ? "+" : ""}${m.gap}`}
            onClick={() => onSelect(m.index)}
            onMouseEnter={() => setTip({ x, y, title: `${t.label} · ${m.gap > 0 ? "+" : ""}${m.gap}`, text: m.name })}
            onMouseLeave={() => setTip(null)}
            onFocus={() => setTip({ x, y, title: `${t.label} · ${m.gap > 0 ? "+" : ""}${m.gap}`, text: m.name })}
            onBlur={() => setTip(null)}
            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white transition-transform hover:scale-125 ${on ? "h-6 w-6 shadow-[0_0_0_2px_var(--color-text-primary)]" : "h-4 w-4 shadow-[0_0_0_1.5px_var(--color-border-strong)]"}`}
            style={{ ...at(x, y), background: t.color }}
          />
        );
      })}
      {moments &&
        moments.persona.moments.map((m, i) => {
          const x = xOf(m.phase);
          const y = yOf(delivery[m.phase]);
          const p = moments.persona;
          return (
            <button
              key={i}
              type="button"
              aria-label={`${p.name}, ${phases[m.phase].name}: ${m.insight}`}
              onMouseEnter={() => setTip({ x, y: y - 14, title: `${p.name} · ${phases[m.phase].name}`, text: m.insight })}
              onMouseLeave={() => setTip(null)}
              onFocus={() => setTip({ x, y: y - 14, title: `${p.name} · ${phases[m.phase].name}`, text: m.insight })}
              onBlur={() => setTip(null)}
              className="absolute z-10 -translate-x-1/2 -translate-y-[160%] whitespace-nowrap rounded-full border-2 bg-white px-2 py-0.5 text-[11px] font-extrabold text-[var(--color-text-primary)]"
              style={{ ...at(x, y), borderColor: personaColor(p.color) }}
            >
              {p.emoji} {i + 1}
            </button>
          );
        })}
      {tip && (
        <Tip x={tip.x} y={tip.y}>
          <strong className="block font-extrabold">{tip.title}</strong>
          <span className="font-light">{tip.text}</span>
        </Tip>
      )}
    </div>
  );
}
