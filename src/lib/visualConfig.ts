import type { BackgroundMode, TransparencyMode } from "@/hooks/useTheme";

export type BlurLevel = "none" | "sm" | "md";

export interface VisualConfig {
  blur: BlurLevel;
  surfaceClass: "bg-background/80" | "bg-background/60" | "bg-background/40";
  opacityClass: "opacity-80" | "opacity-60" | "opacity-40";
}

const VISUAL_CONFIGS: Record<
  BackgroundMode,
  Record<TransparencyMode, VisualConfig>
> = {
  mountain: {
    default: {
      blur: "md",
      surfaceClass: "bg-background/80",
      opacityClass: "opacity-80",
    },
    light: {
      blur: "sm",
      surfaceClass: "bg-background/60",
      opacityClass: "opacity-60",
    },
    none: {
      blur: "none",
      surfaceClass: "bg-background/40",
      opacityClass: "opacity-40",
    },
  },
  solid: {
    default: {
      blur: "none",
      surfaceClass: "bg-background/80",
      opacityClass: "opacity-80",
    },
    light: {
      blur: "none",
      surfaceClass: "bg-background/60",
      opacityClass: "opacity-60",
    },
    none: {
      blur: "none",
      surfaceClass: "bg-background/40",
      opacityClass: "opacity-40",
    },
  },
};

export const getVisualConfig = (
  backgroundMode: BackgroundMode,
  transparencyMode: TransparencyMode,
): VisualConfig => VISUAL_CONFIGS[backgroundMode][transparencyMode];

export const toBackgroundBlurClass = (blur: BlurLevel): string => {
  if (blur === "md") return "blur-md";
  if (blur === "sm") return "blur-sm";
  return "blur-none";
};

export const toBackdropBlurClass = (blur: BlurLevel): string => {
  if (blur === "md") return "backdrop-blur-md";
  if (blur === "sm") return "backdrop-blur-sm";
  return "backdrop-blur-none";
};
