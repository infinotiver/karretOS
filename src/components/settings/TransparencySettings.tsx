import { cn } from "@/lib/utils";
import { TRANSPARENCY_OPTIONS } from "@/lib/visualConfig";
import { useTheme } from "@/hooks/useTheme";
import { Panel } from "@/components/common/Panel";

const backgroundOptions = [
  { mode: "mountain", label: "Mountain", desc: "With image blur" },
  { mode: "solid", label: "Solid", desc: "Flat color" },
];

export function TransparencySettings() {
  const {
    backgroundMode,
    setBackgroundMode,
    transparencyMode,
    setTransparencyMode,
  } = useTheme();

  return (
    <div className="space-y-4">
      <Panel title="Background Style">
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

      <Panel
        title="Opacity Level"
        description="Controls transparency for wallpapers, windows, and widgets"
      >
        <div className="space-y-2">
          {TRANSPARENCY_OPTIONS.map(({ mode, label, desc }) => {
            const isActive = transparencyMode === mode;
            return (
              <button
                key={mode}
                onClick={() => setTransparencyMode(mode)}
                className={cn(
                  "w-full rounded-lg border-2 px-4 py-3 text-left transition",
                  isActive
                    ? "border-primary bg-primary/15"
                    : "border-border/40 hover:border-border",
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">{desc}</span>
                </div>
              </button>
            );
          })}
        </div>
      </Panel>
    </div>
  );
}
