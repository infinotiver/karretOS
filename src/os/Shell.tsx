import { AnimatePresence } from "framer-motion";
import { apps } from "@/os/apps/registry";
import Environment from "@/os/Environment";
import Dock from "@/os/Dock";
import useSession from "@/os/useSession";
import { Desktop } from "@/os/Desktop";
import { AppWindow } from "@/os/AppWindow";
import { useEffect, useRef } from "react";
import { DEFAULT_PINNED_APPS, MAX_PINNED_APPS } from "@/config/dock";
import { useMemo, useState } from "react";
import type { AppId } from "./apps/types";
import { Command } from "@/components/common/Command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuLabel,
} from "@/components/ui/context-menu";
import { GithubLogoIcon, CommandIcon } from "@phosphor-icons/react";
const SOURCE_URL = "https://github.com/infinotiver/karretos";

const Shell = () => {
  const session = useSession();
  const hasMaximized = session.windows.some(
    (w) => w.windowState === "maximized",
  );
  const didOpenDefaultApp = useRef(false);
  useEffect(() => {
    // Prevent double-open in React StrictMode
    if (didOpenDefaultApp.current) return;
    didOpenDefaultApp.current = true;

    session.open("portfolio");
  }, [session]);
  const installed = apps.filter((a) => session.installedApps.includes(a.id));
  const [pinnedAppIds, setPinnedAppIds] =
    useState<AppId[]>(DEFAULT_PINNED_APPS);

  const onPinApp = (id: AppId) => {
    setPinnedAppIds((prev) => {
      if (
        id === "launcher" ||
        prev.includes(id) ||
        prev.length >= MAX_PINNED_APPS
      )
        return prev;
      return [...prev, id];
    });
  };

  const onUnpinApp = (id: AppId) => {
    setPinnedAppIds((prev) => prev.filter((x) => x !== id));
  };

  const openAppIds = useMemo(
    () => Array.from(new Set(session.windows.map((w) => w.id))),
    [session.windows],
  );
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((v) => !v);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleLock = () => window.location.assign("/");
  const openSource = () => {
    window.open(SOURCE_URL, "_blank", "noopener,noreferrer");
  };
  return (
    <Environment>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="relative z-0 flex h-full w-full flex-col">
            {!hasMaximized && (
              <div className="flex-1 p-16">
                <Desktop enableMotion={!hasMaximized} />
              </div>
            )}
          </div>
          <AnimatePresence>
            {session.windows.map((win) => {
              const appDef = apps.find((a) => a.id === win.id);
              return (
                <AppWindow
                  key={win.id}
                  win={win}
                  isFocused={session.focusedId === win.id}
                  onFocus={() => session.focus(win.id)}
                  onToggleMaximize={() => session.toggleMaximize(win.id)}
                  onClose={() => session.close(win.id)}
                  onOpenApp={session.open}
                  installedApps={session.installedApps}
                  onInstallApp={session.install}
                  onUninstallApp={session.uninstall}
                  pinnedAppIds={pinnedAppIds}
                  onPinApp={onPinApp}
                  onUnpinApp={onUnpinApp}
                  onMove={(offset) => session.move(win.id, offset)}
                  onResize={(size, offset) => {
                    session.resize(win.id, size);
                    session.move(win.id, offset);
                  }}
                  titleBar={appDef?.titleBar !== false}
                />
              );
            })}
          </AnimatePresence>
          <Dock
            apps={installed}
            activeAppId={session.focusedId}
            onOpenApp={session.open}
            openAppIds={openAppIds}
            pinnedAppIds={pinnedAppIds}
          />
          <Command
            open={commandOpen}
            onOpenChange={setCommandOpen}
            onOpenApp={session.open}
            onLock={handleLock}
          />{" "}
        </ContextMenuTrigger>
        <ContextMenuContent className="dark">
          <ContextMenuLabel>karretOS</ContextMenuLabel>
          <ContextMenuItem onSelect={openSource}>
            <GithubLogoIcon className="mr-2 h-4 w-4" />
            View source on GitHub
          </ContextMenuItem>
          <ContextMenuItem onSelect={() => setCommandOpen(true)}>
            <CommandIcon className="mr-2 h-4 w-4"/>
            Command Palette
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Environment>
  );
};

export default Shell;
