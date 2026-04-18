import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import bg from "@/assets/assets/bg.png";
import bg2 from "@/assets/assets/bg2.png";
import bg3 from "@/assets/assets/bg3.png";

export type BackgroundMode = string;
export type TransparencyMode = "default" | "light" | "none";

export interface BackgroundOption {
  mode: BackgroundMode;
  label: string;
  image?: string;
}

export const BACKGROUND_OPTIONS: BackgroundOption[] = [
  { mode: "solid", label: "Solid" },
  {
    mode: "abstract",
    label: "Abstract",
    image: bg3,
  },
  {
    mode: "mountain",
    label: "Mountains",
    image: bg2,
  },
  {
    mode: "classic",
    label: "Classic",
    image: bg,
  },
];

interface ThemeContextType {
  username: string;
  setUsername: (name: string) => void;
  backgroundMode: BackgroundMode;
  backgroundOptions: BackgroundOption[];
  setBackgroundMode: (style: BackgroundMode) => void;
  transparencyMode: TransparencyMode;
  setTransparencyMode: (level: TransparencyMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(
    localStorage.getItem("karretOS_username") || "User",
  );
  const [backgroundMode, setBackgroundModeState] = useState<BackgroundMode>(
    localStorage.getItem("karretOS_backgroundMode") || "solid",
  );
  const [transparencyMode, setTransparencyMode] =
    useState<TransparencyMode>("default");

  const updateUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem("karretOS_username", name);
  };

  const setBackgroundMode = (mode: BackgroundMode) => {
    const exists = BACKGROUND_OPTIONS.some((opt) => opt.mode === mode);
    const next = exists ? mode : "solid";
    setBackgroundModeState(next);
    localStorage.setItem("karretOS_backgroundMode", next);
  };

  return (
    <ThemeContext.Provider
      value={{
        username,
        setUsername: updateUsername,
        backgroundMode,
        backgroundOptions: BACKGROUND_OPTIONS,
        setBackgroundMode,
        transparencyMode,
        setTransparencyMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
}
