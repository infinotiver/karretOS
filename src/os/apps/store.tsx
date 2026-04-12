import type { AppId, AppDefinition } from "@/os/apps/types";
import { apps } from "@/os/apps/registry";

const STORE_KEY = "karretos-installed-apps";

const getPreinstalled = () =>
  apps.filter((a) => a.preinstalled || a.system).map((a) => a.id);

export const loadInstalledApps = (): AppId[] => {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return getPreinstalled();
    const parsed = JSON.parse(raw) as AppId[];
    // Ensure system apps always exist
    const system = apps.filter((a) => a.system).map((a) => a.id);
    return Array.from(new Set([...parsed, ...system]));
  } catch {
    return getPreinstalled();
  }
};

export const saveInstalledApps = (ids: AppId[]) => {
  localStorage.setItem(STORE_KEY, JSON.stringify(ids));
};

export const isInstallable = (app: AppDefinition) => !app.system;

export const installApp = (ids: AppId[], id: AppId) => {
  if (ids.includes(id)) return ids;
  const next = [...ids, id];
  saveInstalledApps(next);
  return next;
};

export const uninstallApp = (ids: AppId[], id: AppId) => {
  const app = apps.find((a) => a.id === id);
  if (app?.system) return ids;
  const next = ids.filter((x) => x !== id);
  saveInstalledApps(next);
  return next;
};
