import { getTypeColors } from "@/lib/typeColors";

interface TypeBadgeProps {
  type: string;
  size?: "sm" | "md" | "lg";
}

export function TypeBadge({ type, size = "md" }: TypeBadgeProps) {
  const colors = getTypeColors(type);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-xs font-semibold",
    lg: "px-4 py-1.5 text-sm font-semibold",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full uppercase tracking-wider ${colors.bg} ${colors.text} ${sizeClasses[size]}`}
    >
      {type}
    </span>
  );
}
