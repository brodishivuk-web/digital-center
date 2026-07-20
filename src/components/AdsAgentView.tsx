"use client";

import { useEffect, useState } from "react";
import {
  Bot,
  Check,
  CheckCircle2,
  ClipboardCopy,
  Globe,
  Loader2,
  Megaphone,
  Plus,
  Sparkles,
  Trash2,
  XCircle,
} from "lucide-react";
import { products } from "@/data/products";
import {
  deliveryLabels,
  platformLabels,
  type AdPlatform,
  type DeliveryMethod,
  type SiteResult,
  type TargetSite,
} from "@/lib/ads-agent/types";

const SITES_STORAGE_KEY = "digital-center-ads-agent-sites";

const emptyForm = {
  name: "",
  url: "",
  platform: "facebook-group" as AdPlatform,
  delivery: "manual" as DeliveryMethod,
  webhookUrl: "",
  email: "",
  notes: "",
};

const inputClass =
  "w-full rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-neutral-400 focus:border-brand-blue";

function adAsText(result: SiteResult): string {
  const lines = [result.ad.headline, "", result.ad.body, "", result.ad.cta];
  if (result.ad.hashtags.length) {
    lines.push("", result.ad.hashtags.map((h) => `#${h}`).join(" "));
  }
  return lines.join("\n");
}

