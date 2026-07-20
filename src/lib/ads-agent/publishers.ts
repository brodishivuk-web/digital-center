import { sendEmail } from "@/lib/email";
import type { Product } from "@/lib/types";
import type { AdContent, TargetSite } from "./types";

interface PublishOutcome {
  status: "published" | "ready" | "failed";
  detail: string;
}

function adAsHtml(ad: AdContent, product: Product, site: TargetSite): string {
  return `
    <h2>${ad.headline}</h2>
    <p>${ad.body}</p>
    <p><strong>${ad.cta}</strong></p>
    ${ad.hashtags.length ? `<p>${ad.hashtags.map((h) => `#${h}`).join(" ")}</p>` : ""}
    <hr />
    <p style="color:#666;font-size:12px">מודעה עבור הקורס "${product.name}" שנוצרה על ידי סוכן הפרסום של Digital Center עבור ${site.name}.</p>
  `;
}

async function publishViaWebhook(site: TargetSite, ad: AdContent, product: Product): Promise<PublishOutcome> {
  if (!site.webhookUrl) {
    return { status: "failed", detail: "לא הוגדרה כתובת Webhook לאתר הזה" };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(site.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        source: "digital-center-ads-agent",
        site: { name: site.name, url: site.url },
        ad: {
          headline: ad.headline,
          body: ad.body,
          cta: ad.cta,
          hashtags: ad.hashtags,
        },
        product: {
          name: product.name,
          slug: product.slug,
          price: product.price,
          url: `https://digital-center.vercel.app/product/${product.slug}`,
        },
      }),
    });
    if (!res.ok) {
      return { status: "failed", detail: `האתר החזיר שגיאה (${res.status})` };
    }
    return { status: "published", detail: "המודעה נשלחה בהצלחה ל-Webhook של האתר" };
  } catch {
    return { status: "failed", detail: "לא הצלחנו להתחבר לכתובת ה-Webhook" };
  } finally {
    clearTimeout(timeout);
  }
}

async function publishViaEmail(site: TargetSite, ad: AdContent, product: Product): Promise<PublishOutcome> {
  if (!site.email) {
    return { status: "failed", detail: "לא הוגדרה כתובת מייל לאתר הזה" };
  }
  const result = await sendEmail({
    to: site.email,
    subject: ad.headline,
    html: adAsHtml(ad, product, site),
  });
  return result.sent
    ? { status: "published", detail: `המודעה נשלחה במייל אל ${site.email}` }
    : { status: "failed", detail: "שליחת המייל נכשלה (בדקו שהוגדר RESEND_API_KEY)" };
}

export async function publishAd(site: TargetSite, ad: AdContent, product: Product): Promise<PublishOutcome> {
  switch (site.delivery) {
    case "webhook":
      return publishViaWebhook(site, ad, product);
    case "email":
      return publishViaEmail(site, ad, product);
    case "manual":
      return { status: "ready", detail: "המודעה מוכנה - העתיקו והדביקו אותה באתר" };
  }
}
