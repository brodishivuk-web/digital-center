import type { Metadata } from "next";
import { CartView } from "@/components/CartView";

export const metadata: Metadata = {
  title: "עגלת קניות | Digital Center",
};

export default function CartPage() {
  return <CartView />;
}
