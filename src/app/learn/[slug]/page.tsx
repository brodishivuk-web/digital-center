import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/data/products";
import { getCourseContent } from "@/data/lessons";
import { LearnView } from "@/components/LearnView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: `${product.name} - אזור למידה | Digital Center` };
}

export default async function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  const modules = getCourseContent(slug);
  if (!product || !modules) notFound();

  return <LearnView product={product} modules={modules} />;
}
