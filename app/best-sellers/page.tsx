import { getBestsellerProducts } from "@/data/products";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/product/product-card";

export const metadata = {
  title: "Best Sellers",
};

export default function BestSellersPage() {
  const products = getBestsellerProducts();

  return (
    <Container className="py-8 md:py-12">
      <h1 className="font-display text-3xl font-medium tracking-tight">Best Sellers</h1>
      <p className="mt-2 text-muted-foreground">Pieces that tend to leave first.</p>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
}
