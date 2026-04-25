import { useMemo, useState } from "react";
import { CheckCircle2, Settings, LockIcon, Pin, PinOff, X } from "lucide-react";
import { apps } from "@/os/apps/registry";
import { AppTile } from "@/components/common/AppTile";
import type { AppId, AppProps } from "@/os/apps/types";
import { useAppContext } from "@/hooks/useAppContext";
import { Button } from "@/components/ui/button";

export default function AppLauncherApp({
  onOpenApp,
  onCloseApp,
  installedApps,
  pinnedAppIds,
  onPinApp,
  onUnpinApp,
}: AppProps) {
  const { username } = useAppContext();
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const installed = new Set<AppId>(installedApps ?? apps.map((app) => app.id));

  const visibleApps = useMemo(
    () => apps.filter((app) => app.id !== "launcher"),
    [],
  );

  const installedList = visibleApps.filter((app) => installed.has(app.id));
  const pinnedSet = new Set<AppId>(pinnedAppIds ?? []);

  const openInstalledApp = (id: AppId) => {
    onOpenApp?.(id);
    onCloseApp?.();
  };

  const handleLock = () => {
    window.location.assign("/");
  };

  const openSettings = () => {
    onOpenApp?.("settings");
    onCloseApp?.();
  };

  return (
    <section className="flex h-full flex-col gap-3 rounded-2xl border border-border/40 p-4">
      <header className="flex items-center gap-2">
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={openSettings}
          className="justify-start"
          aria-label="Open user settings"
        >
          <Settings className="h-4 w-4" />
          <span>{username || "Guest"}</span>
        </Button>

        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          onClick={() => onCloseApp?.()}
          className="ml-auto"
          aria-label="Close launcher"
        >
          <X className="h-4 w-4" />
        </Button>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {installedList.map((app) => (
          <AppTile
            key={app.id}
            app={app}
            showDescription={false}
            selected={selectedId === app.id}
            layout="vertical"
            title={app.title}
            onSelect={() => setSelectedId(app.id)}
            onOpen={() => openInstalledApp(app.id)}
            action={
              pinnedSet.has(app.id) ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onUnpinApp?.(app.id)}
                  className="w-full"
                >
                  <PinOff className="h-4 w-4" />
                  <span>Unpin</span>
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onPinApp?.(app.id)}
                  className="w-full"
                >
                  <Pin className="h-4 w-4" />
                  <span>Pin</span>
                </Button>
              )
            }
            footer={
              app.system ? (
                <span className="inline-flex w-full items-center justify-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  System
                </span>
              ) : null
            }
          />
        ))}
      </div>

      <footer className="mt-auto flex items-center">
        <Button
          type="button"
          size="sm"
          variant="destructive"
          onClick={handleLock}
          aria-label="Suspend session"
          title="Suspend"
        >
          <LockIcon className="h-4 w-4" />
          <span>Suspend</span>
        </Button>
      </footer>
    </section>
  );
}
