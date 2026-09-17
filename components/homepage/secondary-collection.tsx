"use client";

import { homepageKitchenSlugs } from "@/data/homepage";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Carousel } from "@/components/ui/carousel";
import { ProductCard } from "@/components/product/product-card";

export function SecondaryCollection() {
  const products = getProductsBySlugs(homepageKitchenSlugs);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="In the kitchen"
          subtitle="Boards, jars, stoneware, and the tools used every morning."
          viewMoreLink="/collections/kitchen"
        />
        <Carousel slidesToShow={4} className="px-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Carousel>
      </Container>
    </section>
  );
}
