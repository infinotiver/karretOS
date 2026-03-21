import type React from "react";

export type AppId =
  | "portfolio"
  | "clock"
  | "pomodoro"
  | "terminal"
  | "notes"
  | "settings"
  | "windows"
  | "launcher"
  | "devtools";

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
  resizable?: boolean; // Optional: configure resizing
  defaultSize?: { w: number; h: number };
  defaultOffset?: { x: number; y: number };
  centerOnOpen?: boolean;
  closeOnOutside?: boolean;
}
