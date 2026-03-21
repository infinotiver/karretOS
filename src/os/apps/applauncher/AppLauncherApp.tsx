import { useState } from "react";
import { X } from "lucide-react";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import { apps } from "@/os/apps/registry";
import type { AppId, AppProps } from "@/os/apps/types";

export default function AppLauncherApp({ onOpenApp, onCloseApp }: AppProps) {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);

  return (
    <WindowLayout>
      <section className="flex h-full flex-col gap-4 p-6">
        <header className="flex items-center justify-between">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            App Grid
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
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => setSelectedId(app.id)}
                  onDoubleClick={() => onOpenApp?.(app.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onOpenApp?.(app.id);
                  }}
                  className="group flex w-20 flex-col items-center gap-2"
                  title={`${app.title} — double-click to open`}
                >
                  <span
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200 group-hover:scale-105 group-hover:shadow-md ${
                      isSelected
                        ? "bg-primary/15 ring-2 ring-primary/40 shadow-primary/10"
                        : "bg-muted/70 group-hover:bg-primary/10"
                    }`}
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
                      isSelected ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {app.title}
                  </p>
                </button>
              );
            })}
        </div>
      </section>
    </WindowLayout>
  );
}
