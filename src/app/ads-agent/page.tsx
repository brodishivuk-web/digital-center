import type { Metadata } from "next";
import { AdsAgentView } from "@/components/AdsAgentView";

export const metadata: Metadata = {
  title: "סוכן פרסום AI | Digital Center",
  description: "סוכן AI שכותב ומפרסם מודעות מותאמות לקורסים שלכם באתרים שתבחרו.",
};

export default function AdsAgentPage() {
  return <AdsAgentView />;
}
