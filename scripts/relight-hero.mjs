/**
 * Relights the hero shot: lifts the device lineup out of the dark, and pulls
 * the gold wall emblem back down.
 *
 * The supplied render is lit for the logo — the emblem is the brightest thing
 * in frame and the products sit a stop or two under it, which inverts the page's
 * actual hierarchy (you are selling the lineup, not the sign). Rather than a
 * global curve, which would only widen the gap, this applies two soft-edged
 * regional adjustments and leaves the rest of the frame alone.
 *
 * The lineup is lifted with a gamma curve rather than a multiply: it opens up
 * the shadows and mid-tones where the matte device bodies live while barely
 * touching the LED readouts, so nothing clips. The emblem is dimmed with a
 * straight multiply, which reads as the sign being turned down rather than
 * washed out — a gamma there would have flattened the gold's own gradient.
 *
 * Both masks are separable plateaus with smoothstepped edges, so neither
 * adjustment leaves a visible seam against the untouched wall.
 *
 * Run: node scripts/relight-hero.mjs   → public/hero.png
 */
import sharp from "sharp";

const SRC = "hero.png";
const OUT = "public/hero.png";

/** Strength of the lineup lift, as the gamma denominator: x ** (1 / (1 + LIFT)). */
const LIFT = 0.3;

/** How far down the emblem is pulled at the centre of its mask. */
const DIM = 0.4;

/**
 * The lineup, from the Elfbar's left edge to the Oxhukka's right and from the
 * tallest cap down through the counter reflection, with the ramps set outside
 * the devices so the plateau covers all six at full strength.
 */
const LINEUP = { x: [90, 190, 1340, 1450], y: [400, 470, 900, 1010] };

/** The emblem: the ring, the wordmark and the ornament beneath it. */
const EMBLEM = { x: [740, 820, 1330, 1410], y: [-40, 10, 360, 430] };

/**
 * Below this the frame is the unlit wall, not a product. Lifting it would only
 * raise the render's noise floor into a grey haze, so the lift fades out here.
 */
const FLOOR = [0.03, 0.13];

const smoothstep = (a, b, t) => {
  const u = Math.min(1, Math.max(0, (t - a) / (b - a)));
  return u * u * (3 - 2 * u);
};

/** A plateau of 1 between the inner pair, ramped to 0 at the outer pair. */
const plateau = ([out0, in0, in1, out1], t) =>
  smoothstep(out0, in0, t) * (1 - smoothstep(in1, out1, t));

const window2d = ({ x, y }, px, py) => plateau(x, px) * plateau(y, py);

const { data, info } = await sharp(SRC)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

// The two adjustments are applied in series, not blended: the windows only
// graze each other around the ornament, where both weights are already near 0.
for (let y = 0; y < height; y++) {
  const lineupY = plateau(LINEUP.y, y);
  const emblemY = plateau(EMBLEM.y, y);
  if (lineupY === 0 && emblemY === 0) continue;

  for (let x = 0; x < width; x++) {
    const i = (y * width + x) * channels;
    const lift = lineupY === 0 ? 0 : lineupY * plateau(LINEUP.x, x);
    const dim = emblemY === 0 ? 0 : emblemY * plateau(EMBLEM.x, x);
    if (lift === 0 && dim === 0) continue;

    const r = out[i] / 255;
    const g = out[i + 1] / 255;
    const b = out[i + 2] / 255;

    // Rec. 709 luma, so the lift reads off perceived brightness rather than a
    // single channel — the pink Elfbar would otherwise gate on its weak green.
    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    const gamma = 1 / (1 + LIFT * lift * smoothstep(FLOOR[0], FLOOR[1], lum));
    const scale = 1 - DIM * dim;

    out[i] = Math.round(255 * Math.min(1, r ** gamma * scale));
    out[i + 1] = Math.round(255 * Math.min(1, g ** gamma * scale));
    out[i + 2] = Math.round(255 * Math.min(1, b ** gamma * scale));
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

console.log(`${OUT}  ${width}x${height}  lift ${LIFT} / dim ${DIM}`);
