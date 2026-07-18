import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, Clock, PlayCircle, BarChart3 } from "lucide-react";
import { getProduct, getRelatedProducts, products } from "@/data/products";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/ProductImage";
import { StarRating } from "@/components/StarRating";
import { ProductVariantSelector } from "@/components/ProductVariantSelector";
import { ProductGrid } from "@/components/ProductGrid";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} | Digital Center`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categorySlug);
  const related = getRelatedProducts(product);

  return (
    <div className="container-page py-10">
      <nav className="mb-6 text-sm text-neutral-500">
        <span>{category?.name}</span>
        <span className="mx-2">/</span>
        <span className="text-brand-navy">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} iconClassName="h-16 w-16" />
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="opacity-70">
                <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} iconClassName="h-6 w-6" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <span className="text-sm font-semibold text-brand-blue">{category?.shortName}</span>
            <h1 className="mt-1 text-2xl font-extrabold leading-tight text-brand-navy sm:text-3xl">{product.name}</h1>
          </div>

          <StarRating rating={product.rating} reviewsCount={product.reviewsCount} />

          <p className="leading-relaxed text-neutral-600">{product.description}</p>

          <div className="flex flex-wrap gap-4 border-y border-brand-border py-4 text-sm text-neutral-600">
            <span className="flex items-center gap-1.5">
              <Clock size={16} className="text-brand-blue" /> {product.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <PlayCircle size={16} className="text-brand-blue" /> {product.lessonsCount} שיעורים
            </span>
            <span className="flex items-center gap-1.5">
              <BarChart3 size={16} className="text-brand-blue" /> רמה: {product.level}
            </span>
          </div>

          <ProductVariantSelector product={product} />
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-extrabold text-brand-navy">מה תלמדו בקורס</h2>
          <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-neutral-600">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-brand-blue" />
                {h}
              </li>
            ))}
          </ul>

          <h2 className="mb-4 text-xl font-extrabold text-brand-navy">תוכנית הלימודים</h2>
          <div className="flex flex-col gap-3">
            {product.syllabus.map((module, i) => (
              <div key={module.title} className="rounded-xl border border-brand-border p-4">
                <h3 className="mb-2 text-sm font-bold text-brand-navy">
                  פרק {i + 1}: {module.title}
                </h3>
                <ul className="flex flex-col gap-1.5">
                  {module.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral-600">
                      <PlayCircle size={14} className="shrink-0 text-neutral-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-xl font-extrabold text-brand-navy">מפרט הקורס</h2>
          <dl className="divide-y divide-brand-border rounded-xl border border-brand-border">
            {[
              ["קטגוריה", category?.name ?? ""],
              ["רמה", product.level],
              ["משך זמן", product.duration],
              ["מספר שיעורים", `${product.lessonsCount} שיעורים`],
              ["תלמידים", `${product.studentsCount.toLocaleString("he-IL")}`],
              ["דירוג", `${product.rating} מתוך 5`],
              ["גישה", "מיידית לאחר התשלום"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between px-4 py-3 text-sm">
                <dt className="text-neutral-500">{label}</dt>
                <dd className="font-semibold text-brand-navy">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-extrabold text-brand-navy">קורסים דומים שיכולים לעניין אתכם</h2>
          <ProductGrid products={related} />
        </div>
      )}
    </div>
  );
}
