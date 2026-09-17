import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const colors = {
  primary: "#2C2A27",
  accent: "#8B7355",
  light: "#F7F4EF",
  cream: "#EFE8DC",
  gray: "#E4DED4",
  white: "#FBF8F3",
};

function createSvg(width, height, bg, label, sublabel = "", textColor = colors.primary) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="24" y="24" width="${width - 48}" height="${height - 48}" fill="none" stroke="${textColor}" stroke-width="1" opacity="0.18"/>
  <text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.045}" font-weight="500" letter-spacing="1">${label}</text>
  ${sublabel ? `<text x="50%" y="58%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-family="system-ui, sans-serif" font-size="${Math.min(width, height) * 0.028}" opacity="0.55">${sublabel}</text>` : ""}
</svg>`;
}

function createLogo() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="44" viewBox="0 0 280 44" fill="none">
  <text x="0" y="18" fill="#2C2A27" font-family="system-ui, -apple-system, sans-serif" font-size="17" font-weight="500" letter-spacing="3.2">ELAYA</text>
  <text x="0" y="36" fill="#8B7355" font-family="system-ui, -apple-system, sans-serif" font-size="9" font-weight="500" letter-spacing="2.8">VENTURES LLC</text>
</svg>`;
}

function createPaymentIcon(name, color) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="32" viewBox="0 0 48 32">
  <rect width="48" height="32" fill="${colors.light}" stroke="${colors.gray}" stroke-width="1"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${color}" font-family="system-ui, sans-serif" font-size="8" font-weight="600">${name}</text>
  </svg>`;
}

const root = path.join(__dirname, "..", "public");

fs.mkdirSync(path.join(root, "logo"), { recursive: true });
fs.writeFileSync(path.join(root, "logo", "logo.svg"), createLogo());

fs.mkdirSync(path.join(root, "hero"), { recursive: true });
fs.writeFileSync(path.join(root, "hero", "hero-1.svg"), createSvg(1400, 900, colors.cream, "Goods for a quieter home", "ELAYA VENTURES LLC"));

const bannerItems = [
  { name: "promo-1.svg", label: "Practical picks", sub: "Shop the catalog", bg: colors.cream },
  { name: "about.svg", label: "A considered catalog", sub: "ELAYA VENTURES LLC", bg: colors.light },
  { name: "featured.svg", label: "The home edit", sub: "Featured collection", bg: colors.cream },
];
fs.mkdirSync(path.join(root, "banners"), { recursive: true });
bannerItems.forEach((item) => {
  fs.writeFileSync(
    path.join(root, "banners", item.name),
    createSvg(800, 600, item.bg, item.label, item.sub)
  );
});

const categoryItems = [
  "home-living",
  "kitchen",
  "organization",
  "office",
  "travel",
  "decor",
  "wellness",
  "accessories",
];
fs.mkdirSync(path.join(root, "categories"), { recursive: true });
categoryItems.forEach((name) => {
  fs.writeFileSync(
    path.join(root, "categories", `${name}.svg`),
    createSvg(800, 1000, colors.cream, name.replace("-", " "))
  );
});

const productNames = [
  "electric-kettle",
  "coffee-grinder",
  "bath-towel-set",
  "standing-desk-lamp",
  "leather-wallet",
  "essential-oil-diffuser",
  "merino-throw-blanket",
  "percale-sheet-set",
  "oak-serving-tray",
  "linen-duvet-cover",
  "stoneware-dinner-set",
  "beechwood-cutting-board",
  "kitchen-scale",
  "linen-tea-towels",
  "glass-storage-jars",
  "canvas-storage-bins",
  "modular-desk-organizer",
  "wall-hook-rail",
  "catchall-tray",
  "linen-desk-pad",
  "recycled-notebook-set",
  "brass-bookends",
  "canvas-weekender",
  "packing-cubes",
  "toiletry-pouch",
  "stoneware-vase",
  "soy-pillar-candle",
  "dried-botanicals",
  "framed-linen-print",
  "linen-sleep-mask",
  "body-brush",
  "canvas-tote",
];
fs.mkdirSync(path.join(root, "products"), { recursive: true });
productNames.forEach((name) => {
  const label = name.replace(/-/g, " ");
  fs.writeFileSync(path.join(root, "products", `${name}-1.svg`), createSvg(900, 1125, colors.cream, label));
  fs.writeFileSync(path.join(root, "products", `${name}-2.svg`), createSvg(900, 1125, colors.light, label, "alternate view"));
});

const paymentDir = path.join(root, "payments");
fs.mkdirSync(paymentDir, { recursive: true });
[
  ["visa.svg", "VISA", "#1A1F71"],
  ["mastercard.svg", "MC", "#EB001B"],
  ["amex.svg", "AMEX", "#006FCF"],
  ["paypal.svg", "PayPal", "#003087"],
  ["apple-pay.svg", "Pay", "#2C2A27"],
].forEach(([file, label, color]) => {
  fs.writeFileSync(path.join(paymentDir, file), createPaymentIcon(label, color));
});

console.log("Generated ELAYA VENTURES LLC placeholder assets.");
