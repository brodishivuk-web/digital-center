"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingCart, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/format";

export function ProductVariantSelector({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [variantId, setVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  const unitPrice = product.price + variant.priceDelta;
  const originalUnitPrice = product.originalPrice ? product.originalPrice + variant.priceDelta : undefined;

  const handleAdd = () => {
    addItem(product.id, variantId, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-brand-navy">{formatPrice(unitPrice)}</span>
        {originalUnitPrice && originalUnitPrice > unitPrice && (
          <span className="text-lg text-neutral-400 line-through">{formatPrice(originalUnitPrice)}</span>
        )}
      </div>

      <div>
        <h3 className="mb-2 text-sm font-bold text-brand-navy">סוג גישה</h3>
        <div className="flex flex-col gap-2 sm:flex-row">
          {product.variants.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariantId(v.id)}
              className={`flex-1 rounded-xl border p-3.5 text-right transition ${
                variantId === v.id
                  ? "border-brand-blue bg-brand-blue-light"
                  : "border-brand-border bg-white hover:border-brand-blue/50"
              }`}
            >
              <span className="block text-sm font-bold text-brand-navy">{v.name}</span>
              <span className="mt-0.5 block text-xs text-neutral-500">{v.description}</span>
              {v.priceDelta > 0 && (
                <span className="mt-1 block text-xs font-semibold text-brand-blue">
                  {"+"}
                  {formatPrice(v.priceDelta)}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <h3 className="text-sm font-bold text-brand-navy">כמות</h3>
        <div className="flex items-center gap-3 rounded-full border border-brand-border px-2 py-1.5">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-brand-gray"
            aria-label="הפחתת כמות"
          >
            <Minus size={14} />
          </button>
          <span className="w-6 text-center text-sm font-bold">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
            className="flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-brand-gray"
            aria-label="הוספת כמות"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="text-xs text-neutral-500">{product.stock} מקומות פנויים</span>
      </div>

      <button
        onClick={handleAdd}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue py-4 text-base font-extrabold text-white shadow-lg shadow-brand-blue/20 transition hover:bg-brand-blue-dark active:scale-[0.98]"
      >
        {justAdded ? (
          <>
            <Check size={18} /> נוסף לסל בהצלחה
          </>
        ) : (
          <>
            <ShoppingCart size={18} /> הוסיפו לסל - {formatPrice(unitPrice * quantity)}
          </>
        )}
      </button>
    </div>
  );
}
