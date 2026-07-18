import type { Product } from "@/lib/types";

const standardVariants = (base: string) => [
  {
    id: "digital",
    name: "גישה דיגיטלית",
    description: "גישה מלאה לכל שיעורי הקורס והחומרים להורדה",
    priceDelta: 0,
  },
  {
    id: "mentoring",
    name: "גישה + ליווי אישי",
    description: "כל התכנים + שעת ייעוץ אישית בזום ובדיקת תרגילים",
    priceDelta: 150,
  },
];

export const products: Product[] = [
  // ── שיווק ממומן ─────────────────────────────
  {
    id: "p1",
    slug: "google-ads-from-zero",
    name: "קמפיינר גוגל אדס - מאפס לקמפיין ראשון",
    categorySlug: "paid-marketing",
    price: 249,
    originalPrice: 349,
    stock: 48,
    rating: 4.8,
    reviewsCount: 212,
    studentsCount: 1840,
    duration: "4.5 שעות",
    lessonsCount: 32,
    level: "מתחילים",
    shortDescription:
      "בונים ומריצים קמפיין גוגל אדס ראשון תוך שבוע - חיפוש, מדיה ו-Performance Max.",
    description:
      "קורס פרקטי שלוקח אתכם מאפס עד להרצת קמפיין גוגל אדס עובד. תלמדו איך לבנות מבנה חשבון נכון, לבחור מילות מפתח רווחיות, לכתוב מודעות שמייצרות קליקים איכותיים ולעקוב אחרי תוצאות בלי לשרוף תקציב על ניסוי וטעייה.",
    highlights: [
      "בניית מבנה קמפיין וחשבון מגוגל אדס מאפס",
      "מחקר מילות מפתח וקהלי יעד רווחיים",
      "כתיבת מודעות טקסט שממירות",
      "קמפיינים חכמים: Performance Max ו-Smart Bidding",
      "קריאת דוחות וקבלת החלטות לפי נתונים",
    ],
    syllabus: [
      {
        title: "בניית התשתית",
        items: ["פתיחת חשבון מדיה נכון", "התקנת מעקב המרות", "מבנה קמפיינים וקבוצות מודעות", "בחירת סוג קמפיין מתאים"],
      },
      {
        title: "הרצה ואופטימיזציה",
        items: ["כתיבת מודעות שממירות", "ניהול תקציב והצעות מחיר", "אופטימיזציה שבועית לפי דוחות", "שימוש בתוספי מודעה"],
      },
    ],
    variants: standardVariants("google-ads"),
    gradient: "from-[#1B4DFF] to-[#0B2F91]",
  },
  {
    id: "p2",
    slug: "facebook-instagram-ads",
    name: "פייסבוק ואינסטגרם אדס למתחילים",
    categorySlug: "paid-marketing",
    price: 199,
    originalPrice: 279,
    stock: 60,
    rating: 4.7,
    reviewsCount: 158,
    studentsCount: 1390,
    duration: "3.5 שעות",
    lessonsCount: 26,
    level: "מתחילים",
    isNew: true,
    shortDescription:
      "הרצת קמפיינים ממומנים בפייסבוק ואינסטגרם שמביאים לידים ומכירות בעלות נמוכה.",
    description:
      "כל מה שצריך כדי להתחיל להריץ פרסום ממומן במטא - מבניית קהל יעד מדויק, דרך עיצוב קריאייטיב שעוצר גלילה ועד קריאת תוצאות בביקורת המודעות ושיפור ROAS.",
    highlights: [
      "בניית Business Manager ומרכז מודעות",
      "הגדרת קהלי יעד וקהלים דומים (Lookalike)",
      "בניית קריאייטיב שעוצר גלילה",
      "מבנה קמפיין להמרות ולידים",
      "קריאת מדדים: ROAS, CPA, CTR",
    ],
    syllabus: [
      { title: "הקמה", items: ["Business Manager ופיקסל", "הגדרת קהלים", "תקציבים ומבנה קמפיין", "בחירת מטרת קמפיין נכונה"] },
      { title: "יצירה ומדידה", items: ["קריאייטיב שממיר", "בדיקות A/B", "אופטימיזציה לפי נתונים", "כתיבת טקסט מודעה שממיר"] },
    ],
    variants: standardVariants("fb-ads"),
    gradient: "from-[#2A55E5] to-[#0B2F91]",
  },
  {
    id: "p3",
    slug: "advanced-paid-campaigns",
    name: "אופטימיזציית קמפיינים ממומנים - רמה מתקדמת",
    categorySlug: "paid-marketing",
    price: 349,
    originalPrice: 449,
    stock: 25,
    rating: 4.9,
    reviewsCount: 96,
    studentsCount: 640,
    duration: "5 שעות",
    lessonsCount: 34,
    level: "בינוני",
    shortDescription:
      "טכניקות מתקדמות להורדת עלות לקוח והגדלת החזר ההשקעה בקמפיינים ממומנים.",
    description:
      "לבעלי ניסיון קודם בפרסום ממומן. נצלול לאסטרטגיות מתקדמות של הצעות מחיר, מבני חשבון לקנה מידה, בדיקות A/B שיטתיות ובניית משפכי שיווק רב-ערוציים שמורידים עלות לקוח לאורך זמן.",
    highlights: [
      "בניית משפך שיווק רב-ערוצי (גוגל + מטא)",
      "אסטרטגיות הצעות מחיר מתקדמות",
      "מבני חשבון לסקייל בתקציבים גדולים",
      "בדיקות A/B שיטתיות לקריאייטיב ולדפי נחיתה",
      "הפחתת עלות לקוח (CPA) לאורך זמן",
    ],
    syllabus: [
      { title: "אסטרטגיה", items: ["משפכים רב-ערוציים", "שיוך המרות (Attribution)", "בניית קהלי Custom Audience מתקדמים"] },
      { title: "סקייל", items: ["הרחבת תקציבים בבטחה", "בדיקות A/B מתקדמות", "דוחות ותובנות עסקיות", "ניהול כמה קמפיינים במקביל"] },
    ],
    variants: standardVariants("advanced-ads"),
    gradient: "from-[#0B2F91] to-[#05061A]",
  },

  // ── שיווק אורגני ─────────────────────────────
  {
    id: "p4",
    slug: "instagram-facebook-management",
    name: "ניהול דפי עסק באינסטגרם ובפייסבוק",
    categorySlug: "organic-social",
    price: 179,
    stock: 70,
    rating: 4.7,
    reviewsCount: 184,
    studentsCount: 2010,
    duration: "3 שעות",
    lessonsCount: 22,
    level: "מתחילים",
    shortDescription:
      "בונים דף עסקי מושך, קלנדר תוכן שבועי ומענה ללקוחות שהופך עוקבים לקונים.",
    description:
      "קורס למי שרוצה לנהל דף עסק ברמה מקצועית - מבניית מיתוג עקבי בפיד, דרך תזמון פוסטים וסטוריז ועד שיחת מכירה טבעית בתגובות ובהודעות פרטיות.",
    highlights: [
      "בניית מיתוג עקבי ומזמין בפיד",
      "קלנדר תוכן שבועי שאפשר לשכפל כל חודש",
      "שימוש נכון בסטוריז, רילס והיילייטס",
      "מענה ללקוחות שממיר עוקבים לקונים",
      "כלי תזמון וניהול זמן לדף עסקי",
    ],
    syllabus: [
      { title: "בניית הבסיס", items: ["מיתוג הדף", "תבניות תוכן", "לוח תוכן חודשי", "כתיבת קפשן שמניע לפעולה"] },
      { title: "ניהול שוטף", items: ["תזמון ופרסום", "מענה ומכירה בצ'אט", "מדידת ביצועים", "טיפול בביקורות ותגובות שליליות"] },
    ],
    variants: standardVariants("ig-fb-mgmt"),
    gradient: "from-[#3B6BFF] to-[#132B7A]",
  },
  {
    id: "p5",
    slug: "viral-content-tiktok-reels",
    name: "בניית תוכן ויראלי לטיקטוק ורילס",
    categorySlug: "organic-social",
    price: 199,
    stock: 55,
    rating: 4.8,
    reviewsCount: 143,
    studentsCount: 1520,
    duration: "3.5 שעות",
    lessonsCount: 24,
    level: "מתחילים",
    isNew: true,
    shortDescription:
      "נוסחאות תוכן, טרנדים ועריכה מהירה שמייצרים חשיפה אורגנית גבוהה בטיקטוק וברילס.",
    description:
      "נחשוף את הנוסחאות שעומדות מאחורי סרטונים ויראליים - מ-3 השניות הראשונות שעוצרות גלילה, דרך זיהוי טרנדים רלוונטיים לנישה שלכם ועד עריכה שמחזיקה צופים עד הסוף.",
    highlights: [
      "נוסחת 3 השניות שעוצרות גלילה",
      "זיהוי טרנדים רלוונטיים לעסק שלכם",
      "כתיבת תסריטים קצרים שממירים",
      "עריכה מהירה בטלפון",
      "לוח שידור שבועי לעקביות",
    ],
    syllabus: [
      { title: "רעיון ותסריט", items: ["מציאת רעיונות מנצחים", "כתיבת תסריט קצר", "בחירת האורך והפורמט הנכון"] },
      { title: "צילום ועריכה", items: ["צילום מהיר בטלפון", "עריכה שמחזיקה צפייה", "בחירת המוזיקה והטרנד הנכונים"] },
    ],
    variants: standardVariants("viral-content"),
    gradient: "from-[#1B4DFF] to-[#132B7A]",
  },
  {
    id: "p6",
    slug: "monthly-content-strategy",
    name: "אסטרטגיית תוכן וקלנדר תוכן חודשי",
    categorySlug: "organic-social",
    price: 229,
    originalPrice: 289,
    stock: 40,
    rating: 4.6,
    reviewsCount: 88,
    studentsCount: 760,
    duration: "3 שעות",
    lessonsCount: 20,
    level: "בינוני",
    shortDescription:
      "בונים אסטרטגיית תוכן שנתית עם עמודי תוכן, מסרים מרכזיים ולוח פרסום מסודר.",
    description:
      "לא עוד תוכן אקראי. נלמד לבנות אסטרטגיית תוכן מסודרת עם עמודי תוכן (Content Pillars), מסרים מרכזיים לכל חודש, ולוח פרסום שמחזיק אתכם עקביים גם בתקופות עמוסות.",
    highlights: [
      "הגדרת עמודי תוכן (Content Pillars)",
      "בניית מסר מרכזי לכל חודש",
      "לוח תוכן שנתי הניתן לשכפול",
      "התאמת תוכן לכל פלטפורמה",
      "מדידת אפקטיביות אסטרטגיית התוכן",
    ],
    syllabus: [
      { title: "אסטרטגיה", items: ["עמודי תוכן", "מסרים חודשיים", "הגדרת קהל היעד והטון של המותג"] },
      { title: "ביצוע", items: ["לוח תוכן שנתי", "התאמה לכל רשת", "עבודה עם צוות לפי הלוח"] },
    ],
    variants: standardVariants("content-strategy"),
    gradient: "from-[#3B6BFF] to-[#0B2F91]",
  },

  // ── קידום אתרים ─────────────────────────────
  {
    id: "p7",
    slug: "seo-for-beginners",
    name: "SEO למתחילים - להופיע ראשונים בגוגל",
    categorySlug: "seo",
    price: 249,
    stock: 65,
    rating: 4.7,
    reviewsCount: 176,
    studentsCount: 1650,
    duration: "4 שעות",
    lessonsCount: 28,
    level: "מתחילים",
    shortDescription:
      "היסודות של קידום אתרים אורגני - ממחקר מילות מפתח ועד דירוג בעמוד הראשון בגוגל.",
    description:
      "קורס יסודות ל-SEO שמסביר בשפה פשוטה איך גוגל בוחר מי לדרג ראשון, ואיך להתאים את האתר שלכם - תוכן, מבנה וקישורים - כדי לטפס בתוצאות החיפוש בלי לשלם על פרסום.",
    highlights: [
      "איך מנוע החיפוש של גוגל עובד בפועל",
      "מחקר מילות מפתח בעלות פוטנציאל גבוה",
      "אופטימיזציה של כותרות ותגי מטא",
      "מבנה אתר ידידותי לגוגל ולגולשים",
      "מעקב אחרי דירוגים ותנועה אורגנית",
    ],
    syllabus: [
      { title: "יסודות", items: ["איך גוגל מדרג אתרים", "מחקר מילות מפתח", "הבנת המתחרים בעמוד התוצאות"] },
      { title: "יישום", items: ["אופטימיזציית עמודים", "מבנה אתר וניווט", "מדידה עם Search Console", "כתיבת תוכן לפי כוונת החיפוש"] },
    ],
    variants: standardVariants("seo-basics"),
    gradient: "from-[#0B2F91] to-[#05061A]",
  },
  {
    id: "p8",
    slug: "seo-content-keyword-research",
    name: "מחקר מילות מפתח וכתיבת תוכן ממוקד SEO",
    categorySlug: "seo",
    price: 199,
    stock: 58,
    rating: 4.6,
    reviewsCount: 101,
    studentsCount: 890,
    duration: "3 שעות",
    lessonsCount: 21,
    level: "מתחילים",
    shortDescription:
      "כותבים תוכן שגוגל אוהב וגולשים קוראים עד הסוף - עם דגש על כוונת חיפוש.",
    description:
      "תוכן שמדורג צריך גם לענות לגוגל וגם לבן אדם. נלמד לזהות כוונת חיפוש, לבנות מבנה עמוד שמכסה את הנושא לעומק, ולכתוב כותרות ופסקאות פתיחה שמייצרות זמן שהייה גבוה בעמוד.",
    highlights: [
      "זיהוי כוונת חיפוש (Search Intent)",
      "כלים חינמיים למחקר מילות מפתח",
      "מבנה עמוד שמכסה נושא לעומק",
      "כתיבת כותרות ופתיחים שממירים",
      "אופטימיזציית תמונות ומהירות טעינה",
    ],
    syllabus: [
      { title: "מחקר", items: ["כוונת חיפוש", "כלי מחקר מילות מפתח", "מיפוי מילות מפתח לעמודים קיימים"] },
      { title: "כתיבה", items: ["מבנה עמוד", "כותרות ופתיחים", "עדכון ורענון תוכן ישן"] },
    ],
    variants: standardVariants("seo-content"),
    gradient: "from-[#155DFC] to-[#0A0A0F]",
  },
  {
    id: "p9",
    slug: "advanced-technical-seo",
    name: "קידום אתרים מתקדם - טכני ובניית קישורים",
    categorySlug: "seo",
    price: 379,
    originalPrice: 469,
    stock: 20,
    rating: 4.9,
    reviewsCount: 64,
    studentsCount: 410,
    duration: "5.5 שעות",
    lessonsCount: 36,
    level: "בינוני",
    shortDescription:
      "SEO טכני, מהירות אתר ואסטרטגיית בניית קישורים לדירוג בר-קיימא לאורך זמן.",
    description:
      "לבעלי אתר קיים שרוצים לעבור שלב. נצלול ל-SEO טכני - מהירות טעינה, מבנה URL, נתונים מובנים (Schema) - ולאסטרטגיית בניית קישורים איכותית שמחזקת את הסמכות של האתר בעיני גוגל.",
    highlights: [
      "אבחון טכני מלא לאתר קיים",
      "שיפור מהירות טעינה וחוויית משתמש",
      "נתונים מובנים (Schema Markup)",
      "אסטרטגיית בניית קישורים איכותית",
      "מעקב וניתוח תחרותי מתקדם",
    ],
    syllabus: [
      { title: "טכני", items: ["אבחון אתר", "מהירות טעינה", "נתונים מובנים", "תיקון תוכן כפול"] },
      { title: "סמכות", items: ["בניית קישורים", "ניתוח מתחרים", "בניית קישורים פנימיים אסטרטגית"] },
    ],
    variants: standardVariants("technical-seo"),
    gradient: "from-[#05061A] to-[#0B2F91]",
  },

  // ── כלי AI ─────────────────────────────
  {
    id: "p10",
    slug: "chatgpt-for-business",
    name: "ChatGPT לעסקים - כתיבה, תוכן ואוטומציה",
    categorySlug: "ai-tools",
    price: 229,
    originalPrice: 299,
    stock: 80,
    rating: 4.8,
    reviewsCount: 231,
    studentsCount: 2240,
    duration: "3.5 שעות",
    lessonsCount: 25,
    level: "מתחילים",
    isNew: true,
    shortDescription:
      "מייצרים תוכן שיווקי, מיילים ותשובות ללקוחות תוך דקות עם פרומפטים מדויקים.",
    description:
      "קורס פרקטי לשימוש ב-ChatGPT בעסק - כתיבת פוסטים, מיילים שיווקיים, מענה ללקוחות ואוטומציות פשוטות שחוסכות שעות עבודה בשבוע. כולל ספריית פרומפטים מוכנה לשימוש.",
    highlights: [
      "כתיבת פרומפטים מדויקים לתוכן שיווקי",
      "בניית ספריית פרומפטים אישית לעסק",
      "כתיבת מיילים ומענה ללקוחות אוטומטי",
      "יצירת תוכניות תוכן ורעיונות במהירות",
      "אוטומציות בסיסיות לחיסכון בזמן",
    ],
    syllabus: [
      { title: "יסודות", items: ["איך לכתוב פרומפט טוב", "ספריית פרומפטים לעסק", "עבודה עם שיחה מתמשכת"] },
      { title: "יישום", items: ["תוכן שיווקי מהיר", "אוטומציה למענה ללקוחות", "ניתוח נתונים עסקיים בעזרת AI"] },
    ],
    variants: standardVariants("chatgpt-business"),
    gradient: "from-[#155DFC] to-[#0A0A0F]",
  },
  {
    id: "p11",
    slug: "ai-image-video-tools",
    name: "כלי AI ליצירת תמונות ווידאו לשיווק",
    categorySlug: "ai-tools",
    price: 249,
    stock: 46,
    rating: 4.7,
    reviewsCount: 92,
    studentsCount: 810,
    duration: "4 שעות",
    lessonsCount: 27,
    level: "מתחילים",
    isNew: true,
    shortDescription:
      "יוצרים תמונות, באנרים וקליפים לרשתות החברתיות עם כלי AI מובילים - בלי מעצב.",
    description:
      "תלמדו ליצור תוכן ויזואלי מקצועי - תמונות מוצר, באנרים לפרסום וקליפי וידאו קצרים - באמצעות כלי AI מובילים, גם אם אין לכם שום רקע בעיצוב או בעריכת וידאו.",
    highlights: [
      "יצירת תמונות שיווקיות מקצועיות ב-AI",
      "עיצוב באנרים ופוסטים תוך דקות",
      "יצירת קליפי וידאו קצרים מטקסט",
      "עריכה ושדרוג תוכן קיים עם AI",
      "בניית ספריית ויזואלים לעסק",
    ],
    syllabus: [
      { title: "תמונות", items: ["יצירת תמונות שיווקיות", "עיצוב באנרים", "התאמת תמונות למידות כל רשת"] },
      { title: "וידאו", items: ["יצירת קליפים מטקסט", "שדרוג תוכן קיים", "יצירת קול ותרגום אוטומטי"] },
    ],
    variants: standardVariants("ai-image-video"),
    gradient: "from-[#1B4DFF] to-[#0A0A0F]",
  },
  {
    id: "p12",
    slug: "ai-chatbot-automation",
    name: "בניית צ'אטבוט ואוטומציות AI לעסק",
    categorySlug: "ai-tools",
    price: 349,
    stock: 18,
    rating: 4.9,
    reviewsCount: 57,
    studentsCount: 320,
    duration: "5 שעות",
    lessonsCount: 30,
    level: "בינוני",
    shortDescription:
      "בונים צ'אטבוט אוטומטי לוואטסאפ ולאתר שעונה ללקוחות ומייצר לידים 24/7.",
    description:
      "קורס מעשי לבניית צ'אטבוט ואוטומציות ללא צורך בתכנות. נבנה יחד בוט שעונה על שאלות נפוצות, אוסף פרטי לידים ומעביר אותם למכירה - כדי שהעסק יעבוד גם כשאתם לא זמינים.",
    highlights: [
      "בניית צ'אטבוט לוואטסאפ ולאתר",
      "חיבור כלי אוטומציה ללא קוד",
      "איסוף לידים אוטומטי 24/7",
      "מענה חכם לשאלות נפוצות",
      "העברת לידים חמים לצוות המכירות",
    ],
    syllabus: [
      { title: "בנייה", items: ["בניית תסריט שיחה", "חיבור כלי אוטומציה", "בחירת פלטפורמת הבוט המתאימה"] },
      { title: "הפעלה", items: ["איסוף לידים", "מעקב ושיפור ביצועים", "התממשקות עם וואטסאפ עסקי"] },
    ],
    variants: standardVariants("ai-chatbot"),
    gradient: "from-[#0A0A0F] to-[#0B2F91]",
  },

  // ── צילום ועריכה ─────────────────────────────
  {
    id: "p13",
    slug: "smartphone-video-shooting",
    name: "צילום מקצועי בסמארטפון לרשתות חברתיות",
    categorySlug: "video-editing",
    price: 179,
    stock: 62,
    rating: 4.7,
    reviewsCount: 149,
    studentsCount: 1310,
    duration: "3 שעות",
    lessonsCount: 20,
    level: "מתחילים",
    shortDescription:
      "מצלמים תוכן שנראה מקצועי עם הטלפון בלבד - תאורה, זוויות וקומפוזיציה.",
    description:
      "לא צריך ציוד יקר כדי לצלם תוכן שנראה טוב. נלמד את עקרונות התאורה, הקומפוזיציה והזוויות שמעלים את רמת הצילום בטלפון בלבד, ואיך להתארגן לצילום מהיר ויעיל לפני כל פרסום.",
    highlights: [
      "עקרונות תאורה טבעית ומלאכותית",
      "קומפוזיציה וזוויות צילום מושכות",
      "יציבות ותנועת מצלמה חלקה",
      "צילום מוצרים בטלפון",
      "הכנת סט צילום ביתי פשוט",
    ],
    syllabus: [
      { title: "יסודות", items: ["תאורה נכונה", "קומפוזיציה", "יציבות ותנועת מצלמה"] },
      { title: "הפקה", items: ["צילום מוצרים", "בניית סט ביתי", "צילום אנשים וראיונות קצרים"] },
    ],
    variants: standardVariants("phone-shooting"),
    gradient: "from-[#2A55E5] to-[#0A0A0F]",
  },
  {
    id: "p14",
    slug: "capcut-video-editing",
    name: "עריכת וידאו ב-CapCut - מאפס לעריכה מקצועית",
    categorySlug: "video-editing",
    price: 199,
    originalPrice: 259,
    stock: 54,
    rating: 4.8,
    reviewsCount: 167,
    studentsCount: 1480,
    duration: "4 שעות",
    lessonsCount: 29,
    level: "מתחילים",
    shortDescription:
      "עורכים סרטונים קצרים ומושכים באפליקציית CapCut - חיתוכים, טקסט, מוזיקה ואפקטים.",
    description:
      "קורס עריכה מעשי לגמרי באפליקציית CapCut. נלמד לחתוך קצבי, להוסיף טקסטים וכתוביות אוטומטיות, לבחור מוזיקה שמתאימה לטרנד, ולייצא סרטון מוכן לפרסום תוך דקות.",
    highlights: [
      "עריכה קצבית שמחזיקה צפייה",
      "כתוביות אוטומטיות וטקסט דינמי",
      "בחירת מוזיקה ואפקטים מתאימים",
      "תבניות מהירות לעריכה חוזרת",
      "ייצוא בפורמט הנכון לכל רשת",
    ],
    syllabus: [
      { title: "יסודות עריכה", items: ["ממשק CapCut", "חיתוך קצבי", "עבודה עם שכבות ומעברים"] },
      { title: "שדרוג", items: ["כתוביות וטקסט", "מוזיקה ואפקטים", "ייצוא בפורמט הנכון לכל רשת"] },
    ],
    variants: standardVariants("capcut-editing"),
    gradient: "from-[#1B4DFF] to-[#132B7A]",
  },
  {
    id: "p15",
    slug: "reels-stories-production",
    name: "הפקת סרטוני רילס וסטוריז שמוכרים",
    categorySlug: "video-editing",
    price: 229,
    stock: 33,
    rating: 4.7,
    reviewsCount: 78,
    studentsCount: 590,
    duration: "3.5 שעות",
    lessonsCount: 23,
    level: "בינוני",
    shortDescription:
      "מהרעיון ועד הפרסום - מפיקים סרטון רילס שמעביר מסר שיווקי וסוגר מכירות.",
    description:
      "לא כל סרטון שמושך צפיות גם מוכר. נלמד לבנות סרטוני רילס וסטוריז עם מסר שיווקי ברור, קריאה לפעולה חזקה ומבנה שמוביל את הצופה מסקרנות ועד רכישה.",
    highlights: [
      "מבנה סרטון שמוביל למכירה",
      "כתיבת קריאה לפעולה אפקטיבית",
      "שילוב מוצר בתוך תוכן טבעי",
      "סדרת סטוריז תומכת מכירה",
      "לוח הפקה שבועי לתוכן מוכר",
    ],
    syllabus: [
      { title: "מסר", items: ["מבנה סרטון מוכר", "קריאה לפעולה", "בחירת זווית מכירה מתאימה למוצר"] },
      { title: "הפקה", items: ["שילוב מוצר בתוכן", "סדרת סטוריז", "מדידת תוצאות והפקת מסקנות"] },
    ],
    variants: standardVariants("reels-production"),
    gradient: "from-[#0B2F91] to-[#0A0A0F]",
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getRelatedProducts(product: Product, count = 4) {
  return products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .concat(products.filter((p) => p.categorySlug !== product.categorySlug))
    .slice(0, count);
}
