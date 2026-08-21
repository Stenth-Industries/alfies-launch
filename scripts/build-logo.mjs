/**
 * Builds the dark-background wordmark from the client's supplied logo.png.
 *
 * The original is drawn for light backgrounds: the "Alfie's" script is solid
 * black (74% of the artwork) with thin white highlight strokes, plus a teal
 * swoosh, vape icon and "VAPE STORE" lockup. On our near-black site the script
 * would be invisible, so this inverts the neutral (grey) pixels and lifts the
 * logo's muted teal to the brand teal. Colour pixels keep their hue.
 *
 * Run: node scripts/build-logo.mjs   → public/logo-light.png
 */
import sharp from "sharp";

const SRC = "logo.png";
const OUT = "public/logo-light.png";

/** Brand teal (#00D1D1) that the logo's darker teal is mapped onto. */
const BRAND = { r: 0x00, g: 0xd1, b: 0xd1 };

/**
 * The artwork's dominant teal is a mid-tone (0,128,128), so brightness has to
 * be normalised against it — scaling straight off 255 would render the whole
 * lockup at half strength.
 */
const SRC_TEAL_MAX = 128;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

for (let i = 0; i < out.length; i += channels) {
  if (out[i + 3] < 8) continue;

  const r = out[i];
  const g = out[i + 1];
  const b = out[i + 2];
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const chroma = max - min;

  if (chroma < 24) {
    // Neutral: invert so the black script reads white on the dark header,
    // and the white highlight strokes become the dark separations.
    out[i] = 255 - r;
    out[i + 1] = 255 - g;
    out[i + 2] = 255 - b;
  } else {
    // Coloured: keep the shape's shading but retint onto the brand teal.
    const level = Math.min(1, max / SRC_TEAL_MAX);
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
