import { cookies } from "next/headers";
import { getLockedCase } from "@/lib/cases";

// STU-1156: a correct password is remembered in an httpOnly cookie for this
// one case (path-scoped), for 30 days, and checked against the database on
// every visit, so changing the password locks visitors out again.
export const UNLOCK_MAX_AGE = 60 * 60 * 24 * 30;
export const unlockCookieName = (slug: string) => `case_unlock_${slug}`;

/** The locked case this browser has unlocked, or null. */
export async function caseFromUnlockCookie(slug: string) {
  const password = (await cookies()).get(unlockCookieName(slug))?.value;
  return password ? getLockedCase(slug, password) : null;
}
