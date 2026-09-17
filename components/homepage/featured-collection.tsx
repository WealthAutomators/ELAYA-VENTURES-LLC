"use client";

import Image from "next/image";
import Link from "next/link";
import { featuredCollection, homepageFeaturedSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCard } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";

export function FeaturedCollection() {
  const products = getProductsBySlugs(homepageFeaturedSlugs).slice(0, 4);

  return (
    <section className="bg-card py-16 md:py-24">
      <Container>
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Featured collection</p>
            <h2 className="font-display mt-3 text-3xl font-medium tracking-tight md:text-4xl">{featuredCollection.title}</h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{featuredCollection.description}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href={`/categories/${featuredCollection.categorySlug}`}>Browse home & living</Link>
            </Button>
            <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden border border-border lg:block">
              <Image
                src={featuredCollection.bannerImage}
                alt={featuredCollection.title}
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
          <div className="lg:col-span-7">
            <SectionHeading title="Selected pieces" className="mb-6 lg:hidden" />
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
