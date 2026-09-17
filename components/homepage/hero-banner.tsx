"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { heroSlides } from "@/data/homepage";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const slide = heroSlides[0];
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-[78vh] w-full overflow-hidden bg-muted md:min-h-[86vh]">
      <Image
        src={slide.image}
        alt={slide.headline}
        fill
        className="object-cover object-center"
        priority
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

      <div className="relative mx-auto flex min-h-[78vh] w-full max-w-[1400px] items-end px-4 pb-12 pt-24 sm:px-6 md:min-h-[86vh] md:pb-20 lg:px-8">
        <motion.div
          className="w-full max-w-xl border border-white/15 bg-[#f7f4ef]/92 p-8 backdrop-blur-[2px] md:p-12"
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">ELAYA VENTURES LLC</p>
          <h1 className="font-display mt-4 text-4xl font-medium leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            {slide.headline}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">{slide.description}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href={slide.ctaLink}>{slide.ctaText}</Link>
            </Button>
            {slide.secondaryCtaText && slide.secondaryCtaLink && (
              <Button asChild size="lg" variant="link" className="h-12 px-0">
                <Link href={slide.secondaryCtaLink}>{slide.secondaryCtaText}</Link>
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
