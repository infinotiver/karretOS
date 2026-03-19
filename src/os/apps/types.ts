import type React from "react";

export type AppId =
  | "portfolio"
  | "clock"
  | "pomodoro"
  | "terminal"
  | "notes"
  | "settings"
  | "windows"
  | "launcher";

export interface AppProps {
  isActive: boolean;
  onOpenApp?: (id: AppId) => void;
  onCloseApp?: () => void;
}

export interface AppDefinition {
  id: AppId;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<AppProps>;
  titleBar?: boolean; // Optional: override default title bar behavior
}
