#!/usr/bin/env node
// Headless-browser BFS crawl of the live site. Prints each URL it visits
// and ends with a summary of any broken links (404s or fetch errors).
//
// Usage:
//   node scripts/audit-404.mjs [--root=https://studiomanfred.com] [--json]
//
// Exit code is always 0 when the crawl itself completed — broken URLs
// are findings, not failures. Consumers (the cron workflow) should
// inspect the JSON report and decide whether to alert.

import { chromium } from "playwright";

const DEFAULT_ROOT = "https://studiomanfred.com";
const MAX_PAGES = 200;
const NAV_TIMEOUT_MS = 20_000;
const EXTERNAL_TIMEOUT_MS = 12_000;

export function normalizeUrl(input) {
  try {
    const u = new URL(input);
    u.hash = "";
    if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
      u.pathname = u.pathname.replace(/\/+$/, "");
    }
    return u.toString();
  } catch {
    return null;
  }
}

export function classifyFinding({ status, error }) {
  if (status === 404) return { broken: true, reason: "404" };
  if (status === 0) return { broken: true, reason: error ?? "fetch error" };
  return { broken: false };
}

async function collectHrefs(page) {
  const handles = await page.$$("a[href]");
  const hrefs = [];
  for (const h of handles) {
    const v = await h.getAttribute("href");
    if (v) hrefs.push(v);
    await h.dispose();
  }
  return hrefs;
}

export async function runAudit({ root = DEFAULT_ROOT, log = () => {} } = {}) {
  const queue = [root];
  const seenInternal = new Set();
  const allLinks = new Map();
  const externalLinks = new Set();
  const sourceMap = new Map();

  const recordSource = (target, source) => {
    if (!sourceMap.has(target)) sourceMap.set(target, new Set());
    sourceMap.get(target).add(source);
  };

  const browser = await chromium.launch();
  const ctx = await browser.newContext({
    userAgent: "studio-manfred-404-audit (Playwright)",
  });
  const page = await ctx.newPage();

  while (queue.length > 0 && seenInternal.size < MAX_PAGES) {
    const url = queue.shift();
    if (!url || seenInternal.has(url)) continue;
    seenInternal.add(url);

    let response;
    try {
      response = await page.goto(url, {
        waitUntil: "domcontentloaded",
        timeout: NAV_TIMEOUT_MS,
      });
    } catch (e) {
      allLinks.set(url, { status: 0, error: e.message, kind: "internal" });
      log(`ERR  ${url}  -> ${e.message}`);
      continue;
    }

    const status = response?.status() ?? 0;
    allLinks.set(url, { status, kind: "internal" });
    log(`${status}  ${url}`);

    if (status < 200 || status >= 400) continue;

    const hrefs = await collectHrefs(page);
    for (const raw of hrefs) {
      if (!raw) continue;
      if (
        raw.startsWith("#") ||
        raw.startsWith("mailto:") ||
        raw.startsWith("tel:") ||
        raw.startsWith("javascript:")
      )
        continue;
      let abs;
      try {
        abs = new URL(raw, url).toString();
      } catch {
        continue;
      }
      const norm = normalizeUrl(abs);
      if (!norm) continue;
      recordSource(norm, url);
      if (norm.startsWith(root)) {
        if (!seenInternal.has(norm) && !queue.includes(norm)) queue.push(norm);
      } else if (norm.startsWith("http")) {
        externalLinks.add(norm);
      }
    }
  }

  await browser.close();

  log(`\n--- External link probe (${externalLinks.size}) ---`);
  await Promise.all(
    [...externalLinks].map(async (u) => {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), EXTERNAL_TIMEOUT_MS);
      try {
        let res = await fetch(u, {
          method: "HEAD",
          signal: ctl.signal,
          redirect: "follow",
        });
        if (res.status === 405 || res.status === 403) {
          res = await fetch(u, {
            method: "GET",
            signal: ctl.signal,
            redirect: "follow",
          });
        }
        allLinks.set(u, { status: res.status, kind: "external" });
        log(`${res.status}  ${u}`);
      } catch (e) {
        allLinks.set(u, {
          status: 0,
          error: e.name || e.message,
          kind: "external",
        });
        log(`ERR  ${u}  -> ${e.name || e.message}`);
      } finally {
        clearTimeout(t);
      }
    }),
  );

  const findings = [];
  for (const [url, info] of allLinks) {
    if (classifyFinding(info).broken) {
      findings.push({
        url,
        status: info.status,
        error: info.error,
        kind: info.kind,
        sources: [...(sourceMap.get(url) ?? [])],
      });
    }
  }

  return {
    root,
    generatedAt: new Date().toISOString(),
    pagesCrawled: seenInternal.size,
    externalProbed: externalLinks.size,
    findings,
  };
}

function parseArgs(argv) {
  const opts = { root: DEFAULT_ROOT, json: false };
  for (const a of argv) {
    if (a === "--json") opts.json = true;
    else if (a.startsWith("--root=")) opts.root = a.slice("--root=".length);
  }
  return opts;
}

async function main() {
  const { root, json } = parseArgs(process.argv.slice(2));
  const report = await runAudit({
    root,
    log: json ? () => {} : (m) => console.error(m),
  });

  if (json) {
    process.stdout.write(JSON.stringify(report, null, 2) + "\n");
  } else {
    console.log("\n=== SUMMARY ===");
    console.log(
      `Crawled ${report.pagesCrawled} internal pages, probed ${report.externalProbed} external links.`,
    );
    console.log(`Broken (${report.findings.length}):`);
    for (const f of report.findings) {
      const label = f.error ? `ERR(${f.error})` : f.status;
      console.log(`  ${label}  ${f.kind}  ${f.url}`);
      for (const s of f.sources) console.log(`    <- ${s}`);
    }
  }
}

const isCli = import.meta.url === `file://${process.argv[1]}`;
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
