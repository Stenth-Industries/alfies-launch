/**
 * Store details. Items marked TODO need Alfie's real information before
 * launch — the phone number and address in particular.
 */
export const STORE = {
  name: "Alfie's",
  fullName: "Alfie's Vape Store",
  city: "Barrie",
  province: "Ontario",
  provinceShort: "ON",

  // TODO: confirm with Alfie before launch
  phone: "(705) 555-0142",
  phoneHref: "tel:+17055550142",
  address: "000 Dunlop Street East",
  postalCode: "L4M 0A0",
  email: "hello@alfiesvape.ca",

  instagram: "https://instagram.com",
  facebook: "https://facebook.com",

  hours: [
    { days: "Monday – Friday", time: "10:00 AM – 9:00 PM" },
    { days: "Saturday", time: "10:00 AM – 9:00 PM" },
    { days: "Sunday", time: "11:00 AM – 6:00 PM" },
  ],

  /** Legal vaping age in Ontario is 19. */
  minimumAge: 19,
} as const;

export const LEGAL = {
  warning:
    "19+ only. Vaping products contain nicotine. Nicotine is highly addictive.",
  ageNotice: `You must be ${STORE.minimumAge} or older to purchase vaping products in ${STORE.province}. Government-issued photo ID is required in store.`,
  disclaimer:
    "This site does not sell online. Products, flavours and stock change often — call or visit the shop for today's selection.",
} as const;
