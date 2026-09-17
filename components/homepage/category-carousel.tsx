"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function CategoryCarousel() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="py-16 md:py-24">
      <Container>
        <SectionHeading
          title="Shop by room and ritual"
          subtitle="Eight considered categories rather than a wall of identical tiles."
        />
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {categories.map((category, index) => {
            const wide = index === 0 || index === 5;
            return (
              <motion.div
                key={category.id}
                className={cn(wide && "col-span-2")}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <Link
                  href={`/categories/${category.slug}`}
                  className="group relative block overflow-hidden border border-border bg-muted"
                >
                  <div className={cn("relative overflow-hidden", wide ? "aspect-[16/8] md:aspect-[16/7]" : "aspect-[4/5]")}>
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes={wide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">{category.productCount} pieces</p>
                      <h3 className="mt-1 font-display text-lg font-medium text-white md:text-xl">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
