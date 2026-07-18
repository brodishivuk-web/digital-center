import Link from "next/link";
import { ArrowLeft, Flame } from "lucide-react";
import { Hero } from "@/components/Hero";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductGrid } from "@/components/ProductGrid";
import { Testimonials } from "@/components/Testimonials";
import { Newsletter } from "@/components/Newsletter";
import { products } from "@/data/products";

export default function Home() {
  const newProducts = products.filter((p) => p.isNew).slice(0, 4);
  const dealProducts = products
    .filter((p) => p.originalPrice)
    .sort((a, b) => (b.originalPrice! - b.price) / b.price - (a.originalPrice! - a.price) / a.price)
    .slice(0, 4);

  return (
    <div>
      <Hero />

      <section className="container-page py-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">קטגוריות הקורסים</h2>
          <p className="mt-2 text-neutral-500">בחרו את התחום שהכי מדבר אליכם והתחילו ללמוד היום</p>
        </div>
        <CategoryGrid />
      </section>

      {newProducts.length > 0 && (
        <section className="container-page py-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">קורסים חדשים</h2>
              <p className="mt-2 text-neutral-500">התוכן העדכני ביותר שלנו</p>
            </div>
            <Link href="/shop" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-brand-blue sm:flex">
              לכל הקורסים <ArrowLeft size={16} />
            </Link>
          </div>
          <ProductGrid products={newProducts} />
        </section>
      )}

      {dealProducts.length > 0 && (
        <section className="bg-brand-gray py-8">
          <div className="container-page">
            <div className="mb-6 flex items-end justify-between">
              <div>
                <h2 className="flex items-center gap-2 text-2xl font-extrabold text-brand-navy sm:text-3xl">
                  <Flame className="text-brand-blue" /> מבצעים חמים
                </h2>
                <p className="mt-2 text-neutral-500">הזדמנות להתחיל עם ההנחה הכי גבוהה שיש</p>
              </div>
              <Link href="/shop?sort=discount" className="hidden shrink-0 items-center gap-1 text-sm font-bold text-brand-blue sm:flex">
                לכל המבצעים <ArrowLeft size={16} />
              </Link>
            </div>
            <ProductGrid products={dealProducts} />
          </div>
        </section>
      )}

      <Testimonials />
      <Newsletter />
    </div>
  );
}
