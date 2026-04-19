import { useMemo, useState } from "react";
import { CheckCircle2, Download, Trash2 } from "lucide-react";
import { apps } from "@/os/apps/registry";
import type { AppId, AppProps } from "@/os/apps/types";
import { Button } from "@/components/ui/button";
import { AppTile } from "@/components/common/AppTile";

export default function AppStoreApp({
  installedApps,
  onInstallApp,
  onUninstallApp,
}: AppProps) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const installedSet = useMemo(
    () => new Set<AppId>(installedApps ?? apps.map((a) => a.id)),
    [installedApps],
  );

  const manageableApps = useMemo(
    () => apps.filter((a) => a.id !== "launcher" && a.id !== "appstore"),
    [],
  );

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <header className="px-2">
        <h1 className="text-2xl font-black tracking-tight text-foreground">
          App Store
        </h1>
        <p className="text-xs text-muted-foreground">
          Manage installs in one place
        </p>
      </header>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {manageableApps.map((app) => {
          const isInstalled = installedSet.has(app.id);
          const isSystem = app.system ?? false;

          return (
            <AppTile
              key={app.id}
              app={app}
              selected={selectedId === app.id}
              layout="vertical"
              onSelect={() => setSelectedId(app.id)}
              action={
                isInstalled ? (
                  isSystem ? (
                    <span className="inline-flex w-full items-center justify-center gap-1 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      System
                    </span>
                  ) : (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onUninstallApp?.(app.id)}
                      className="w-full"
                    >
                      <Trash2 className="mr-1 h-4 w-4" />
                      Uninstall
                    </Button>
                  )
                ) : (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onInstallApp?.(app.id)}
                    className="w-full"
                  >
                    <Download className="mr-1 h-4 w-4" />
                    Install
                  </Button>
                )
              }
            />
          );
        })}
      </div>
    </section>
  );
}
