import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchGroupStatuses, matchStatuses, STATUS_LABEL } from "./group-status";

const people = [
  { name: "Peter Olovsson", company: "seventyone-consulting" },
  { name: "Moa Bogren", company: "studio-manfred" },
  { name: "Moa Bernhardsson", company: "mather-studio" },
  { name: "Jens Wedin", company: "studio-manfred" },
  { name: "Selma Hallqvist", company: "studio-manfred" },
];

describe("matchStatuses", () => {
  it("matches the sheet's company and first name (or full name) to each person", () => {
    const rows = [
      { company: "SeventyOne", name: "Peter", status: "AKTIVT SÖKANDE" },
      { company: "Manfred", name: "moa bogren", status: "SÖKER SNART" },
      { company: "Mather", name: "Moa", status: "HAPPY SOM DET ÄR" },
    ];
    expect(matchStatuses(people, rows)).toEqual({
      "Peter Olovsson": "available",
      "Moa Bogren": "soon",
      "Moa Bernhardsson": "busy",
    });
  });

  it("leaves out anyone the sheet doesn't name, names under another company, or names twice", () => {
    const rows = [
      { company: "SeventyOne", name: "Jens", status: "AKTIVT SÖKANDE" },
      { company: "Manfred", name: "Selma", status: "AKTIVT SÖKANDE" },
      { company: "Manfred", name: "Selma", status: "HAPPY SOM DET ÄR" },
      { company: "Manfred", name: "Okänd", status: "SEMESTER" },
    ];
    expect(matchStatuses(people, rows)).toEqual({});
  });

  it("has a label for every status", () => {
    expect(STATUS_LABEL).toEqual({ available: "Tillgänglig nu", soon: "Tillgänglig snart", busy: "På uppdrag" });
  });
});

describe("fetchGroupStatuses", () => {
  const env = { url: "https://x.supabase.co", anonKey: "anon", statusKey: "status-key" };

  afterEach(() => vi.restoreAllMocks());

  it("asks the intranet function for public statuses with the website's key", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({ ok: true, people: [{ company: "SeventyOne", name: "Peter", status: "AKTIVT SÖKANDE" }] }),
    );
    expect(await fetchGroupStatuses(people, env, fetchMock)).toEqual({ "Peter Olovsson": "available" });
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://x.supabase.co/functions/v1/sync-availability-sheet");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer anon", apikey: "anon", "x-public-status-key": "status-key" });
    expect(JSON.parse(init.body)).toEqual({ action: "public-status" });
  });

  it("gives no statuses, without calling out, when the key isn't configured", async () => {
    const fetchMock = vi.fn();
    expect(await fetchGroupStatuses(people, { ...env, statusKey: undefined }, fetchMock)).toEqual({});
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("gives no statuses when the intranet says no or answers something unexpected", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    expect(await fetchGroupStatuses(people, env, vi.fn().mockResolvedValue(new Response("", { status: 401 })))).toEqual({});
    expect(await fetchGroupStatuses(people, env, vi.fn().mockResolvedValue(Response.json({ ok: true, people: "x" })))).toEqual({});
    expect(await fetchGroupStatuses(people, env, vi.fn().mockRejectedValue(new Error("down")))).toEqual({});
  });
});
