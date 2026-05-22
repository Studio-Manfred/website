import { describe, expect, it } from "vitest";
import { buildSlackMessage } from "./audit-404-notify.mjs";

const sampleReport = {
  root: "https://studiomanfred.com",
  generatedAt: "2026-06-01T08:00:00.000Z",
  pagesCrawled: 29,
  externalProbed: 30,
  findings: [
    {
      url: "https://studiomanfred.com/news/some-slug",
      status: 404,
      kind: "internal",
      sources: ["https://studiomanfred.com/writing/some-article-1234"],
    },
    {
      url: "https://www.studiomanfred.com/news/another",
      status: 0,
      error: "ENOTFOUND",
      kind: "external",
      sources: ["https://studiomanfred.com/writing/another-article-5678"],
    },
  ],
};

describe("buildSlackMessage", () => {
  it("summarises the finding count and root in the text field", () => {
    const msg = buildSlackMessage(sampleReport);
    expect(msg.text).toContain("studiomanfred.com");
    expect(msg.text).toContain("2 broken");
  });

  it("lists each broken URL with its status and source page", () => {
    const msg = buildSlackMessage(sampleReport);
    const flat = JSON.stringify(msg);
    expect(flat).toContain("/news/some-slug");
    expect(flat).toContain("404");
    expect(flat).toContain("/writing/some-article-1234");
    expect(flat).toContain("ENOTFOUND");
  });

  it("includes the crawl timestamp", () => {
    const msg = buildSlackMessage(sampleReport);
    expect(JSON.stringify(msg)).toContain("2026-06-01");
  });

  it("returns a no-op '0 broken' message when findings is empty", () => {
    const empty = { ...sampleReport, findings: [] };
    const msg = buildSlackMessage(empty);
    expect(msg.text.toLowerCase()).toContain("0 broken");
  });
});
