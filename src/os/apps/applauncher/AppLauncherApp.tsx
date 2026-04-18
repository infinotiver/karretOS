import { useMemo, useState } from "react";
import { CheckCircle2, Download, Trash2, X } from "lucide-react";
import { apps } from "@/os/apps/registry";
import type { AppId, AppProps } from "@/os/apps/types";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/common/Panel";

export default function AppLauncherApp({
  onOpenApp,
  onCloseApp,
  installedApps,
  onInstallApp,
  onUninstallApp,
}: AppProps) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const installed = new Set<AppId>(installedApps ?? apps.map((app) => app.id));

  const visibleApps = useMemo(
    () => apps.filter((app) => app.id !== "launcher"),
    [],
  );

  const installedList = visibleApps.filter((app) => installed.has(app.id));
  const installableList = visibleApps.filter((app) => !installed.has(app.id));

  const openInstalledApp = (id: AppId) => {
    onOpenApp?.(id);
    onCloseApp?.();
  };

  const renderAppTile = (
    app: (typeof visibleApps)[number],
    mode: "installed" | "installable",
  ) => {
    const Icon = app.icon;
    const isSelected = selectedId === app.id;
    const isSystem = app.system ?? false;

    return (
      <div
        key={app.id}
        className={`rounded-lg border p-2 ${
          isSelected ? "border-primary/40 bg-primary/5" : "border-border/40"
        }`}
      >
        <button
          type="button"
          onClick={() => setSelectedId(app.id)}
          onDoubleClick={() => mode === "installed" && openInstalledApp(app.id)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && mode === "installed") {
              openInstalledApp(app.id);
            }
          }}
          className="flex w-full flex-col items-center gap-2"
          title={
            mode === "installed"
              ? `${app.title} — double-click to open`
              : app.title
          }
        >
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${
              isSelected ? "bg-primary/15" : "bg-muted/60"
            }`}
          >
            <Icon
              className={`h-5 w-5 ${
                isSelected ? "text-primary" : "text-muted-foreground"
              }`}
            />
          </span>
          <p className="w-full truncate text-center text-xs font-medium text-foreground">
            {app.title}
          </p>
        </button>

        <div className="mt-2">
          {mode === "installed" ? (
            isSystem ? (
              <span className="inline-flex w-full items-center justify-center gap-1 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                System
              </span>
            ) : (
              <Button
                size="sm"
                variant="destructive"
                className="w-full"
                onClick={() => onUninstallApp?.(app.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
                Uninstall
              </Button>
            )
          ) : (
            <Button
              size="sm"
              className="w-full"
              onClick={() => onInstallApp?.(app.id)}
            >
              <Download className="h-3.5 w-3.5" />
              Install
            </Button>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="flex h-full flex-col gap-4 p-4">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-black tracking-tight text-foreground">
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

      <Panel
        title="Installed Apps"
        description={`${installedList.length} installed`}
        className="bg-background/35"
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {installedList.map((app) => renderAppTile(app, "installed"))}
        </div>
      </Panel>

      <Panel
        title="Installable Apps"
        description={`${installableList.length} available`}
        className="bg-background/35"
      >
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {installableList.map((app) => renderAppTile(app, "installable"))}
        </div>
      </Panel>
    </section>
  );
}
