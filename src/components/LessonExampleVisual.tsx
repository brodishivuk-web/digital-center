import { Sparkles, MessageSquareText, FileText, Target, ListChecks, Megaphone } from "lucide-react";

const ICONS = [Sparkles, MessageSquareText, FileText, Target, ListChecks, Megaphone];

export function LessonExampleVisual({ label, content, seed }: { label: string; content: string[]; seed: number }) {
  const Icon = ICONS[seed % ICONS.length];

  return (
    <div className="overflow-hidden rounded-xl border border-brand-border bg-white shadow-sm">
      <div className="flex items-center gap-2 bg-gradient-to-l from-brand-blue to-brand-blue-dark px-4 py-2.5">
        <Icon size={15} className="shrink-0 text-white" />
        <span className="text-xs font-extrabold text-white">{label}</span>
      </div>
      <div className="flex flex-col divide-y divide-brand-border">
        {content.map((line, i) => (
          <div key={i} className="flex items-start gap-2.5 px-4 py-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue-light text-[10px] font-bold text-brand-blue">
              {i + 1}
            </span>
            <p className="text-xs leading-relaxed text-neutral-700">{line}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
