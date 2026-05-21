#!/usr/bin/env node
// Restore full-res portfolio PNG/JPG from git (pre-WebP commit) and re-encode at high quality.

import { execSync } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "images", "portfolio");
const GIT_COMMIT = "ff46138";

const SOURCES = [
  { git: "piper.png", out: "piper.webp" },
  { git: "uptown.png", out: "uptown.webp" },
  { git: "nyx.png", out: "nyx.webp" },
  { git: "fionna.png", out: "fionna.webp" },
  { git: "helios.jpg", out: "helios.webp" },
  { git: "station-preview.jpg", out: "station-preview.webp" },
];

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 92;

function fmt(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const { git, out } of SOURCES) {
    const gitPath = `public/images/portfolio/${git}`;
    let buffer;
    try {
      buffer = execSync(`git show ${GIT_COMMIT}:${gitPath}`, {
        cwd: ROOT,
        maxBuffer: 50 * 1024 * 1024,
      });
    } catch {
      console.warn(`  skip  ${git}  (not in git at ${GIT_COMMIT})`);
      continue;
    }

    const meta = await sharp(buffer).metadata();
    const targetWidth = Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH);
    const dest = path.join(OUT_DIR, out);

    await sharp(buffer)
      .rotate()
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY, effort: 6 })
      .toFile(dest);

    const stat = await fs.stat(dest);
    console.log(
      `  done  ${git}  ${meta.width}x${meta.height}  ${fmt(buffer.length)} -> ${out}  ${fmt(stat.size)}  (${targetWidth}w)`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
