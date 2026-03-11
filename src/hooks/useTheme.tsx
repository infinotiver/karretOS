import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type BackgroundStyle = "mountain" | "solid";
export type OpacityLevel = "default" | "light" | "none";

interface ThemeContextType {
  username: string;
  setUsername: (name: string) => void;
  backgroundStyle: BackgroundStyle;
  setBackgroundStyle: (style: BackgroundStyle) => void;
  opacityLevel: OpacityLevel;
  setOpacityLevel: (level: OpacityLevel) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState(
    localStorage.getItem("karretOS_username") || "User",
  );
  const [backgroundStyle, setBackgroundStyle] =
    useState<BackgroundStyle>("mountain");
  const [opacityLevel, setOpacityLevel] = useState<OpacityLevel>("default");

  const updateUsername = (name: string) => {
    setUsername(name);
    localStorage.setItem("karretOS_username", name);
  };

  return (
    <ThemeContext.Provider
      value={{
        username,
        setUsername: updateUsername,
        backgroundStyle,
        setBackgroundStyle,
        opacityLevel,
        setOpacityLevel,
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
