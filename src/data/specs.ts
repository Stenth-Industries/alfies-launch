/**
 * Per-series spec sheet, keyed by `brand|seriesSlug`.
 *
 * Specs belong to the device line, not the flavour — every Elfbar BC10000 is
 * 18 mL / 20 mg/mL whichever flavour is in the box — so this is keyed by series
 * and joined to a product through its series slug.
 *
 * Where the two disagreed, the store's own shelf photos in /products won.
 * Puff counts, volumes and nicotine strengths are read off the Canadian retail
 * packaging in those photos; battery capacities and charging come from the
 * manufacturer/brand-store listings, which is the only place they're published.
 *
 * `puffs`, `eLiquid` and `nicotine` are omitted on battery-only rows so the
 * display can skip those lines rather than print an em dash.
 */

export type Spec = {
  /** "Disposables", "Pods", "Device", "Device + pod". */
  type: string;
  /** Puff rating as advertised, e.g. "10,000". */
  puffs?: string;
  /** E-liquid in a single unit — not the carton, e.g. "18 mL". */
  eLiquid?: string;
  nicotine?: string;
  charging?: string;
  /** Cell capacity where the maker publishes one. */
  battery?: string;
  /** Anything that needs saying next to the numbers. */
  note?: string;
};

const RECHARGEABLE = "USB-C rechargeable";
const NOT_RECHARGEABLE = "Not rechargeable";
const NIC_20 = "20 mg/mL";
/** Health Canada caps nicotine at 20 mg/mL; PMI prints the % as well. */
const NIC_20_PCT = "20 mg/mL (1.8%)";

