"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { getPurchasedProductIds } from "@/lib/purchases";
import { getProductById } from "@/data/products";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/ProductImage";
import type { Product } from "@/lib/types";

export function MyCoursesView() {
  const [status, setStatus] = useState<"checking" | "ready">("checking");
  const [courses, setCourses] = useState<Product[]>([]);

  useEffect(() => {
    const ids = getPurchasedProductIds();
    const owned = ids.map((id) => getProductById(id)).filter((p): p is Product => Boolean(p));
    setCourses(owned);
    setStatus("ready");
  }, []);

  if (status === "checking") return null;

  if (courses.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <GraduationCap size={48} className="text-neutral-300" />
        <h1 className="text-xl font-extrabold text-brand-navy">עדיין לא רכשתם קורסים</h1>
        <p className="max-w-md text-neutral-500">ברגע שתרכשו קורס, הוא יופיע כאן ותקבלו גישה מיידית לתכנים.</p>
        <Link
          href="/shop"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-dark"
        >
          לעיון בקורסים <ArrowLeft size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <h1 className="mb-2 text-2xl font-extrabold text-brand-navy sm:text-3xl">הקורסים שלי</h1>
      <p className="mb-8 text-neutral-500">{courses.length} קורסים בבעלותכם - גישה מיידית וללא הגבלת זמן</p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((product) => {
          const category = getCategory(product.categorySlug);
          return (
            <Link
              key={product.id}
              href={`/learn/${product.slug}`}
              className="group flex gap-4 rounded-2xl border border-brand-border bg-white p-4 transition hover:shadow-lg hover:shadow-brand-blue/10"
            >
              <div className="w-20 shrink-0">
                <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} iconClassName="h-7 w-7" />
              </div>
              <div className="flex flex-1 flex-col justify-center">
                <span className="text-xs font-semibold text-brand-blue">{category?.shortName}</span>
                <h3 className="text-sm font-bold text-brand-navy group-hover:text-brand-blue">{product.name}</h3>
                <span className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-bold text-brand-blue">
                  כניסה לקורס <ArrowLeft size={12} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
