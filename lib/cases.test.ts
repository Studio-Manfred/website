import { describe, expect, it } from "vitest";
import fixture from "@/test/fixtures/cases.json";
import { getCase, parseCase } from "./cases";

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
