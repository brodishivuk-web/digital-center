"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, GraduationCap, ArrowLeft, CheckCircle2, ClipboardList, Rocket, Target, Wrench, AlertTriangle, Sparkles } from "lucide-react";
import type { Product } from "@/lib/types";
import type { CourseContent } from "@/data/lessons";
import { hasPurchased } from "@/lib/purchases";
import { getCategory } from "@/data/categories";
import { ProductImage } from "@/components/ProductImage";
import { LessonVisual } from "@/components/LessonVisual";
import { LessonExampleVisual } from "@/components/LessonExampleVisual";

export function LearnView({ product, content }: { product: Product; content: CourseContent }) {
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

  let lessonSeed = 0;

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

      <div className="mx-auto mb-12 flex max-w-3xl flex-col gap-6 rounded-2xl border border-brand-border bg-gradient-to-br from-brand-navy to-brand-blue-dark p-6 text-white sm:p-8">
        <div className="flex items-center gap-2 text-sm font-extrabold text-brand-blue">
          <Rocket size={18} /> ברוכים הבאים לקורס
        </div>
        <div className="flex flex-col gap-3 text-sm leading-relaxed text-white/85">
          {content.intro.welcome.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-white/15 pt-5 sm:grid-cols-2">
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-white">
              <Target size={14} className="text-brand-blue" /> מה תקבלו עד סוף הקורס
            </p>
            <ul className="flex flex-col gap-1.5">
              {content.intro.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-white/80">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-brand-blue" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-white">
              <Wrench size={14} className="text-brand-blue" /> מה תצטרכו כדי להתחיל
            </p>
            <ul className="flex flex-col gap-1.5">
              {content.intro.toolkit.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-white/80">
                  <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-brand-blue" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        {content.modules.map((module, mi) => (
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
              {module.lessons.map((lesson) => {
                const examples = lesson.examples && lesson.examples.length > 0 ? lesson.examples : lesson.example ? [lesson.example] : [];
                return (
                  <div key={lesson.title} className="rounded-2xl border border-brand-border bg-white p-5 sm:p-7">
                    <h3 className="mb-3 flex items-center gap-2 text-base font-bold text-brand-navy">
                      <CheckCircle2 size={18} className="shrink-0 text-brand-blue" />
                      {lesson.title}
                    </h3>
                    <div className="flex flex-col gap-2 text-sm leading-relaxed text-neutral-600">
                      {lesson.body.map((paragraph, pi) => (
                        <p key={pi}>{paragraph}</p>
                      ))}
                    </div>

                    {lesson.sections && lesson.sections.length > 0 && (
                      <div className="mt-5 flex flex-col gap-4 border-t border-brand-border pt-5">
                        {lesson.sections.map((section, si) => (
                          <div key={si}>
                            <h4 className="mb-1.5 text-sm font-extrabold text-brand-navy">{section.heading}</h4>
                            <div className="flex flex-col gap-2 text-sm leading-relaxed text-neutral-600">
                              {section.paragraphs.map((p, pi) => (
                                <p key={pi}>{p}</p>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-5 flex flex-col gap-3">
                      {examples.map((ex, ei) => {
                        const seed = lessonSeed++;
                        return <LessonExampleVisual key={ei} label={ex.label} content={ex.content} seed={seed} />;
                      })}
                    </div>

                    {lesson.commonMistakes && lesson.commonMistakes.length > 0 && (
                      <div className="mt-3 rounded-xl border border-amber-300/60 bg-amber-50 p-4">
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-amber-700">
                          <AlertTriangle size={14} /> טעויות נפוצות שכדאי להימנע מהן
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {lesson.commonMistakes.map((mistake, mi2) => (
                            <li key={mi2} className="flex items-start gap-2 text-xs leading-relaxed text-amber-900">
                              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-amber-600" />
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

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

                    {lesson.summary && lesson.summary.length > 0 && (
                      <div className="mt-3 rounded-xl bg-brand-navy p-4">
                        <p className="mb-2 flex items-center gap-1.5 text-xs font-extrabold text-white">
                          <Sparkles size={14} className="text-brand-blue" /> בקצרה - נקודות מפתח
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {lesson.summary.map((point, pi2) => (
                            <li key={pi2} className="flex items-start gap-2 text-xs leading-relaxed text-white/80">
                              <CheckCircle2 size={12} className="mt-0.5 shrink-0 text-brand-blue" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                );
              })}
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
