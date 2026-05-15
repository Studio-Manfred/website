import { describe, expect, it } from "vitest";
import { cleanContent } from "./articles";

describe("cleanContent", () => {
  it("replaces WordPress [caption] shortcodes with <figure> tags", () => {
    const input =
      '[caption id="attachment_1" align="alignnone" width="640"]<img src="x.jpg" /> A caption[/caption]';
    const output = cleanContent(input);
    expect(output).toContain("<figure>");
    expect(output).toContain("</figure>");
    expect(output).not.toContain("[caption");
    expect(output).not.toContain("[/caption]");
  });
});
