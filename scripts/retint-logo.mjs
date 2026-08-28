/**
 * Retints the wordmark's accent from the old brand teal to the brand gold.
 *
 * The site moved to a black-and-gold palette; the artwork in public/logo-light.png
 * still has a cyan swoosh, vape icon and "VAPE STORE" lockup, which is the one
 * thing on the page that is neither black, white nor gold. This recolours those
 * pixels and leaves the white script alone.
 *
 * It works off the finished light artwork rather than the client's raw logo.png
 * on purpose: logo-light.png is the with-tagline lockup, and rebuilding from
 * the raw file (scripts/build-logo.mjs) would swap the lockup as well as the
 * colour. Chroma is what separates the two — the script is neutral, the accent
 * is not — so the split needs no mask.
 *
 * Run: node scripts/retint-logo.mjs   → public/logo-gold.png
 */
import sharp from "sharp";

const SRC = "public/logo-light.png";
const OUT = "public/logo-gold.png";

/** Brand gold (#E7AC40) that the artwork's teal is mapped onto. */
const BRAND = { r: 0xe7, g: 0xac, b: 0x40 };

/** Below this max-minus-min a pixel is the neutral script, not the accent. */
const CHROMA = 24;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);
let touched = 0;

for (let i = 0; i < out.length; i += channels) {
  if (out[i + 3] < 8) continue;

  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const max = Math.max(r, g, b);

  if (max - Math.min(r, g, b) < CHROMA) continue;

  // The accent is drawn at full strength, so its own brightness is the shading
  // to carry across: a half-lit teal becomes a half-lit gold rather than a flat
  // fill, which is what keeps the icon's interior separations readable.
  const level = max / 255;
  out[i] = Math.round(BRAND.r * level);
  out[i + 1] = Math.round(BRAND.g * level);
  out[i + 2] = Math.round(BRAND.b * level);
  touched += 1;
}

await sharp(out, { raw: { width, height, channels } }).png().toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} — ${meta.width}x${meta.height}, ${touched} px retinted`);
