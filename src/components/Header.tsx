"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, ShoppingCart, Menu, X, Zap, GraduationCap, Bot } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/data/categories";

export function Header() {
  const { itemCount } = useCart();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : "/shop");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-border bg-white/95 backdrop-blur">
      <div className="container-page flex h-16 items-center gap-4">
        <button
          type="button"
          className="-mr-1 p-2 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="פתיחת תפריט"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-blue text-white">
            <Zap size={18} fill="currentColor" />
          </span>
          <span className="text-lg font-extrabold leading-none text-brand-navy">
            Digital Center
            <span className="block text-[11px] font-medium text-brand-blue">דיגיטל סנטר</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-semibold text-brand-navy md:flex">
          <Link href="/shop" className="transition hover:text-brand-blue">
            כל הקורסים
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/shop?category=${c.slug}`}
              className="whitespace-nowrap transition hover:text-brand-blue"
            >
              {c.shortName}
            </Link>
          ))}
          <Link href="/ads-agent" className="flex items-center gap-1 whitespace-nowrap transition hover:text-brand-blue">
            <Bot size={16} /> סוכן פרסום
          </Link>
        </nav>

        <form onSubmit={handleSearch} className="mr-auto hidden max-w-xs flex-1 items-center md:flex">
          <div className="flex w-full items-center gap-2 rounded-full border border-brand-border bg-brand-gray px-4 py-2">
            <Search size={16} className="text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש קורסים..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>
        </form>

        <Link
          href="/my-courses"
          className="hidden shrink-0 items-center gap-1.5 rounded-full p-2 text-sm font-semibold text-brand-navy transition hover:bg-brand-gray sm:flex"
          aria-label="הקורסים שלי"
        >
          <GraduationCap size={20} />
          <span className="hidden lg:inline">הקורסים שלי</span>
        </Link>

        <Link
          href="/cart"
          className="relative flex shrink-0 items-center gap-2 rounded-full p-2 transition hover:bg-brand-gray md:mr-0"
          aria-label="עגלת קניות"
        >
          <ShoppingCart size={22} className="text-brand-navy" />
          {itemCount > 0 && (
            <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-blue px-1 text-[11px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </Link>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-border bg-white p-4 md:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-full border border-brand-border bg-brand-gray px-4 py-2">
            <Search size={16} className="text-neutral-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="חיפוש קורסים..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </form>
          <nav className="flex flex-col gap-1 text-sm font-semibold text-brand-navy">
            <Link href="/shop" className="rounded-lg px-2 py-2.5 hover:bg-brand-gray" onClick={() => setMenuOpen(false)}>
              כל הקורסים
            </Link>
            <Link
              href="/my-courses"
              className="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-brand-gray"
              onClick={() => setMenuOpen(false)}
            >
              <GraduationCap size={16} /> הקורסים שלי
            </Link>
            <Link
              href="/ads-agent"
              className="flex items-center gap-2 rounded-lg px-2 py-2.5 hover:bg-brand-gray"
              onClick={() => setMenuOpen(false)}
            >
              <Bot size={16} /> סוכן פרסום AI
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="rounded-lg px-2 py-2.5 hover:bg-brand-gray"
                onClick={() => setMenuOpen(false)}
              >
                {c.shortName}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
