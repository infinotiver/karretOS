import { lazy } from "react";
import {
  Briefcase,
  Clock,
  TimerIcon,
  TerminalIcon,
  NotebookPenIcon,
  SettingsIcon,
  // Search,
  CarrotIcon
} from "lucide-react";
import { WindowsLogoIcon } from "@phosphor-icons/react";
import { Wrench } from "lucide-react";

import ClockApp from "@/os/apps/clock/ClockApp";

import TerminalApp from "./terminal/TerminalApp";
import NotesApp from "./notes/NotesApp";
import SettingsApp from "./settings/SettingsApp";
import type { AppDefinition, AppId } from "@/os/apps/types";
import WindowsApp from "./windows/WindowsApp";
import AppLauncherApp from "./applauncher/AppLauncherApp";

const PomodoroApp = lazy(() => import("./pomodoro/PomodoroApp"));
const PortfolioApp = lazy(() => import("@/os/apps/portfolio/PortfolioApp"));
const DevToolsApp = lazy(() => import("./devtools/DevToolsApp"));

export const apps: AppDefinition[] = [
  {
    id: "launcher",
    title: "App Launcher",
    description: "Start any app",
    icon: CarrotIcon,
    component: AppLauncherApp,
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
    icon: Briefcase,
    component: PortfolioApp,
    system: true,
    preinstalled: true,
  },
  {
    id: "clock",
    title: "Clock",
    description: "Full-screen clock display.",
    icon: Clock,
    component: ClockApp,
  },
  {
    id: "pomodoro",
    title: "Pomodoro",
    description: "Aesthetic pomodoro [iframe app]",
    component: PomodoroApp,
    icon: TimerIcon,
  },
  {
    id: "notes",
    title: "kNotes",
    description: "Take Notes",
    component: NotesApp,
    icon: NotebookPenIcon,
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "Interactive shell",
    component: TerminalApp,
    icon: TerminalIcon,
  },
  {
    id: "settings",
    title: "Settings",
    description: "Make karretOS all yours",
    component: SettingsApp,
    icon: SettingsIcon,
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
    icon: Wrench,
    component: DevToolsApp,
    hasSidebar: true,
    defaultSize: { w: 800, h: 540 },
  },
];

export const getApp = (id: AppId): AppDefinition =>
  apps.find((app) => app.id === id) ?? apps[0];
