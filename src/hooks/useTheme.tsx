import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type BackgroundMode = "mountain" | "solid";
export type TransparencyMode = "default" | "light" | "none";

interface ThemeContextType {
  username: string;
  setUsername: (name: string) => void;
  backgroundMode: BackgroundMode;
  setBackgroundMode: (style: BackgroundMode) => void;
  transparencyMode: TransparencyMode;
  setTransparencyMode: (level: TransparencyMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(
    localStorage.getItem("karretOS_username") || "User",
  );
  const [backgroundMode, setBackgroundMode] =
    useState<BackgroundMode>("mountain");
  const [transparencyMode, setTransparencyMode] =
    useState<TransparencyMode>("default");

  const updateUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem("karretOS_username", name);
  };

  return (
    <ThemeContext.Provider
      value={{
        username,
        setUsername: updateUsername,
        backgroundMode,
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
