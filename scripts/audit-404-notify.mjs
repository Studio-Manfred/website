#!/usr/bin/env node
// Reads a JSON audit report (the output of `audit-404.mjs --json`) and
// posts a Slack message to $SLACK_WEBHOOK_URL when broken URLs were
// found. Designed to be called from the monthly cron workflow.
//
// Usage:
//   node scripts/audit-404-notify.mjs <report.json>
//
// Env:
//   SLACK_WEBHOOK_URL — required when there are findings to report.
//                       Missing webhook with no findings is a no-op.

import { readFile } from "node:fs/promises";

export function buildSlackMessage(report) {
  const date = report.generatedAt.slice(0, 10);
  const host = new URL(report.root).host;
  const count = report.findings.length;

  if (count === 0) {
    return {
      text: `Site audit ${date} — 0 broken URLs on ${host}. Crawled ${report.pagesCrawled} pages, probed ${report.externalProbed} external links.`,
    };
  }

  const lines = report.findings.map((f) => {
    const status = f.error ? `ERR ${f.error}` : f.status;
    const from = f.sources?.[0]
      ? `\n    from ${f.sources[0]}${f.sources.length > 1 ? ` (+${f.sources.length - 1} more)` : ""}`
      : "";
    return `• \`${status}\`  ${f.url}${from}`;
  });

  const text = [
    `:warning: Site audit ${date} — *${count} broken* URL${count === 1 ? "" : "s"} on ${host}`,
    `Crawled ${report.pagesCrawled} pages, probed ${report.externalProbed} external links.`,
    "",
    ...lines,
  ].join("\n");

  return { text };
}

async function postToSlack(webhookUrl, message) {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(message),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "<no body>");
    throw new Error(`Slack webhook returned ${res.status}: ${body}`);
  }
}

async function main() {
  const reportPath = process.argv[2];
  if (!reportPath) {
    console.error("Usage: audit-404-notify.mjs <report.json>");
    process.exit(2);
  }
  const report = JSON.parse(await readFile(reportPath, "utf8"));
  const count = report.findings.length;

  if (count === 0) {
    console.log("Audit clean — no Slack message sent.");
    return;
  }

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.error(
      `Audit found ${count} broken URL${count === 1 ? "" : "s"} but SLACK_WEBHOOK_URL is not set.`,
    );
    process.exit(1);
  }

  await postToSlack(webhook, buildSlackMessage(report));
  console.log(
    `Posted Slack alert: ${count} broken URL${count === 1 ? "" : "s"}.`,
  );
}

const isCli = import.meta.url === `file://${process.argv[1]}`;
if (isCli) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
