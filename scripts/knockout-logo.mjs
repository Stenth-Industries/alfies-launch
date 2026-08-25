/**
 * Knocks the flat black background out of the client's wordmark so it sits on
 * the site's near-black sections without a visible box around it.
 *
 * The artwork is drawn light-on-black, so luminance *is* coverage: alpha comes
 * from the brightest channel and the colour is unpremultiplied back to full
 * strength. That keeps the antialiased edges of the script clean instead of
 * leaving the grey fringe a hard colour-key would.
 *
 * `scripts/build-logo.mjs` is the other half of this story — it recolours the
 * raw client artwork (root logo.png). This one only removes a background.
 *
 * Run: node scripts/knockout-logo.mjs [src]   → public/logo-light.png
 */
import sharp from "sharp";

const SRC = process.argv[2] ?? "logo-with-tagline.png";
const OUT = "public/logo-light.png";

/** Channel values at or below this are background noise, not artwork. */
const FLOOR = 10;

/** Transparent margin kept around the trimmed artwork, as a share of width. */
const PAD = 0.01;

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);

let minX = width;
let minY = height;
let maxX = -1;
let maxY = -1;

for (let i = 0, p = 0; i < data.length; i += channels, p += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);

  if (max <= FLOOR) continue; // stays fully transparent

  // Lift the floor out so the near-black surround does not leave a faint haze.
  const alpha = Math.round(((max - FLOOR) * 255) / (255 - FLOOR));

  // Unpremultiply against the artwork's own brightness: a teal at 82% stays
  // teal at 82% alpha rather than being darkened twice when composited.
  out[p] = Math.min(255, Math.round((r * 255) / max));
  out[p + 1] = Math.min(255, Math.round((g * 255) / max));
  out[p + 2] = Math.min(255, Math.round((b * 255) / max));
  out[p + 3] = alpha;

  if (alpha > 2) {
    const x = (i / channels) % width;
    const y = Math.floor(i / channels / width);
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
}

if (maxX < 0) throw new Error(`${SRC} is entirely background — nothing to keep`);

const pad = Math.round(width * PAD);
const left = Math.max(0, minX - pad);
const top = Math.max(0, minY - pad);
const right = Math.min(width - 1, maxX + pad);
const bottom = Math.min(height - 1, maxY + pad);

await sharp(out, { raw: { width, height, channels: 4 } })
  .extract({
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  })
  // The mark is two flat colours plus antialiasing, so a palette PNG is
  // visually identical at roughly a third of the bytes.
  .png({ compressionLevel: 9, palette: true, quality: 92, effort: 10 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(
  `wrote ${OUT} — ${meta.width}x${meta.height} (trimmed from ${width}x${height}), ` +
    `aspect ${(meta.width / meta.height).toFixed(4)}`,
);
