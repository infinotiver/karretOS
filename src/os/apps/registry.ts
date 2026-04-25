import { lazy } from "react";
import {
  BagSimpleIcon,
  ClockIcon,
  TimerIcon,
  TerminalIcon,
  NotePencilIcon,
  GearIcon,
  CarrotIcon,
  StorefrontIcon,
  PaintBrushIcon,
  ImageIcon,
  WindowsLogoIcon,
  WrenchIcon,
} from "@phosphor-icons/react";

import ClockApp from "@/os/apps/clock/ClockApp";

import TerminalApp from "./terminal/TerminalApp";
import NotesApp from "./notes/NotesApp";
import SettingsApp from "./settings/SettingsApp";
import type { AppDefinition, AppId } from "@/os/apps/types";
import WindowsApp from "./windows/WindowsApp";
import AppLauncherApp from "./applauncher/AppLauncherApp";
import AppStoreApp from "./store/AppStore";

const PomodoroApp = lazy(() => import("./pomodoro/PomodoroApp"));
const ExcalidrawApp = lazy(() => import("./excalidraw/ExcalidrawApp"));
const PortfolioApp = lazy(() => import("@/os/apps/portfolio/PortfolioApp"));
const DevToolsApp = lazy(() => import("./devtools/DevToolsApp"));
const PhotopeaApp = lazy(() => import("./photopea/PhotopeaApp"));

export const apps: AppDefinition[] = [
  {
    id: "launcher",
    title: "App Launcher",
    description: "Start any app",
    icon: CarrotIcon,
    component: AppLauncherApp,
    windowSurface: "glass",
    titleBar: false, // Hide title bar for launcher
    defaultSize: { w: 800, h: 400 },
    centerOnOpen: true,
    closeOnOutside: true,
    system: true,
    preinstalled: true,
  },
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Your personal site as an app inside the OS shell.",
    icon: BagSimpleIcon,
    component: PortfolioApp,
    system: true,
    preinstalled: true,
  },
  {
    id: "clock",
    title: "Clock",
    description: "Full-screen clock display.",
    icon: ClockIcon,
    component: ClockApp,
    preinstalled: true,
    system: true,
  },
  {
    id: "pomodoro",
    title: "Pomodoro",
    description: "Aesthetic pomodoro [iframe app]",
    component: PomodoroApp,
    icon: TimerIcon,
  },
  {
    id: "excalidraw",
    title: "Excalidraw",
    description: "Draw and build diagrams [iframe app]",
    component: ExcalidrawApp,
    icon: PaintBrushIcon,
  },
  {
    id: "notes",
    title: "kNotes",
    description: "Take Notes",
    component: NotesApp,
    icon: NotePencilIcon,
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "Interactive shell",
    component: TerminalApp,
    icon: TerminalIcon,
    system: true,
    preinstalled: true,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Make karretOS all yours",
    component: SettingsApp,
    icon: GearIcon,
    hasSidebar: true,
    defaultSize: { w: 860, h: 560 },
    system: true,
    preinstalled: true,
  },
  {
    id: "windows",
    title: "Windows",
    description: "Windows sucks as usual",
    component: WindowsApp,
    icon: WindowsLogoIcon,
  },
  {
    id: "devtools",
    title: "DevTools",
    description: "Developer tools: formatters, converters, and more.",
    icon: WrenchIcon,
    component: DevToolsApp,
    hasSidebar: true,
    defaultSize: { w: 800, h: 540 },
  },
  {
    id: "photopea",
    title: "Photopea",
    description: "Edit photo, add effects and more [iframe app]",
    component: PhotopeaApp,
    icon: ImageIcon,
  },
  {
    id: "appstore",
    title: "App Store",
    description: "Browse and manage apps",
    icon: StorefrontIcon,
    component: AppStoreApp,
    system: true,
  },
];

export const getApp = (id: AppId): AppDefinition =>
  apps.find((app) => app.id === id) ?? apps[0];
