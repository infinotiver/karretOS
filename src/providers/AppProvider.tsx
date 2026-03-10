import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { ThemeProvider, type BackgroundType } from "@/hooks/useTheme";

interface AppContextType {
  username: string;
  setUsername: (username: string) => void;
  backgroundType: BackgroundType;
  setBackgroundType: (type: BackgroundType) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("User");
  const [backgroundType, setBackgroundType] = useState<BackgroundType>(() => {
    try {
      const stored = localStorage.getItem("karretOS_bg");
      if (
        stored &&
        ["default", "blur-minimal", "solid", "transparent"].includes(stored)
      ) {
        return stored as BackgroundType;
      }
      return "default";
    } catch {
      return "default";
    }
  });

  const updateBackground = (type: BackgroundType) => {
    setBackgroundType(type);
    try {
      localStorage.setItem("karretOS_bg", type);
    } catch {
      // Silently fail if localStorage unavailable
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername,
        backgroundType,
        setBackgroundType: updateBackground,
      }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
