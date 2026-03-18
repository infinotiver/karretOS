import type { TransparencyMode } from "@/hooks/useTheme";

export type BlurLevel = "sm" | "md" | "lg" | "xl";
export type OpacityValue = "40" | "60" | "80";

export interface VisualConfig {
  blurLevel: BlurLevel;
  opacity: OpacityValue;
}

export interface TransparencyOption {
  mode: TransparencyMode;
  label: string;
  desc: string;
}

const VISUAL_CONFIGS: Record<TransparencyMode, VisualConfig> = {
  default: {
    blurLevel: "md",
    opacity: "60",
  },
  light: {
    blurLevel: "md",
    opacity: "40",
  },
  none: {
    blurLevel: "sm",
    opacity: "40",
  },
};

export const TRANSPARENCY_OPTIONS: readonly TransparencyOption[] =
  Object.entries(VISUAL_CONFIGS).map(([mode, config]) => ({
    mode: mode as TransparencyMode,
    label: mode.charAt(0).toUpperCase() + mode.slice(1),
    desc: `Blur ${config.blurLevel} • ${config.opacity}% opacity`,
  }));
export const getVisualConfig = (
  transparencyMode: TransparencyMode,
): VisualConfig => VISUAL_CONFIGS[transparencyMode];
