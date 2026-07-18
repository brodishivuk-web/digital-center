"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { ProductGrid } from "@/components/ProductGrid";
import type { CategorySlug } from "@/lib/types";

type SortOption = "popular" | "price-asc" | "price-desc" | "discount" | "new" | "rating";

const SORT_LABELS: Record<SortOption, string> = {
  popular: "הכי פופולריים",
  new: "חדש ביותר",
  discount: "הנחה הכי גבוהה",
  "price-asc": "מחיר: מהזול ליקר",
  "price-desc": "מחיר: מהיקר לזול",
  rating: "דירוג גבוה",
};

const MAX_PRICE = Math.max(...products.map((p) => p.price));

export function ShopView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialCategory = searchParams.get("category") as CategorySlug | null;
  const initialQuery = searchParams.get("q") ?? "";
  const initialSort = (searchParams.get("sort") as SortOption) ?? "popular";

  const [activeCategory, setActiveCategory] = useState<CategorySlug | "all">(initialCategory ?? "all");
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>(SORT_LABELS[initialSort] ? initialSort : "popular");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const updateCategory = (slug: CategorySlug | "all") => {
    setActiveCategory(slug);
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") params.delete("category");
    else params.set("category", slug);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filtered = useMemo(() => {
    let list = products.filter((p) => p.price <= maxPrice);

    if (activeCategory !== "all") {
      list = list.filter((p) => p.categorySlug === activeCategory);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "discount":
        list = [...list].sort((a, b) => {
          const da = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
          const db = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
          return db - da;
        });
        break;
      case "new":
        list = [...list].sort((a, b) => Number(b.isNew ?? false) - Number(a.isNew ?? false));
        break;
      case "rating":
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      default:
        list = [...list].sort((a, b) => b.studentsCount - a.studentsCount);
    }

    return list;
  }, [activeCategory, query, sort, maxPrice]);

  const activeCategoryName =
    activeCategory === "all" ? "כל הקורסים" : categories.find((c) => c.slug === activeCategory)?.name;

  const FiltersPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-3 text-sm font-bold text-brand-navy">קטגוריות</h3>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => updateCategory("all")}
            className={`rounded-lg px-3 py-2 text-right text-sm font-medium transition ${
              activeCategory === "all" ? "bg-brand-blue-light text-brand-blue" : "text-neutral-600 hover:bg-brand-gray"
            }`}
          >
            כל הקטגוריות
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => updateCategory(c.slug)}
              className={`rounded-lg px-3 py-2 text-right text-sm font-medium transition ${
                activeCategory === c.slug ? "bg-brand-blue-light text-brand-blue" : "text-neutral-600 hover:bg-brand-gray"
              }`}
            >
              {c.shortName}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-bold text-brand-navy">מחיר מקסימלי</h3>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#1B4DFF]"
        />
        <p className="mt-1 text-sm text-neutral-500">עד ₪{maxPrice}</p>
      </div>
    </div>
  );

  return (
    <div className="container-page py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">{activeCategoryName}</h1>
        <p className="mt-1 text-sm text-neutral-500">{filtered.length} קורסים</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5">
          <Search size={16} className="text-neutral-400" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חיפוש לפי שם קורס..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
          />
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-medium outline-none"
        >
          {Object.entries(SORT_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <button
          onClick={() => setFiltersOpen(true)}
          className="flex items-center justify-center gap-2 rounded-full border border-brand-border bg-white px-4 py-2.5 text-sm font-semibold lg:hidden"
        >
          <SlidersHorizontal size={16} /> פילטרים
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block">{FiltersPanel}</aside>

        {filtersOpen && (
          <div className="fixed inset-0 z-[70] flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
            <div className="relative mr-auto flex h-full w-72 flex-col gap-6 overflow-y-auto bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">פילטרים</h2>
                <button onClick={() => setFiltersOpen(false)} aria-label="סגירה">
                  <X size={20} />
                </button>
              </div>
              {FiltersPanel}
              <button
                onClick={() => setFiltersOpen(false)}
                className="mt-auto rounded-full bg-brand-blue py-3 text-sm font-bold text-white"
              >
                הצגת {filtered.length} תוצאות
              </button>
            </div>
          </div>
        )}

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
