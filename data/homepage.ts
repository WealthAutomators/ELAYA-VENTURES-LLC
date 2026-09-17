import { Feature, HeroSlide, PromoBanner } from "@/types";

export const heroSlides: HeroSlide[] = [
  {
    id: "1",
    image: "/hero/hero-1.jpg",
    headline: "Goods for a quieter home.",
    description:
      "Home textiles, kitchen tools, and everyday objects chosen for material, proportion, and lasting use.",
    ctaText: "Shop the catalog",
    ctaLink: "/shop",
    secondaryCtaText: "Browse collections",
    secondaryCtaLink: "/collections",
  },
];

export const features: Feature[] = [
  {
    id: "1",
    icon: "truck",
    title: "Free shipping over $75",
    description: "Standard delivery in 3–5 business days on qualifying orders.",
  },
  {
    id: "2",
    icon: "shield",
    title: "Secure checkout",
    description: "A demo payment flow with encrypted form fields. No real charges.",
  },
  {
    id: "3",
    icon: "rotate",
    title: "30-day returns",
    description: "Unused items in original packaging may be returned within 30 days.",
  },
  {
    id: "4",
    icon: "mail",
    title: "Write to us",
    description: "Questions about an order or product can be sent by email.",
  },
  {
    id: "5",
    icon: "star",
    title: "Considered selection",
    description: "Each piece is chosen for function, material, and calm design.",
  },
];

export const dealsEndTime = "2026-09-17T06:00:00.000Z";

export const homepageDealsSlugs = [
  "electric-kettle",
  "bath-towel-set",
  "percale-sheet-set",
  "canvas-weekender",
] as const;

export const homepageBestsellerSlugs = [
  "merino-throw-blanket",
  "stoneware-dinner-set",
  "bath-towel-set",
  "canvas-tote",
  "beechwood-cutting-board",
  "electric-kettle",
  "canvas-storage-bins",
  "soy-pillar-candle",
] as const;

export const homepageFeaturedSlugs = [
  "linen-duvet-cover",
  "merino-throw-blanket",
  "stoneware-dinner-set",
  "canvas-weekender",
  "stoneware-vase",
  "standing-desk-lamp",
  "canvas-tote",
  "bath-towel-set",
] as const;

export const homepageNewArrivalSlugs = [
  "linen-duvet-cover",
  "canvas-weekender",
  "linen-sleep-mask",
  "packing-cubes",
  "framed-linen-print",
  "brass-bookends",
] as const;

export const homepageKitchenSlugs = [
  "stoneware-dinner-set",
  "beechwood-cutting-board",
  "electric-kettle",
  "coffee-grinder",
  "kitchen-scale",
  "linen-tea-towels",
  "glass-storage-jars",
  "wall-hook-rail",
  "packing-cubes",
] as const;

export const editorialShowcase = {
  slug: "linen-duvet-cover",
  eyebrow: "Featured piece",
  title: "Herringbone, made to be slept in.",
  description:
    "A charcoal herringbone duvet cover with a lived-in drape from the first night. Interior ties and a quiet grey that sits well on the bed.",
  ctaText: "View the duvet cover",
  image: "/banners/featured.jpg",
};

export const promotionalBanner: PromoBanner = {
  id: "1",
  title: "Practical pieces, kept in rotation.",
  description:
    "From pantry jars to desk trays — objects chosen because they earn their place, not because they fill a grid.",
  buttonText: "Shop practical picks",
  buttonLink: "/collections/practical-picks",
  image: "/banners/promo-1.jpg",
};

export const aboutSection = {
  title: "A considered retail catalog.",
  description:
    "ELAYA VENTURES LLC offers home, kitchen, and everyday goods selected for material quality and calm design. The assortment is meant to be used often and kept for a long time.",
  checklist: [
    "Home textiles, kitchen tools, and desk objects",
    "Travel pieces built for repeated packing",
    "Free standard shipping on orders over $75",
    "Straightforward returns within 30 days",
  ],
  buttonText: "About the store",
  buttonLink: "/about",
  image: "/banners/about.jpg",
};

export const featuredCollection = {
  title: "The home edit",
  description: "Textiles and objects for rooms that are lived in, not staged.",
  bannerImage: "/banners/featured.jpg",
  categorySlug: "home-living",
};

export const bestSellerTabs = [
  { label: "All", slug: "all" },
  { label: "Home", slug: "home-living" },
  { label: "Kitchen", slug: "kitchen" },
  { label: "Office", slug: "office" },
  { label: "Travel", slug: "travel" },
];

export const newsletter = {
  title: "Notes from the catalog",
  description: "New arrivals and seasonal edits, sent occasionally.",
  placeholder: "Email address",
  buttonText: "Subscribe",
};

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
];
