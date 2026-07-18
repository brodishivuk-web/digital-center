export type CategorySlug =
  | "paid-marketing"
  | "organic-social"
  | "seo"
  | "ai-tools"
  | "video-editing";

export interface Category {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  icon: string;
  gradient: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categorySlug: CategorySlug;
  price: number;
  originalPrice?: number;
  stock: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  level: "מתחילים" | "בינוני" | "כל הרמות";
  isNew?: boolean;
  shortDescription: string;
  description: string;
  highlights: string[];
  syllabus: { title: string; items: string[] }[];
  variants: ProductVariant[];
  gradient: string;
}

export interface CartLine {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  initials: string;
}

export type PaymentMethod = "credit";
export type ShippingMethod = "instant";

export interface CustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

export interface OrderLine {
  productId: string;
  productName: string;
  variantId: string;
  variantName: string;
  quantity: number;
  unitPrice: number;
}

export type OrderStatus = "pending" | "paid" | "fulfilled" | "cancelled";

export interface Order {
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  shippingMethod: ShippingMethod;
  lines: OrderLine[];
  subtotal: number;
  discount: number;
  total: number;
  couponCode?: string;
}
