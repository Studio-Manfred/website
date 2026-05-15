#!/usr/bin/env node
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const METRICS = ["statements", "branches", "functions", "lines"];
const TOLERANCE = 0.5;
const INITIAL_BASELINE = Object.fromEntries(METRICS.map((m) => [m, 0]));

export function run({ summaryPath, baselinePath, update = false } = {}) {
  const summary = JSON.parse(readFileSync(summaryPath, "utf8"));
  const current = Object.fromEntries(
    METRICS.map((m) => [m, summary.total?.[m]?.pct ?? 0]),
  );

  let seeded = false;
  let baseline;
  if (!existsSync(baselinePath)) {
    baseline = { ...INITIAL_BASELINE };
    writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
    seeded = true;
  } else {
    baseline = JSON.parse(readFileSync(baselinePath, "utf8"));
  }

  const regressions = METRICS.flatMap((m) => {
    const diff = current[m] - baseline[m];
    return diff < -TOLERANCE
      ? [{ metric: m, baseline: baseline[m], current: current[m], diff }]
      : [];
  });

  const ok = regressions.length === 0;

  let updated = false;
  if (update && ok) {
    const allImproved = METRICS.every((m) => current[m] >= baseline[m]);
    if (allImproved && METRICS.some((m) => current[m] > baseline[m])) {
      writeFileSync(baselinePath, JSON.stringify(current, null, 2) + "\n");
      updated = true;
    }
  }

  return { ok, regressions, seeded, updated, current, baseline };
}

function main() {
  const cwd = process.cwd();
  const summaryPath = resolve(cwd, "coverage/coverage-summary.json");
  const baselinePath = resolve(cwd, ".coverage-baseline.json");
  const update = process.argv.includes("--update");

  if (!existsSync(summaryPath)) {
    console.error(`coverage-ratchet: ${summaryPath} not found. Run npm run test:coverage first.`);
    process.exit(2);
  }

  const result = run({ summaryPath, baselinePath, update });

  const fmt = (n) => n.toFixed(2).padStart(6);
  console.log("coverage-ratchet:");
  for (const m of METRICS) {
    const c = result.current[m];
    const b = result.baseline[m];
    const arrow = c > b ? "▲" : c < b ? "▼" : "·";
    console.log(`  ${m.padEnd(11)} current=${fmt(c)}%  baseline=${fmt(b)}%  ${arrow}`);
  }
  if (result.seeded) console.log("  (baseline file did not exist; seeded with zeros)");
  if (result.updated) console.log("  → baseline file updated");

  if (!result.ok) {
    console.error("\nFAIL: coverage regressed on:");
    for (const r of result.regressions) {
      console.error(`  ${r.metric}: baseline ${r.baseline.toFixed(2)}% → current ${r.current.toFixed(2)}% (Δ ${r.diff.toFixed(2)}%)`);
    }
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
