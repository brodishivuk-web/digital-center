"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Zap, ShieldCheck, ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getProductById } from "@/data/products";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/lib/types";

const LAST_ORDER_KEY = "digital-center-last-order";

export function CheckoutView() {
  const { lines, subtotal, clearCart, isReady } = useCart();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (isReady && lines.length === 0) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <h1 className="text-xl font-extrabold text-brand-navy">אין פריטים בעגלה</h1>
        <p className="text-neutral-500">הוסיפו קורסים לעגלה כדי להמשיך לתשלום</p>
        <Link href="/shop" className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white">
          למעבר לחנות <ArrowLeft size={16} />
        </Link>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (cardNumber.replace(/\s/g, "").length < 12 || cardExpiry.length < 4 || cardCvc.length < 3) {
      setError("פרטי כרטיס האשראי אינם תקינים");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { fullName, phone, email, address },
          lines: lines.map((l) => ({ productId: l.productId, variantId: l.variantId, quantity: l.quantity })),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "אירעה שגיאה, נסו שוב");
        setSubmitting(false);
        return;
      }

      const order = data.order as Order;
      window.localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
      clearCart();
      router.push(`/order-confirmation?order=${order.orderNumber}`);
    } catch {
      setError("אירעה שגיאה בתקשורת עם השרת, נסו שוב");
      setSubmitting(false);
    }
  };

  return (
    <div className="container-page py-10">
      <h1 className="mb-8 text-2xl font-extrabold text-brand-navy sm:text-3xl">מעבר לתשלום</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-8">
          <section className="rounded-2xl border border-brand-border bg-white p-6">
            <h2 className="mb-4 text-lg font-extrabold text-brand-navy">פרטי לקוח</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                שם מלא
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 outline-none focus:border-brand-blue"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                טלפון
                <input
                  required
                  type="tel"
                  dir="ltr"
                  placeholder="050-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 text-right outline-none focus:border-brand-blue"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                דוא&quot;ל
                <input
                  required
                  type="email"
                  dir="ltr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 text-right outline-none focus:border-brand-blue"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                כתובת
                <input
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 outline-none focus:border-brand-blue"
                />
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
              <CreditCard size={20} className="text-brand-blue" /> אמצעי תשלום
            </h2>
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-brand-blue bg-brand-blue-light px-4 py-3 text-sm font-bold text-brand-blue">
              <CreditCard size={16} /> כרטיס אשראי
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm sm:col-span-2">
                מספר כרטיס
                <input
                  required
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  maxLength={19}
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value.replace(/[^\d\s]/g, ""))}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 outline-none focus:border-brand-blue"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                תוקף (MM/YY)
                <input
                  required
                  dir="ltr"
                  placeholder="12/28"
                  maxLength={5}
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(e.target.value.replace(/[^\d/]/g, ""))}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 outline-none focus:border-brand-blue"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                CVV
                <input
                  required
                  dir="ltr"
                  inputMode="numeric"
                  maxLength={4}
                  value={cardCvc}
                  onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ""))}
                  className="rounded-lg border border-brand-border px-3.5 py-2.5 outline-none focus:border-brand-blue"
                />
              </label>
            </div>
            <p className="mt-3 flex items-center gap-1.5 text-xs text-neutral-500">
              <ShieldCheck size={14} className="text-brand-blue" /> פרטי האשראי מוצפנים ואינם נשמרים במערכת
            </p>
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-6">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
              <Zap size={20} className="text-brand-blue" /> שיטת אספקה
            </h2>
            <div className="flex items-center gap-2 rounded-lg border border-brand-blue bg-brand-blue-light px-4 py-3 text-sm font-bold text-brand-blue">
              גישה דיגיטלית מיידית - זמינה מיד לאחר אישור התשלום
            </div>
          </section>
        </div>

        <div className="h-fit rounded-2xl border border-brand-border bg-white p-6">
          <h2 className="mb-4 text-lg font-extrabold text-brand-navy">סיכום הזמנה</h2>
          <div className="flex flex-col gap-3 border-b border-brand-border pb-4">
            {lines.map((line) => {
              const product = getProductById(line.productId);
              if (!product) return null;
              const variant = product.variants.find((v) => v.id === line.variantId) ?? product.variants[0];
              return (
                <div key={`${line.productId}-${line.variantId}`} className="flex justify-between text-sm">
                  <span className="text-neutral-600">
                    {product.name} <span className="text-neutral-400">x{line.quantity}</span>
                  </span>
                  <span className="font-semibold text-brand-navy">
                    {formatPrice((product.price + variant.priceDelta) * line.quantity)}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between py-4 text-base font-extrabold text-brand-navy">
            <span>סה&quot;כ לתשלום</span>
            <span>{formatPrice(subtotal)}</span>
          </div>

          {error && <p className="mb-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue py-3.5 text-sm font-extrabold text-white transition hover:bg-brand-blue-dark disabled:opacity-60"
          >
            {submitting ? "מעבד הזמנה..." : "אישור ותשלום"}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-400">
            בלחיצה על אישור ותשלום אתם מסכימים ל
            <Link href="/terms" className="font-semibold text-brand-blue">
              {" "}
              תקנון האתר{" "}
            </Link>
            ול
            <Link href="/returns" className="font-semibold text-brand-blue">
              {" "}
              מדיניות ביטולים{" "}
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
