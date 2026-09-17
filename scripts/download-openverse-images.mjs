/**
 * Downloads product-matching images via Openverse (CC-licensed).
 * No API key. Used only during local development.
 *
 * Usage: node scripts/download-openverse-images.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");

const TARGETS = [
  { file: "hero/hero-1.jpg", query: "scandinavian living room interior armchair", width: 1800, height: 1200 },
  { file: "banners/about.jpg", query: "minimal interior design living room", width: 1400, height: 1100 },
  { file: "banners/featured.jpg", query: "linen bedding bedroom", width: 1400, height: 1600 },
  { file: "banners/promo-1.jpg", query: "scandinavian kitchen interior", width: 1600, height: 900 },
  { file: "categories/home-living.jpg", query: "made bed linen sheets bedroom", width: 900, height: 1100 },
  { file: "categories/kitchen.jpg", query: "modern kitchen counter cookware", width: 900, height: 1100 },
  { file: "categories/organization.jpg", query: "canvas storage baskets shelves", width: 900, height: 1100 },
  { file: "categories/office.jpg", query: "minimal wooden desk workspace", width: 900, height: 1100 },
  { file: "categories/travel.jpg", query: "canvas duffel travel bag", width: 900, height: 1100 },
  { file: "categories/decor.jpg", query: "ceramic vase dried flowers", width: 900, height: 1100 },
  { file: "categories/wellness.jpg", query: "spa bath towels candles", width: 900, height: 1100 },
  { file: "categories/accessories.jpg", query: "canvas tote bag product", width: 900, height: 1100 },
  { file: "products/electric-kettle-1.jpg", query: "electric kettle kitchen appliance", width: 900, height: 1125 },
  { file: "products/electric-kettle-2.jpg", query: "glass electric kettle boiling", width: 900, height: 1125 },
  { file: "products/coffee-grinder-1.jpg", query: "burr coffee grinder", width: 900, height: 1125 },
  { file: "products/coffee-grinder-2.jpg", query: "coffee grinder beans kitchen", width: 900, height: 1125 },
  { file: "products/bath-towel-set-1.jpg", query: "folded bath towels stack", width: 900, height: 1125 },
  { file: "products/bath-towel-set-2.jpg", query: "bathroom towels hanging rack", width: 900, height: 1125 },
  { file: "products/standing-desk-lamp-1.jpg", query: "desk lamp office", width: 900, height: 1125 },
  { file: "products/standing-desk-lamp-2.jpg", query: "LED table lamp workspace", width: 900, height: 1125 },
  { file: "products/leather-wallet-1.jpg", query: "brown leather wallet", width: 900, height: 1125 },
  { file: "products/leather-wallet-2.jpg", query: "leather bifold wallet open", width: 900, height: 1125 },
  { file: "products/essential-oil-diffuser-1.jpg", query: "essential oil diffuser ceramic", width: 900, height: 1125 },
  { file: "products/essential-oil-diffuser-2.jpg", query: "aromatherapy diffuser", width: 900, height: 1125 },
  { file: "products/merino-throw-blanket-1.jpg", query: "wool throw blanket sofa", width: 900, height: 1125 },
  { file: "products/merino-throw-blanket-2.jpg", query: "knit blanket on bed", width: 900, height: 1125 },
  { file: "products/percale-sheet-set-1.jpg", query: "white bed sheets made bed", width: 900, height: 1125 },
  { file: "products/percale-sheet-set-2.jpg", query: "cotton bed linen close up", width: 900, height: 1125 },
  { file: "products/oak-serving-tray-1.jpg", query: "wooden serving tray", width: 900, height: 1125 },
  { file: "products/oak-serving-tray-2.jpg", query: "wood breakfast tray", width: 900, height: 1125 },
  { file: "products/linen-duvet-cover-1.jpg", query: "linen duvet cover bed", width: 900, height: 1125 },
  { file: "products/linen-duvet-cover-2.jpg", query: "rumpled linen bedding", width: 900, height: 1125 },
  { file: "products/stoneware-dinner-set-1.jpg", query: "ceramic dinner plates set", width: 900, height: 1125 },
  { file: "products/stoneware-dinner-set-2.jpg", query: "stoneware bowls plates table", width: 900, height: 1125 },
  { file: "products/beechwood-cutting-board-1.jpg", query: "wooden cutting board kitchen", width: 900, height: 1125 },
  { file: "products/beechwood-cutting-board-2.jpg", query: "beech chopping board", width: 900, height: 1125 },
  { file: "products/kitchen-scale-1.jpg", query: "digital kitchen scale", width: 900, height: 1125 },
  { file: "products/kitchen-scale-2.jpg", query: "food scale kitchen counter", width: 900, height: 1125 },
  { file: "products/linen-tea-towels-1.jpg", query: "linen kitchen towels hanging", width: 900, height: 1125 },
  { file: "products/linen-tea-towels-2.jpg", query: "folded kitchen tea towels", width: 900, height: 1125 },
  { file: "products/glass-storage-jars-1.jpg", query: "glass pantry jars with lids", width: 900, height: 1125 },
  { file: "products/glass-storage-jars-2.jpg", query: "kitchen glass storage jars", width: 900, height: 1125 },
  { file: "products/canvas-storage-bins-1.jpg", query: "canvas storage basket", width: 900, height: 1125 },
  { file: "products/canvas-storage-bins-2.jpg", query: "fabric storage bins", width: 900, height: 1125 },
  { file: "products/modular-desk-organizer-1.jpg", query: "desk organizer tray pens", width: 900, height: 1125 },
  { file: "products/modular-desk-organizer-2.jpg", query: "office desk accessories organizer", width: 900, height: 1125 },
  { file: "products/wall-hook-rail-1.jpg", query: "wooden wall hooks coats", width: 900, height: 1125 },
  { file: "products/wall-hook-rail-2.jpg", query: "oak peg rail wall", width: 900, height: 1125 },
  { file: "products/catchall-tray-1.jpg", query: "ceramic jewelry dish tray", width: 900, height: 1125 },
  { file: "products/catchall-tray-2.jpg", query: "small ceramic catchall dish", width: 900, height: 1125 },
  { file: "products/linen-desk-pad-1.jpg", query: "desk blotter pad workspace", width: 900, height: 1125 },
  { file: "products/linen-desk-pad-2.jpg", query: "minimal desk mat", width: 900, height: 1125 },
  { file: "products/recycled-notebook-set-1.jpg", query: "kraft paper notebooks stack", width: 900, height: 1125 },
  { file: "products/recycled-notebook-set-2.jpg", query: "open notebook stationery", width: 900, height: 1125 },
  { file: "products/brass-bookends-1.jpg", query: "brass bookends books", width: 900, height: 1125 },
  { file: "products/brass-bookends-2.jpg", query: "metal bookends on shelf", width: 900, height: 1125 },
  { file: "products/canvas-weekender-1.jpg", query: "canvas weekender duffel bag", width: 900, height: 1125 },
  { file: "products/canvas-weekender-2.jpg", query: "overnight travel bag canvas", width: 900, height: 1125 },
  { file: "products/packing-cubes-1.jpg", query: "packing cubes suitcase", width: 900, height: 1125 },
  { file: "products/packing-cubes-2.jpg", query: "travel packing cubes clothes", width: 900, height: 1125 },
  { file: "products/toiletry-pouch-1.jpg", query: "toiletry bag dopp kit", width: 900, height: 1125 },
  { file: "products/toiletry-pouch-2.jpg", query: "canvas wash bag hanging", width: 900, height: 1125 },
  { file: "products/stoneware-vase-1.jpg", query: "ceramic vase white", width: 900, height: 1125 },
  { file: "products/stoneware-vase-2.jpg", query: "stoneware vase dried eucalyptus", width: 900, height: 1125 },
  { file: "products/soy-pillar-candle-1.jpg", query: "white pillar candle", width: 900, height: 1125 },
  { file: "products/soy-pillar-candle-2.jpg", query: "soy candle unscented", width: 900, height: 1125 },
  { file: "products/dried-botanicals-1.jpg", query: "dried eucalyptus bouquet", width: 900, height: 1125 },
  { file: "products/dried-botanicals-2.jpg", query: "dried flowers bunch rustic", width: 900, height: 1125 },
  { file: "products/framed-linen-print-1.jpg", query: "framed abstract art print wall", width: 900, height: 1125 },
  { file: "products/framed-linen-print-2.jpg", query: "oak frame artwork on wall", width: 900, height: 1125 },
  { file: "products/linen-sleep-mask-1.jpg", query: "sleep eye mask linen", width: 900, height: 1125 },
  { file: "products/linen-sleep-mask-2.jpg", query: "fabric sleep mask", width: 900, height: 1125 },
  { file: "products/body-brush-1.jpg", query: "wooden dry body brush", width: 900, height: 1125 },
  { file: "products/body-brush-2.jpg", query: "bath body brush bristles", width: 900, height: 1125 },
  { file: "products/canvas-tote-1.jpg", query: "canvas tote bag", width: 900, height: 1125 },
  { file: "products/canvas-tote-2.jpg", query: "structured canvas shopper bag", width: 900, height: 1125 },
];

const usedIds = new Set();
const usedHashes = new Set();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function searchOpenverse(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    page_size: "20",
    mature: "false",
    license: "cc0,pdm,by,by-sa",
  });
  const res = await fetch(`https://api.openverse.org/v1/images/?${params}`, {
    headers: { "User-Agent": "ElayaVenturesLLC/1.0 (local catalog images)" },
  });
  if (!res.ok) throw new Error(`search ${res.status}`);
  const data = await res.json();
  return data.results || [];
}

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ElayaVenturesLLC/1.0 (local catalog images)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const type = res.headers.get("content-type") || "";
  if (!type.includes("image")) throw new Error(`not image (${type})`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 8000) throw new Error("too small");
  return buf;
}

async function main() {
  let success = 0;
  let failed = 0;

  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    process.stdout.write(`${target.file}... `);

    let saved = false;
    try {
      const results = await searchOpenverse(target.query);
      for (const item of results) {
        const id = item.id;
        const url = item.url;
        if (!id || !url || usedIds.has(id)) continue;
        try {
          const buf = await download(url);
          const hash = crypto.createHash("sha256").update(buf).digest("hex");
          if (usedHashes.has(hash)) continue;
          fs.writeFileSync(dest, buf);
          usedIds.add(id);
          usedHashes.add(hash);
          saved = true;
          success++;
          console.log(`✓ ${item.title?.slice(0, 48) || id}`);
          break;
        } catch {
          continue;
        }
      }
    } catch (err) {
      console.log(`search error ${err.message}`);
    }

    if (!saved) {
      failed++;
      console.log("✗");
    }
    await sleep(400);
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main();
