import { useTheme, type OpacityLevel } from "@/hooks/useTheme";

export function TransparencySettings() {
  const { backgroundStyle, setBackgroundStyle, opacityLevel, setOpacityLevel } =
    useTheme();

  return (
    <div className="space-y-6">
      {/* Background Style Choice */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Background Style</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setBackgroundStyle("mountain")}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              backgroundStyle === "mountain"
                ? "border-primary bg-primary/15"
                : "border-border/40 hover:border-border"
            }`}
          >
            <div className="text-sm font-medium">Mountain</div>
            <div className="text-xs text-muted-foreground">With image blur</div>
          </button>

          <button
            onClick={() => setBackgroundStyle("solid")}
            className={`flex-1 p-4 rounded-lg border-2 transition-all ${
              backgroundStyle === "solid"
                ? "border-primary bg-primary/15"
                : "border-border/40 hover:border-border"
            }`}
          >
            <div className="text-sm font-medium">Solid</div>
            <div className="text-xs text-muted-foreground">Flat color</div>
          </button>
        </div>
      </div>

      {/* Opacity Level */}
      <div>
        <h3 className="mb-3 font-semibold text-foreground">Opacity Level</h3>
        <p className="text-xs text-muted-foreground mb-3">
          Controls transparency of background and UI elements
        </p>
        <div className="space-y-2">
          {(
            [
              {
                level: "default" as OpacityLevel,
                label: "Default",
                desc: "Full opacity",
              },
              {
                level: "light" as OpacityLevel,
                label: "Light",
                desc: "60% opacity",
              },
              {
                level: "none" as OpacityLevel,
                label: "Minimal",
                desc: "30% opacity",
              },
            ] as const
          ).map(({ level, label, desc }) => (
            <button
              key={level}
              onClick={() => setOpacityLevel(level)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                opacityLevel === level
                  ? "border-primary bg-primary/15"
                  : "border-border/40 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
