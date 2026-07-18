import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/shop?category=${category.slug}`}
          className={`group relative flex min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-6 text-white shadow-lg transition-transform hover:-translate-y-1 ${category.gradient}`}
        >
          <div
            className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 15%, rgba(255,255,255,0.6) 0, transparent 45%)",
            }}
          />
          <CategoryIcon icon={category.icon} className="relative h-9 w-9 text-white" strokeWidth={1.5} />
          <div className="relative">
            <h3 className="text-lg font-extrabold leading-tight">{category.shortName}</h3>
            <p className="mt-1.5 text-sm text-white/85">{category.tagline}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold">
              לכל הקורסים
              <ArrowLeft size={16} />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
