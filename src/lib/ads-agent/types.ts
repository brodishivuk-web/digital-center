export type AdPlatform =
  | "facebook-group"
  | "instagram"
  | "classifieds"
  | "forum"
  | "newsletter"
  | "general";

export type DeliveryMethod = "webhook" | "email" | "manual";

export interface TargetSite {
  id: string;
  name: string;
  url: string;
  platform: AdPlatform;
  delivery: DeliveryMethod;
  /** כתובת Webhook לפרסום אוטומטי (למשל Zapier/Make או API של האתר) */
  webhookUrl?: string;
  /** כתובת מייל של לוח המודעות (אתרים שמקבלים מודעות במייל) */
  email?: string;
  /** הערות חופשיות על קהל היעד או סגנון האתר */
  notes?: string;
}

export interface AdContent {
  headline: string;
  body: string;
  cta: string;
  hashtags: string[];
}

export interface SiteResult {
  siteId: string;
  siteName: string;
  siteUrl: string;
  delivery: DeliveryMethod;
  ad: AdContent;
  status: "published" | "ready" | "failed";
  detail: string;
  generatedBy: "claude" | "template";
}

export const platformLabels: Record<AdPlatform, string> = {
  "facebook-group": "קבוצת פייסבוק",
  instagram: "אינסטגרם",
  classifieds: "לוח מודעות",
  forum: "פורום / קהילה",
  newsletter: "ניוזלטר",
  general: "אתר כללי",
};

export const deliveryLabels: Record<DeliveryMethod, string> = {
  webhook: "פרסום אוטומטי (Webhook)",
  email: "שליחה במייל לאתר",
  manual: "יצירת טקסט להעתקה",
};
