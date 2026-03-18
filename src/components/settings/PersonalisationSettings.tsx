import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { Panel } from "@/components/common/Panel";
import type { BackgroundMode } from "@/hooks/useTheme";

const backgroundOptions: Array<{
  mode: BackgroundMode;
  label: string;
  desc: string;
}> = [
  { mode: "mountain", label: "Mountain", desc: "Wallpaper with depth" },
  { mode: "solid", label: "Solid", desc: "Flat color focus" },
];

export function PersonalisationSettings() {
  const { backgroundMode, setBackgroundMode } = useTheme();

  return (
    <Panel title="Background">
      <div className="flex gap-3">
        {backgroundOptions.map((option) => {
          const isActive = backgroundMode === option.mode;
          return (
            <button
              key={option.mode}
              onClick={() => setBackgroundMode(option.mode)}
              className={cn(
                "flex-1 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition",
                isActive
                  ? "border-primary bg-primary/15"
                  : "border-border/40 hover:border-border",
              )}
            >
              <div className="text-sm font-semibold text-foreground">
                {option.label}
              </div>
              <div className="text-xs text-muted-foreground">{option.desc}</div>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
