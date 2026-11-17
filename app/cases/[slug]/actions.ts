"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getLockedCase } from "@/lib/cases";
import { UNLOCK_MAX_AGE, unlockCookieName } from "./unlock";

/** The password form's Server Function (STU-1156). */
export async function unlockCase(slug: string, formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const study = await getLockedCase(slug, password);
  if (!study) redirect(`/cases/${slug}?wrong=1`);
  (await cookies()).set(unlockCookieName(slug), password, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: UNLOCK_MAX_AGE,
    path: `/cases/${slug}`,
  });
  redirect(`/cases/${slug}`);
}
