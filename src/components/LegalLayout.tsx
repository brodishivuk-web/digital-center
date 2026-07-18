import type { ReactNode } from "react";

export function LegalLayout({ title, updatedAt, children }: { title: string; updatedAt: string; children: ReactNode }) {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">{title}</h1>
        <p className="mt-2 text-sm text-neutral-500">עודכן לאחרונה: {updatedAt}</p>
        <div className="prose-legal mt-8 flex flex-col gap-6 text-sm leading-relaxed text-neutral-700 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-brand-navy [&_ul]:list-disc [&_ul]:pr-5 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5 [&_li]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
