#!/usr/bin/env node
// One-shot image optimizer: resize + convert PNG/JPG -> WebP.
// Run via: npm run optimize-images
//
// Targets all PNG/JPG under public/images/, except entries in SKIP.
// Writes <basename>.webp next to the original, then deletes the original
// on success. Idempotent: skips files that already have a .webp sibling.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const IMAGES_DIR = path.join(ROOT, "public", "images");

const MAX_WIDTH = 1200;
const WEBP_QUALITY = 82;
const SKIP = new Set([
  "overlay-bg.png", // tiny tiling background
]);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(png|jpe?g)$/i.test(entry.name) && !SKIP.has(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function fmt(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function optimize(file) {
  const { dir, name } = path.parse(file);
  const out = path.join(dir, `${name}.webp`);

  try {
    await fs.access(out);
    return { file, skipped: true };
  } catch {
    // proceed
  }

  const originalStat = await fs.stat(file);
  const img = sharp(file);
  const meta = await img.metadata();

  const pipeline = img
    .rotate() // honor EXIF orientation
    .resize({
      width: meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined,
      withoutEnlargement: true,
    })
    .webp({ quality: WEBP_QUALITY, effort: 5 });

  await pipeline.toFile(out);
  const newStat = await fs.stat(out);

  await fs.unlink(file);

  return {
    file,
    out,
    before: originalStat.size,
    after: newStat.size,
    dims: `${meta.width}x${meta.height}`,
  };
}

async function main() {
  const files = await walk(IMAGES_DIR);
  if (files.length === 0) {
    console.log("No PNG/JPG files to optimize.");
    return;
  }

  console.log(`Optimizing ${files.length} image(s) under ${path.relative(ROOT, IMAGES_DIR)}\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const result = await optimize(file);
    if (result.skipped) {
      console.log(`  skip  ${rel}  (.webp already exists)`);
      continue;
    }
    totalBefore += result.before;
    totalAfter += result.after;
    processed += 1;
    const pct = ((1 - result.after / result.before) * 100).toFixed(1);
    console.log(
      `  done  ${rel}\n        ${result.dims}  ${fmt(result.before)} -> ${fmt(result.after)}  (-${pct}%)`
    );
  }

  if (processed > 0) {
    const totalPct = ((1 - totalAfter / totalBefore) * 100).toFixed(1);
    console.log(
      `\nTotal: ${fmt(totalBefore)} -> ${fmt(totalAfter)}  (-${totalPct}%, ${processed} files)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
