import Link from "next/link";
import { Mail, Zap, ShieldCheck, CreditCard, Clock3 } from "lucide-react";
import { categories } from "@/data/categories";
import { storeEmail } from "@/lib/email";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-brand-border bg-brand-navy text-white">
      <div className="border-b border-white/10">
        <div className="container-page grid grid-cols-1 gap-6 py-8 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <ShieldCheck size={22} className="text-brand-blue" />
            <div>
              <p className="text-sm font-bold">תשלום מאובטח</p>
              <p className="text-xs text-white/60">בכרטיס אשראי</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock3 size={22} className="text-brand-blue" />
            <div>
              <p className="text-sm font-bold">גישה מיידית</p>
              <p className="text-xs text-white/60">מתחילים ללמוד תוך דקות</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard size={22} className="text-brand-blue" />
            <div>
              <p className="text-sm font-bold">מחירים לכל כיס</p>
              <p className="text-xs text-white/60">קורסים קצרים וישירים לעניין</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="mb-3 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue">
              <Zap size={16} fill="currentColor" />
            </span>
            <span className="text-base font-extrabold">Digital Center</span>
          </Link>
          <p className="text-sm leading-relaxed text-white/60">
            קורסים דיגיטלים מעולם השיווק בדיגיטל - קצרים, ישירים לעניין, ובמחיר שמתאים לכל כיס.
          </p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">קטגוריות</h4>
          <ul className="space-y-2 text-sm text-white/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="transition hover:text-white">
                  {c.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">מידע משפטי</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link href="/terms" className="transition hover:text-white">
                תקנון האתר ותנאי מכירה
              </Link>
            </li>
            <li>
              <Link href="/returns" className="transition hover:text-white">
                מדיניות ביטולים והחזרות
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                מדיניות פרטיות
              </Link>
            </li>
            <li>
              <Link href="/accessibility" className="transition hover:text-white">
                הצהרת נגישות
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-bold">יצירת קשר</h4>
          <a href={`mailto:${storeEmail}`} className="flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
            <Mail size={16} />
            {storeEmail}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-5">
        <p className="container-page text-center text-xs text-white/50">
          © {new Date().getFullYear()} Digital Center - דיגיטל סנטר. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
