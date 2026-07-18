import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { StarRating } from "@/components/StarRating";

export function Testimonials() {
  return (
    <section className="container-page py-16">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">מה אומרים הבוגרים שלנו</h2>
        <p className="mt-2 text-neutral-500">אלפי תלמידים כבר שינו כיוון מקצועי איתנו</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <div key={t.id} className="flex flex-col gap-4 rounded-2xl border border-brand-border bg-white p-6">
            <Quote className="text-brand-blue" size={28} />
            <StarRating rating={t.rating} size={14} />
            <p className="flex-1 text-sm leading-relaxed text-neutral-600">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3 border-t border-brand-border pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-blue-light text-sm font-bold text-brand-blue">
                {t.initials}
              </span>
              <div>
                <p className="text-sm font-bold text-brand-navy">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
