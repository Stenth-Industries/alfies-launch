/**
 * Prepares the client's gold emblem for the site — root logo-emblem.png.
 *
 * Unlike the wordmark it replaced, this artwork arrives finished: already gold,
 * already knocked out to transparency by the designer. So there is no recolour
 * step here, only a trim of the transparent surround (the supplied frame has
 * ~13px of empty margin, which would otherwise show up as dead space beside the
 * header nav) and a re-encode.
 *
 * It is deliberately not palette-quantised the way scripts/knockout-logo.mjs
 * quantises the old two-colour mark: this emblem is a metallic gradient, and
 * 256 colours bands the bevels visibly.
 *
 * Run: node scripts/prepare-logo.mjs   → public/logo-gold.png
 */
import sharp from "sharp";

const SRC = "logo-emblem.png";
const OUT = "public/logo-gold.png";

/** Alpha at or below this is the transparent surround, not a soft edge. */
const TRIM_THRESHOLD = 1;

await sharp(SRC)
  .ensureAlpha()
  .trim({ threshold: TRIM_THRESHOLD })
  .png({ compressionLevel: 9, effort: 10 })
  .toFile(OUT);

const meta = await sharp(OUT).metadata();
console.log(
  `wrote ${OUT} — ${meta.width}x${meta.height}, ` +
    `aspect ${(meta.width / meta.height).toFixed(4)} (RATIO in src/components/Logo.tsx)`,
);
