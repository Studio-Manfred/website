// Each industry has its own address under the case, so a link can open the
// journey on the right industry: /cases/customer-journey-intelligence/hotel.
// The case address on its own opens the default industry.
import { CJ_CASE_SLUG } from "./case";
import type { IndustryId } from "./types";

export const DEFAULT_INDUSTRY: IndustryId = "finance";

/** Readable slug per industry. The ids stay internal (ehandel is Swedish). */
export const INDUSTRY_SLUGS: Record<IndustryId, string> = {
  finance: "retail-bank",
  insurance: "insurance",
  grocery: "grocery",
  ehandel: "e-commerce",
  hotel: "hotel",
};

export const industryPath = (id: IndustryId) => `/cases/${CJ_CASE_SLUG}/${INDUSTRY_SLUGS[id]}`;

/**
 * The industry for the route's optional segments: none gives the default,
 * one known slug gives its industry, anything else gives null (a 404).
 */
export function industryFromSegments(segments: string[] | undefined): IndustryId | null {
  if (!segments || segments.length === 0) return DEFAULT_INDUSTRY;
  if (segments.length > 1) return null;
  const hit = (Object.keys(INDUSTRY_SLUGS) as IndustryId[]).find((id) => INDUSTRY_SLUGS[id] === segments[0]);
  return hit ?? null;
}
