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

export const LEGAL = {
  warning:
    "19+ only. Vaping products contain nicotine. Nicotine is highly addictive.",
  ageNotice: `You must be ${STORE.minimumAge} or older to purchase vaping products in ${STORE.province}. Government-issued photo ID is required in store.`,
  disclaimer:
    "This site does not sell online. Products, flavours and stock change often — call or visit the shop for today's selection.",
} as const;
