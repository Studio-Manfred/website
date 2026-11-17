import { describe, expect, it } from "vitest";
import { checkFindings, pageDigest, runChecks } from "./checks";

const good = `<!doctype html><html lang="en"><head><title>Book a room</title>
<meta name="viewport" content="width=device-width, initial-scale=1"></head><body>
<h1>Book</h1><h2>Rooms</h2><img src="r.jpg" alt="Double room"><img src="line.svg" alt="">
<label for="d">Date</label><input id="d" type="date">
<label>Guests <select><option>2</option></select></label>
<input type="hidden" name="x"><button>Search</button>
<a href="/help" aria-label="Help"><svg></svg></a><span id="cl">Close</span><button aria-labelledby="cl"><svg></svg></button><a href="/x"><img src="i.png" alt="Home"></a>
</body></html>`;

const titles = (html: string) => runChecks(html).map((c) => c.title);

describe("runChecks", () => {
  it("finds nothing on a tidy page", () => {
    expect(titles(good)).toEqual([]);
  });

  it("finds the common problems, each with a WCAG criterion", () => {
    const bad = `<html><head><meta name="viewport" content="width=device-width, user-scalable=no"></head><body>
      <h2>Rooms</h2><h4>Extras</h4><img src="a.jpg"><input placeholder="Email"><button><svg></svg></button>
      <a href="/"></a><div tabindex="3">x</div><video autoplay src="v.mp4"></video></body></html>`;
    const found = runChecks(bad);
    expect(found.map((c) => c.title)).toEqual([
      "The page doesn't say its language",
      "The page has no title",
      "Zooming is blocked on phones",
      "Images without alt text",
      "Form fields without labels",
      "Buttons or links with no name",
      "No main heading",
      "Heading levels skip",
      "Unusual tab order",
      "Sound that plays by itself",
    ]);
    for (const c of found) expect(c.wcag).toMatch(/^\d\.\d\.\d+$/);
    expect(found.find((c) => c.title === "Buttons or links with no name")!.where).toBe("2 buttons and links");
  });

  it("a low maximum-scale also blocks zoom; muted autoplay is fine", () => {
    expect(titles(`<html lang="en"><title>t</title><meta name="viewport" content="maximum-scale=1"><h1>a</h1></html>`)).toContain("Zooming is blocked on phones");
    expect(titles(`<html lang="en"><title>t</title><h1>a</h1><video autoplay muted></video></html>`)).toEqual([]);
  });

  it("decorative and hidden images need no alt", () => {
    expect(titles(`<html lang="en"><title>t</title><h1>a</h1><img role="presentation"><img aria-hidden="true"></html>`)).toEqual([]);
  });
});

describe("checkFindings", () => {
  const html = `<html lang="en"><title>t</title><h1>a</h1><img src="a.jpg"></html>`;

  it("goes to the archetypes whose access needs it hits", () => {
    // kvalitetsjakaren uses a screen reader; trendjakaren has no access needs.
    const [f] = checkFindings(html, ["kvalitetsjakaren", "trendjakaren"], 2);
    expect(f.archetypes).toEqual(["kvalitetsjakaren"]);
    expect(f).toMatchObject({ source: "check", phase: 2, kind: "accessibility", id: "check-1" });
  });

  it("goes to all chosen archetypes when none has a matching need", () => {
    const [f] = checkFindings(html, ["trendjakaren", "bekvamlighetskoparen"], 0);
    expect(f.archetypes).toEqual(["trendjakaren", "bekvamlighetskoparen"]);
  });
});

describe("pageDigest", () => {
  it("keeps the title, headings, fields and text, and leaves out scripts", () => {
    const d = pageDigest(`<!doctype html><!-- note --><html><head><title>Shop</title><script>var secret=1</script></head><body><h1>Welcome</h1><p>Hello   there</p><input type="email" aria-label="Email"><img src="x"></body></html>`);
    expect(d.title).toBe("Shop");
    expect(d.text).toContain("[h1] Welcome");
    expect(d.text).toContain("Hello there");
    expect(d.text).toContain('[field email label="Email"]');
    expect(d.text).toContain('[image alt="(missing)"]');
    expect(d.text).not.toContain("secret");
  });

  it("caps long pages", () => {
    const d = pageDigest(`<p>${"word ".repeat(5000)}</p>`, 100);
    expect(d.text.length).toBeLessThan(120);
    expect(d.text).toMatch(/\[cut\]$/);
  });
});
