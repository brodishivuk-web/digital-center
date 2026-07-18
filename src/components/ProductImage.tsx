import { getCategory } from "@/data/categories";
import { CategoryIcon } from "@/components/icons/CategoryIcon";

export function ProductImage({
  categorySlug,
  gradient,
  className = "",
  iconClassName = "h-10 w-10",
}: {
  categorySlug: string;
  gradient: string;
  className?: string;
  iconClassName?: string;
}) {
  const category = getCategory(categorySlug);

  return (
    <div
      className={`relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${gradient} ${className}`}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5) 0, transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.25) 0, transparent 45%)",
        }}
      />
      <CategoryIcon
        icon={category?.icon ?? "sparkles"}
        className={`${iconClassName} relative text-white/90`}
        strokeWidth={1.5}
      />
    </div>
  );
}
