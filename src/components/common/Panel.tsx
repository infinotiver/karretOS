import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}

export const Panel = ({
  title,
  description,
  children,
  className,
  padded = true,
}: PanelProps) => (
  <div
    className={cn(
      "w-full rounded-lg border border-border bg-card",
      className,
    )}
  >
    {(title || description) && (
      <div className="border-b border-border/40 px-4 py-3">
        {title && (
          <p className="text-sm font-semibold text-foreground">{title}</p>
        )}
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    )}

    <div className={cn(padded ? "space-y-4 px-4 py-4" : "", "w-full")}>
      {children}
    </div>
  </div>
);

export default Panel;
