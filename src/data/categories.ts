import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "paid-marketing",
    name: "שיווק ממומן בגוגל וברשתות החברתיות",
    shortName: "שיווק ממומן",
    tagline: "תלמדו להריץ קמפיינים שמביאים לקוחות - לא רק לייקים",
    description:
      "בניית קמפיינים ממומנים בגוגל, פייסבוק ואינסטגרם שמביאים תוצאות אמיתיות - לידים, מכירות ולקוחות חוזרים.",
    icon: "megaphone",
    gradient: "from-[#1B4DFF] to-[#0B2F91]",
  },
  {
    slug: "organic-social",
    name: "שיווק אורגני וניהול סושיאל",
    shortName: "שיווק אורגני",
    tagline: "תוכן שמושך עוקבים - בלי לשלם על כל צפייה",
    description:
      "בניית נוכחות חזקה ברשתות החברתיות, יצירת תוכן שמושך תשומת לב וניהול קהילה שהופכת עוקבים ללקוחות.",
    icon: "heart-chat",
    gradient: "from-[#3B6BFF] to-[#132B7A]",
  },
  {
    slug: "seo",
    name: "קידום אתרים בגוגל",
    shortName: "קידום אתרים",
    tagline: "תופיעו ראשונים בגוגל - ותפסיקו לשלם על כל קליק",
    description:
      "כל מה שצריך כדי לדרג אתר גבוה בתוצאות החיפוש האורגניות של גוגל - ממחקר מילות מפתח ועד קידום טכני.",
    icon: "search",
    gradient: "from-[#0B2F91] to-[#05061A]",
  },
  {
    slug: "ai-tools",
    name: "כלי AI לשיווק ולעסקים",
    shortName: "כלי AI",
    tagline: "תעבדו חכם יותר עם הכלים החמים של 2026",
    description:
      "שימוש בכלי בינה מלאכותית - כתיבה, תמונות, וידאו ואוטומציה - כדי לחסוך שעות עבודה ולהגדיל תפוקה.",
    icon: "sparkles",
    gradient: "from-[#155DFC] to-[#0A0A0F]",
  },
  {
    slug: "video-editing",
    name: "צילום ועריכת סרטונים",
    shortName: "צילום ועריכה",
    tagline: "מהטלפון שלכם ישר לסטורי - וידאו שעוצר גלילה",
    description:
      "צילום מקצועי בסמארטפון ועריכת וידאו לרשתות חברתיות - מהצילום הראשון ועד סרטון מוכן לפרסום.",
    icon: "video",
    gradient: "from-[#2A55E5] to-[#0A0A0F]",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
