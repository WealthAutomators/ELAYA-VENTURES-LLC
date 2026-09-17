"use client";

import { memo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/types";
import { formatPrice, calculateDiscount } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui/star-rating";
import { QuickViewModal } from "@/components/product/quick-view-modal";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = memo(function ProductCard({ product, className }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const reduceMotion = useReducedMotion();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const discountPercent = hasDiscount ? calculateDiscount(product.price, product.salePrice!) : 0;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <>
      <motion.div
        className={cn("group relative flex flex-col", className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <div className="relative aspect-[4/5] overflow-hidden border border-border bg-muted">
          <Link href={`/product/${product.slug}`} className="relative block h-full w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              loading="lazy"
              className={cn(
                "object-cover transition-opacity duration-500",
                isHovered && product.images[1] ? "opacity-0" : "opacity-100"
              )}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                loading="lazy"
                className={cn(
                  "object-cover transition-opacity duration-500",
                  isHovered ? "opacity-100" : "opacity-0"
                )}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            )}
          </Link>

          {hasDiscount && (
            <Badge variant="sale" className="absolute left-3 top-3">
              −{discountPercent}%
            </Badge>
          )}
          {product.badge && !hasDiscount && (
            <Badge variant="secondary" className="absolute left-3 top-3">
              {product.badge}
            </Badge>
          )}
          {product.newArrival && !hasDiscount && !product.badge && (
            <Badge variant="secondary" className="absolute left-3 top-3">
              New
            </Badge>
          )}

          <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:transition-opacity sm:duration-300 sm:group-hover:opacity-100">
            <Button
              variant="secondary"
              size="icon"
              className="h-9 w-9"
              onClick={() => toggleWishlist(product.id)}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", inWishlist && "fill-accent text-accent")} strokeWidth={1.5} />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="hidden h-9 w-9 sm:inline-flex"
              onClick={() => setQuickViewOpen(true)}
              aria-label="Quick view"
            >
              <Eye className="h-4 w-4" strokeWidth={1.5} />
            </Button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-100 transition-opacity duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
            <Button
              className="w-full"
              size="sm"
              onClick={handleAddToCart}
            >
              {added ? (
                <>
                  <Check className="h-4 w-4" />
                  Added
                </>
              ) : (
                <>
                  <ShoppingBag className="h-4 w-4" strokeWidth={1.5} />
                  Add
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-3.5 flex flex-1 flex-col gap-1">
          <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{product.category}</p>
          <Link href={`/product/${product.slug}`}>
            <h3 className="text-sm font-medium leading-snug text-foreground transition-colors hover:text-accent line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <StarRating rating={product.rating} reviews={product.reviews} />
          <div className="mt-auto flex items-center gap-2 pt-1">
            {hasDiscount ? (
              <>
                <span className="text-sm font-medium text-foreground">{formatPrice(product.salePrice!)}</span>
                <span className="text-sm text-muted-foreground line-through">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-foreground">{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickViewOpen} onOpenChange={setQuickViewOpen} />
    </>
  );
});
