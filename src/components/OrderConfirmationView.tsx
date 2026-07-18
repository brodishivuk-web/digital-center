"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Mail, Zap, ArrowLeft, GraduationCap } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { getProductById } from "@/data/products";
import type { Order } from "@/lib/types";

const LAST_ORDER_KEY = "digital-center-last-order";

export function OrderConfirmationView() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order");
  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(LAST_ORDER_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Order;
        if (!orderNumber || saved.orderNumber === orderNumber) {
          setOrder(saved);
          return;
        }
      }
    } catch {
      // ignore malformed localStorage content
    }
    setOrder(null);
  }, [orderNumber]);

  if (order === undefined) return null;

  if (!order) {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <CheckCircle2 size={48} className="text-brand-blue" />
        <h1 className="text-xl font-extrabold text-brand-navy">ההזמנה התקבלה בהצלחה</h1>
        <p className="max-w-md text-neutral-500">
          {orderNumber ? `מספר הזמנה ${orderNumber}. ` : ""}
          פרטי ההזמנה המלאים נשלחו לכתובת המייל שלכם.
        </p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <Link href="/my-courses" className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white">
            לקורסים שלי <GraduationCap size={16} />
          </Link>
          <Link href="/shop" className="inline-flex items-center gap-2 rounded-full border border-brand-border px-6 py-3 text-sm font-bold text-brand-navy">
            המשך לחנות <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <div className="mx-auto max-w-2xl text-center">
        <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
          <CheckCircle2 size={32} />
        </span>
        <h1 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">ההזמנה אושרה בהצלחה!</h1>
        <p className="mt-2 text-neutral-500">תודה, {order.customer.fullName}. שלחנו אישור הזמנה לכתובת {order.customer.email}</p>

        <div className="mt-8 rounded-2xl border border-brand-border bg-white p-6 text-right">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-brand-border pb-4">
            <div>
              <p className="text-xs text-neutral-500">מספר הזמנה</p>
              <p className="font-mono text-lg font-bold text-brand-navy">{order.orderNumber}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-brand-blue-light px-4 py-2 text-sm font-bold text-brand-blue">
              <Zap size={16} /> גישה מיידית
            </div>
          </div>

          <div className="flex flex-col gap-3 border-b border-brand-border py-4">
            {order.lines.map((line) => {
              const product = getProductById(line.productId);
              return (
                <div key={`${line.productId}-${line.variantId}`} className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-neutral-600">
                    {line.productName} <span className="text-neutral-400">({line.variantName}) x{line.quantity}</span>
                  </span>
                  <div className="flex items-center justify-between gap-3 sm:justify-end">
                    <span className="text-sm font-semibold text-brand-navy">{formatPrice(line.unitPrice * line.quantity)}</span>
                    {product && (
                      <Link
                        href={`/learn/${product.slug}`}
                        className="inline-flex items-center gap-1 rounded-full bg-brand-blue-light px-3 py-1.5 text-xs font-bold text-brand-blue transition hover:bg-brand-blue hover:text-white"
                      >
                        <GraduationCap size={14} /> התחילו ללמוד
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-4 text-base font-extrabold text-brand-navy">
            <span>סה&quot;כ שולם</span>
            <span>{formatPrice(order.total)}</span>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-neutral-500">
          <Mail size={16} /> אישור מפורט ופרטי גישה נשלחו לתיבת המייל שלכם
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/my-courses"
            className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-dark"
          >
            למעבר לקורסים שלי <GraduationCap size={16} />
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-full border border-brand-border px-6 py-3 text-sm font-bold text-brand-navy transition hover:bg-brand-gray"
          >
            המשך לקורסים נוספים <ArrowLeft size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
