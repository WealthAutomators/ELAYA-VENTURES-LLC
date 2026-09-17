import { notFound } from "next/navigation";
import { getCollectionBySlug, getCollectionProducts } from "@/data/collections";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { collections } = await import("@/data/collections");
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };
  return {
    title: collection.name,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getCollectionProducts(slug);

  return (
    <Container className="py-8 md:py-12">
      <h1 className="font-display text-3xl font-medium tracking-tight">{collection.name}</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">{collection.description}</p>
      <p className="mt-1 text-sm text-muted-foreground">{products.length} products</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
