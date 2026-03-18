import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: ReactNode;
  variant?: "ghost" | "soft" | "accent";
  className?: string;
}

const VARIANT_STYLES: Record<BadgeProps["variant"], string> = {
  accent: "bg-primary/15 text-primary",
  ghost: "bg-muted/70 text-muted-foreground",
  soft: "bg-background/60 text-foreground",
};

export const Badge = ({ children, variant = "ghost", className }: BadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-tight",
      VARIANT_STYLES[variant],
      className,
    )}
  >
    {children}
  </span>
);

export default Badge;
