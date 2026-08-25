/**
 * Knocks the flat background out of the supplier product renders and samples
 * each one's dominant colour.
 *
 * Most renders arrived as a product sitting on a flat card — white studio
 * sweeps for Elfbar and STLTH, a yellow brand tile for Beast Mode, black for
 * Level X, teal for VEEV. Dropped onto the site's near-black wall every one of
 * those reads as a bright rectangle punched through the page, so the
 * background has to come out of the pixels; no amount of CSS fixes an opaque
 * background baked into a WebP.
 *
 * The background colour is *sampled from the border* rather than assumed, so
 * one pass handles white, black and branded colour tiles alike. Removal is a
 * flood fill inward from the edge, not a colour key: these devices have white
 * packaging, black plastic and printed legal text, and a global key would eat
 * all of it. Only background connected to the border goes. Boundary pixels get
 * a partial alpha from how close they still are to the background colour,
 * which keeps the antialiased outline smooth instead of leaving a jaggy cut.
 *
 * Renders whose border is *not* uniform are photographic lifestyle scenes with
 * no separable background. Those are left untouched and reported, so they can
 * be re-shot or dropped rather than silently mangled.
 *
 * The same pass samples a dominant colour per render. The wall lights each
 * device with its own colour, so the site's palette is generated from the
 * product photography rather than picked by hand.
 *
 * Run: node scripts/knockout-renders.mjs [--dry]
 *   → rewrites public/renders/**.webp in place (git tracks them; revert freely)
 *   → writes src/data/glow.ts
 */
import sharp from "sharp";
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, posix, sep } from "node:path";

const DRY = process.argv.includes("--dry");
const ROOT = "public/renders";

/** Max RGB distance from the sampled background colour still counted as background. */
const TOLERANCE = 52;
/** Share of border pixels that must match for the background to count as flat. */
const UNIFORM = 0.7;
/** A render with at least this share of clear pixels has already been cut. */
const CUT_ALREADY = 0.02;

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory()
      ? walk(p)
      : f.endsWith(".webp")
        ? [p]
        : [];
  });
}

const dist = (data, o, [r, g, b]) =>
  Math.sqrt(
    (data[o] - r) ** 2 + (data[o + 1] - g) ** 2 + (data[o + 2] - b) ** 2,
  );

/** Every pixel on the outer ring, as indices. */
function borderIndices(w, h) {
  const out = [];
  for (let x = 0; x < w; x++) {
    out.push(x, (h - 1) * w + x);
  }
  for (let y = 1; y < h - 1; y++) {
    out.push(y * w, y * w + w - 1);
  }
  return out;
}

/**
 * The modal border colour, plus how much of the border agrees with it. A low
 * agreement means the edge is a photograph, not a background.
 */
function sampleBackground(data, ch, border) {
  // Coarse 32-level buckets first, so antialiasing noise does not split the mode.
  const buckets = new Map();
  for (const i of border) {
    const o = i * ch;
    const key =
      ((data[o] >> 5) << 10) | ((data[o + 1] >> 5) << 5) | (data[o + 2] >> 5);
    const b = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    b.n++;
    b.r += data[o];
    b.g += data[o + 1];
    b.b += data[o + 2];
    buckets.set(key, b);
  }
  let best = null;
  for (const b of buckets.values()) if (!best || b.n > best.n) best = b;
  if (!best) return null;

  const colour = [best.r / best.n, best.g / best.n, best.b / best.n];
  let agree = 0;
  for (const i of border) if (dist(data, i * ch, colour) <= TOLERANCE) agree++;
  return { colour, agreement: agree / border.length };
}

/** Marks every pixel reachable from the border without leaving the background colour. */
function floodBackground(data, w, h, ch, colour) {
  const bg = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;

  const push = (i) => {
    if (bg[i] || dist(data, i * ch, colour) > TOLERANCE) return;
    bg[i] = 1;
    queue[tail++] = i;
  };

  for (const i of borderIndices(w, h)) push(i);

  while (head < tail) {
    const i = queue[head++];
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (y > 0) push(i - w);
    if (y < h - 1) push(i + w);
  }
  return bg;
}

/**
 * Dominant colour of the surviving pixels. Greys and near-blacks are skipped —
 * every device is mostly dark plastic, and the point is to find the *flavour*
 * colour, which is the saturated minority.
 */
