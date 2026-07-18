"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, GraduationCap, ArrowLeft, CheckCircle2, Lightbulb, ClipboardList } from "lucide-react";
import type { Product } from "@/lib/types";
import type { CourseModuleContent } from "@/data/lessons";
import { hasPurchased } from "@/lib/purchases";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/ProductImage";
import { LessonVisual } from "@/components/LessonVisual";

export function LearnView({ product, modules }: { product: Product; modules: CourseModuleContent[] }) {
  const [status, setStatus] = useState<"checking" | "locked" | "unlocked">("checking");
  const category = getCategory(product.categorySlug);

  useEffect(() => {
    setStatus(hasPurchased(product.id) ? "unlocked" : "locked");
  }, [product.id]);

  if (status === "checking") return null;

  if (status === "locked") {
    return (
      <div className="container-page flex flex-col items-center gap-4 py-24 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue">
          <Lock size={28} />
        </span>
        <h1 className="text-xl font-extrabold text-brand-navy">הגישה לקורס נעולה</h1>
        <p className="max-w-md text-neutral-500">
          כדי לצפות בתכני הקורס &quot;{product.name}&quot; יש לרכוש אותו קודם. הגישה ניתנת באופן מיידי לאחר התשלום.
        </p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-blue-dark"
        >
          למעבר לרכישת הקורס <ArrowLeft size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border border-brand-border bg-white p-6 text-center sm:flex-row sm:text-right">
        <div className="w-20 shrink-0">
          <ProductImage categorySlug={product.categorySlug} gradient={product.gradient} iconClassName="h-7 w-7" />
        </div>
        <div>
          <span className="text-xs font-semibold text-brand-blue">{category?.shortName}</span>
          <h1 className="text-xl font-extrabold text-brand-navy sm:text-2xl">{product.name}</h1>
          <p className="mt-1 flex items-center justify-center gap-1.5 text-sm font-semibold text-brand-blue sm:justify-start">
            <GraduationCap size={16} /> יש לכם גישה מלאה לקורס
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        {modules.map((module, mi) => (
          <div key={module.title}>
            <h2 className="mb-5 flex items-center gap-2 text-lg font-extrabold text-brand-navy">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-blue text-xs font-bold text-white">
                {mi + 1}
              </span>
              {module.title}
            </h2>

            <div className="mb-6 rounded-2xl border border-brand-border bg-white p-5 sm:p-6">
              <LessonVisual visual={module.visual} />
            </div>

            <div className="flex flex-col gap-4">
              {module.lessons.map((lesson) => (
                <div key={lesson.title} className="rounded-2xl border border-brand-border bg-white p-5">
                  <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-brand-navy">
                    <CheckCircle2 size={16} className="shrink-0 text-brand-blue" />
                    {lesson.title}
                  </h3>
                  <div className="flex flex-col gap-2 text-sm leading-relaxed text-neutral-600">
                    {lesson.body.map((paragraph, pi) => (
                      <p key={pi}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-brand-border bg-brand-gray p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-brand-navy">
                      <Lightbulb size={14} className="text-brand-blue" /> {lesson.example.label}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {lesson.example.content.map((line, li) => (
                        <li key={li} className="text-xs leading-relaxed text-neutral-600">
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-3 rounded-xl border border-brand-blue/30 bg-brand-blue-light p-4">
                    <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-brand-blue">
                      <ClipboardList size={14} /> {lesson.exercise.title}
                    </p>
                    <ol className="flex flex-col gap-1.5">
                      {lesson.exercise.steps.map((step, si) => (
                        <li key={si} className="flex items-start gap-2 text-xs leading-relaxed text-brand-navy">
                          <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-blue text-[10px] font-bold text-white">
                            {si + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl justify-center">
        <Link
          href="/my-courses"
          className="inline-flex items-center gap-2 rounded-full border border-brand-border px-6 py-3 text-sm font-bold text-brand-navy transition hover:bg-brand-gray"
        >
          חזרה לקורסים שלי <ArrowLeft size={16} />
        </Link>
      </div>
    </div>
  );
}
