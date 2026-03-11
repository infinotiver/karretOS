import type { OpacityLevel, BackgroundStyle } from "@/hooks/useTheme";

export interface BlurOpacityConfig {
  blur: string;
  opacity: string;
  bgOverlay: string;
  gradientOpacity: string;
  noiseAlpha: number;
}

export const getBlurOpacityConfig = (
  backgroundStyle: BackgroundStyle,
  opacityLevel: OpacityLevel,
): BlurOpacityConfig => {
  const configs: Record<
    BackgroundStyle,
    Record<OpacityLevel, BlurOpacityConfig>
  > = {
    mountain: {
      default: {
        blur: "blur-sm",
        opacity: "opacity-100",
        bgOverlay: "bg-background/45",
        gradientOpacity: "opacity-100",
        noiseAlpha: 15,
      },
      light: {
        blur: "blur",
        opacity: "opacity-60",
        bgOverlay: "bg-background/25",
        gradientOpacity: "opacity-60",
        noiseAlpha: 10,
      },
      none: {
        blur: "blur-md",
        opacity: "opacity-30",
        bgOverlay: "bg-transparent",
        gradientOpacity: "opacity-30",
        noiseAlpha: 5,
      },
    },
    solid: {
      default: {
        blur: "blur-none",
        opacity: "opacity-100",
        bgOverlay: "bg-background/80",
        gradientOpacity: "opacity-100",
        noiseAlpha: 12,
      },
      light: {
        blur: "blur-none",
        opacity: "opacity-60",
        bgOverlay: "bg-background/60",
        gradientOpacity: "opacity-60",
        noiseAlpha: 8,
      },
      none: {
        blur: "blur-none",
        opacity: "opacity-30",
        bgOverlay: "bg-background/40",
        gradientOpacity: "opacity-30",
        noiseAlpha: 4,
      },
    },
  };

  return configs[backgroundStyle][opacityLevel];
};
