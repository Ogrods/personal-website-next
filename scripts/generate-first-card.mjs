#!/usr/bin/env node
// One-shot generator for a placeholder portfolio card image (FIRST).
// Replace with a real screenshot when available.

import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(
  __dirname,
  "..",
  "public",
  "images",
  "portfolio",
  "first.webp"
);

const svg = `
<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="45%" stop-color="#000524"/>
      <stop offset="100%" stop-color="#191919"/>
    </linearGradient>
  </defs>
  <rect width="800" height="400" fill="url(#bg)"/>
  <text x="400" y="195" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="100" font-weight="700" fill="#ffffff"
        letter-spacing="6">FIRST</text>
  <text x="400" y="250" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="20" fill="#9aa5b0">Foundation for Ichthyosis &amp; Related Skin Types</text>
  <text x="400" y="305" text-anchor="middle"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="14" fill="#0762f9"
        letter-spacing="3" text-transform="uppercase">firstskinfoundation.org</text>
</svg>
`;

await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(OUT);
const stat = await fs.stat(OUT);
console.log(
  `Wrote ${path.relative(path.join(__dirname, ".."), OUT)} (${(stat.size / 1024).toFixed(1)} KB)`
);
