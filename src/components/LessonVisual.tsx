import { Check, X, MessageCircle, Image as ImageIcon, Film, LayoutGrid } from "lucide-react";
import type { VisualSpec } from "@/data/visualTypes";

function StepsVisual({ steps }: { steps: { label: string; description: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {steps.map((step, i) => (
        <div key={step.label} className="relative flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-blue text-sm font-extrabold text-white">
            {i + 1}
          </div>
          <p className="text-sm font-bold text-brand-navy">{step.label}</p>
          <p className="text-xs leading-relaxed text-neutral-500">{step.description}</p>
          {i < steps.length - 1 && (
            <span className="absolute top-5 right-[calc(50%+2.2rem)] hidden h-px w-[calc(100%-2.4rem)] bg-brand-border sm:block" />
          )}
        </div>
      ))}
    </div>
  );
}

function CompareVisual({
  leftLabel,
  leftItems,
  rightLabel,
  rightItems,
}: {
  leftLabel: string;
  leftItems: string[];
  rightLabel: string;
  rightItems: string[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
        <p className="mb-3 text-sm font-extrabold text-neutral-500">{leftLabel}</p>
        <ul className="flex flex-col gap-2">
          {leftItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-neutral-500">
              <X size={16} className="mt-0.5 shrink-0 text-neutral-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-brand-blue bg-brand-blue-light p-4">
        <p className="mb-3 text-sm font-extrabold text-brand-blue">{rightLabel}</p>
        <ul className="flex flex-col gap-2">
          {rightItems.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm font-medium text-brand-navy">
              <Check size={16} className="mt-0.5 shrink-0 text-brand-blue" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FunnelVisual({ stages }: { stages: { label: string; value: string }[] }) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-1.5">
      {stages.map((stage, i) => {
        const widthPct = 100 - i * (60 / Math.max(stages.length - 1, 1));
        return (
          <div key={stage.label} style={{ width: `${widthPct}%` }}>
            <div
              className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-bold text-white"
              style={{
                background: `linear-gradient(90deg, #1B4DFF ${100 - i * 12}%, #0B2F91 100%)`,
              }}
            >
              <span>{stage.label}</span>
              <span className="text-xs font-semibold text-white/80">{stage.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TreeVisual({ root, branches }: { root: string; branches: { label: string; children?: string[] }[] }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full bg-brand-navy px-5 py-2 text-sm font-extrabold text-white">{root}</div>
      <div className="h-4 w-px bg-brand-border" />
      <div className="flex flex-wrap justify-center gap-4">
        {branches.map((branch) => (
          <div key={branch.label} className="flex flex-col items-center gap-2">
            <div className="rounded-lg border border-brand-blue bg-brand-blue-light px-3.5 py-1.5 text-xs font-bold text-brand-blue">
              {branch.label}
            </div>
            {branch.children && branch.children.length > 0 && (
              <div className="flex flex-col items-center gap-1.5">
                <div className="h-3 w-px bg-brand-border" />
                <div className="flex flex-wrap justify-center gap-1.5">
                  {branch.children.map((child) => (
                    <span key={child} className="rounded-full border border-brand-border bg-white px-2.5 py-1 text-[11px] text-neutral-600">
                      {child}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricsVisual({ unit, bars }: { unit: string; bars: { label: string; value: number }[] }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <div className="flex flex-col gap-3">
      {bars.map((bar) => (
        <div key={bar.label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-xs font-semibold text-neutral-600 sm:w-36">{bar.label}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-brand-gray">
            <div
              className="h-full rounded-full bg-gradient-to-l from-brand-blue to-brand-blue-dark"
              style={{ width: `${(bar.value / max) * 100}%` }}
            />
          </div>
          <span className="w-16 shrink-0 text-left text-xs font-bold text-brand-navy" dir="ltr">
            {bar.value}
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}

const MOCKUP_ICONS = {
  chat: MessageCircle,
  feed: LayoutGrid,
  timeline: Film,
  dashboard: ImageIcon,
};

function MockupVisual({ kind, blocks }: { kind: "chat" | "feed" | "timeline" | "dashboard"; blocks: string[] }) {
  const Icon = MOCKUP_ICONS[kind];

  return (
    <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-brand-border bg-white shadow-sm">
      <div className="flex items-center gap-1.5 border-b border-brand-border bg-brand-gray px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-neutral-300" />
        <span className="mr-auto flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400">
          <Icon size={12} />
          {kind === "chat" ? "צ׳אט" : kind === "feed" ? "פיד" : kind === "timeline" ? "ציר עריכה" : "לוח בקרה"}
        </span>
      </div>

      {kind === "timeline" ? (
        <div className="flex flex-col gap-2 p-4">
          <div className="flex gap-1">
            {blocks.map((b, i) => (
              <div
                key={b}
                className="flex h-12 flex-1 items-center justify-center rounded-md bg-gradient-to-b from-brand-blue to-brand-blue-dark text-center text-[10px] font-bold leading-tight text-white"
              >
                {b}
              </div>
            ))}
          </div>
          <div className="h-1.5 w-full rounded-full bg-brand-gray" />
        </div>
      ) : kind === "feed" ? (
        <div className="grid grid-cols-3 gap-1 p-2">
          {blocks.map((b) => (
            <div
              key={b}
              className="flex aspect-square items-center justify-center rounded-md bg-gradient-to-br from-brand-blue to-brand-blue-dark p-1.5 text-center text-[9px] font-bold leading-tight text-white"
            >
              {b}
            </div>
          ))}
        </div>
      ) : kind === "chat" ? (
        <div className="flex flex-col gap-2 p-4">
          {blocks.map((b, i) => (
            <div key={b} className={`flex ${i % 2 === 0 ? "justify-start" : "justify-end"}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                  i % 2 === 0 ? "bg-brand-gray text-neutral-700" : "bg-brand-blue text-white"
                }`}
              >
                {b}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-3">
          {blocks.map((b) => (
            <div key={b} className="rounded-lg border border-brand-border bg-brand-gray p-3 text-center text-[11px] font-semibold text-neutral-600">
              {b}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function LessonVisual({ visual }: { visual: VisualSpec }) {
  switch (visual.type) {
    case "steps":
      return <StepsVisual steps={visual.steps} />;
    case "compare":
      return <CompareVisual {...visual} />;
    case "funnel":
      return <FunnelVisual stages={visual.stages} />;
    case "tree":
      return <TreeVisual root={visual.root} branches={visual.branches} />;
    case "metrics":
      return <MetricsVisual unit={visual.unit} bars={visual.bars} />;
    case "mockup":
      return <MockupVisual kind={visual.kind} blocks={visual.blocks} />;
    default:
      return null;
  }
}
