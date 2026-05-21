#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "..", "public", "og-image.png");

const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f0f0f"/>
      <stop offset="45%" stop-color="#000524"/>
      <stop offset="100%" stop-color="#191919"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <text x="600" y="270" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="80" font-weight="600" fill="#ffffff">Dan Ogrodnik</text>
  <text x="600" y="350" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="38" fill="#dddddd">Front-end Developer and SEO Specialist</text>
  <text x="600" y="410" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="26" font-style="italic" fill="#9aa5b0">Responsive Design, React, SEO &amp; Accessibility</text>
  <text x="600" y="520" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="22" fill="#0762f9">danogrodnik.com</text>
</svg>
`;

await sharp(Buffer.from(svg)).png({ quality: 90 }).toFile(OUT);
const stat = await fs.stat(OUT);
console.log(`Wrote ${path.relative(path.join(__dirname, ".."), OUT)} (${(stat.size / 1024).toFixed(1)} KB)`);
