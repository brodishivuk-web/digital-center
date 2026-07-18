"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/data/products";
import { getCategory } from "@/data/categories";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";

export function CartView() {
  const { lines, updateQuantity, removeItem, subtotal, isReady } = useCart();

  if (isReady && lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <ShoppingBag size={48} className="text-neutral-300" />
        <h1 className="text-xl font-extrabold text-brand-navy">העגלה שלכם ריקה</h1>
        <p className="text-neutral-500">לא נורא, יש לנו הרבה קורסים מעולים שמחכים לכם</p>
        <Link
          href="/shop"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-dark"
        >
          למעבר לחנות <ArrowLeft size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-2xl font-extrabold text-brand-navy sm:text-3xl">עגלת קניות</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-4">
          {lines.map((line) => {
            const product = getProductById(line.productId);
            if (!product) return null;
            const variant = product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
            const unitPrice = product.price + variant.priceDelta;
            const category = getCategory(product.categorySlug);

            return (
              <div
                key={`${line.productId}-${line.variantId}`}
                className="flex gap-4 rounded-2xl border border-brand-border bg-white p-4"
              >
                <div className="w-24 shrink-0 sm:w-28">
                  <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} iconClassName="h-8 w-8" />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-blue">{category?.shortName}</span>
                    <Link href={`/product/${product.slug}`} className="mt-0.5 block text-sm font-bold text-brand-navy hover:text-brand-blue">
                      {product.name}
                    </Link>
                    <span className="mt-1 block text-xs text-neutral-500">{variant.name}</span>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-brand-border px-2 py-1">
                      <button
                        onClick={() => updateQuantity(line.productId, line.variantId, line.quantity - 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-brand-gray"
                        aria-label="הפחתת כמות"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-5 text-center text-sm font-bold">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line.productId, line.variantId, line.quantity + 1)}
                        className="flex h-6 w-6 items-center justify-center rounded-full transition hover:bg-brand-gray"
                        aria-label="הוספת כמות"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <span className="font-extrabold text-brand-navy">{formatPrice(unitPrice * line.quantity)}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeItem(line.productId, line.variantId)}
                  className="self-start p-1.5 text-neutral-400 transition hover:text-red-500"
                  aria-label="הסרה מהעגלה"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            );
          })}
        </div>

        <div className="h-fit rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 text-lg font-extrabold text-brand-navy">סיכום הזמנה</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-neutral-600">
              <span>סכום ביניים</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>משלוח</span>
              <span className="font-semibold text-brand-blue">מיידי - ללא עלות</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-brand-border pt-4 text-base font-extrabold text-brand-navy">
            <span>סה&quot;כ לתשלום</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          <Link
            href="/checkout"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-blue-dark active:scale-[0.98]"
          >
            מעבר לתשלום <ArrowLeft size={16} />
          </Link>

          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-neutral-500">
            <ShieldCheck size={14} className="text-brand-blue" /> תשלום מאובטח בכרטיס אשראי
          </p>
        </div>
      </div>
    </div>
  );
}
