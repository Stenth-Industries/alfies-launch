/**
 * Builds public/renders from the supplied product renders.
 *
 * The originals are up to 1600px studio shots (~68 MB all told) — far more than
 * a 300px-wide card needs, and too heavy to commit. This downscales to 900px
 * and re-encodes as WebP, cutting the folder by well over an order of magnitude
 * while staying crisp on retina.
 *
 * It always writes a fresh output tree rather than converting in place: this
 * project sits in a OneDrive-synced folder, and overwriting a file that OneDrive
 * is uploading throws EBUSY/UNKNOWN part-way through a run.
 *
 * Only the files named in scripts/render-map.json are copied, so rejected or
 * unused renders never reach the site.
 *
 * Run: node scripts/optimize-renders.mjs
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "C:/VS Code/Alfie/public/renders";
const DEST = "public/renders";
const MAP = "scripts/render-map.json";
const MAX = 900;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Runs fn, retrying the file locks OneDrive throws while it syncs. */
async function retry(fn, tries = 8) {
  for (let i = 0; i < tries; i++) {
    try {
      return fn();
    } catch (err) {
      if (i === tries - 1 || !["EBUSY", "EPERM", "UNKNOWN", "ENOTEMPTY"].includes(err.code)) {
        throw err;
      }
      await sleep(200 * (i + 1));
    }
  }
}

const map = JSON.parse(fs.readFileSync(MAP, "utf8"));

/** The map may name the original or the optimised file; find whichever exists. */
function findSource(rel) {
  const stem = rel.replace(/\.\w+$/, "");
  for (const ext of [".webp", ".png", ".jpg", ".jpeg"]) {
    const p = path.join(SRC, stem + ext);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

const staging = DEST + ".new";
fs.rmSync(staging, { recursive: true, force: true });

let before = 0;
let after = 0;
const missing = [];

for (const value of new Set(Object.values(map))) {
  const rel = value.replace("/renders/", "").replace(/\.\w+$/, ".webp");
  const src = findSource(rel);
  if (!src) {
    missing.push(rel);
    continue;
  }

  before += fs.statSync(src).size;
  const buf = await sharp(src)
    .resize({ width: MAX, height: MAX, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 86, effort: 5 })
    .toBuffer();

  const out = path.join(staging, rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buf);
  after += buf.length;
}

if (missing.length) {
  console.error("no source found for:\n  " + missing.join("\n  "));
  process.exit(1);
}

await retry(() => fs.rmSync(DEST, { recursive: true, force: true }));
await retry(() => fs.renameSync(staging, DEST));

// Point the map at what actually shipped.
for (const key of Object.keys(map)) map[key] = map[key].replace(/\.\w+$/, ".webp");
fs.writeFileSync(MAP, JSON.stringify(map, null, 1));

const count = new Set(Object.values(map)).size;
console.log(
  `${count} renders: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB`,
);
