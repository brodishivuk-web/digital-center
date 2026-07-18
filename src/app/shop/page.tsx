import { Suspense } from "react";
import type { Metadata } from "next";
import { ShopView } from "@/components/ShopView";

export const metadata: Metadata = {
  title: "כל הקורסים | Digital Center",
  description: "עיינו במגוון הקורסים הדיגיטליים שלנו וסננו לפי קטגוריה, מחיר ופופולריות.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-page py-20 text-center text-neutral-400">טוען קורסים...</div>}>
      <ShopView />
    </Suspense>
  );
}
