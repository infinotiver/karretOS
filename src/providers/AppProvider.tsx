import { ThemeProvider } from "@/hooks/useTheme";
import type { ReactNode } from "react";

export function AppProvider({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
