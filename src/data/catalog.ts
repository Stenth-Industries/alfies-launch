export type Brand = {
  slug: string;
  name: string;
  tagline: string;
  /** Product-line cover art shown on the Products page card. */
  cover?: string;
  /** Brand wordmark shown in the featured-brands strip. */
  logo: string;
  highlights: string[];
};

/**
 * One card per brand. Cover art lives in /public/covers, wordmarks in
 * /public/brands. Level X has a logo but no cover art yet, so it appears in
 * the brand strip only.
 */
export const BRANDS: Brand[] = [
  {
    slug: "elfbar",
    name: "Elfbar",
    tagline:
      "The best-known name in disposables — big puff counts, smart displays and a huge flavour range.",
    cover: "/covers/elfbar.png",
    logo: "/brands/elfbar.png",
    highlights: ["Up to 25K puffs", "Battery + juice display", "Rechargeable"],
  },
  {
    slug: "flavour-beast",
    name: "Flavour Beast",
    tagline:
      "Canadian favourite with bold, unapologetic flavours across disposables and pod systems.",
    cover: "/covers/flavour-beast.png",
    logo: "/brands/f-b.png",
    highlights: ["Beast Mode line", "Loud flavours", "Pods + disposables"],
  },
  {
    slug: "level-x",
    name: "Level X",
    tagline:
      "Flavour Beast's closed-pod ecosystem — one battery, endless interchangeable flavour pods.",
    logo: "/brands/level-x.png",
    highlights: ["Interchangeable pods", "Reusable battery", "Lower cost per puff"],
  },
  {
    slug: "orbito",
    name: "Orbito",
    tagline:
      "Sleek disposables with smooth draws and clean, true-to-name flavour profiles.",
    cover: "/covers/orbito.png",
    logo: "/brands/orbito.png",
    highlights: ["Smooth airflow", "Compact design", "High puff count"],
  },
  {
    slug: "ovns",
    name: "OVNS",
    tagline:
      "Feature-packed devices with digital displays and mesh coils for dense, consistent vapour.",
    cover: "/covers/ovns.png",
    logo: "/brands/ovns.png",
    highlights: ["Smart display", "Mesh coil", "Adjustable modes"],
  },
  {
    slug: "oxbar",
    name: "Oxbar",
    tagline:
      "Performance-first disposables known for punchy flavour and long-lasting batteries.",
    cover: "/covers/oxbar.png",
    logo: "/brands/oxbar.png",
    highlights: ["Boost modes", "Long battery life", "Vivid flavours"],
  },
  {
    slug: "stlth",
    name: "STLTH",
    tagline:
      "Canada's pod pioneer — dependable closed pods plus a strong disposable lineup.",
    cover: "/covers/stlth.png",
    logo: "/brands/stlth.png",
    highlights: ["Closed pod system", "Canadian staple", "Wide availability"],
  },
  {
    slug: "veev",
    name: "VEEV",
    tagline:
      "Premium engineering with consistent draws, clean design and refined flavours.",
    cover: "/covers/veev.png",
    logo: "/brands/veev.png",
    highlights: ["Premium build", "Consistent draw", "Clean design"],
  },
  {
    slug: "vuse",
    name: "Vuse",
    tagline:
      "The global #1 vape brand — ePod devices with a broad range of pre-filled pods.",
    cover: "/covers/vuse.png",
    logo: "/brands/vuse.png",
    highlights: ["ePod 2 system", "Pre-filled pods", "Global #1 brand"],
  },
  {
    slug: "z-pods",
    name: "Z Pods",
    tagline:
      "STLTH-compatible pods in flavours you won't find anywhere else, at a great price.",
    cover: "/covers/z-pods.png",
    logo: "/brands/z-pods.png",
    highlights: ["STLTH compatible", "Unique flavours", "Great value"],
  },
];

/** Brands that have cover art — these get cards on the Products page. */
export const PRODUCT_BRANDS = BRANDS.filter(
  (b): b is Brand & { cover: string } => Boolean(b.cover),
);
