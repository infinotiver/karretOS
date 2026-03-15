import { useTheme } from "@/hooks/useTheme";
import { getVisualConfig, type VisualConfig } from "@/lib/visualConfig";

export const useVisualConfig = (): VisualConfig => {
  const { backgroundMode, transparencyMode } = useTheme();
  return getVisualConfig(backgroundMode, transparencyMode);
};
