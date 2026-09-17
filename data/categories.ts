import { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    slug: "home-living",
    name: "Home & Living",
    image: "/categories/home-living.jpg",
    description: "Textiles, trays, and quiet pieces for the rooms you live in.",
    productCount: 5,
  },
  {
    id: "2",
    slug: "kitchen",
    name: "Kitchen",
    image: "/categories/kitchen.jpg",
    description: "Tools and tableware for everyday cooking and serving.",
    productCount: 9,
  },
  {
    id: "3",
    slug: "organization",
    name: "Organization",
    image: "/categories/organization.jpg",
    description: "Storage and surfaces that keep rooms ordered without fuss.",
    productCount: 3,
  },
  {
    id: "4",
    slug: "office",
    name: "Office",
    image: "/categories/office.jpg",
    description: "Desk objects for a calmer, more useful workspace.",
    productCount: 4,
  },
  {
    id: "5",
    slug: "travel",
    name: "Travel",
    image: "/categories/travel.jpg",
    description: "Bags made for repeated packing and carrying.",
    productCount: 2,
  },
  {
    id: "6",
    slug: "decor",
    name: "Decor",
    image: "/categories/decor.jpg",
    description: "Vessels, candles, and objects that settle into a room.",
    productCount: 4,
  },
  {
    id: "7",
    slug: "wellness",
    name: "Wellness",
    image: "/categories/wellness.jpg",
    description: "Simple rituals for rest, bathing, and daily care.",
    productCount: 3,
  },
  {
    id: "8",
    slug: "accessories",
    name: "Accessories",
    image: "/categories/accessories.jpg",
    description: "Carried pieces for work, errands, and the in-between.",
    productCount: 2,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
