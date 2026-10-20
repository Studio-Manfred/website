import { describe, expect, it } from "vitest";
import fixture from "@/test/fixtures/cases.json";
import { getCase, listCases, parseCase } from "./cases";

describe("parseCase (STU-1146)", () => {
  it("keeps known blocks in order, drops unknown types, fills gaps", () => {
    const c = parseCase(fixture[0]);
    expect(c.title).toBe("Example Client");
    expect(c.blocks.map((b) => b.type)).toEqual(["brief", "process", "deliverables", "outcomes"]);
    expect(c.blocks[1]).toMatchObject({ type: "process", stakeholders: ["CPO", "Marketing"] });
    expect(c.sidebar.facts.map((f) => f.label)).toEqual(["Client", "Markets"]);
  });

  it("reads image notes, off unless switched on", () => {
    const c = parseCase({
      slug: "x", title: "X",
      blocks: [{ type: "deliverables", images: [{ src: "a.png", alt: "A", note: "N", show_note: true }, { src: "b.png", alt: "B", note: "hidden" }] }],
    });
    const d = c.blocks[0];
    expect(d.type === "deliverables" && d.images.map((i) => [i.src, i.note, i.showNote])).toEqual([
      ["a.png", "N", true],
      ["b.png", "hidden", false],
    ]);
  });

  it("survives junk", () => {
    const c = parseCase({ slug: "x", title: null, blocks: "nope", sidebar: 3 });
    expect(c).toMatchObject({ title: "", blocks: [], sidebar: { consultants: [], facts: [] } });
  });
});

describe("getCase (STU-1146)", () => {
  it("returns a published case by slug", async () => {
    const c = await getCase("example-case");
    expect(c?.title).toBe("Example Client");
  });

  it("returns null for a draft or an unknown slug", async () => {
    expect(await getCase("secret-draft")).toBeNull();
    expect(await getCase("no-such-case")).toBeNull();
  });
});

describe("listCases (STU-1148)", () => {
  it("lists published cases only: slug, title, category line and consultants", async () => {
    const list = await listCases();
    expect(list).toEqual([
      {
        slug: "example-case",
        title: "Example Client",
        categoryLine: "Consumer App · UX Research",
        consultants: [{ name: "Moa Bogren", title: "UX Lead", photoUrl: "/team/moa.jpg" }],
      },
    ]);
  });
});

describe("hero image and key figures (STU-1153)", () => {
  it("reads the hero image; no picture means none", () => {
    expect(parseCase(fixture[0]).heroImage).toEqual({ src: "/cases/hero.png", alt: "A laptop on a desk" });
    expect(parseCase({ slug: "x", title: "X", hero_image: { src: "  ", alt: "a" } }).heroImage).toBeNull();
    expect(parseCase({ slug: "x", title: "X" }).heroImage).toBeNull();
    expect(parseCase({ slug: "x", title: "X", hero_image: "nope" }).heroImage).toBeNull();
    expect(parseCase({ slug: "x", title: "X", hero_image: { src: "a.png" } }).heroImage).toEqual({ src: "a.png", alt: "" });
  });

  it("keeps an outcome's key figure and leaves it out when empty or not text", () => {
    const c = parseCase({
      slug: "x", title: "X",
      blocks: [{ type: "outcomes", items: [
        { heading: "A", text: "a", figure: "+28%" },
        { heading: "B", text: "b", figure: "" },
        { heading: "C", text: "c", figure: 5 },
        { heading: "D", text: "d" },
      ] }],
    });
    const o = c.blocks[0];
    const items = o.type === "outcomes" ? o.items : [];
    expect(items[0]).toEqual({ heading: "A", text: "a", figure: "+28%" });
    for (const i of items.slice(1)) expect("figure" in i).toBe(false);
  });
});
