#!/usr/bin/env node
// Removes near-black background pixels from a logo image
// (chroma-key style: any pixel where R+G+B < threshold becomes transparent).
// Usage: node scripts/fix-logo-bg.mjs <input> <output> [threshold]

import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function run() {
  const [, , inputArg, outputArg, thresholdArg] = process.argv;
  if (!inputArg || !outputArg) {
    console.error("Usage: node fix-logo-bg.mjs <input> <output> [threshold]");
    process.exit(1);
  }

  const input = path.resolve(__dirname, "..", inputArg);
  const output = path.resolve(__dirname, "..", outputArg);
  const threshold = thresholdArg ? parseInt(thresholdArg, 10) : 60;

  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const px = new Uint8ClampedArray(data);
  const darken = parseFloat(process.argv[5] || "1"); // 0..1 multiplier on RGB
  const mode = process.argv[6] || "dark"; // "dark" = remove dark bg, "light" = remove light bg
  for (let i = 0; i < px.length; i += 4) {
    const r = px[i];
    const g = px[i + 1];
    const b = px[i + 2];
    const sum = r + g + b;
    const isBg = mode === "light" ? sum > threshold * 3 : sum < threshold * 3;
    if (isBg) {
      px[i + 3] = 0;
    } else if (darken < 1) {
      px[i] = Math.round(r * darken);
      px[i + 1] = Math.round(g * darken);
      px[i + 2] = Math.round(b * darken);
    }
  }

  await sharp(Buffer.from(px), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 92 })
    .toFile(output);

  console.log(`wrote ${output}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
