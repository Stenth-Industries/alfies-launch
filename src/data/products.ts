/**
 * Per-brand product lines, transcribed from the shelf photos in /products.
 *
 * Each brand breaks down into series (a device or pod line, e.g. Beast Mode
 * Max 2), and each series lists the flavours currently on the wall. Stock
 * rotates weekly, so this is a showcase of what the shop carries rather than a
 * live inventory — the brand pages say as much.
 *
 * No product photography has been supplied yet, so cards render a placeholder
 * (see ProductThumb). When real shots arrive, add an `image` to the product.
 */

export type Product = {
  name: string;
  /** Short qualifier printed on the box — "Iced", "Limited Edition", … */
  badge?: string;
  /** Flavour breakdown or edition name where the box spells one out. */
  note?: string;
};

export type Series = {
  slug: string;
  name: string;
  /** Puff rating as advertised on the packaging. */
  puffs?: string;
  /** Pack format, e.g. "5 × 20 mL". */
  format?: string;
  /** One line on what the line is, shown under the series heading. */
  blurb?: string;
  products: Product[];
};

/** Series keyed by brand slug, in the order they should appear on the page. */
export const SERIES: Record<string, Series[]> = {
  elfbar: [
    {
      slug: "gh20000",
      name: "GH20000",
      puffs: "20,000 puffs",
      format: "1 × 20 mL",
      blurb: "Triple mesh coil with three power modes and a full-colour display.",
      products: [
        { name: "Blue Razz Ice" },
        { name: "Peach Ice" },
        { name: "Peach Berry" },
        { name: "Strazzy Cherry" },
        { name: "Wiggly Berries" },
      ],
    },
    {
      slug: "bc10000",
      name: "BC10000",
      puffs: "10,000 puffs",
      format: "1 × 18 mL",
      blurb: "The everyday Elfbar — e-liquid and battery displays, special-edition artwork.",
      products: [
        { name: "Blueberry Cloudz", note: "Dinmol Edition" },
        { name: "Strawberry Ice", note: "Dinmol Edition" },
        { name: "Watermelon Ice", note: "Dinmol Edition" },
        { name: "Cherry Watermelon", note: "Sunit Edition" },
        { name: "Peach Berry" },
      ],
    },
    {
      slug: "bc-pro",
      name: "BC Pro 80K",
      puffs: "80,000 puffs",
      format: "1 × 25 mL",
      blurb: "CyberTech autofill with a 1000 mAh fast-charging battery.",
      products: [
        { name: "Watermelon Ice" },
        { name: "Blueberry Sour Raspberry" },
      ],
    },
    {
      slug: "moonnight",
      name: "Moonnight 70K",
      puffs: "70,000 puffs",
      format: "1 × 20 mL",
      blurb: "Rechargeable disposable with a full-screen display.",
      products: [{ name: "Mango Peach Watermelon" }],
    },
    {
      slug: "prime",
      name: "Prime",
      format: "5 × 2 mL",
      blurb: "Compact ultra-taste disposable for a pocket-sized carry.",
      products: [
        { name: "Blueberry Sour Raspberry" },
        { name: "Strawberry Kiwi" },
      ],
    },
  ],

  "flavour-beast": [
    {
      slug: "beast-mode-max-3",
      name: "Beast Mode Max 3",
      puffs: "60,000 puffs",
      format: "4 × 20 mL",
      blurb: "Adjustable sweetener and ice levels on top of the Max platform.",
      products: [
        { name: "Weekend Watermelon", badge: "Iced" },
        { name: "Trippin' Triple Berry" },
      ],
    },
    {
      slug: "beast-mode-max-2",
      name: "Beast Mode Max 2",
      puffs: "50,000 puffs",
      format: "5 × 20 mL",
      blurb: "3× maxed flavour in eco mode — the line the shop sells most of.",
      products: [
        { name: "Bomb Blue Razz" },
        { name: "Bussin Banana", badge: "Iced" },
        { name: "Mad Mango Peach" },
        { name: "Packin' Peach Berry" },
      ],
    },
    {
      slug: "gushin-series",
      name: "Beast Mode Max 2 — Gushin Series",
      puffs: "50,000 puffs",
      format: "5 × 20 mL",
      blurb: "Collaboration flavours in the Gushin artwork.",
      products: [
        { name: "Blue Razz" },
        { name: "Watermelon Apple" },
        { name: "Cherry" },
        { name: "Strawberry" },
      ],
    },
    {
      slug: "twelve-monkeys",
      name: "Beast Mode Max 2 × Twelve Monkeys",
      puffs: "50,000 puffs",
      format: "5 × 20 mL",
      blurb: "Twelve Monkeys Vapor Co. classics ported onto the Max 2 device.",
      products: [
        { name: "Hakuna", badge: "Iced", note: "Apple · Fuji Apple · Cranberry" },
        { name: "Mangabeys", badge: "Iced", note: "Mango · Pineapple · Guava" },
      ],
    },
  ],

  "level-x": [
    {
      slug: "g2-ultra",
      name: "G2 Ultra Pods",
      puffs: "50,000 puffs",
      format: "6 × 20 mL",
      blurb: "Next-gen pods for the Level X G2 battery — the widest flavour wall in store.",
      products: [
        { name: "Bomb Blue Razz" },
        { name: "Trippin' Triple Berry" },
        { name: "Cherry Blast", badge: "Iced" },
        { name: "Weekend Watermelon", badge: "Iced" },
        { name: "Bangin' Blood Orange", badge: "Iced" },
        { name: "Wild White Grape", badge: "Iced" },
        { name: "Matata", badge: "Iced", note: "Purple Grape · Green Apple" },
        { name: "Killa Vanilla", note: "Cravin Series" },
      ],
    },
    {
      slug: "boost-g2",
      name: "Boost G2 Pods",
      puffs: "25,000 puffs",
      format: "6 × 20 mL",
      blurb: "2× boosted flavour with adjustable modes and a dual coil.",
      products: [
        { name: "Dreamy Dragonfruit Lychee", badge: "Iced" },
        { name: "Mad Mango Peach" },
        { name: "Super Sour Blue Razz" },
      ],
    },
    {
      slug: "devices",
      name: "Devices",
      blurb: "Batteries sold on their own — pods are bought separately.",
      products: [{ name: "G2 Pro Device Kit", note: "Blossom Pink" }],
    },
  ],

  orbito: [
    {
      slug: "lumo-ai",
      name: "Lumo-AI 120K",
      puffs: "120,000 puffs",
      format: "1 × 30 mL",
      blurb: "Smart AI core that tunes the draw as the pod runs down.",
      products: [
        { name: "Watermelon Berries" },
        { name: "Mint" },
        { name: "Blueberry Raspberry" },
      ],
    },
  ],

  ovns: [
    {
      slug: "mesh08",
      name: "Mesh08",
      puffs: "2,500 puffs",
      format: "1 × 2 mL",
      blurb: "Mesh-coil pocket disposable — the cheapest way to try a flavour.",
      products: [
        { name: "Icy Grape" },
        { name: "Berry Cherry Lime" },
        { name: "Lush Ice" },
        { name: "Blue Razz Ice" },
        { name: "Burst Ice" },
      ],
    },
  ],

  oxbar: [
    {
      slug: "g100k",
      name: "G100K",
      puffs: "100,000 puffs",
      format: "1 × 30 mL",
      blurb: "Rocky Vapor's flagship — the highest puff count on the wall.",
      products: [{ name: "Peach Berry" }, { name: "M.D.W." }],
    },
    {
      slug: "m85k",
      name: "M85K",
      puffs: "85,000 puffs",
      format: "1 × 25 mL",
      blurb: "Visible 2.0 tech with a 1000 mAh battery and smooth/boost dual mode.",
      products: [
        { name: "Berry Dragonfruit" },
        { name: "Cherry" },
        { name: "Mint" },
      ],
    },
    {
      slug: "tri-fusion",
      name: "Tri-Fusion",
      format: "1 × 30 mL",
      blurb: "Triple tank control — dial nicotine, infuse and ice levels separately.",
      products: [
        { name: "Banana Ice" },
        { name: "Peach Berry" },
        { name: "Strawberry Ice" },
      ],
    },
    {
      slug: "oxhukka",
      name: "Oxhukka",
      puffs: "25,000 puffs",
      format: "1 × 20 mL",
      blurb: "Hookah-styled draw at a lower 6 mg nicotine strength.",
      products: [{ name: "Grape Mint" }, { name: "Watermelon Ice" }],
    },
  ],

  stlth: [
    {
      slug: "geek-bar-80k",
      name: "STLTH × Geek Bar 80K",
      puffs: "80,000 puffs",
      format: "1 × 30 mL",
      blurb: "Pulse Mode collaboration with the curved-screen Geek Bar device.",
      products: [
        { name: "Blueberry Watermelon Ice" },
        { name: "Purple Grape Ice" },
        { name: "Strawberry Kiwi Ice", badge: "Limited Edition" },
        { name: "Peach Berry Ice" },
        { name: "Cherry Blast Ice" },
        { name: "Tropical Mango Ice" },
        { name: "Juicy Peach Ice" },
        { name: "Sour Blue Ice", note: "Sour Series" },
      ],
    },
    {
      slug: "loop-max",
      name: "Loop Max",
      puffs: "70,000 puffs",
      format: "1 × 30 mL",
      blurb: "The big Loop pod with an e-liquid indicator built into the shell.",
      products: [
        { name: "Strawberry Lime Ice" },
        { name: "Cherry Watermelon Ice" },
        { name: "Peach Watermelon Ice" },
      ],
    },
    {
      slug: "loop-25k",
      name: "Loop 25K Pods",
      puffs: "25,000 puffs",
      format: "1 × 20 mL",
      blurb: "Standard Loop refills for the Loop³ battery.",
      products: [
        { name: "Banana Ice" },
        { name: "Watermelon Lime Ice" },
        { name: "Peach Blue Razz Ice" },
      ],
    },
    {
      slug: "titan-max",
      name: "Titan Max",
      puffs: "50,000 puffs",
      format: "1 × 30 mL",
      products: [{ name: "Tropical Mango Ice" }],
    },
    {
      slug: "8k-pro",
      name: "8K Pro",
      puffs: "8,000 puffs",
      format: "1 × 14 mL",
      blurb: "Battery and e-liquid indicators on a compact disposable.",
      products: [{ name: "Kiwi Dragon Berry Ice" }],
    },
    {
      slug: "devices",
      name: "Devices",
      blurb: "Batteries sold on their own — pods are bought separately.",
      products: [
        { name: "Loop³ Device", note: "Black · normal & boost modes, adjustable airflow" },
      ],
    },
  ],

  veev: [
    {
      slug: "veev-now-8000",
      name: "VEEV Now 8000",
      puffs: "8,000 puffs",
      format: "1 × 18 mL",
      blurb: "LED-screen disposable at 1.8% nicotine — the widest VEEV flavour run.",
      products: [
        { name: "Blue Mint" },
        { name: "Grape" },
        { name: "Blue Raspberry" },
        { name: "Passion Fruit Kiwi Guava" },
        { name: "Mango" },
        { name: "Peach" },
        { name: "Strawberry" },
        { name: "Watermelon" },
      ],
    },
    {
      slug: "veev-now-1800",
      name: "VEEV Now 1800",
      puffs: "1,800 puffs",
      format: "1 × 5 mL",
      products: [{ name: "Blue Mint" }, { name: "Classic Tobacco" }],
    },
    {
      slug: "veev-one",
      name: "VEEV One Pods",
      puffs: "2,000 puffs",
      format: "2 × 2 mL",
      blurb: "Refill capsules for the VEEV One device.",
      products: [
        { name: "Classic Tobacco" },
        { name: "Balanced Tobacco" },
        { name: "Spearmint" },
        { name: "Ice Mint" },
        { name: "Blue Mint" },
        { name: "Clear Taste", note: "Flavour-free" },
      ],
    },
    {
      slug: "veev-ultra",
      name: "VEEV Ultra",
      puffs: "1,100 puffs",
      format: "2 × 2 mL",
      products: [{ name: "Ice Mint" }, { name: "Gold Tobacco" }],
    },
  ],

  vuse: [
    {
      slug: "go-5000",
      name: "Vuse Go 5000",
      puffs: "5,000 puffs",
      format: "1 × 10 mL",
      products: [{ name: "Spearmint Ice" }],
    },
    {
      slug: "go-1000",
      name: "Vuse Go 1000",
      puffs: "1,000 puffs",
      format: "1 × 2 mL",
      products: [{ name: "Spearmint Ice" }],
    },
    {
      slug: "pro-one",
      name: "Vuse Pro One",
      puffs: "1,000 puffs",
      format: "1 × 2 mL",
      blurb: "Device and pod together in one box.",
      products: [
        { name: "Smooth Tobacco" },
        { name: "Golden Tobacco Ice" },
      ],
    },
    {
      slug: "epod-pods",
      name: "ePod Pods",
      format: "2 × 2 mL / 4 × 2 mL",
      blurb: "Pre-filled cartridges in Classic and Intense strengths.",
      products: [
        { name: "Mint Ice", note: "Intense" },
        { name: "Smooth Tobacco", note: "Classic" },
      ],
    },
    {
      slug: "devices",
      name: "Devices",
      blurb: "Batteries sold on their own — pods are bought separately.",
      products: [
        { name: "Vuse Pro Device", note: "Smart Intelligent · Bluetooth, USB cable included" },
      ],
    },
  ],

  "z-pods": [
    {
      slug: "z-pods",
      name: "Z Pods",
      format: "3 × 2 mL",
      blurb: "STLTH-compatible pods on a special nic blend, in flavours STLTH doesn't make.",
      products: [
        { name: "Blueberry Dragon Fruit Guava" },
        { name: "Pineapple Lemon" },
        { name: "Peach Ice" },
        { name: "Mango Pineapple" },
        { name: "Watermelon Ice" },
        { name: "Fruit Nectar" },
      ],
    },
  ],
};

/** Total flavours listed for a brand, used for the "N flavours" card chip. */
export function countProducts(slug: string): number {
  return (SERIES[slug] ?? []).reduce((n, s) => n + s.products.length, 0);
}
