"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  variantId,
  quantity = 1,
  className = "",
  full = false,
}: {
  product: Product;
  variantId: string;
  quantity?: number;
  className?: string;
  full?: boolean;
}) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, variantId, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-dark active:scale-95 ${
        full ? "w-full" : ""
      } ${className}`}
    >
      {justAdded ? (
        <>
          <Check size={16} /> נוסף לסל
        </>
      ) : (
        <>
          <ShoppingCart size={16} /> הוסיפו לסל
        </>
      )}
    </button>
  );
}
