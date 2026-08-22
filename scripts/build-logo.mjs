/**
 * Builds the dark-background wordmark from the client's supplied logo.png.
 *
 * The client has supplied the artwork in both polarities over time (a solid
 * black script drawn for light backgrounds, and a white script already drawn
 * for dark ones), so this measures the source rather than assuming: the script
 * is inverted only when it would otherwise vanish into our near-black site.
 * The muted teal of the swoosh, vape icon and "VAPE STORE" lockup is lifted to
 * the brand teal either way; colour pixels keep their hue.
 *
 * Run: node scripts/build-logo.mjs   → public/logo-light.png
 */
import sharp from "sharp";

const SRC = "logo.png";
const OUT = "public/logo-light.png";

/** Brand teal (#00D1D1) that the logo's darker teal is mapped onto. */
const BRAND = { r: 0x00, g: 0xd1, b: 0xd1 };

/** Below this max-minus-min a pixel is the neutral script, not the teal. */
const CHROMA = 24;

/** Width of the histogram buckets used to find the artwork's dominant teal. */
const BUCKET = 16;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

// Pass 1: measure the source. `neutralLum` decides polarity, and `tealMax`
// normalises brightness against whatever teal this particular file uses —
// scaling a mid-tone (0,128,128) artwork off 255 would render the lockup at
// half strength, and scaling a full-strength one off 128 would clip it.
let neutralSum = 0;
let neutralCount = 0;
const tealHist = new Map();

for (let i = 0; i < out.length; i += channels) {
  if (out[i + 3] < 8) continue;

  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const max = Math.max(r, g, b);

  if (max - Math.min(r, g, b) < CHROMA) {
    neutralSum += (r + g + b) / 3;
    neutralCount++;
  } else {
    const bucket = Math.floor(max / BUCKET) * BUCKET;
    tealHist.set(bucket, (tealHist.get(bucket) ?? 0) + 1);
  }
}

const neutralLum = neutralCount ? neutralSum / neutralCount : 0;
const invert = neutralLum < 128;

// Normalise against the *dominant* teal, not the brightest pixel: the swoosh
// carries a handful of near-white antialiased edge pixels, and dividing by
// those would render the whole lockup at two-thirds strength.
const [modalBucket = 128] = [...tealHist.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];
const tealMax = modalBucket + BUCKET - 1;

console.log(
  `source script is ${invert ? "dark" : "light"} (mean ${neutralLum.toFixed(1)}) — ` +
    `${invert ? "inverting" : "keeping as-is"}; dominant teal ${tealMax}`,
);

// Pass 2: recolour.
for (let i = 0; i < out.length; i += channels) {
  if (out[i + 3] < 8) continue;

  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const max = Math.max(r, g, b);

  if (max - Math.min(r, g, b) < CHROMA) {
    // Neutral: the script must read light on the dark header. Invert only if
    // it is drawn dark, so the highlight strokes stay the dark separations.
    if (invert) {
      out[i] = 255 - r;
      out[i + 1] = 255 - g;
      out[i + 2] = 255 - b;
    }
  } else {
    // Coloured: keep the shape's shading but retint onto the brand teal.
    const level = Math.min(1, max / tealMax);
    out[i] = Math.round(BRAND.r * level);
    out[i + 1] = Math.round(BRAND.g * level);
    out[i + 2] = Math.round(BRAND.b * level);
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png()
  .trim({ threshold: 8 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(`wrote ${OUT} — ${meta.width}x${meta.height}`);