function dominantColour(data, w, h, ch, alpha) {
  const bins = Array.from({ length: 24 }, () => ({ n: 0, r: 0, g: 0, b: 0 }));
  for (let i = 0; i < w * h; i++) {
    if (alpha[i] < 200) continue;
    const o = i * ch;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const chroma = max - min;
    if (chroma < 40 || max < 60) continue;

    let hue;
    if (max === r) hue = ((g - b) / chroma + 6) % 6;
    else if (max === g) hue = (b - r) / chroma + 2;
    else hue = (r - g) / chroma + 4;
    hue *= 60;

    const bin = bins[Math.floor(hue / 15) % 24];
    bin.n++;
    bin.r += r;
    bin.g += g;
    bin.b += b;
  }

  const best = bins.reduce((a, b) => (b.n > a.n ? b : a), bins[0]);
  if (!best.n) return null;

  let [r, g, b] = [best.r / best.n, best.g / best.n, best.b / best.n];
  // Push toward the vivid end — the glow is a light source, not a swatch.
  const max = Math.max(r, g, b);
  if (max > 0) {
    const lift = 235 / max;
    r = Math.min(255, r * lift);
    g = Math.min(255, g * lift);
    b = Math.min(255, b * lift);
  }
  const hex = (v) => Math.round(v).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

const files = walk(ROOT);
const glow = {};
const scenes = [];
let cut = 0;
let already = 0;

for (const file of files) {
  // Read to a buffer rather than letting sharp open the path: the file is
  // written back in place below, and Windows will not reopen a locked handle.
  const { data, info } = await sharp(readFileSync(file))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;
  const n = w * h;
  const alpha = new Uint8Array(n);

  let clear = 0;
  for (let i = 0; i < n; i++) if (data[i * ch + 3] < 250) clear++;
  const wasCut = clear / n >= CUT_ALREADY;

  let changed = false;
  if (wasCut) {
    for (let i = 0; i < n; i++) alpha[i] = data[i * ch + 3];
    already++;
  } else {
    const bg = sampleBackground(data, ch, borderIndices(w, h));
    if (!bg || bg.agreement < UNIFORM) {
      // Photographic edge — nothing to separate. Leave the pixels alone.
      alpha.fill(255);
      scenes.push(file);
    } else {
      const mask = floodBackground(data, w, h, ch, bg.colour);
      for (let i = 0; i < n; i++) {
        if (mask[i]) {
          alpha[i] = 0;
          continue;
        }
        const x = i % w;
        const y = (i / w) | 0;
        const touchesBg =
          (x > 0 && mask[i - 1]) ||
          (x < w - 1 && mask[i + 1]) ||
          (y > 0 && mask[i - w]) ||
          (y < h - 1 && mask[i + w]);
        alpha[i] = touchesBg
          ? Math.round(
              255 * Math.min(1, dist(data, i * ch, bg.colour) / TOLERANCE),
            )
          : 255;
      }
      cut++;
      changed = true;
    }
  }

  const key = "/" + file.split(sep).join(posix.sep).replace(/^public\//, "");
  const colour = dominantColour(data, w, h, ch, alpha);
  if (colour) glow[key] = colour;

  if (DRY || !changed) continue;

  // Re-attach the computed alpha and trim the now-transparent margin so every
  // device fills its tile at a consistent scale. Encode to a buffer and write
  // over the original — sharp cannot write to a path it is still reading.
  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const o = i * ch;
    out[i * 4] = data[o];
    out[i * 4 + 1] = data[o + 1];
    out[i * 4 + 2] = data[o + 2];
    out[i * 4 + 3] = alpha[i];
  }
  const encoded = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .trim({ threshold: 1 })
    .webp({ quality: 92, alphaQuality: 100 })
    .toBuffer();
  writeFileSync(file, encoded);
}

const banner = `/**
 * Dominant colour per render, sampled by scripts/knockout-renders.mjs.
 *
 * The wall lights every device with the colour of the device itself, so the
 * page's colour comes out of the product photography instead of a palette
 * someone picked. Regenerate with \`node scripts/knockout-renders.mjs\`
 * whenever renders are added or replaced.
 */
export const GLOW: Record<string, string> = ${JSON.stringify(glow, null, 2)};
`;

if (!DRY) writeFileSync("src/data/glow.ts", banner);

console.log(
  `${files.length} renders · ${cut} knocked out · ${already} already cut · ${scenes.length} left as scenes${DRY ? " (dry run)" : ""}`,
);
if (scenes.length) {
  console.log("\nNo separable background (re-shoot or drop these):");
  for (const f of scenes) console.log("  " + f);
}
