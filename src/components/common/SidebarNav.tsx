import type React from "react";
import { cn } from "@/lib/utils";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarNavProps {
  title: string;
  titleIcon?: React.ComponentType<{ className?: string }>;
  items: SidebarNavItem[];
  activeId: string;
  onSelect: (id: string) => void;
  className?: string;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  title,
  titleIcon: TitleIcon,
  items,
  activeId,
  onSelect,
  className,
}) => {
  return (
    <aside
      className={cn(
        "flex h-full w-56 min-w-44 flex-col border-r border-border/40 bg-background/70",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border/30 px-4 py-3 text-base font-semibold">
        {TitleIcon && <TitleIcon className="h-4 w-4" />}
        <span>{title}</span>
      </div>
      <nav className="flex-1 space-y-1 p-2">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              activeId === item.id
                ? "bg-primary/10 text-foreground font-semibold"
                : "text-muted-foreground hover:bg-muted/40"
            }`}
          >
            <item.icon className="h-4 w-4" />
            <span className="truncate">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};
