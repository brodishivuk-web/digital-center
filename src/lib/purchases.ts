"use client";

const STORAGE_KEY = "digital-center-purchased-courses";

export function getPurchasedProductIds(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addPurchasedProductIds(productIds: string[]) {
  try {
    const existing = new Set(getPurchasedProductIds());
    productIds.forEach((id) => existing.add(id));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(existing)));
  } catch {
    // localStorage may be unavailable (private mode) - purchase record simply won't persist
  }
}

export function hasPurchased(productId: string): boolean {
  return getPurchasedProductIds().includes(productId);
}
