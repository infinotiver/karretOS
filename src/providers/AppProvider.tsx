import { ThemeProvider } from "@/hooks/useTheme";
import { FeatureFlagsProvider } from "@/providers/FeatureFlagsProvider";
import type { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FeatureFlagsProvider>{children}</FeatureFlagsProvider>
    </ThemeProvider>
  );
}
