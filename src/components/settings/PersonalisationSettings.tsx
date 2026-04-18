import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";
import { Panel } from "@/components/common/Panel";
import { CheckCircleIcon } from "@phosphor-icons/react";
export function PersonalisationSettings() {
  const { backgroundMode, setBackgroundMode, backgroundOptions } = useTheme();

  return (
    <Panel title="Background">
      <div className="flex flex-wrap gap-2">
        {backgroundOptions.map((option) => {
          const isActive = backgroundMode === option.mode;
          return (
            <button
              key={option.mode}
              onClick={() => setBackgroundMode(option.mode)}
              className={cn(
                "group w-fit overflow-hidden rounded-lg border text-left text-sm font-medium transition-all",
                isActive
                  ? "border-primary/50 bg-primary/10 shadow-sm"
                  : "border-border/40 bg-background/30 hover:border-border hover:bg-background/50",
              )}
            >
              <div className="flex items-center justify-between gap-2 px-3 pt-3">
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    {option.label}
                  </div>
                </div>
                {isActive && (
                  <CheckCircleIcon className="h-5 w-5 text-primary" />
                )}
              </div>

              <div className="px-3 pb-3 pt-2">
                <div className="flex h-20 w-40 items-center justify-center overflow-hidden rounded-md border border-border/40 bg-muted/20">
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={`${option.label} background preview`}
                      className="h-full w-full object-cover transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-muted/70 to-muted/40">
                      <div className="h-8 w-8 rounded-full border border-border/40 bg-background/60" />
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Panel>
  );
}
