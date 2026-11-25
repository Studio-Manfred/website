import { z } from "zod";

// Assignment status for the People network on /cases/71collective, read from
// the group's shared sheet through the intranet's sync-availability-sheet
// function ({ action: "public-status" }, header x-public-status-key). That
// view carries only company, name and status; client, dates and roles never
// leave the intranet. Anything that goes wrong means no statuses, never an
// error on the page.

export type PersonStatus = "available" | "soon" | "busy";

export const STATUS_LABEL: Record<PersonStatus, string> = {
  available: "Tillgänglig nu",
  soon: "Tillgänglig snart",
  busy: "På uppdrag",
};

const FROM_SHEET: Record<string, PersonStatus> = {
  "AKTIVT SÖKANDE": "available",
  "SÖKER SNART": "soon",
  "HAPPY SOM DET ÄR": "busy",
};

// The sheet's Företag column for each company id.
const SHEET_COMPANY: Record<string, string> = {
  "seventyone-consulting": "SeventyOne",
  "studio-manfred": "Manfred",
  "mather-studio": "Mather",
};

const Rows = z.object({
  people: z.array(z.object({ company: z.string(), name: z.string(), status: z.string() })),
});
type Row = z.infer<typeof Rows>["people"][number];

const norm = (s: string) => s.trim().replace(/\s+/g, " ").toLocaleLowerCase("sv");

/**
 * Each person's status, by name. The sheet names people by first name (or a
 * full name) within their company; a person named by no row, or by more than
 * one, gets no status rather than a guess.
 */
export function matchStatuses(people: { name: string; company: string }[], rows: Row[]): Record<string, PersonStatus> {
  const out: Record<string, PersonStatus> = {};
  for (const p of people) {
    const company = SHEET_COMPANY[p.company];
    const first = p.name.split(" ")[0];
    const named = rows.filter(
      (r) => company && norm(r.company) === norm(company) && [norm(p.name), norm(first)].includes(norm(r.name)),
    );
    const status = named.length === 1 ? FROM_SHEET[named[0].status] : undefined;
    if (status) out[p.name] = status;
  }
  return out;
}

export interface StatusEnv {
  url?: string;
  anonKey?: string;
  statusKey?: string;
}

export async function fetchGroupStatuses(
  people: { name: string; company: string }[],
  env: StatusEnv,
  fetchImpl: typeof fetch = fetch,
): Promise<Record<string, PersonStatus>> {
  if (!env.url || !env.anonKey || !env.statusKey) return {};
  try {
    const res = await fetchImpl(`${env.url}/functions/v1/sync-availability-sheet`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.anonKey}`,
        apikey: env.anonKey,
        "x-public-status-key": env.statusKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "public-status" }),
    });
    if (!res.ok) throw new Error(`status ${res.status}`);
    return matchStatuses(people, Rows.parse(await res.json()).people);
  } catch (e) {
    console.error("group statuses", e);
    return {};
  }
}
