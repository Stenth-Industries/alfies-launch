/**
 * Derived views over the catalogue, used by the home page. Nothing here is
 * hand-maintained data — it is all computed from `products.ts`, `catalog.ts`
 * and `renders.ts`, so the numbers on the home page can never drift from the
 * actual lineup.
 */
import { BRANDS } from "@/data/catalog";
import { SERIES } from "@/data/products";
import { RENDERS } from "@/data/renders";
import { STORE } from "@/data/store";

const BRAND_NAME: Record<string, string> = Object.fromEntries(
  BRANDS.map((b) => [b.slug, b.name]),
);

export type ShelfItem = {
  /** `brand|series|flavour`, the same key shape `RENDERS` uses. */
  key: string;
  brandSlug: string;
  brandName: string;
  seriesSlug: string;
  seriesName: string;
  flavour: string;
  badge?: string;
  note?: string;
  puffs?: string;
  /** Puff rating as a number, for sorting and tier buckets. 0 when unrated. */
  puffCount: number;
  render?: string;
};

/** Every flavour on the wall, flattened out of the per-brand series map. */
export const SHELF: ShelfItem[] = Object.entries(SERIES).flatMap(
  ([brandSlug, series]) =>
    series.flatMap((s) =>
      s.products.map((p) => {
        const key = `${brandSlug}|${s.slug}|${p.name}`;
        return {
          key,
          brandSlug,
          brandName: BRAND_NAME[brandSlug] ?? brandSlug,
          seriesSlug: s.slug,
          seriesName: s.name,
          flavour: p.name,
          badge: p.badge,
          note: p.note,
          puffs: s.puffs,
          puffCount: s.puffs ? Number(s.puffs.replace(/[^0-9]/g, "")) : 0,
          render: RENDERS[key],
        };
      }),
    ),
);

/* ---------------------------------------------------------------- arrivals */

/**
 * Curated "on the wall" picks. Add `brand|series|flavour` keys here (the same
 * keys used in renders.ts) to control exactly what leads the home page. Leave
 * it empty and the list falls back to the biggest-puff device from each series
 * that has a render — a reasonable default, but not a claim about what
 * actually arrived most recently.
 */
export const FEATURED_KEYS: string[] = [];

function derivedPicks(limit: number): ShelfItem[] {
  const bySeries = new Map<string, ShelfItem>();
  for (const item of SHELF) {
    if (!item.render) continue;
    const id = `${item.brandSlug}|${item.seriesSlug}`;
    // One card per series, so a brand with ten flavours cannot flood the rail.
    if (!bySeries.has(id)) bySeries.set(id, item);
  }
  return [...bySeries.values()]
    .sort((a, b) => b.puffCount - a.puffCount)
    .slice(0, limit);
}

export function shelfPicks(limit = 8): ShelfItem[] {
  if (FEATURED_KEYS.length) {
    const byKey = new Map(SHELF.map((i) => [i.key, i]));
    const picked = FEATURED_KEYS.map((k) => byKey.get(k)).filter(
      (i): i is ShelfItem => Boolean(i),
    );
    if (picked.length) return picked.slice(0, limit);
  }
  return derivedPicks(limit);
}

/* ------------------------------------------------------------- puff tiers */

export type PuffTier = {
  slug: string;
  label: string;
  blurb: string;
  min: number;
  max: number;
};

const TIER_DEFS: PuffTier[] = [
  {
    slug: "up-to-10k",
    label: "Up to 10K",
    blurb: "Pods and pocket-size devices — the everyday carry.",
    min: 1,
    max: 9_999,
  },
  {
    slug: "10k-50k",
    label: "10K – 50K",
    blurb: "The sweet spot: a week or two of vaping per device.",
    min: 10_000,
    max: 49_999,
  },
  {
    slug: "50k-80k",
    label: "50K – 80K",
    blurb: "Big-tank pod kits and long-run disposables.",
    min: 50_000,
    max: 79_999,
  },
  {
    slug: "80k-plus",
    label: "80K and up",
    blurb: "The heavyweights — displays, boost modes, months of use.",
    min: 80_000,
    max: Number.POSITIVE_INFINITY,
  },
];

export type PuffTierView = PuffTier & {
  flavours: number;
  series: number;
  brands: { slug: string; name: string }[];
  render?: string;
};

