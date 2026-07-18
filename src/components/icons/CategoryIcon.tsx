import { Megaphone, MessageCircleHeart, Search, Sparkles, Video, type LucideProps } from "lucide-react";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  megaphone: Megaphone,
  "heart-chat": MessageCircleHeart,
  search: Search,
  sparkles: Sparkles,
  video: Video,
};

export function CategoryIcon({ icon, ...props }: { icon: string } & LucideProps) {
  const Icon = ICONS[icon] ?? Sparkles;
  return <Icon {...props} />;
}
