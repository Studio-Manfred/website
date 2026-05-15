import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { run } from "./coverage-ratchet.mjs";

let dir;

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), "ratchet-"));
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function writeSummary(metrics) {
  const summaryPath = join(dir, "coverage-summary.json");
  writeFileSync(
    summaryPath,
    JSON.stringify({
      total: {
        statements: { pct: metrics.statements },
        branches: { pct: metrics.branches },
        functions: { pct: metrics.functions },
        lines: { pct: metrics.lines },
      },
    }),
  );
  return summaryPath;
}

function writeBaseline(metrics) {
  const baselinePath = join(dir, "baseline.json");
  writeFileSync(baselinePath, JSON.stringify(metrics));
  return baselinePath;
}

const READ_FRESH = { summaryPath: "", baselinePath: "" };

describe("coverage-ratchet", () => {
  it("passes when all current metrics meet baseline exactly", () => {
    const summaryPath = writeSummary({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath });
    expect(result.ok).toBe(true);
    expect(result.regressions).toEqual([]);
  });

  it("passes when current metrics are above baseline", () => {
    const summaryPath = writeSummary({ statements: 70, branches: 60, functions: 80, lines: 70 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath });
    expect(result.ok).toBe(true);
  });

  it("passes when current dips by less than the tolerance (0.5%)", () => {
    const summaryPath = writeSummary({ statements: 49.8, branches: 50, functions: 50, lines: 50 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath });
    expect(result.ok).toBe(true);
  });

  it("fails when any metric drops more than the tolerance below baseline", () => {
    const summaryPath = writeSummary({ statements: 48, branches: 50, functions: 50, lines: 50 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath });
    expect(result.ok).toBe(false);
    expect(result.regressions).toHaveLength(1);
    expect(result.regressions[0].metric).toBe("statements");
  });

  it("seeds an all-zero baseline when the baseline file does not exist", () => {
    const summaryPath = writeSummary({ statements: 10, branches: 10, functions: 10, lines: 10 });
    const baselinePath = join(dir, "does-not-exist.json");
    expect(existsSync(baselinePath)).toBe(false);
    const result = run({ summaryPath, baselinePath });
    expect(result.ok).toBe(true);
    expect(result.seeded).toBe(true);
    const written = JSON.parse(readFileSync(baselinePath, "utf8"));
    expect(written).toEqual({ statements: 0, branches: 0, functions: 0, lines: 0 });
  });

  it("updates the baseline when --update is passed and all metrics improved", () => {
    const summaryPath = writeSummary({ statements: 60, branches: 55, functions: 70, lines: 62 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath, update: true });
    expect(result.ok).toBe(true);
    expect(result.updated).toBe(true);
    const written = JSON.parse(readFileSync(baselinePath, "utf8"));
    expect(written).toEqual({ statements: 60, branches: 55, functions: 70, lines: 62 });
  });

  it("does NOT update the baseline when --update is passed but a metric regressed", () => {
    const summaryPath = writeSummary({ statements: 45, branches: 55, functions: 70, lines: 62 });
    const baselinePath = writeBaseline({ statements: 50, branches: 50, functions: 50, lines: 50 });
    const result = run({ summaryPath, baselinePath, update: true });
    expect(result.ok).toBe(false);
    expect(result.updated).toBe(false);
    const written = JSON.parse(readFileSync(baselinePath, "utf8"));
    expect(written).toEqual({ statements: 50, branches: 50, functions: 50, lines: 50 });
  });
});

void READ_FRESH;
