import Link from "next/link";
import Image from "next/image";
import { collections } from "@/data/collections";
import { getProductsBySlugs } from "@/data/products";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Collections",
};

export default function CollectionsPage() {
  return (
    <Container className="py-10 md:py-16">
      <h1 className="font-display text-3xl font-medium tracking-tight">Collections</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">Edits drawn from the catalog — not empty folders.</p>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {collections.map((collection) => {
          const count = getProductsBySlugs(collection.productSlugs).length;
          return (
            <Link
              key={collection.id}
              href={`/collections/${collection.slug}`}
              className="group grid overflow-hidden border border-border bg-card sm:grid-cols-5"
            >
              <div className="relative aspect-[16/10] bg-muted sm:col-span-2 sm:aspect-auto">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="40vw"
                />
              </div>
              <div className="flex flex-col justify-center p-6 sm:col-span-3">
                <h2 className="font-display text-xl font-medium group-hover:text-accent">{collection.name}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{collection.description}</p>
                <p className="mt-4 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{count} pieces</p>
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}
