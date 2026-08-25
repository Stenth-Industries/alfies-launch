/**
 * Shared constants for the age gate.
 *
 * The gate is enforced in middleware rather than in the browser: an overlay
 * painted on top of a fully-served page is not a gate, because the product
 * markup has already gone over the wire and view-source, a crawler, reader
 * mode or a direct link to a product page all reach it untouched. Health
 * Canada's position is that visitors' ages must be diligently verified
 * *before* they can see vaping products, and that a check-box attestation is
 * not sufficient (RIAS, Canada Gazette Part II, 8 July 2020).
 *
 * A date of birth is the minimum defensible step above a check-box. It is not
 * verification — a determined minor can type any date — so if the shop wants a
 * defensible position rather than a good-faith one, the next step is a paid
 * ID-check provider. That is the owner's risk to accept knowingly.
 */

export const AGE_COOKIE = "alfies_age_ok";

/**
 * No maxAge is set on the cookie (see actions.ts) — it's a session cookie,
 * cleared when the browser closes, so a returning visitor is asked again
 * next session rather than being remembered for a fixed period.
 */

/** The gate route. Middleware rewrites every un-verified request here. */
export const AGE_GATE_PATH = "/age-check";

/**
 * Whole years between `dob` and `now`, or null if the parts do not describe a
 * real date. Rejects round-trip mismatches (31 February and friends) rather
 * than letting the Date constructor silently roll them forward.
 */
export function ageInYears(
  year: number,
  month: number,
  day: number,
  now = new Date(),
): number | null {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return null;
  }
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  if (year < 1900 || year > now.getFullYear()) return null;

  const dob = new Date(Date.UTC(year, month - 1, day));
  if (
    dob.getUTCFullYear() !== year ||
    dob.getUTCMonth() !== month - 1 ||
    dob.getUTCDate() !== day
  ) {
    return null;
  }
  if (dob.getTime() > now.getTime()) return null;

  let age = now.getUTCFullYear() - year;
  const hadBirthday =
    now.getUTCMonth() > month - 1 ||
    (now.getUTCMonth() === month - 1 && now.getUTCDate() >= day);
  if (!hadBirthday) age -= 1;
  return age;
}
