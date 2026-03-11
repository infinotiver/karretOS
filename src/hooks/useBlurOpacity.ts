import { useAppContext } from "@/hooks/useAppContext";
import {
  getBlurOpacityConfig,
  type BlurOpacityConfig,
} from "@/lib/blurOpacityHelper";

export const useBlurOpacity = (): BlurOpacityConfig => {
  const { backgroundStyle, opacityLevel } = useAppContext();
  return getBlurOpacityConfig(backgroundStyle, opacityLevel);
};
