/**
 * Store details. Address, phone and hours are Alfie's real information.
 * Items marked TODO still need confirming before launch.
 */
export const STORE = {
  name: "Alfie's",
  fullName: "Alfie's Vape Store",
  city: "Barrie",
  province: "Ontario",
  provinceShort: "ON",

  phone: "(705) 739-9990",
  phoneHref: "tel:+17057399990",
  address: "201 Cundles Rd East",
  postalCode: "L4M 4S5",

  // TODO: confirm with Alfie before launch
  email: "hello@alfiesvape.ca",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",

  hours: [
    { days: "Monday – Thursday", time: "8:00 AM – 10:00 PM" },
    { days: "Friday & Saturday", time: "8:00 AM – 11:00 PM" },
    { days: "Sunday", time: "8:00 AM – 8:00 PM" },
  ],

  /** Legal vaping age in Ontario is 19. */
  minimumAge: 19,
} as const;

/**
 * The health warning prescribed for vaping *advertising* by the Vaping Products
 * Promotion Regulations. Two are permitted and the text of each is fixed by
 * regulation — reproduce one of them verbatim or the advertisement is
 * non-compliant however good the intention.
 *
 *   1. WARNING: Vaping products contain nicotine, a highly addictive chemical.
 *   2. WARNING: Vaping products release chemicals that may harm your health.
 *
 * Do not blend these with the *packaging* warning ("WARNING: Nicotine is highly
 * addictive"), which is a different instrument for a different surface — the
 * build shipped that blend until this was corrected.
 *
 * Split into lead + rest because s. 21 requires the first word set in upper
 * case and bold, and s. 22 requires the attribution; the display component
 * needs the pieces, and `text` is the verbatim sentence for anywhere that just
 * needs a string. VPPR ss. 8, 21, 22.
 */
const WARNING_LEAD = "WARNING:";
const WARNING_REST =
  "Vaping products contain nicotine, a highly addictive chemical.";

export const HEALTH_WARNING = {
  lead: WARNING_LEAD,
  rest: WARNING_REST,
  text: `${WARNING_LEAD} ${WARNING_REST}`,
  attribution: "Health Canada",
} as const;

/**
 * Notices that are ours to word, as against the prescribed warning above.
 * Keep the two apart: this object may be edited freely, HEALTH_WARNING may not.
 */
export const LEGAL = {
  ageNotice: `You must be ${STORE.minimumAge} or older to purchase vaping products in ${STORE.province}. Government-issued photo ID is required in store.`,
  idNotice: "We ID anyone who looks under 25.",
  disclaimer:
    "This site does not sell online. Products, flavours and stock change often — call or visit the shop for today's selection.",
} as const;