export const PUFF_TIERS: PuffTierView[] = TIER_DEFS.map((tier) => {
  const items = SHELF.filter(
    (i) => i.puffCount >= tier.min && i.puffCount <= tier.max,
  );
  const brands = [...new Set(items.map((i) => i.brandSlug))].map((slug) => ({
    slug,
    name: BRAND_NAME[slug] ?? slug,
  }));
  return {
    ...tier,
    flavours: items.length,
    series: new Set(items.map((i) => `${i.brandSlug}|${i.seriesSlug}`)).size,
    brands,
    render: items.find((i) => i.render)?.render,
  };
}).filter((t) => t.flavours > 0);

/* -------------------------------------------------------- flavour profiles */

export type FlavourProfile = {
  slug: string;
  label: string;
  blurb: string;
  /** Matched against the flavour name, badge and note together. */
  test: RegExp;
};

/** A profile needs at least this many flavours to be worth a tab of its own. */
const MIN_PROFILE_SIZE = 4;

/**
 * Flavours are matched by name, so "Blue Razz Ice" legitimately lands in both
 * Berry and Iced. That mirrors how the boxes are actually labelled — these are
 * browsing shortcuts, not exclusive categories.
 */
const PROFILE_DEFS: FlavourProfile[] = [
  {
    slug: "berry",
    label: "Berry",
    blurb: "Blue razz, strawberry, cherry — the busiest corner of the wall.",
    test: /berr|razz|cherr|straw|cranberr/i,
  },
  {
    slug: "tropical",
    label: "Tropical & Stone Fruit",
    blurb: "Mango, peach, melon and the rest of the sunshine shelf.",
    test: /mango|peach|melon|pineapple|guava|lychee|dragon|passion|banana|kiwi|apple|grape|orange|lemon|lime|nectar|fuji|tropical/i,
  },
  {
    slug: "iced",
    label: "Iced & Menthol",
    blurb: "Cooling on the exhale, from a whisper to a full freeze.",
    test: /\bice(d)?\b|\bmint\b|menthol|spearmint|cool/i,
  },
  {
    slug: "sour",
    label: "Sour & Candy",
    blurb: "Sharp, sweet and loud — the gushers end of the shelf.",
    test: /sour|gushin|candy|blast|bomb|killa/i,
  },
  {
    slug: "tobacco",
    label: "Tobacco",
    blurb: "Classic, golden and balanced blends for switchers.",
    test: /tobacco/i,
  },
];

export type FlavourProfileView = FlavourProfile & {
  items: ShelfItem[];
  count: number;
  render?: string;
};

export const FLAVOUR_PROFILES: FlavourProfileView[] = PROFILE_DEFS.map((p) => {
  const items = SHELF.filter((i) =>
    p.test.test([i.flavour, i.badge, i.note].filter(Boolean).join(" ")),
  );
  return {
    ...p,
    items,
    count: items.length,
    render: items.find((i) => i.render)?.render,
  };
}).filter((p) => p.count >= MIN_PROFILE_SIZE);

/* -------------------------------------------------------------- statistics */

export const CATALOG_STATS = {
  brands: Object.keys(SERIES).length,
  series: Object.values(SERIES).reduce((n, s) => n + s.length, 0),
  flavours: SHELF.length,
  topPuffs: Math.max(...SHELF.map((i) => i.puffCount)),
};

/* ------------------------------------------------------------------ hours */

const DAY_INDEX: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

export type DayHours = { open: number; close: number; label: string };

/** Minutes past midnight, or null if the string is not a time we understand. */
function parseTime(raw: string): number | null {
  const m = raw.trim().match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM)$/i);
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toUpperCase() === "PM") h += 12;
  return h * 60 + Number(m[2] ?? 0);
}

/**
 * STORE.hours is written for humans ("Monday – Friday", "10:00 AM – 9:00 PM").
 * This turns it into a lookup by weekday so the page can say whether the shop
 * is open right now. Anything unparseable stays `null` and the caller renders
 * nothing rather than guessing.
 */
export const WEEK: (DayHours | null)[] = (() => {
  const week: (DayHours | null)[] = Array(7).fill(null);
  for (const entry of STORE.hours) {
    const [openRaw, closeRaw] = entry.time.split(/\s*[–—-]\s*/);
    const open = parseTime(openRaw ?? "");
    const close = parseTime(closeRaw ?? "");
    if (open === null || close === null) continue;

    const parts = entry.days
      .split(/\s*[–—-]\s*/)
      .map((d) => d.trim().toLowerCase());
    const from = DAY_INDEX[parts[0]];
    if (from === undefined) continue;
    const to = parts[1] !== undefined ? DAY_INDEX[parts[1]] : from;
    if (to === undefined) continue;

    for (let i = from; ; i = (i + 1) % 7) {
      week[i] = { open, close, label: entry.time };
      if (i === to) break;
    }
  }
  return week;
})();
