import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public", "logo.png");

async function makeCircularPng(size, output) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
  );

  const { data, info } = await sharp(source)
    .resize(size, size, { fit: "cover", position: "centre" })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r < 35 && g < 35 && b < 35) {
      data[i + 3] = 0;
    }
  }

  await sharp(data, { raw: info })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toFile(output);
}

async function main() {
  const outputs = [
    path.join(root, "public", "favicon.png"),
    path.join(root, "src", "app", "icon.png"),
    path.join(root, "src", "app", "apple-icon.png"),
  ];

  for (const file of outputs) {
    await makeCircularPng(file.includes("apple") ? 180 : 192, file);
  }

  const sizes = [16, 32, 48];
  const buffers = await Promise.all(
    sizes.map(async (size) => {
      const mask = Buffer.from(
        `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="white"/></svg>`
      );
      const { data, info } = await sharp(source)
        .resize(size, size, { fit: "cover" })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      for (let i = 0; i < data.length; i += 4) {
        if (data[i] < 35 && data[i + 1] < 35 && data[i + 2] < 35) {
          data[i + 3] = 0;
        }
      }

      return sharp(data, { raw: info })
        .composite([{ input: mask, blend: "dest-in" }])
        .png()
        .toBuffer();
    })
  );

  const ico = await pngToIco(buffers);
  fs.writeFileSync(path.join(root, "public", "favicon.ico"), ico);
  fs.writeFileSync(path.join(root, "src", "app", "favicon.ico"), ico);
  console.log("Circular favicons generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
