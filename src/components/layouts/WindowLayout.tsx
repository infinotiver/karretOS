import React from "react";
import { cn } from "@/lib/utils";

interface WindowLayoutProps {
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  header?: React.ReactNode;
}

export const WindowLayout: React.FC<WindowLayoutProps> = ({
  children,
  className,
  headerActions,
  footer,
  header,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background/20 text-foreground",
        className,
      )}
    >
      {/* Optional Custom Header */}
      {(header || headerActions) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border/40 bg-card/20">
          {header}
          {headerActions && (
            <div className="flex items-center gap-1 shrink-0">
              {headerActions}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 overflow-auto">{children}</div>

      {/* Footer */}
      {footer && (
        <div className="px-2 py-1.5 border-t border-border/40 text-xs text-muted-foreground rounded-[inherit]">
          {footer}
        </div>
      )}
    </div>
  );
};
