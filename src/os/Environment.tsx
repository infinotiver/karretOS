import type { PropsWithChildren } from "react";
import Noise from "@/components/Noise";
import { useTheme } from "@/hooks/useTheme";
import { getBlurOpacityConfig } from "@/lib/blurOpacityHelper";
import bg from "@/assets/assets/bg.png";

const Environment = ({ children }: PropsWithChildren) => {
  const { backgroundStyle, opacityLevel } = useTheme();
  const config = getBlurOpacityConfig(backgroundStyle, opacityLevel);

  return (
    <div className="relative h-screen w-full overflow-hidden text-foreground">
      {/* Background image (hidden when solid) */}
      {backgroundStyle !== "solid" && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 h-full w-full object-cover grayscale ${config.blur}`}
        />
      )}

      {/* Background overlay */}
      <div
        className={`pointer-events-none absolute inset-0 ${config.bgOverlay}`}
      />

      {/* Gradient overlay */}
      <div
        className={`pointer-events-none absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/18 ${config.gradientOpacity}`}
      />

      <Noise
        patternSize={200}
        patternScaleX={2}
        patternScaleY={2}
        patternRefreshInterval={2}
        patternAlpha={config.noiseAlpha}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

export default Environment;
