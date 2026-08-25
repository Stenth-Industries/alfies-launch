"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { STORE } from "@/data/store";
import { AGE_COOKIE, AGE_COOKIE_MAX_AGE, ageInYears } from "@/lib/age-gate";

export type AgeCheckState = { error?: string };

/** Only ever send visitors back to a path on this site. */
function safeNext(raw: FormDataEntryValue | null): string {
  const value = typeof raw === "string" ? raw : "";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

/**
 * Verifies a declared date of birth and, if it clears 19, sets the gate cookie.
 *
 * The date itself is used to compute an age and then dropped on the floor: it
 * is never written to the cookie, a log, or storage of any kind. Under PIPEDA
 * the least we can collect is the least we have to account for, and the shop
 * has no use for a customer's birthday.
 */
export async function verifyAge(
  _prev: AgeCheckState,
  formData: FormData,
): Promise<AgeCheckState> {
  const age = ageInYears(
    Number(formData.get("year")),
    Number(formData.get("month")),
    Number(formData.get("day")),
  );

  if (age === null) return { error: "Please enter a complete, real date of birth." };
  if (age < STORE.minimumAge) {
    return {
      error: `You must be ${STORE.minimumAge} or older to view this site.`,
    };
  }

  const store = await cookies();
  store.set(AGE_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AGE_COOKIE_MAX_AGE,
  });

  redirect(safeNext(formData.get("next")));
}
