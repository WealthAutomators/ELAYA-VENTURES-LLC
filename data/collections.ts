import { Collection } from "@/types";
import { getProductsBySlugs } from "./products";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "everyday-essentials",
    name: "Everyday Essentials",
    description: "Small, useful pieces that earn their place on a counter, desk, or hook.",
    image: "/banners/featured.jpg",
    productSlugs: [
      "catchall-tray",
      "linen-tea-towels",
      "glass-storage-jars",
      "canvas-tote",
      "recycled-notebook-set",
      "linen-sleep-mask",
    ],
  },
  {
    id: "c2",
    slug: "home-living",
    name: "Home & Living",
    description: "Textiles and serving pieces for a quieter, more settled home.",
    image: "/categories/home-living.jpg",
    productSlugs: [
      "merino-throw-blanket",
      "percale-sheet-set",
      "linen-duvet-cover",
      "bath-towel-set",
      "oak-serving-tray",
    ],
  },
  {
    id: "c3",
    slug: "work-organization",
    name: "Work & Organization",
    description: "Desk and storage objects that keep rooms and workdays in order.",
    image: "/categories/office.jpg",
    productSlugs: [
      "standing-desk-lamp",
      "linen-desk-pad",
      "modular-desk-organizer",
      "recycled-notebook-set",
      "brass-bookends",
      "canvas-storage-bins",
    ],
  },
  {
    id: "c4",
    slug: "travel",
    name: "Travel",
    description: "Bags and a compact pouch for packing, carrying, and moving through the week.",
    image: "/categories/travel.jpg",
    productSlugs: ["canvas-weekender", "toiletry-pouch", "canvas-tote"],
  },
  {
    id: "c5",
    slug: "kitchen",
    name: "Kitchen",
    description: "Tableware and tools for cooking, brewing, and setting the table.",
    image: "/categories/kitchen.jpg",
    productSlugs: [
      "electric-kettle",
      "coffee-grinder",
      "stoneware-dinner-set",
      "beechwood-cutting-board",
      "kitchen-scale",
      "linen-tea-towels",
      "glass-storage-jars",
      "wall-hook-rail",
      "packing-cubes",
    ],
  },
  {
    id: "c6",
    slug: "new-arrivals",
    name: "New Arrivals",
    description: "Recently added pieces for the home, desk, and travel bag.",
    image: "/banners/about.jpg",
    productSlugs: [
      "linen-duvet-cover",
      "canvas-weekender",
      "linen-sleep-mask",
      "packing-cubes",
      "framed-linen-print",
      "brass-bookends",
    ],
  },
  {
    id: "c7",
    slug: "practical-picks",
    name: "Practical Picks",
    description: "Straightforward objects chosen for daily function over display.",
    image: "/categories/organization.jpg",
    productSlugs: [
      "kitchen-scale",
      "modular-desk-organizer",
      "canvas-storage-bins",
      "glass-storage-jars",
      "packing-cubes",
      "body-brush",
      "wall-hook-rail",
    ],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getCollectionProducts(slug: string) {
  const collection = getCollectionBySlug(slug);
  if (!collection) return [];
  return getProductsBySlugs(collection.productSlugs);
}
