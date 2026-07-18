import { Suspense } from "react";
import type { Metadata } from "next";
import { OrderConfirmationView } from "@/components/OrderConfirmationView";

export const metadata: Metadata = {
  title: "אישור הזמנה | Digital Center",
};

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationView />
    </Suspense>
  );
}
