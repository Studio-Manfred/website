import { describe, expect, it } from "vitest";
import { GROUP_PEOPLE, GROUP_SKILLS } from "./group";
import { layoutNetwork, MIN_GAP, type Point } from "./network";

const SKILLS = ["Product", "Design", "Research", "Leadership", "Agile & change", "Talent"];
const PEOPLE = [
  { name: "A", skills: ["Product"] },
  { name: "B", skills: ["Product"] },
  { name: "C", skills: ["Product"] },
  { name: "D", skills: ["Design"] },
  { name: "E", skills: ["Design", "Leadership"] },
  { name: "F", skills: ["Design", "Leadership"] },
  { name: "G", skills: ["Product", "Agile & change"] },
  { name: "H", skills: ["Agile & change", "Leadership"] },
  { name: "I", skills: ["Talent"] },
  { name: "J", skills: ["Research"] },
];

const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);

describe("layoutNetwork", () => {
  const { hubs, people } = layoutNetwork(PEOPLE, SKILLS);

  it("places one hub per skill, inside the frame and apart from each other", () => {
    expect(Object.keys(hubs)).toEqual(SKILLS);
    const points = Object.values(hubs);
    for (const p of points) {
      expect(p.x).toBeGreaterThan(0.05);
      expect(p.x).toBeLessThan(0.95);
    }
    points.forEach((a, i) => points.slice(i + 1).forEach((b) => expect(dist(a, b)).toBeGreaterThan(0.2)));
  });

  it("places everyone inside the frame without two people overlapping", () => {
    const points = PEOPLE.map((p) => people[p.name]);
    for (const p of points) {
      for (const v of [p.x, p.y]) {
        expect(v).toBeGreaterThanOrEqual(0.05);
        expect(v).toBeLessThanOrEqual(0.95);
      }
    }
    points.forEach((a, i) => points.slice(i + 1).forEach((b) => expect(dist(a, b)).toBeGreaterThanOrEqual(MIN_GAP * 0.99)));
  });

  it("keeps people clear of the hub labels", () => {
    for (const p of PEOPLE) for (const h of Object.values(hubs)) expect(dist(people[p.name], h)).toBeGreaterThan(0.07);
  });

  it("puts someone with one skill nearest that skill", () => {
    for (const p of PEOPLE.filter((p) => p.skills.length === 1)) {
      const nearest = SKILLS.reduce((best, s) => (dist(people[p.name], hubs[s]) < dist(people[p.name], hubs[best]) ? s : best));
      expect(nearest).toBe(p.skills[0]);
    }
  });

  it("puts someone with several skills between them: nearer their own skills than the others", () => {
    for (const p of PEOPLE.filter((p) => p.skills.length > 1)) {
      const mean = (ss: string[]) => ss.reduce((sum, s) => sum + dist(people[p.name], hubs[s]), 0) / ss.length;
      expect(mean(p.skills)).toBeLessThan(mean(SKILLS.filter((s) => !p.skills.includes(s))));
    }
  });

  it("gives the ring order, every skill once, so the hubs can be joined into one whole", () => {
    const { ring } = layoutNetwork(PEOPLE, SKILLS);
    expect([...ring].sort()).toEqual([...SKILLS].sort());
    expect(ring[0]).toBe(SKILLS[0]);
    // Neighbours on the ring are neighbours in the picture: the next hub is the closest one.
    ring.forEach((s, i) => {
      const next = ring[(i + 1) % ring.length];
      const others = SKILLS.filter((o) => o !== s && o !== next && o !== ring[(i - 1 + ring.length) % ring.length]);
      for (const o of others) expect(dist(hubs[s], hubs[next])).toBeLessThan(dist(hubs[s], hubs[o]));
    });
  });

  it("gives the same layout every time", () => {
    const again = layoutNetwork(PEOPLE, SKILLS);
    expect({ hubs: again.hubs, people: again.people }).toEqual({ hubs, people });
  });
});

describe("layoutNetwork with the group's people", () => {
  it("fits everyone without overlaps, each nearer their own skills", () => {
    const { hubs, people } = layoutNetwork(GROUP_PEOPLE, GROUP_SKILLS);
    const points = GROUP_PEOPLE.map((p) => people[p.name]);
    points.forEach((a, i) => points.slice(i + 1).forEach((b) => expect(dist(a, b)).toBeGreaterThanOrEqual(MIN_GAP * 0.99)));
    for (const p of GROUP_PEOPLE) {
      const mean = (ss: readonly string[]) => ss.reduce((sum, s) => sum + dist(people[p.name], hubs[s]), 0) / ss.length;
      expect(mean(p.skills)).toBeLessThan(mean(GROUP_SKILLS.filter((s) => !p.skills.includes(s))));
    }
  });
});
