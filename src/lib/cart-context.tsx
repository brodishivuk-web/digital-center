"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/types";
import { getProductById } from "@/data/products";

const STORAGE_KEY = "digital-center-cart";

interface CartContextValue {
  lines: CartLine[];
  addItem: (productId: string, variantId: string, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isReady: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // localStorage may be unavailable (private mode) - start with an empty cart
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isReady) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, isReady]);

  const addItem = (productId: string, variantId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find(
        (l) => l.productId === productId && l.variantId === variantId
      );
      if (existing) {
        return prev.map((l) =>
          l.productId === productId && l.variantId === variantId
            ? { ...l, quantity: l.quantity + quantity }
            : l
        );
      }
      return [...prev, { productId, variantId, quantity }];
    });
  };

  const removeItem = (productId: string, variantId: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.productId === productId && l.variantId === variantId))
    );
  };

  const updateQuantity = (productId: string, variantId: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, variantId);
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.productId === productId && l.variantId === variantId ? { ...l, quantity } : l
      )
    );
  };

  const clearCart = () => setLines([]);

  const { itemCount, subtotal } = useMemo(() => {
    let count = 0;
    let sum = 0;
    for (const line of lines) {
      const product = getProductById(line.productId);
      if (!product) continue;
      const variant = product.variants.find((v) => v.id === line.variantId);
      const unitPrice = product.price + (variant?.priceDelta ?? 0);
      count += line.quantity;
      sum += unitPrice * line.quantity;
    }
    return { itemCount: count, subtotal: sum };
  }, [lines]);

  return (
    <CartContext.Provider
      value={{ lines, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal, isReady }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
