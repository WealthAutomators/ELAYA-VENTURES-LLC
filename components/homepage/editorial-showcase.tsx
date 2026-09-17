"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { editorialShowcase } from "@/data/homepage";
import { getProductBySlug } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function EditorialShowcase() {
  const product = getProductBySlug(editorialShowcase.slug);
  const reduceMotion = useReducedMotion();
  if (!product) return null;

  return (
    <section className="py-4 md:py-8">
      <div className="relative min-h-[62vh] overflow-hidden bg-muted md:min-h-[70vh]">
        <Image
          src={editorialShowcase.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/25" />
        <Container className="relative flex min-h-[62vh] items-center py-16 md:min-h-[70vh]">
          <motion.div
            className="max-w-lg text-white"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/70">{editorialShowcase.eyebrow}</p>
            <h2 className="font-display mt-4 text-3xl font-medium leading-tight md:text-5xl">{editorialShowcase.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-white/85 md:text-base">{editorialShowcase.description}</p>
            <p className="mt-5 text-sm tracking-wide">
              {product.name} — {formatPrice(product.salePrice ?? product.price)}
            </p>
            <Button asChild size="lg" className="mt-8 bg-white text-primary hover:bg-white/90">
              <Link href={`/product/${product.slug}`}>{editorialShowcase.ctaText}</Link>
            </Button>
          </motion.div>
        </Container>
      </div>
    </section>
  );
}
