import type { Metadata } from "next";
import { CheckoutView } from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "תשלום | Digital Center",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
