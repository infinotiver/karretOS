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
  const [username, setUsername] = useState(() => {
    try {
      const usernameStored = localStorage.getItem("karretOS_username");
      return usernameStored || "User";
    } catch {
      return "User";
    }
  });

  const [backgroundType, setBackgroundType] = useState<BackgroundType>(() => {
    try {
      const backgroundStored = localStorage.getItem("karretOS_bg");
      if (
        backgroundStored &&
        ["default", "blur-minimal", "solid", "transparent"].includes(
          backgroundStored,
        )
      ) {
        return backgroundStored as BackgroundType;
      }
      return "default";
    } catch {
      return "default";
    }
  });

  const updateUsername = (name: string) => {
    setUsername(name);
    try {
      localStorage.setItem("karretOS_username", name);
    } catch {
      console.log("An error occurred while saving username to localstorage");
    }
  };

  const updateBackground = (type: BackgroundType) => {
    setBackgroundType(type);
    try {
      localStorage.setItem("karretOS_bg", type);
    } catch {
      console.log("An error occurred while saving background to localstorage");
    }
  };

  return (
    <AppContext.Provider
      value={{
        username,
        setUsername: updateUsername, // 3. Use the new wrapper here
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
