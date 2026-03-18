import { Briefcase, Clock, TimerIcon, TerminalIcon, Paperclip, Settings2Icon } from "lucide-react";
import { SquaresFourIcon } from "@phosphor-icons/react";
import ClockApp from "@/os/apps/clock/ClockApp";
import PortfolioApp from "@/os/apps/portfolio/PortfolioApp";
import PomodoroApp from "./pomodoro/PomodoroApp";
import TerminalApp from "./terminal/TerminalApp";
import NotesApp from "./notes/NotesApp";
import SettingsApp from "./settings/SettingsApp";
import type { AppDefinition, AppId } from "@/os/apps/types";
import WindowsApp from "./windows/WindowsApp";

export const apps: AppDefinition[] = [
  {
    id: "portfolio",
    title: "Portfolio",
    description: "Your personal site as an app inside the OS shell.",
    icon: Briefcase,
    component: PortfolioApp,
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
    icon: Paperclip,
  },
  {
    id: "terminal",
    title: "Terminal",
    description: "Interactive shell",
    component: TerminalApp,
    icon: TerminalIcon
  },
  {
    id: "settings",
    title: "Settings",
    description: "Make karretOS all yours",
    component: SettingsApp,
    icon: Settings2Icon
  },
  {
    id: "windows",
    title: "Windows",
    description: "Windows sucks as usual",
    component: WindowsApp,
    icon: SquaresFourIcon
  }
];

export const getApp = (id: AppId): AppDefinition =>
  apps.find((app) => app.id === id) ?? apps[0];
