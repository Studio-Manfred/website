import { describe, expect, it } from "vitest";
import { splitCvHeader } from "./cv-header";

describe("splitCvHeader", () => {
  it("takes the name, role and --- the CV starts with out of the text", () => {
    const r = splitCvHeader("<h1>Markus Dahlbom</h1><p><strong>Senior UX Designer</strong></p><p>---</p><h2>Introduction</h2><p>Hi</p>", "Markus Dahlbom");
    expect(r).toEqual({ role: "Senior UX Designer", html: "<h2>Introduction</h2><p>Hi</p>" });
  });

  it("handles name, role and --- in one paragraph with line breaks", () => {
    const r = splitCvHeader("<p><strong>Markus Dahlbom</strong><br /><strong>Senior UX Designer</strong><br />---</p><h2>Introduction</h2>", "Markus Dahlbom");
    expect(r).toEqual({ role: "Senior UX Designer", html: "<h2>Introduction</h2>" });
  });

  it("matches the name ignoring case", () => {
    expect(splitCvHeader("<h2>MARKUS DAHLBOM</h2><p>Lead Designer</p><h2>Education</h2>", "Markus Dahlbom")).toEqual({ role: "Lead Designer", html: "<h2>Education</h2>" });
  });

  it("leaves a CV without a name header untouched", () => {
    const html = "<h2>Introduction</h2><p>Senior Product Designer</p>";
    expect(splitCvHeader(html, "Markus Dahlbom")).toEqual({ role: "", html });
  });

  it("does not take a long paragraph for the role", () => {
    const long = "Senior Product Designer with 13+ years of experience designing digital products across fintech, health and SaaS.";
    expect(splitCvHeader(`<h1>Markus Dahlbom</h1><p>${long}</p>`, "Markus Dahlbom")).toEqual({ role: "", html: `<p>${long}</p>` });
  });

  it("removes only the name when there is no role", () => {
    expect(splitCvHeader("<h1>Markus Dahlbom</h1><p>---</p><h2>Introduction</h2>", "Markus Dahlbom")).toEqual({ role: "", html: "<h2>Introduction</h2>" });
  });
});
