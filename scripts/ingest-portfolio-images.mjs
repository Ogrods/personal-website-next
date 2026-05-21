#!/usr/bin/env node
// Ingest PNG/JPG from scripts/sources/ → public/images/portfolio/*.webp
// Run via: npm run ingest-portfolio-images

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(__dirname, "sources");
const OUT_DIR = path.join(ROOT, "public", "images", "portfolio");

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 92;

function fmt(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  await fs.mkdir(SRC_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  let entries;
  try {
    entries = await fs.readdir(SRC_DIR);
  } catch {
    console.error(`Could not read ${SRC_DIR}`);
    process.exit(1);
  }

  const files = entries.filter((f) => /\.(png|jpe?g)$/i.test(f));
  if (files.length === 0) {
    console.error(
      `No PNG/JPG files in ${path.relative(ROOT, SRC_DIR)}.\n` +
        `Add piper.png, helios.png, uptown.png, nyx.png, fionna.png and re-run.`
    );
    process.exit(1);
  }

  console.log(`Ingesting ${files.length} image(s) from ${path.relative(ROOT, SRC_DIR)}\n`);

  for (const file of files) {
    const src = path.join(SRC_DIR, file);
    const base = path.parse(file).name;
    const dest = path.join(OUT_DIR, `${base}.webp`);

    const buffer = await fs.readFile(src);
    const meta = await sharp(buffer).metadata();
    const targetWidth = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);

    await sharp(buffer)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(dest);

    const stat = await fs.stat(dest);
    console.log(
      `  done  ${file}  ${meta.width}x${meta.height}  ${fmt(buffer.length)} -> ${base}.webp  ${fmt(stat.size)}  (${targetWidth}w)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
