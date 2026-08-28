/**
 * Builds the renders that have no usable supplier artwork, by cutting the boxes
 * out of Alfie's own in-store photos.
 *
 * Two groups need this, for different reasons.
 *
 * OVNS Mesh08 — Icy Grape and Burst Ice ship as 900x900 supplier renders, but
 * Lush Ice, Berry Cherry Lime and Blue Razz Ice have none. What the
 * distributors publish under those names is the Mesh08 *Pro* (5500 puffs,
 * 1x10mL), a different SKU with different packaging, so it would show customers
 * a product the shop does not stock.
 *
 * OXBAR Oxhukka — supplier renders exist and were on the site, then were pulled
 * in 034c466: the artwork prints 20 mg/mL and the shelf is 6 mg, which is a
 * misleading representation about a product characteristic. See COMPLIANCE.md.
 * Cutting from the shelf photo is what makes these publishable again — it is
 * the 6 mg stock itself, so nothing on it can contradict the shelf. The
 * Watermelon Ice box carries its full panel, reading "Nicotine - 6mg/ml";
 * Grape Mint's panel is behind the display carton, so its crop states no
 * strength at all. Neither can reproduce the original problem, but both are
 * still nicotine-strength-sensitive: if these are ever re-cut, check the
 * printed strength against the shelf before publishing.
 *
 * The photos cap what is possible. Each box is only 120-165px wide in the
 * source, so every one of these is visibly softer than a real render, and where
 * the display carton hides the bottom of a box the crop stops above it. They
 * are a stopgap. Replace them with supplier artwork when it exists at the right
 * SKU and the right strength, and delete this script with them.
 *
 * The crop rectangles are hand-measured against these exact photos and mean
 * nothing for any other image. Each top edge sits *below* the box's slanted top
 * so the rectangle catches no shelf background, which would read as grey dirt
 * against the white canvas.
 *
 * Run: node scripts/crop-shelf-renders.mjs
 */
import sharp from "sharp";

/** Canvas and subject height, matched to the supplier renders beside these. */
const CANVAS = 900;
const BOX_H = 700;

/**
 * Hand-measured box fronts, in each source photo's own 2048x1536 coordinates.
 */
const SOURCES = [
  {
    photo: "products/ovns/ovns-mesh08-2500-puffs-disposables.jpeg",
    dest: "public/renders/ovns",
    boxes: {
      "ovns-mesh08-berry-cherry-lime-shelf": {
        left: 553,
        top: 774,
        width: 150,
        height: 311,
      },
      "ovns-mesh08-lush-ice-shelf": {
        left: 893,
        top: 764,
        width: 160,
        height: 347,
      },
      "ovns-mesh08-blue-razz-ice-shelf": {
        left: 1356,
        top: 812,
        width: 144,
        height: 268,
      },
    },
  },
  {
    photo: "products/oxbar/oxbar-m85k-25ml-oxhukka-25k-geekbar-pulse-x.jpeg",
    dest: "public/renders/oxbar",
    boxes: {
      // Front-left of the pair standing in the Grape Mint carton. Stops under
      // the flavour band; the panel below it is behind the carton.
      "oxbar-oxhukka-25k-grape-mint-shelf": {
        left: 870,
        top: 595,
        width: 120,
        height: 190,
      },
      // The single box standing clear in front of the Watermelon Ice carton —
      // the only Oxhukka box in the photo showing its whole face.
      "oxbar-oxhukka-25k-watermelon-ice-shelf": {
        left: 1290,
        top: 608,
        width: 145,
        height: 205,
      },
    },
  },
];

for (const { photo, dest, boxes } of SOURCES) {
  for (const [name, rect] of Object.entries(boxes)) {
    const width = Math.round(rect.width * (BOX_H / rect.height));

    const box = await sharp(photo)
      .extract(rect)
      .resize({ width, height: BOX_H, kernel: "lanczos3" })
      // The shop's lighting is warm and flat next to a studio render; this lifts
      // it enough to sit beside one without pushing the packaging off-colour.
      .modulate({ brightness: 1.05, saturation: 1.1 })
      .sharpen({ sigma: 1.0, m1: 0.5, m2: 1.8 })
      .png()
      .toBuffer();

    await sharp({
      create: {
        width: CANVAS,
        height: CANVAS,
        channels: 3,
        background: "#ffffff",
      },
    })
      .composite([
        {
          input: box,
          left: Math.round((CANVAS - width) / 2),
          top: Math.round((CANVAS - BOX_H) / 2),
        },
      ])
      .webp({ quality: 82 })
      .toFile(`${dest}/${name}.webp`);

    console.log(`${name}.webp  ${width}x${BOX_H} on ${CANVAS}x${CANVAS}`);
  }
}
