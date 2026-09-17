/**
 * Downloads curated Unsplash photographs for ELAYA VENTURES LLC.
 * Uses public images.unsplash.com URLs — no API key, no client-side credentials.
 *
 * Usage: node scripts/download-elaya-images.mjs
 */
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PUBLIC = path.join(ROOT, "public");

function unsplashUrl(photoId, width, height) {
  const params = new URLSearchParams({
    fm: "jpg",
    q: "85",
    w: String(width),
    auto: "format",
    fit: "crop",
  });
  if (height) params.set("h", String(height));
  return `https://images.unsplash.com/${photoId}?${params.toString()}`;
}

const TARGETS = [
  { file: "hero/hero-1.jpg", ids: ["photo-1586023492125-27b2c045efd7", "photo-1618220179428-22790b341215", "photo-1616486338812-3dadae4b4ace"], width: 1800, height: 1200 },
  { file: "banners/about.jpg", ids: ["photo-1618221195710-e982f1f8752b", "photo-1600210492486-724fe5c67fb0"], width: 1400, height: 1100 },
  { file: "banners/featured.jpg", ids: ["photo-1505693416388-ac5ce068fe85", "photo-1631049307264-da0ec9d70304"], width: 1400, height: 1600 },
  { file: "banners/promo-1.jpg", ids: ["photo-1556912172-45b7afe04568", "photo-1556911220-bff31c812bea"], width: 1600, height: 900 },

  { file: "categories/home-living.jpg", ids: ["photo-1616627547584-bf28cee262db", "photo-1522771739844-6a9f6d5f14af"], width: 900, height: 1100 },
  { file: "categories/kitchen.jpg", ids: ["photo-1556909114-f6e7ad7d313d", "photo-1556911220-e15b29be8c8f"], width: 900, height: 1100 },
  { file: "categories/organization.jpg", ids: ["photo-1594060675534-ea7730ce2149", "photo-1616046229478-9901c5536a45"], width: 900, height: 1100 },
  { file: "categories/office.jpg", ids: ["photo-1593062096033-9a26b09da705", "photo-1486312338219-ce68d2c6f44d"], width: 900, height: 1100 },
  { file: "categories/travel.jpg", ids: ["photo-1547949003-9792a18a2601", "photo-1553062407-98eeb64c6a62"], width: 900, height: 1100 },
  { file: "categories/decor.jpg", ids: ["photo-1485955900006-10f4d324d411", "photo-1578500494198-242d357a1005"], width: 900, height: 1100 },
  { file: "categories/wellness.jpg", ids: ["photo-1540555700478-4be289fbecef", "photo-1600334129128-685c5582fd35"], width: 900, height: 1100 },
  { file: "categories/accessories.jpg", ids: ["photo-1590874103328-eac38a634649", "photo-1544816155-12df9643f363"], width: 900, height: 1100 },

  { file: "products/electric-kettle-1.jpg", ids: ["photo-1544787219-7f47ccb76574", "photo-1567206563064-6f60f40a2b57"], width: 900, height: 1125 },
  { file: "products/electric-kettle-2.jpg", ids: ["photo-1571934811356-5cc061b6821f", "photo-1511920170033-f8396924c348"], width: 900, height: 1125 },
  { file: "products/coffee-grinder-1.jpg", ids: ["photo-1517668808822-9ebb02f2a0e6", "photo-1495474472287-4d71bcdd2085"], width: 900, height: 1125 },
  { file: "products/coffee-grinder-2.jpg", ids: ["photo-1447933601403-0c6688b33239", "photo-1509042239860-f550ce710b93"], width: 900, height: 1125 },
  { file: "products/bath-towel-set-1.jpg", ids: ["photo-1583947215253-8c3fdc0d2d32", "photo-1631889992164-882aae16d807"], width: 900, height: 1125 },
  { file: "products/bath-towel-set-2.jpg", ids: ["photo-1620626011764-996317b8d101", "photo-1584622650111-993a426fbf0a"], width: 900, height: 1125 },
  { file: "products/standing-desk-lamp-1.jpg", ids: ["photo-1507473880760-e72add750d40", "photo-1513506003901-1e6a229e2d15"], width: 900, height: 1125 },
  { file: "products/standing-desk-lamp-2.jpg", ids: ["photo-1534105615256-13940a56ff44", "photo-1543198126-a8ad8e47fb22"], width: 900, height: 1125 },
  { file: "products/leather-wallet-1.jpg", ids: ["photo-1627123424574-724758594e93", "photo-1553062407-98eeb64c6a62"], width: 900, height: 1125 },
  { file: "products/leather-wallet-2.jpg", ids: ["photo-1606503825008-909a67e63c3d", "photo-1617137968427-85924c800a22"], width: 900, height: 1125 },
  { file: "products/essential-oil-diffuser-1.jpg", ids: ["photo-1608571423902-eed4a5ad8108", "photo-1602928298849-325cec8771f0"], width: 900, height: 1125 },
  { file: "products/essential-oil-diffuser-2.jpg", ids: ["photo-1596462502278-27bfdc403348", "photo-1570172619644-df0cb7bf0a08"], width: 900, height: 1125 },
  { file: "products/merino-throw-blanket-1.jpg", ids: ["photo-1584100936595-c0654b55a2e2", "photo-1540518614846-a4942716467d"], width: 900, height: 1125 },
  { file: "products/merino-throw-blanket-2.jpg", ids: ["photo-1583847260160-a63b3f677b9a", "photo-1493663284031-b7e3aefcae8e"], width: 900, height: 1125 },
  { file: "products/percale-sheet-set-1.jpg", ids: ["photo-1631049307264-da0ec9d70304", "photo-1522771739844-6a9f6d5f14af"], width: 900, height: 1125 },
  { file: "products/percale-sheet-set-2.jpg", ids: ["photo-1505693416388-ac5ce068fe85", "photo-1615874959475-d3b1d4b0d4d6"], width: 900, height: 1125 },
  { file: "products/oak-serving-tray-1.jpg", ids: ["photo-1610701596007-11502861dcfa", "photo-1546549032-9571cd6b27df"], width: 900, height: 1125 },
  { file: "products/oak-serving-tray-2.jpg", ids: ["photo-1600566752355-35792bedcfea", "photo-1556909172-54557c7e4fb7"], width: 900, height: 1125 },
  { file: "products/linen-duvet-cover-1.jpg", ids: ["photo-1616627547584-bf28cee262db", "photo-1631049552057-403cdb8f0558"], width: 900, height: 1125 },
  { file: "products/linen-duvet-cover-2.jpg", ids: ["photo-1522771739844-6a9f6d5f14af", "photo-1615876234886-fd9a39fda97f"], width: 900, height: 1125 },
  { file: "products/stoneware-dinner-set-1.jpg", ids: ["photo-1578500494198-242d357a1005", "photo-1603199506016-b9a594b593c0"], width: 900, height: 1125 },
  { file: "products/stoneware-dinner-set-2.jpg", ids: ["photo-1556910103-1c02745aae4d", "photo-1414235077428-338989a2e8c0"], width: 900, height: 1125 },
  { file: "products/beechwood-cutting-board-1.jpg", ids: ["photo-1546549032-9571cd6b27df", "photo-1567769541616-efe4dfe176cc"], width: 900, height: 1125 },
  { file: "products/beechwood-cutting-board-2.jpg", ids: ["photo-1506368249639-73a05d6f6488", "photo-1556909114-44e3e70034e2"], width: 900, height: 1125 },
  { file: "products/kitchen-scale-1.jpg", ids: ["photo-1767464950782-1654dc8665aa", "photo-1779910711158-3efa09a81281"], width: 900, height: 1125 },
  { file: "products/kitchen-scale-2.jpg", ids: ["photo-1766933161380-26ef7674cbc9", "photo-1556910103-1c02745aae4d"], width: 900, height: 1125 },
  { file: "products/linen-tea-towels-1.jpg", ids: ["photo-1584622781867-0d7f090daa3e", "photo-1556911220-e15b29be8c8f"], width: 900, height: 1125 },
  { file: "products/linen-tea-towels-2.jpg", ids: ["photo-1600566753086-00f18fb6b3ea", "photo-1556909114-f6e7ad7d313d"], width: 900, height: 1125 },
  { file: "products/glass-storage-jars-1.jpg", ids: ["photo-1585687501404-3de5a9390da4", "photo-1536304993881-ff6e9eefa2a6"], width: 900, height: 1125 },
  { file: "products/glass-storage-jars-2.jpg", ids: ["photo-1516594798947-e65505dbb29d", "photo-1587043862100-01920db231ba"], width: 900, height: 1125 },
  { file: "products/canvas-storage-bins-1.jpg", ids: ["photo-1538688525198-9b88f6dc7e76", "photo-1594060675534-ea7730ce2149"], width: 900, height: 1125 },
  { file: "products/canvas-storage-bins-2.jpg", ids: ["photo-1616046229478-9901c5536a45", "photo-1598300042247-d088f8ab3a91"], width: 900, height: 1125 },
  { file: "products/modular-desk-organizer-1.jpg", ids: ["photo-1583484963886-cfe2bff2945f", "photo-1497032628192-86f99bcd76bc"], width: 900, height: 1125 },
  { file: "products/modular-desk-organizer-2.jpg", ids: ["photo-1486312338219-ce68d2c6f44d", "photo-1593062096033-9a26b09da705"], width: 900, height: 1125 },
  { file: "products/wall-hook-rail-1.jpg", ids: ["photo-1505691938895-1758d7feb511", "photo-1523413363574-c30aa1c2a516"], width: 900, height: 1125 },
  { file: "products/wall-hook-rail-2.jpg", ids: ["photo-1556909114-f6e7ad7d313d", "photo-1600607687939-ce8a6c25118c"], width: 900, height: 1125 },
  { file: "products/catchall-tray-1.jpg", ids: ["photo-1578500494198-242d357a1005", "photo-1565193566173-7a0ee3dbe521"], width: 900, height: 1125 },
  { file: "products/catchall-tray-2.jpg", ids: ["photo-1610701596007-11502861dcfa", "photo-1603201667141-5a2d4c673378"], width: 900, height: 1125 },
  { file: "products/linen-desk-pad-1.jpg", ids: ["photo-1586075010923-2ddab07ea23f", "photo-1497215728101-856f4ea42174"], width: 900, height: 1125 },
  { file: "products/linen-desk-pad-2.jpg", ids: ["photo-1486312338219-ce68d2c6f44d", "photo-1518455027359-f3f8164ba6bd"], width: 900, height: 1125 },
  { file: "products/recycled-notebook-set-1.jpg", ids: ["photo-1531346878377-a5be54034f1f", "photo-1517842645767-c639042777db"], width: 900, height: 1125 },
  { file: "products/recycled-notebook-set-2.jpg", ids: ["photo-1455390582262-044cdead277a", "photo-1471107340929-a87cd0f5b5f3"], width: 900, height: 1125 },
  { file: "products/brass-bookends-1.jpg", ids: ["photo-1512820790803-83ca734da794", "photo-1481627834876-b7833e8f5570"], width: 900, height: 1125 },
  { file: "products/brass-bookends-2.jpg", ids: ["photo-1495446815901-a7297e633e8d", "photo-1524995997946-a1c2e315a42f"], width: 900, height: 1125 },
  { file: "products/canvas-weekender-1.jpg", ids: ["photo-1547949003-9792a18a2601", "photo-1553062407-98eeb64c6a62"], width: 900, height: 1125 },
  { file: "products/canvas-weekender-2.jpg", ids: ["photo-1565026057447-bc90a3dceb87", "photo-1590874103328-eac38a634649"], width: 900, height: 1125 },
  { file: "products/packing-cubes-1.jpg", ids: ["photo-1501555085422-2ab0c0f8750b", "photo-1581553680321-4fffae59fccd"], width: 900, height: 1125 },
  { file: "products/packing-cubes-2.jpg", ids: ["photo-1553531384-cc64ac80f931", "photo-1469854523086-cc02fe5d8800"], width: 900, height: 1125 },
  { file: "products/toiletry-pouch-1.jpg", ids: ["photo-1571781926291-c477ebfd024b", "photo-1556228720-195a672e8a03"], width: 900, height: 1125 },
  { file: "products/toiletry-pouch-2.jpg", ids: ["photo-1631730486572-226d1f595b68", "photo-1522335789103-4d1e22b91b0a"], width: 900, height: 1125 },
  { file: "products/stoneware-vase-1.jpg", ids: ["photo-1485955900006-10f4d324d411", "photo-1581783342308-f792dbdd27c5"], width: 900, height: 1125 },
  { file: "products/stoneware-vase-2.jpg", ids: ["photo-1603201667141-5a2d4c673378", "photo-1513519245088-0e12902e35ca"], width: 900, height: 1125 },
  { file: "products/soy-pillar-candle-1.jpg", ids: ["photo-1603006905003-be475563bc59", "photo-1602608720670-0d702775a0f2"], width: 900, height: 1125 },
  { file: "products/soy-pillar-candle-2.jpg", ids: ["photo-1578662996442-48f60103fc96", "photo-1608188047524-27d0cf0b472b"], width: 900, height: 1125 },
  { file: "products/dried-botanicals-1.jpg", ids: ["photo-1496065881806-03de041dda18", "photo-1457089328109-06b6cd9b4015"], width: 900, height: 1125 },
  { file: "products/dried-botanicals-2.jpg", ids: ["photo-1508610048659-a06b669e3321", "photo-1468327768560-75b60c6f10d5"], width: 900, height: 1125 },
  { file: "products/framed-linen-print-1.jpg", ids: ["photo-1579783902614-a3da392684de", "photo-1513519245088-0e12902e35ca"], width: 900, height: 1125 },
  { file: "products/framed-linen-print-2.jpg", ids: ["photo-1583847260160-a63b3f677b9a", "photo-1513519245088-0e12902e5c7d"], width: 900, height: 1125 },
  { file: "products/linen-sleep-mask-1.jpg", ids: ["photo-1541781774459-bb2af2f05b55", "photo-1515377905543-f15e52645c35"], width: 900, height: 1125 },
  { file: "products/linen-sleep-mask-2.jpg", ids: ["photo-1540555700478-4be289fbecef", "photo-1544161515-4ab6ce6db874"], width: 900, height: 1125 },
  { file: "products/body-brush-1.jpg", ids: ["photo-1608248543803-ba4f8c70ae0b", "photo-1600334129128-685c5582fd35"], width: 900, height: 1125 },
  { file: "products/body-brush-2.jpg", ids: ["photo-1556228578-0e17e0f64c1c", "photo-1570172619644-df0cb7bf0a08"], width: 900, height: 1125 },
  { file: "products/canvas-tote-1.jpg", ids: ["photo-1590874103328-eac38a634649", "photo-1544816155-12df9643f363"], width: 900, height: 1125 },
  { file: "products/canvas-tote-2.jpg", ids: ["photo-1566150905458-1bf1fc113f0d", "photo-1526178613552-2b45c6c302f0"], width: 900, height: 1125 },
];

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "ElayaVenturesLLC/1.0 (local-image-setup)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 4000) throw new Error("File too small");
  return buf;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const usedHashes = new Set();
  const usedIds = new Set();
  let success = 0;
  let failed = 0;

  for (const target of TARGETS) {
    const dest = path.join(PUBLIC, target.file);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    process.stdout.write(`${target.file}... `);

    let saved = false;
    for (const id of target.ids) {
      if (usedIds.has(id)) continue;
      try {
        const buf = await download(unsplashUrl(id, target.width, target.height));
        const hash = crypto.createHash("sha256").update(buf).digest("hex");
        if (usedHashes.has(hash)) continue;
        fs.writeFileSync(dest, buf);
        usedHashes.add(hash);
        usedIds.add(id);
        saved = true;
        success++;
        console.log(`✓ ${id}`);
        break;
      } catch (err) {
        console.warn(`retry (${id}: ${err.message})`);
      }
    }

    if (!saved) {
      failed++;
      console.log("✗");
    }

    await sleep(250);
  }

  console.log(`\nDone: ${success} downloaded, ${failed} failed`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
