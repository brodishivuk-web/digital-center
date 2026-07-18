import Link from "next/link";
import { ArrowLeft, Star, Users, GraduationCap } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-navy text-white">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(27,77,255,0.55) 0, transparent 45%), radial-gradient(circle at 85% 75%, rgba(27,77,255,0.35) 0, transparent 50%)",
        }}
      />
      <div className="container-page relative flex flex-col items-center gap-8 py-16 text-center sm:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold text-white/90">
          ⚡ קורסים חדשים כל חודש
        </span>

        <h1 className="max-w-3xl text-3xl font-extrabold leading-tight sm:text-5xl">
          הכישורים שהופכים אתכם
          <span className="text-brand-blue"> למבוקשים </span>
          בעולם הדיגיטלי
        </h1>

        <p className="max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          קורסים קצרים וישירים לעניין בשיווק ממומן, שיווק אורגני, קידום אתרים, כלי AI וצילום ועריכת סרטונים - במחיר
          שמתאים לכל כיס, ותוצאות שמתחילות כבר בשיעור הראשון.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-3.5 text-base font-extrabold text-white shadow-lg shadow-brand-blue/30 transition hover:bg-brand-blue-dark active:scale-95"
          >
            בחרו קורס והתחילו עכשיו
            <ArrowLeft size={18} />
          </Link>
          <Link
            href="/shop?sort=discount"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-base font-bold text-white transition hover:bg-white/10"
          >
            למבצעים החמים
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/70">
          <span className="flex items-center gap-2">
            <Users size={18} className="text-brand-blue" /> +15,000 תלמידים
          </span>
          <span className="flex items-center gap-2">
            <GraduationCap size={18} className="text-brand-blue" /> 15 קורסים פרקטיים
          </span>
          <span className="flex items-center gap-2">
            <Star size={18} className="fill-brand-blue text-brand-blue" /> דירוג ממוצע 4.8/5
          </span>
        </div>
      </div>
    </section>
  );
}
