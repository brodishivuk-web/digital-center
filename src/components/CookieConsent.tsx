"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "digital-center-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = window.localStorage.getItem(STORAGE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const respond = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6">
      <div className="container-page">
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand-border bg-white p-5 shadow-2xl sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
              <Cookie size={18} />
            </span>
            <p className="text-sm leading-relaxed text-neutral-600">
              האתר משתמש בעוגיות כדי לשפר את חוויית הגלישה, לזכור את עגלת הקניות שלכם ולנתח שימוש באתר. בהמשך הגלישה אתם
              מסכימים למדיניות הפרטיות שלנו. לפרטים ראו{" "}
              <Link href="/privacy" className="font-semibold text-brand-blue underline">
                מדיניות הפרטיות
              </Link>
              .
            </p>
          </div>
          <div className="flex w-full shrink-0 gap-2 sm:w-auto">
            <button
              type="button"
              onClick={() => respond("rejected")}
              className="flex-1 rounded-full border border-brand-border px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-gray sm:flex-none"
            >
              דחייה
            </button>
            <button
              type="button"
              onClick={() => respond("accepted")}
              className="flex-1 rounded-full bg-brand-blue px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-dark sm:flex-none"
            >
              אישור
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
