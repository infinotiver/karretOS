import { useMemo, useState } from "react";
import { CheckCircle2, X } from "lucide-react";
import { apps } from "@/os/apps/registry";
import {AppTile} from "@/components/common/AppTile";
import type { AppId, AppProps } from "@/os/apps/types";

export default function AppLauncherApp({
  onOpenApp,
  onCloseApp,
  installedApps,
}: AppProps) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const installed = new Set<AppId>(installedApps ?? apps.map((app) => app.id));

  const visibleApps = useMemo(
    () => apps.filter((app) => app.id !== "launcher"),
    [],
  );

  const installedList = visibleApps.filter((app) => installed.has(app.id));

  const openInstalledApp = (id: AppId) => {
    onOpenApp?.(id);
    onCloseApp?.();
  };

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="p-4 text-2xl font-black tracking-tight text-foreground">
          App Launcher
        </h1>
        <button
          type="button"
          onClick={() => onCloseApp?.()}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/60 text-muted-foreground transition hover:text-foreground"
          aria-label="Close launcher"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {installedList.map((app) => (
          <AppTile
            key={app.id}
            app={app}
            selected={selectedId === app.id}
            layout="vertical"
            title={`${app.title} — double-click to open`}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => openInstalledApp(app.id)}
            footer={
              app.system ? (
                <span className="inline-flex w-full items-center justify-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  System
                </span>
              ) : null
            }
          />
        ))}
      </div>
    </section>
  );
}
