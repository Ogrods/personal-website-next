#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const APP_DIR = path.join(__dirname, "..", "src", "app");

// Serif "D" mark on the same dark gradient as the OG image. The whole site
// uses EB Garamond; sharp doesn't embed Google Fonts at render time, so we
// fall back to Georgia which has nearly identical proportions for a capital D.
function svg(size) {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="45%" stop-color="#000524"/>
      <stop offset="100%" stop-color="#191919"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.18}" fill="url(#bg)"/>
  <text
    x="50%"
    y="55%"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Georgia, 'Times New Roman', serif"
    font-weight="600"
    font-size="${size * 0.7}"
    fill="#ffffff"
  >D</text>
</svg>
`;
}

async function writePng(size, outName) {
  const out = path.join(APP_DIR, outName);
  await sharp(Buffer.from(svg(size)))
    .resize(size, size)
    .png({ quality: 95 })
    .toFile(out);
  const stat = await fs.stat(out);
  console.log(
    `Wrote ${path.relative(path.join(__dirname, ".."), out)} (${size}x${size}, ${(stat.size / 1024).toFixed(1)} KB)`
  );
}

await writePng(512, "icon.png");
await writePng(180, "apple-icon.png");
