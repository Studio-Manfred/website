// Lays out a people network in a unit square (0–1 on both axes): one hub per
// skill on a ring, and each person between the hubs of their skills. Someone
// with one skill sits just outside that hub; someone with several sits where
// their skills overlap. A few rounds of pushing apart keep people from
// overlapping each other or the hub labels. `ring` is the hubs' order around
// the ring, for joining neighbours into one whole. Deterministic, so server and
// client render the same picture.

export type Point = { x: number; y: number };

/** Smallest distance between two people, in unit-square terms. */
export const MIN_GAP = 0.11;
const HUB_CLEARANCE = 0.1;
const RING = 0.3;
const ORBIT = 0.13;
const EDGE = 0.06;

const clamp = (v: number) => Math.min(1 - EDGE, Math.max(EDGE, v));

export function layoutNetwork(
  people: { name: string; skills: readonly string[] }[],
  skills: readonly string[],
): { hubs: Record<string, Point>; people: Record<string, Point>; ring: string[] } {
  const hubs: Record<string, Point> = {};
  const ring = ringOrder(people, skills);
  ring.forEach((s, i) => {
    const a = -Math.PI / 2 + (i * 2 * Math.PI) / skills.length;
    hubs[s] = { x: 0.5 + Math.cos(a) * RING, y: 0.5 + Math.sin(a) * RING };
  });

  // Start positions: single-skill people fan out around their hub, facing
  // away from the centre; people who share the same skills line up in and out.
  const groups = new Map<string, string[]>();
  for (const p of people) {
    const key = [...p.skills].sort().join("|");
    groups.set(key, [...(groups.get(key) ?? []), p.name]);
  }

  const placed: Record<string, Point> = {};
  for (const p of people) {
    const group = groups.get([...p.skills].sort().join("|"))!;
    const k = group.indexOf(p.name) - (group.length - 1) / 2;
    if (p.skills.length === 1) {
      const hub = hubs[p.skills[0]];
      const out = Math.atan2(hub.y - 0.5, hub.x - 0.5) + k * 0.85;
      placed[p.name] = { x: hub.x + Math.cos(out) * ORBIT, y: hub.y + Math.sin(out) * ORBIT };
    } else {
      const mx = p.skills.reduce((sum, s) => sum + hubs[s].x, 0) / p.skills.length;
      const my = p.skills.reduce((sum, s) => sum + hubs[s].y, 0) / p.skills.length;
      // Share the spot by stepping in and out from the centre, which keeps
      // everyone as far from both hubs as the midpoint is.
      const len = Math.hypot(mx - 0.5, my - 0.5);
      const ox = len ? (mx - 0.5) / len : 0;
      const oy = len ? (my - 0.5) / len : 1;
      placed[p.name] = { x: mx + ox * k * MIN_GAP * 1.05, y: my + oy * k * MIN_GAP * 1.05 };
    }
  }

  const names = people.map((p) => p.name);
  for (let round = 0; round < 300; round++) {
    let moved = false;
    for (let i = 0; i < names.length; i++) {
      const a = placed[names[i]];
      for (let j = i + 1; j < names.length; j++) {
        const b = placed[names[j]];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d >= MIN_GAP) continue;
        moved = true;
        const nx = d ? (a.x - b.x) / d : 1;
        const ny = d ? (a.y - b.y) / d : 0;
        const push = (MIN_GAP - d) / 2 + 0.001;
        a.x += nx * push;
        a.y += ny * push;
        b.x -= nx * push;
        b.y -= ny * push;
      }
      for (const h of Object.values(hubs)) {
        const d = Math.hypot(a.x - h.x, a.y - h.y);
        if (d >= HUB_CLEARANCE) continue;
        moved = true;
        const nx = d ? (a.x - h.x) / d : 0;
        const ny = d ? (a.y - h.y) / d : 1;
        a.x += nx * (HUB_CLEARANCE - d + 0.001);
        a.y += ny * (HUB_CLEARANCE - d + 0.001);
      }
      a.x = clamp(a.x);
      a.y = clamp(a.y);
    }
    if (!moved) break;
  }

  // Hubs keep the caller's skill order as keys, whatever order the ring uses.
  const orderedHubs = Object.fromEntries(skills.map((s) => [s, hubs[s]]));
  const round = (v: number) => Math.round(v * 10000) / 10000;
  return {
    hubs: orderedHubs,
    ring,
    people: Object.fromEntries(names.map((n) => [n, { x: round(placed[n].x), y: round(placed[n].y) }])),
  };
}

// The ring order that puts skills people share next to each other: every
// order is scored by how close each pair of a person's skills sits on the ring,
// with the first skill fixed at the top. Ties keep the caller's order.
function ringOrder(people: { skills: readonly string[] }[], skills: readonly string[]): string[] {
  const n = skills.length;
  if (n < 4) return [...skills];
  const together = new Map<string, number>();
  for (const p of people) {
    for (const a of p.skills) for (const b of p.skills) if (a < b) together.set(`${a}|${b}`, (together.get(`${a}|${b}`) ?? 0) + 1);
  }
  const score = (order: string[]) => {
    let total = 0;
    for (const [pair, count] of together) {
      const [a, b] = pair.split("|");
      const gap = Math.abs(order.indexOf(a) - order.indexOf(b));
      total += count * Math.cos((Math.min(gap, n - gap) * 2 * Math.PI) / n);
    }
    return total;
  };
  let best = [...skills];
  let bestScore = score(best);
  const permute = (head: string[], rest: string[]) => {
    if (!rest.length) {
      const s = score(head);
      if (s > bestScore + 1e-9) {
        best = head;
        bestScore = s;
      }
      return;
    }
    rest.forEach((x, i) => permute([...head, x], [...rest.slice(0, i), ...rest.slice(i + 1)]));
  };
  permute([skills[0]], skills.slice(1));
  return best;
}
