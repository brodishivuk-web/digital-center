import Anthropic from "@anthropic-ai/sdk";
import type { Product } from "@/lib/types";
import type { AdContent, TargetSite } from "./types";
import { platformLabels } from "./types";

let client: Anthropic | null = null;

function getClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic();
  return client;
}

const adSchema = {
  type: "object",
  properties: {
    headline: { type: "string", description: "כותרת קצרה ומושכת למודעה, עד 10 מילים" },
    body: { type: "string", description: "גוף המודעה בעברית, 2-4 משפטים מותאמים לפלטפורמה" },
    cta: { type: "string", description: "קריאה לפעולה קצרה, למשל: להרשמה לחצו כאן" },
    hashtags: {
      type: "array",
      items: { type: "string" },
      description: "עד 5 האשטגים רלוונטיים (ללא סולמית), רק אם מתאים לפלטפורמה - אחרת מערך ריק",
    },
  },
  required: ["headline", "body", "cta", "hashtags"],
  additionalProperties: false,
} as const;

const platformStyle: Record<TargetSite["platform"], string> = {
  "facebook-group":
    "פוסט לקבוצת פייסבוק: טון אישי וקהילתי, פתיח שמדבר על כאב או שאלה של חברי הקבוצה, אימוג'ים במידה, בלי להישמע כמו פרסומת קשה.",
  instagram: "פוסט אינסטגרם: קצר וקליט, משפטים קצרים, אימוג'ים, והאשטגים רלוונטיים בסוף.",
  classifieds: "מודעת לוח: ענייני ותמציתי, מה מקבלים, כמה עולה, ואיך יוצרים קשר. בלי אימוג'ים והאשטגים.",
  forum: "פוסט לפורום מקצועי: טון מקצועי ומכבד, ערך לפני מכירה, שקיפות שמדובר בקורס בתשלום.",
  newsletter: "פסקה לניוזלטר: כותרת חזקה, טקסט זורם וברור עם הדגשת התועלת המרכזית.",
  general: "מודעה כללית לאתר: ברורה, משכנעת וקצרה.",
};

function productBrief(product: Product): string {
  return [
    `שם הקורס: ${product.name}`,
    `תיאור: ${product.shortDescription}`,
    `מחיר: ${product.price} ש"ח${product.originalPrice ? ` (במקום ${product.originalPrice} ש"ח)` : ""}`,
    `רמה: ${product.level} | משך: ${product.duration} | ${product.lessonsCount} שיעורים`,
    `נקודות מפתח: ${product.highlights.slice(0, 3).join("; ")}`,
    `דירוג: ${product.rating} מתוך 5 (${product.reviewsCount} ביקורות, ${product.studentsCount} תלמידים)`,
  ].join("\n");
}

/** מחולל תבנית מקומי - עובד גם בלי מפתח API של אנת'רופיק */
function templateAd(product: Product, site: TargetSite): AdContent {
  const discount = product.originalPrice
    ? ` במקום ${product.originalPrice} ש"ח - רק ${product.price} ש"ח!`
    : ` רק ${product.price} ש"ח.`;
  const useHashtags = site.platform === "instagram" || site.platform === "facebook-group";
  return {
    headline: `${product.name} - ${product.level === "מתחילים" ? "מתחילים מאפס" : "לוקחים את זה קדימה"}`,
    body:
      `${product.shortDescription} ` +
      `${product.lessonsCount} שיעורים, ${product.duration} של תוכן פרקטי, בקצב שלכם ומכל מקום.${discount}`,
    cta: "לפרטים והרשמה באתר Digital Center",
    hashtags: useHashtags ? ["שיווקדיגיטלי", "קורסאונליין", "דיגיטלסנטר"] : [],
  };
}

export async function generateAd(
  product: Product,
  site: TargetSite,
  goal?: string,
): Promise<{ ad: AdContent; generatedBy: "claude" | "template" }> {
  const anthropic = getClient();
  if (!anthropic) {
    console.log(`[ads-agent] ANTHROPIC_API_KEY not set - using template ad for ${site.name}`);
    return { ad: templateAd(product, site), generatedBy: "template" };
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      system:
        "אתה קופירייטר מומחה לשיווק דיגיטלי בעברית של חנות הקורסים Digital Center (דיגיטל סנטר). " +
        "אתה כותב מודעות אמינות ומדויקות - בלי הבטחות מוגזמות ובלי המצאת פרטים שלא הופיעו בנתוני הקורס.",
      output_config: { format: { type: "json_schema", schema: adSchema } },
      messages: [
        {
          role: "user",
          content: [
            `כתוב מודעה בעברית לקורס הבא:`,
            productBrief(product),
            ``,
            `המודעה תפורסם ב: ${site.name} (${platformLabels[site.platform]})`,
            `סגנון נדרש: ${platformStyle[site.platform]}`,
            site.notes ? `הערות על האתר והקהל: ${site.notes}` : "",
            goal ? `מטרת הקמפיין: ${goal}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
        },
      ],
    });

    const text = response.content.find((b) => b.type === "text")?.text;
    if (!text) throw new Error("empty response");
    return { ad: JSON.parse(text) as AdContent, generatedBy: "claude" };
  } catch (error) {
    console.error(`[ads-agent] Claude generation failed for ${site.name}, falling back to template`, error);
    return { ad: templateAd(product, site), generatedBy: "template" };
  }
}
