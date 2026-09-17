# ELAYA VENTURES LLC

A contemporary retail storefront built on an existing Next.js ecommerce engine. The catalog focuses on home, kitchen, organization, office, travel, decor, wellness, and everyday accessories.

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Radix UI primitives**
- **Lucide Icons**
- **Framer Motion**
- **Embla Carousel**
- **React Context** (cart, wishlist, recently viewed)
- **localStorage** persistence (no backend)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Start production server
```

## Image workflow

Product, hero, category, and banner photographs can be downloaded locally during development:

```bash
npm run images:elaya
```

The script uses public Unsplash image URLs. It does not expose API keys in the client.

## Project Structure

```
app/                  # Next.js pages (App Router)
components/           # Storefront UI
data/                 # Catalog, company, and homepage content
lib/                  # Utilities
context/              # Cart, wishlist, recently viewed
public/               # Static assets
```

## Checkout

Checkout is a demonstration flow and does not process real payments. Use coupon code `SAVE10` on the cart page for a 10% discount.

## Brand

- **Company:** ELAYA VENTURES LLC
- **Address:** 960 UNION AVE NE, Renton, WA 98059
- **Email:** elayaventuresllc@gmail.com
- **Palette:** warm off-white, cream, charcoal, stone, muted earth
