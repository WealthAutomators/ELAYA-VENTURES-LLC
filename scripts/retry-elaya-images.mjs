/**
 * Retry failed ELAYA image slots with additional Unsplash photo IDs.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const RETRIES = [
  { file: "banners/promo-1.jpg", ids: ["photo-1495521821757-a1efb6729352", "photo-1466637574441-749b8f19452f", "photo-1556909172-54557c7e4fb7"], width: 1600, height: 900 },
  { file: "products/bath-towel-set-1.jpg", ids: ["photo-1600566753190-17fedebaa088", "photo-1616628188855-8c7a03445b07", "photo-1507652313519-d4e9174996ca"], width: 900, height: 1125 },
  { file: "products/percale-sheet-set-2.jpg", ids: ["photo-1615876234886-fd9a39fda97f", "photo-1631049552057-403cdb8f0558", "photo-1540518614846-a4942716467d"], width: 900, height: 1125 },
  { file: "products/linen-duvet-cover-1.jpg", ids: ["photo-1615874959474-1e2d90d5b32f", "photo-1584100936595-c0654b55a2e6", "photo-1595526114035-0d45ed16cfbf"], width: 900, height: 1125 },
  { file: "products/linen-tea-towels-1.jpg", ids: ["photo-1493770348161-369560ae630e", "photo-1466637574441-749b8f19452f", "photo-1556910103-1c02745aae4d"], width: 900, height: 1125 },
  { file: "products/canvas-storage-bins-1.jpg", ids: ["photo-1493809842364-78817add7ffb", "photo-1558618666-fcd25c85cd64", "photo-1533090161767-e6ffed986c88"], width: 900, height: 1125 },
  { file: "products/catchall-tray-1.jpg", ids: ["photo-1578749556568-bc2c40e362b6", "photo-1493106819501-66d381c466f1", "photo-1459411552884-841db9b3cc2a"], width: 900, height: 1125 },
  { file: "products/stoneware-vase-2.jpg", ids: ["photo-1459411552884-841db9b3cc2a", "photo-1493106819501-66d381c466f1", "photo-1416879595882-3373a0480b5b"], width: 900, height: 1125 },
  { file: "products/dried-botanicals-1.jpg", ids: ["photo-1468327768560-75b60c6f10d5", "photo-1490750967868-88aa4d6eef51", "photo-1470509036065-14e2d90d5b32"], width: 900, height: 1125 },
  { file: "products/framed-linen-print-1.jpg", ids: ["photo-1541961017774-22349e4a1262", "photo-1578301978693-85fa9c0320b9", "photo-1513364776144-60967b0f800f"], width: 900, height: 1125 },
  { file: "products/framed-linen-print-2.jpg", ids: ["photo-1499781350541-7783f6c6a0c8", "photo-1531913762438-89857e693dc4", "photo-1577083552431-6e5fd01988d8"], width: 900, height: 1125 },
  { file: "products/body-brush-2.jpg", ids: ["photo-1600334129128-685c5582fd35", "photo-1571875257727-256c89ea70ea", "photo-1522335786256-18d3b2d0e0e0"], width: 900, height: 1125 },
  { file: "products/canvas-tote-1.jpg", ids: ["photo-1526178613552-2b45c6c302f0", "photo-1591561954557-26941169b49e", "photo-1547949003-9792a18a2601"], width: 900, height: 1125 },
];

function unsplashUrl(photoId, width, height) {
  return `https://images.unsplash.com/${photoId}?fm=jpg&q=85&w=${width}&h=${height}&auto=format&fit=crop`;
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ElayaVenturesLLC/1.0 (image-retry)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 4000) throw new Error("too small");
  return buf;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  let success = 0;
  let failed = 0;
  for (const target of RETRIES) {
    const dest = path.join(PUBLIC, target.file);
    process.stdout.write(`${target.file}... `);
    let saved = false;
    for (const id of target.ids) {
      try {
        const buf = await download(unsplashUrl(id, target.width, target.height));
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        fs.writeFileSync(dest, buf);
        console.log(`✓ ${id}`);
        saved = true;
        success++;
        break;
      } catch (err) {
        console.warn(`retry (${id}: ${err.message})`);
      }
    }
    if (!saved) {
      failed++;
      console.log("✗");
    }
    await sleep(300);
  }
  console.log(`\nRetry done: ${success} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
