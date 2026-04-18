import { useState } from "react";
import { X } from "lucide-react";
import { apps } from "@/os/apps/registry";
import type { AppId, AppProps } from "@/os/apps/types";
import { Button } from "@/components/ui/button";
export default function AppLauncherApp({
  onOpenApp,
  onCloseApp,
  installedApps,
  onInstallApp,
  onUninstallApp,
}: AppProps) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const installed = new Set<AppId>(installedApps ?? apps.map((app) => app.id));

  return (
    <section className="flex h-full flex-col gap-4 p-6 bg-secondary/20! backdrop-blur-sm!">
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

      <div className="flex flex-wrap gap-5">
        {apps
          .filter((app) => app.id !== "launcher")
          .map((app) => {
            const Icon = app.icon;
            const isSelected = selectedId === app.id;
            const isInstalled = installed.has(app.id);
            const isSystem = app.system ?? false;
            return (
              <div
                key={app.id}
                className="group flex w-24 flex-col items-center gap-3 rounded-lg p-2 transition-all duration-200 hover:bg-muted/50"
              >
                <button
                  type="button"
                  onClick={() => setSelectedId(app.id)}
                  onDoubleClick={() => {
                    if (!isInstalled) return;
                    onOpenApp?.(app.id);
                    onCloseApp?.();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      if (!isInstalled) return;
                      onOpenApp?.(app.id);
                      onCloseApp?.();
                    }
                  }}
                  className="flex w-full flex-col items-center gap-2"
                  title={`${app.title} — double-click to open`}
                >
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg ${
                      isSelected
                        ? "bg-primary/15 ring-2 ring-primary/40 shadow-primary/10"
                        : "bg-muted/70 group-hover:bg-primary/10"
                    } ${!isInstalled ? "opacity-50 group-hover:opacity-70" : ""}`}
                  >
                    <Icon
                      className={`h-7 w-7 transition-colors ${
                        isSelected
                          ? "text-primary"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}
                    />
                  </span>
                  <p
                    className={`w-full truncate text-center text-xs font-semibold leading-tight ${
                      isSelected
                        ? "text-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  >
                    {app.title}
                  </p>
                </button>
                {!isInstalled ? (
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={() => onInstallApp?.(app.id)}
                  >
                    Install
                  </Button>
                ) : !isSystem ? (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="w-full"
                    onClick={() => onUninstallApp?.(app.id)}
                  >
                    Uninstall
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">System</span>
                )}
              </div>
            );
          })}
      </div>
    </section>
  );
}
