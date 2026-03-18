import { useTheme } from "@/hooks/useTheme";
import { getVisualConfig, type VisualConfig } from "@/lib/visualConfig";

export const useVisualConfig = (): VisualConfig => {
  const { transparencyMode } = useTheme();
  return getVisualConfig(transparencyMode);
};
