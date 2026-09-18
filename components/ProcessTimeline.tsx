"use client";

import { useState } from "react";

type Step = {
  id: number;
  title: string;
  methods: string[];
  description: string;
};

type Props = {
  steps: Step[];
  stakeholders: string[];
};

const BLUE_HEX = "#2a3fcc";
const STEP_HEIGHT = 110;
const SVG_W = 56;
const CX = SVG_W / 2;
const amplitude = 18;
const period = 180;

function waveX(y: number) {
  return CX + amplitude * Math.sin((y / period) * 2 * Math.PI);
}

function buildCurve(fromY: number, toY: number) {
  const n = 60;
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const y = fromY + (toY - fromY) * (i / n);
    const x = waveX(y);
    pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ");
}

export function ProcessTimeline({ steps, stakeholders }: Props) {
  const [active, setActive] = useState<number>(steps[0]?.id ?? 1);
  const current = steps.find((s) => s.id === active)!;
  const totalH = steps.length * STEP_HEIGHT;
  const DOT_Y = (i: number) => i * STEP_HEIGHT + STEP_HEIGHT / 2;

  return (
    <div>
      <h2
        className="font-extrabold text-[var(--color-text-primary)] mb-10"
        style={{ fontSize: "clamp(1.3rem, 2vw, 1.75rem)" }}
      >
        Process & Methods
      </h2>

      <div style={{ display: "flex", gap: "36px", alignItems: "flex-start" }}>

        <div style={{ display: "flex", gap: "0", alignItems: "flex-start", flexShrink: 0 }}>

          <svg
            viewBox={`0 0 ${SVG_W} ${totalH}`}
            width={SVG_W}
            height={totalH}
            style={{ display: "block", overflow: "visible" }}
          >
            {steps.map((step, i) => {
              if (i >= steps.length - 1) return null;
              const fromY = DOT_Y(i);
              const toY = DOT_Y(i + 1);
              const filled = step.id < active;
              return (
                <path
                  key={`seg-${i}`}
                  d={buildCurve(fromY, toY)}
                  fill="none"
                  stroke={filled ? BLUE_HEX : "#ddd"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              );
            })}

            {steps.map((step, i) => {
              const y = DOT_Y(i);
              const isActive = active === step.id;
              const isPast = step.id < active;
              const dotX = waveX(y);
              return (
                <g key={step.id}>
                  <circle
                    cx={CX}
                    cy={y}
                    r="28"
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                    onClick={() => setActive(step.id)}
                  />
                  {isActive && (
                    <circle cx={dotX} cy={y} r="18" fill={`${BLUE_HEX}15`} />
                  )}
                  <circle
                    cx={dotX}
                    cy={y}
                    r="10"
                    fill={isActive || isPast ? BLUE_HEX : "white"}
                    stroke={isActive || isPast ? BLUE_HEX : "#ddd"}
                    strokeWidth="2"
                    style={{ cursor: "pointer", pointerEvents: "none" }}
                  />
                  {(isActive || isPast) && (
                    <circle cx={dotX} cy={y} r="3.5" fill="white" style={{ pointerEvents: "none" }} />
                  )}
                  <line
                    x1={dotX + 12}
                    y1={y}
                    x2={SVG_W + 4}
                    y2={y}
                    stroke={isActive ? BLUE_HEX : "#ddd"}
                    strokeWidth="1.5"
                    strokeDasharray={isActive ? "none" : "3 3"}
                  />
                </g>
              );
            })}
          </svg>

          <div style={{ display: "flex", flexDirection: "column", paddingLeft: "12px" }}>
            {steps.map((step) => {
              const isActive = active === step.id;
              const isPast = step.id < active;
              return (
                <div
                  key={step.id}
                  style={{ height: `${STEP_HEIGHT}px`, display: "flex", alignItems: "center" }}
                >
                  <button
                    onClick={() => setActive(step.id)}
                    style={{ background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: "8px 0" }}
                  >
                    <p
                      style={{
                        fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                        fontWeight: isActive ? 800 : isPast ? 500 : 400,
                        color: isActive ? BLUE_HEX : isPast ? `${BLUE_HEX}88` : "#ccc",
                        transition: "all 0.2s ease",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {step.title}
                    </p>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, paddingTop: `${STEP_HEIGHT / 2 - 10}px` }}>
          {current && (
            <div>
              <p
                style={{
                  fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                  fontWeight: 300,
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.8,
                  marginBottom: "20px",
                }}
              >
                {current.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {current.methods.map((m) => (
                  <span
                    key={m}
                    style={{
                      fontSize: "12px",
                      fontWeight: 500,
                      padding: "4px 12px",
                      borderRadius: "100px",
                      background: `${BLUE_HEX}10`,
                      color: BLUE_HEX,
                      border: `1px solid ${BLUE_HEX}30`,
                    }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

      <div className="mt-10">
        <p
          className="font-extrabold text-[var(--color-text-primary)] mb-4"
          style={{ fontSize: "clamp(1rem, 1.4vw, 1.1rem)" }}
        >
          Stakeholder collaboration
        </p>
        <div className="flex flex-wrap gap-2">
          {stakeholders.map((s) => (
            <span
              key={s}
              className="font-light text-[var(--color-business-blue)] border border-[var(--color-business-blue)] rounded-full px-4 py-1"
              style={{ fontSize: "13px" }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}