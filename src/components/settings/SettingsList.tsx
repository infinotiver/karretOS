import type { LucideIcon } from "lucide-react";

interface SettingsListProps {
  settings: Array<{ icon: LucideIcon; title: string; description: string }>;
  active: string;
  onSelect: (title: string) => void;
}

export function SettingsList({
  settings,
  active,
  onSelect,
}: SettingsListProps) {
  return (
    <aside className="max-w-48 shrink-0 bg-card/80 overflow-y-auto p-2 flex flex-col gap-1">
      {settings.map(({ icon: Icon, title }) => (
        <button
          key={title}
          onClick={() => onSelect(title)}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm font-medium transition-colors ${
            active === title
              ? "bg-primary/10 text-foreground"
              : "text-muted-foreground hover:bg-muted/50"
          }`}
        >
          <Icon className="size-4" aria-hidden="true" />
          <span className="hidden lg:inline">{title}</span>
        </button>
      ))}
    </aside>
  );
}
