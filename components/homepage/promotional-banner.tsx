import Link from "next/link";
import { promotionalBanner } from "@/data/homepage";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function PromotionalBanner() {
  return (
    <section className="border-y border-border bg-muted">
      <Container className="flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center md:py-16">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
            {promotionalBanner.title}
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{promotionalBanner.description}</p>
        </div>
        <Button asChild size="lg" className="shrink-0">
          <Link href={promotionalBanner.buttonLink}>{promotionalBanner.buttonText}</Link>
        </Button>
      </Container>
    </section>
  );
}
