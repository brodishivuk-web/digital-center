import type { Product } from "@/lib/types";
import { generateAd } from "./generate";
import { publishAd } from "./publishers";
import type { SiteResult, TargetSite } from "./types";

export const MAX_SITES_PER_RUN = 10;

async function handleSite(product: Product, site: TargetSite, goal?: string): Promise<SiteResult> {
  const { ad, generatedBy } = await generateAd(product, site, goal);
  const outcome = await publishAd(site, ad, product);
  return {
    siteId: site.id,
    siteName: site.name,
    siteUrl: site.url,
    delivery: site.delivery,
    ad,
    generatedBy,
    ...outcome,
  };
}

export async function runCampaign(product: Product, sites: TargetSite[], goal?: string): Promise<SiteResult[]> {
  return Promise.all(sites.slice(0, MAX_SITES_PER_RUN).map((site) => handleSite(product, site, goal)));
}
