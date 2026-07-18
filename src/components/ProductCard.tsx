import Link from "next/link";
import type { Product } from "@/lib/types";
import { ProductImage } from "@/components/ProductImage";
import { StarRating } from "@/components/StarRating";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatPrice } from "@/lib/format";
import { getCategory } from "@/data/categories";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categorySlug);
  const hasDiscount = !!product.originalPrice && product.originalPrice > product.price;
  const discountPct = hasDiscount
    ? Math.round((1 - product.price / (product.originalPrice as number)) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-brand-border bg-white transition-shadow hover:shadow-xl hover:shadow-brand-blue/10">
      <Link href={`/product/${product.slug}`} className="relative block overflow-hidden">
        <div className="overflow-hidden">
          <div className="transition-transform duration-300 group-hover:scale-105">
            <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} className="rounded-none" />
          </div>
        </div>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-white px-2.5 py-1 text-xs font-bold text-brand-blue shadow">חדש</span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-brand-black px-2.5 py-1 text-xs font-bold text-white shadow">
              {discountPct}%- הנחה
            </span>
          )}
        </div>

        <div className="pointer-events-none absolute inset-x-3 bottom-3 flex translate-y-3 justify-center opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="pointer-events-auto">
            <AddToCartButton product={product} variantId={product.variants[0].id} />
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold text-brand-blue">{category?.shortName}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.75rem] text-sm font-bold leading-snug text-brand-navy hover:text-brand-blue">
            {product.name}
          </h3>
        </Link>
        <StarRating rating={product.rating} reviewsCount={product.reviewsCount} size={13} />
        <div className="mt-auto flex items-baseline gap-2 pt-1">
          <span className="text-lg font-extrabold text-brand-navy">{formatPrice(product.price)}</span>
          {hasDiscount && (
            <span className="text-sm text-neutral-400 line-through">{formatPrice(product.originalPrice as number)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
