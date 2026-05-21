#!/usr/bin/env node
// Convert the FIRST homepage screenshot into the portfolio card image.
// Source PNG is committed alongside this script's input asset only when run
// manually; this script reads a fixed path so it's a one-shot.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.join(__dirname, "first-source.png");
const OUT = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "portfolio",
  "first.webp"
);

try {
  await fs.access(SRC);
} catch {
  console.error(
    `Source not found at ${path.relative(path.join(__dirname, ".."), SRC)}.\n` +
      `Drop a homepage screenshot there (PNG or JPG) and re-run.`
  );
  process.exit(1);
}

const meta = await sharp(SRC).metadata();
const targetWidth = Math.min(meta.width ?? 1200, 1600);

await sharp(SRC)
  .rotate()
  .resize({ width: targetWidth, withoutEnlargement: true })
  .webp({ quality: 92, effort: 6 })
  .toFile(OUT);

const stat = await fs.stat(OUT);
console.log(
  `Wrote ${path.relative(path.join(__dirname, ".."), OUT)} (${targetWidth}w, ${(stat.size / 1024).toFixed(1)} KB)`
);
