import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/container";

export const metadata = {
  title: "Categories",
};

export default function CategoriesPage() {
  return (
    <Container className="py-10 md:py-16">
      <h1 className="font-display text-3xl font-medium tracking-tight">Categories</h1>
      <p className="mt-2 max-w-xl text-muted-foreground">Home, kitchen, work, travel, and the quieter pieces in between.</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group overflow-hidden border border-border bg-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
            <div className="p-5">
              <h2 className="font-display text-lg font-medium group-hover:text-accent">{category.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{category.description}</p>
              <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{category.productCount} products</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
