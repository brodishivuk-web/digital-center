import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";
import { MAX_SITES_PER_RUN, runCampaign } from "@/lib/ads-agent/agent";
import type { AdPlatform, DeliveryMethod, TargetSite } from "@/lib/ads-agent/types";

export const maxDuration = 60;

const platforms: AdPlatform[] = ["facebook-group", "instagram", "classifieds", "forum", "newsletter", "general"];
const deliveries: DeliveryMethod[] = ["webhook", "email", "manual"];

function parseSite(raw: unknown): TargetSite | null {
  if (typeof raw !== "object" || raw === null) return null;
  const s = raw as Record<string, unknown>;
  const name = typeof s.name === "string" ? s.name.trim() : "";
  const url = typeof s.url === "string" ? s.url.trim() : "";
  const platform = platforms.includes(s.platform as AdPlatform) ? (s.platform as AdPlatform) : "general";
  const delivery = deliveries.includes(s.delivery as DeliveryMethod) ? (s.delivery as DeliveryMethod) : "manual";
  if (!name || !url) return null;
  return {
    id: typeof s.id === "string" && s.id ? s.id : `${name}-${url}`,
    name,
    url,
    platform,
    delivery,
    webhookUrl: typeof s.webhookUrl === "string" && s.webhookUrl.trim() ? s.webhookUrl.trim() : undefined,
    email: typeof s.email === "string" && s.email.trim() ? s.email.trim() : undefined,
    notes: typeof s.notes === "string" && s.notes.trim() ? s.notes.trim() : undefined,
  };
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "בקשה לא תקינה" }, { status: 400 });
  }

  const product = products.find((p) => p.slug === body.productSlug);
  if (!product) {
    return NextResponse.json({ error: "הקורס שנבחר לא נמצא" }, { status: 400 });
  }

  const rawSites: unknown[] = Array.isArray(body.sites) ? body.sites : [];
  const sites = rawSites.map(parseSite).filter((s): s is TargetSite => s !== null);
  if (sites.length === 0) {
    return NextResponse.json({ error: "יש להוסיף לפחות אתר יעד אחד (עם שם וכתובת)" }, { status: 400 });
  }
  if (sites.length > MAX_SITES_PER_RUN) {
    return NextResponse.json({ error: `אפשר לפרסם עד ${MAX_SITES_PER_RUN} אתרים בהרצה אחת` }, { status: 400 });
  }

  const goal = typeof body.goal === "string" ? body.goal.trim().slice(0, 500) : undefined;
  const results = await runCampaign(product, sites, goal || undefined);
  return NextResponse.json({ results });
}
