import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { capabilities, cases, GROUP_COMPANIES, GROUP_PEOPLE, GROUP_SKILLS, GROUP_WORDS, partners, pillars } from "./group";
import { TEAM } from "./team";

describe("group content", () => {
  it("has the three pillars of value in order", () => {
    expect(pillars.map((p) => p.title)).toEqual(["Growth", "Change", "Expertise"]);
  });

  it("gives every pillar a lead and a body", () => {
    for (const pillar of pillars) {
      expect(pillar.lead.length).toBeGreaterThan(0);
      expect(pillar.body.length).toBeGreaterThan(0);
    }
  });

  it("lists five core capability areas with descriptions", () => {
    expect(capabilities).toHaveLength(5);
    for (const c of capabilities) expect(c.description.length).toBeGreaterThan(0);
  });

  it("lists four selected cases", () => {
    expect(cases.map((c) => c.title)).toEqual([
      "Mentimeter — Building a foundation of scalable design",
      "Blocket — Driving Outcomes",
      "Hubexo — High-Value Search",
      "Clarity for Leaders",
    ]);
  });

  it("lists the selected partners", () => {
    expect(partners).toContain("Scandic Hotels");
    expect(partners).toHaveLength(7);
  });
});

describe("GROUP_WORDS", () => {
  it("gives each company its own words, alternating between companies", () => {
    const byCompany = (id: string) => GROUP_WORDS.filter((w) => w.company === id).map((w) => w.word);
    expect(byCompany("mather-studio")).toEqual(["TALENT", "PEOPLE", "NETWORK"]);
    expect(byCompany("studio-manfred")).toEqual(["DESIGN", "DATA", "RESEARCH"]);
    expect(byCompany("seventyone-consulting")).toEqual(["PRODUCT", "LEADERSHIP", "TRANSFORMATION"]);
    GROUP_WORDS.forEach((w, i) => expect(w.company).not.toBe(GROUP_WORDS[(i + 1) % GROUP_WORDS.length].company));
  });
});

describe("GROUP_PEOPLE", () => {
  const ids = GROUP_COMPANIES.map((c) => c.id);

  it("lists everyone once, each with a company, a role, a photo and at least one skill", () => {
    const names = GROUP_PEOPLE.map((p) => p.name);
    expect(new Set(names).size).toBe(names.length);
    for (const p of GROUP_PEOPLE) {
      expect(p.name).toMatch(/\S+ \S+/);
      expect(ids).toContain(p.company);
      expect(p.role).not.toBe("");
      expect(p.skills.length).toBeGreaterThan(0);
      for (const s of p.skills) expect(GROUP_SKILLS).toContain(s);
      expect(existsSync(join(process.cwd(), "public", p.photo))).toBe(true);
    }
  });

  it("puts only Moa Bernhardsson in Mather and the website team in Studio Manfred", () => {
    const of = (id: string) => GROUP_PEOPLE.filter((p) => p.company === id).map((p) => p.name).sort();
    expect(of("mather-studio")).toEqual(["Moa Bernhardsson"]);
    expect(of("studio-manfred")).toEqual(TEAM.map((m) => m.name).sort());
    expect(of("seventyone-consulting")).toHaveLength(9);
  });

  it("gives SeventyOne's people the bio and profile link from their site", () => {
    const s71 = GROUP_PEOPLE.filter((p) => p.profile?.startsWith("https://www.seventyoneconsulting.se/kontakt/"));
    expect(s71.map((p) => p.name)).toContain("Moa Bernhardsson");
    expect(s71).toHaveLength(10);
    for (const p of s71) {
      expect(p.bio?.length).toBeGreaterThan(80);
      expect(p.bio).not.toMatch(/Hör av dig/);
    }
  });

  it("has someone behind every skill filter", () => {
    for (const s of GROUP_SKILLS) expect(GROUP_PEOPLE.some((p) => p.skills.includes(s))).toBe(true);
  });
});