export function AdsAgentView() {
  const [sites, setSites] = useState<TargetSite[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);

  const [productSlug, setProductSlug] = useState(products[0]?.slug ?? "");
  const [goal, setGoal] = useState("");

  const [running, setRunning] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<SiteResult[] | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SITES_STORAGE_KEY);
      if (stored) setSites(JSON.parse(stored));
    } catch {
      // localStorage לא זמין או פגום - מתחילים מרשימה ריקה
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(SITES_STORAGE_KEY, JSON.stringify(sites));
  }, [sites, loaded]);

  const addSite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.url.trim()) return;
    const site: TargetSite = {
      id: `site-${Date.now()}`,
      name: form.name.trim(),
      url: form.url.trim(),
      platform: form.platform,
      delivery: form.delivery,
      webhookUrl: form.webhookUrl.trim() || undefined,
      email: form.email.trim() || undefined,
      notes: form.notes.trim() || undefined,
    };
    setSites((prev) => [...prev, site]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const removeSite = (id: string) => {
    setSites((prev) => prev.filter((s) => s.id !== id));
  };

  const runAgent = async () => {
    setError("");
    setResults(null);
    if (sites.length === 0) {
      setError("הוסיפו לפחות אתר יעד אחד לפני הפעלת הסוכן");
      return;
    }
    setRunning(true);
    try {
      const res = await fetch("/api/ads-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productSlug, goal, sites }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.error || "משהו השתבש");
      setResults(data.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "משהו השתבש, נסו שוב");
    } finally {
      setRunning(false);
    }
  };

  const copyAd = async (result: SiteResult) => {
    try {
      await navigator.clipboard.writeText(adAsText(result));
      setCopiedId(result.siteId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // דפדפן ללא הרשאת clipboard
    }
  };

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-blue text-white">
          <Bot size={24} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy sm:text-3xl">סוכן פרסום AI</h1>
          <p className="mt-1 max-w-2xl text-sm text-neutral-600">
            בוחרים קורס, מוסיפים את האתרים שבהם רוצים לפרסם - והסוכן מייצר לכל אתר מודעה מותאמת בעברית
            ומפרסם אותה אוטומטית (דרך Webhook או מייל) או מכין לכם טקסט מוכן להעתקה.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* הגדרות הקמפיין */}
        <div className="space-y-6">
          <section className="rounded-2xl border border-brand-border bg-white p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-brand-navy">
              <Megaphone size={18} className="text-brand-blue" /> מה מפרסמים?
            </h2>
            <label className="mb-1 block text-sm font-semibold text-brand-navy">קורס לפרסום</label>
            <select value={productSlug} onChange={(e) => setProductSlug(e.target.value)} className={inputClass}>
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} ({p.price} ₪)
                </option>
              ))}
            </select>
            <label className="mb-1 mt-4 block text-sm font-semibold text-brand-navy">
              מטרת הקמפיין <span className="font-normal text-neutral-400">(לא חובה)</span>
            </label>
            <textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={2}
              placeholder='למשל: "לדחוף את המבצע לסוף השבוע" או "לפנות לבעלי עסקים קטנים"'
              className={inputClass}
            />
          </section>

          <section className="rounded-2xl border border-brand-border bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-lg font-bold text-brand-navy">
                <Globe size={18} className="text-brand-blue" /> אתרי יעד ({sites.length})
              </h2>
              <button
                type="button"
                onClick={() => setShowForm((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue-light px-4 py-2 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue hover:text-white"
              >
                <Plus size={16} /> הוספת אתר
              </button>
            </div>

            {sites.length === 0 && !showForm && (
              <p className="rounded-xl bg-brand-gray p-4 text-sm text-neutral-500">
                עדיין אין אתרים ברשימה. הוסיפו את האתרים, הקבוצות והלוחות שבהם אתם רוצים שהסוכן יפרסם.
              </p>
            )}

            <ul className="space-y-3">
              {sites.map((site) => (
                <li key={site.id} className="flex items-start justify-between gap-3 rounded-xl border border-brand-border bg-brand-gray/60 p-4">
                  <div className="min-w-0">
                    <p className="font-bold text-brand-navy">{site.name}</p>
                    <p className="truncate text-xs text-neutral-500" dir="ltr">
                      {site.url}
                    </p>
                    <p className="mt-1 text-xs text-neutral-600">
                      {platformLabels[site.platform]} · {deliveryLabels[site.delivery]}
                    </p>
                    {site.notes && <p className="mt-1 text-xs text-neutral-400">{site.notes}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSite(site.id)}
                    className="shrink-0 rounded-full p-2 text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                    aria-label={`הסרת ${site.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>

            {showForm && (
              <form onSubmit={addSite} className="mt-4 space-y-3 rounded-xl border border-dashed border-brand-blue/40 bg-brand-blue-light/40 p-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="שם האתר / הקבוצה"
                    className={inputClass}
                  />
                  <input
                    required
                    type="url"
                    dir="ltr"
                    value={form.url}
                    onChange={(e) => setForm({ ...form, url: e.target.value })}
                    placeholder="https://example.com"
                    className={inputClass}
                  />
                  <select
                    value={form.platform}
                    onChange={(e) => setForm({ ...form, platform: e.target.value as AdPlatform })}
                    className={inputClass}
                  >
                    {Object.entries(platformLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <select
                    value={form.delivery}
                    onChange={(e) => setForm({ ...form, delivery: e.target.value as DeliveryMethod })}
                    className={inputClass}
                  >
                    {Object.entries(deliveryLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>
                {form.delivery === "webhook" && (
                  <input
                    required
                    type="url"
                    dir="ltr"
                    value={form.webhookUrl}
                    onChange={(e) => setForm({ ...form, webhookUrl: e.target.value })}
                    placeholder="https://hooks.zapier.com/... (כתובת ה-Webhook של האתר)"
                    className={inputClass}
                  />
                )}
                {form.delivery === "email" && (
                  <input
                    required
                    type="email"
                    dir="ltr"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="ads@example.com (המייל שאליו האתר מקבל מודעות)"
                    className={inputClass}
                  />
                )}
                <input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder='הערות לסוכן, למשל: "קהל של בעלי עסקים קטנים" (לא חובה)'
                  className={inputClass}
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-brand-blue px-6 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue-dark"
                >
                  שמירת האתר
                </button>
              </form>
            )}
          </section>

          <button
            type="button"
            onClick={runAgent}
            disabled={running}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-blue px-8 py-4 text-base font-bold text-white transition hover:bg-brand-blue-dark disabled:opacity-60"
          >
            {running ? (
              <>
                <Loader2 size={20} className="animate-spin" /> הסוכן כותב ומפרסם...
              </>
            ) : (
              <>
                <Sparkles size={20} /> הפעלת הסוכן
              </>
            )}
          </button>
          {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
        </div>

        {/* תוצאות */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-brand-navy">תוצאות</h2>
          {!results && !running && (
            <div className="rounded-2xl border border-dashed border-brand-border bg-brand-gray/50 p-8 text-center text-sm text-neutral-500">
              אחרי הפעלת הסוכן, כאן יופיעו המודעות שנוצרו לכל אתר וסטטוס הפרסום שלהן.
            </div>
          )}
          {running && (
            <div className="rounded-2xl border border-brand-border bg-white p-8 text-center text-sm text-neutral-500">
              <Loader2 size={24} className="mx-auto mb-3 animate-spin text-brand-blue" />
              הסוכן מנתח את הקורס, כותב מודעה מותאמת לכל אתר ומפרסם...
            </div>
          )}
          <div className="space-y-4">
            {results?.map((result) => (
              <article key={result.siteId} className="rounded-2xl border border-brand-border bg-white p-5">
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-brand-navy">{result.siteName}</h3>
                    <p className="text-xs text-neutral-400" dir="ltr">
                      {result.siteUrl}
                    </p>
                  </div>
                  {result.status === "published" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-600">
                      <CheckCircle2 size={14} /> פורסם
                    </span>
                  )}
                  {result.status === "ready" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-blue-light px-3 py-1 text-xs font-bold text-brand-blue">
                      <ClipboardCopy size={14} /> מוכן להעתקה
                    </span>
                  )}
                  {result.status === "failed" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-bold text-red-500">
                      <XCircle size={14} /> נכשל
                    </span>
                  )}
                </div>

                <div className="rounded-xl bg-brand-gray/60 p-4">
                  <p className="font-bold text-brand-navy">{result.ad.headline}</p>
                  <p className="mt-2 whitespace-pre-line text-sm text-neutral-700">{result.ad.body}</p>
                  <p className="mt-2 text-sm font-semibold text-brand-blue">{result.ad.cta}</p>
                  {result.ad.hashtags.length > 0 && (
                    <p className="mt-2 text-xs text-neutral-500">
                      {result.ad.hashtags.map((h) => `#${h}`).join(" ")}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-neutral-400">
                    {result.detail} · נכתב על ידי {result.generatedBy === "claude" ? "Claude AI" : "מחולל מקומי"}
                  </p>
                  <button
                    type="button"
                    onClick={() => copyAd(result)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand-border px-4 py-1.5 text-xs font-semibold text-brand-navy transition hover:border-brand-blue hover:text-brand-blue"
                  >
                    {copiedId === result.siteId ? (
                      <>
                        <Check size={14} /> הועתק!
                      </>
                    ) : (
                      <>
                        <ClipboardCopy size={14} /> העתקת המודעה
                      </>
                    )}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