export const SPECS: Record<string, Spec> = {
  "elfbar|gh20000": {
    type: "Disposables",
    puffs: "20,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "850 mAh",
    note: "Puff rating is lite mode (12 W); smooth is 17 W and turbo 30 W.",
  },
  "elfbar|bc10000": {
    type: "Disposables",
    puffs: "10,000",
    eLiquid: "18 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "620 mAh",
  },
  "elfbar|bc-pro": {
    type: "Disposables",
    puffs: "80,000",
    eLiquid: "25 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "CyberTech autofill, fast charging.",
  },
  "elfbar|moonnight": {
    type: "Disposables",
    puffs: "70,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "800 mAh",
  },
  "elfbar|prime": {
    type: "Disposables",
    puffs: "1,800",
    eLiquid: "2 mL",
    nicotine: NIC_20,
    charging: NOT_RECHARGEABLE,
    battery: "550 mAh",
  },

  "flavour-beast|beast-mode-max-3": {
    type: "Disposables",
    puffs: "60,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "850 mAh",
    note: "Four modes — eco 10 W, normal 14 W, beast 18 W, max 23 W.",
  },
  "flavour-beast|beast-mode-max-2": {
    type: "Disposables",
    puffs: "50,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "850 mAh",
    note: "Puff rating is eco mode. Shipped as a 5 × 20 mL carton.",
  },
  "flavour-beast|gushin-series": {
    type: "Disposables",
    puffs: "50,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "850 mAh",
    note: "Beast Mode Max 2 hardware in the Gushin artwork.",
  },
  "flavour-beast|twelve-monkeys": {
    type: "Disposables",
    puffs: "50,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "850 mAh",
    note: "Beast Mode Max 2 hardware in Twelve Monkeys artwork.",
  },

  "level-x|g2-ultra": {
    type: "Pods",
    puffs: "50,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: "Pod only — the G2 battery charges over USB-C",
    note: "50K is the eco-mode rating on a G2 or G2 Pro battery (10–25 W).",
  },
  "level-x|boost-g2": {
    type: "Pods",
    puffs: "25,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: "Pod only — the G2 battery charges over USB-C",
    note: "Boost 23 W / standard 17 W / eco 11 W.",
  },
  "level-x|devices": {
    type: "Device",
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "Battery only — pods sold separately. 10–25 W, fits G2 Ultra and Boost G2 pods.",
  },

  "orbito|lumo-ai": {
    type: "Disposables",
    puffs: "120,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1200 mAh",
    note: "AI core paces power and coil temperature as the tank runs down.",
  },

  "ovns|mesh08": {
    type: "Disposables",
    puffs: "2,500",
    eLiquid: "2 mL",
    nicotine: NIC_20,
    charging: NOT_RECHARGEABLE,
    note: "Shipped as a 10 × 2 mL carton.",
  },

  "oxbar|g100k": {
    type: "Disposables",
    puffs: "100,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "Triple mode — eco, adapter, boost.",
  },
  "oxbar|m85k": {
    type: "Disposables",
    puffs: "85,000",
    eLiquid: "25 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "Visible 2.0 display, smooth/boost dual mode.",
  },
  "oxbar|tri-fusion": {
    type: "Disposables",
    puffs: "45,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "20 mg/mL is the filled strength; the NIC dial steps delivery down from there.",
  },
  "oxbar|oxhukka": {
    type: "Disposables",
    puffs: "25,000",
    eLiquid: "20 mL",
    nicotine: "6 mg/mL",
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "The one low-nicotine line in the shop. Shelf stock reads 6 mg/mL while every circulating render shows 20 mg/mL artwork — confirm the SKU before publishing this.",
  },

  "stlth|geek-bar-80k": {
    type: "Disposables",
    puffs: "80,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "820 mAh",
    note: "Normal and Pulse firing modes.",
  },
  "stlth|loop-max": {
    type: "Pods",
    puffs: "70,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: "Pod only — the Loop Max battery charges over USB-C",
    note: "Loop Max pods do not fit Loop³, Loop 2 or original Loop batteries.",
  },
  "stlth|loop-25k": {
    type: "Pods",
    puffs: "25,000",
    eLiquid: "20 mL",
    nicotine: NIC_20,
    charging: "Pod only — the Loop³ battery charges over USB-C",
  },
  "stlth|titan-max": {
    type: "Disposables",
    puffs: "50,000",
    eLiquid: "30 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "1000 mAh",
  },
  "stlth|8k-pro": {
    type: "Disposables",
    puffs: "8,000",
    eLiquid: "14 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "800 mAh",
  },
  "stlth|devices": {
    type: "Device",
    charging: RECHARGEABLE,
    battery: "1000 mAh",
    note: "Battery only — pods sold separately. Fits Loop 25K, Loop 9K and Switch pods.",
  },

  "veev|veev-now-8000": {
    type: "Disposables",
    puffs: "8,000",
    eLiquid: "18 mL",
    nicotine: NIC_20_PCT,
    charging: RECHARGEABLE,
    note: "Full charge in under 45 minutes.",
  },
  "veev|veev-now-1800": {
    type: "Disposables",
    puffs: "1,800",
    eLiquid: "5 mL",
    nicotine: NIC_20_PCT,
    charging: NOT_RECHARGEABLE,
  },
  "veev|veev-one": {
    type: "Pods",
    puffs: "2,000 per 2-pod pack",
    eLiquid: "2 mL per pod",
    nicotine: NIC_20_PCT,
    charging: "Pod only — the VEEV ONE device charges over USB-C",
    note: "Balanced Tobacco is 18 mg/mL; the rest of the range is 20 mg/mL.",
  },
  "veev|veev-ultra": {
    type: "Disposables",
    puffs: "1,100",
    eLiquid: "2 mL",
    nicotine: NIC_20_PCT,
    charging: NOT_RECHARGEABLE,
    note: "Ships pre-charged; body is 75% recycled aluminium.",
  },

  "vuse|go-5000": {
    type: "Disposables",
    puffs: "5,000",
    eLiquid: "10 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "560 mAh",
    note: "Ceramic heating coil.",
  },
  "vuse|go-1000": {
    type: "Disposables",
    puffs: "1,000",
    eLiquid: "2 mL",
    nicotine: NIC_20,
    charging: NOT_RECHARGEABLE,
    battery: "515 mAh",
  },
  "vuse|pro-one": {
    type: "Device + pod",
    puffs: "1,000",
    eLiquid: "2 mL",
    nicotine: NIC_20,
    charging: RECHARGEABLE,
    battery: "530 mAh",
    note: "Device and pod together in one box.",
  },
  "vuse|epod-pods": {
    type: "Pods",
    puffs: "2,000 per pod",
    eLiquid: "2 mL per pod",
    nicotine: NIC_20,
    charging: "Pod only — the ePod or Vuse Pro device charges over USB-C",
    note: "Classic and Intense are flavour-intensity ranges, both 20 mg/mL.",
  },
  "vuse|devices": {
    type: "Device",
    charging: RECHARGEABLE,
    battery: "370 mAh",
    note: "Battery only — pods sold separately. Bluetooth, pairs with the MyVuse app.",
  },

  "z-pods|z-pods": {
    type: "Pods",
    puffs: "400 per pod",
    eLiquid: "2 mL per pod",
    nicotine: NIC_20,
    charging: "Pod only — fits original STLTH and Allo Sync devices",
    note: "Supreme Nic Blend — freebase and salt together. Does not fit any STLTH Loop device.",
  },
};

/** Spec sheet for a series, or undefined when none was recorded. */
export function specFor(brand: string, seriesSlug: string): Spec | undefined {
  return SPECS[`${brand}|${seriesSlug}`];
}
