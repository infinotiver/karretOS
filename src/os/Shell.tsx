import { AnimatePresence } from "framer-motion";
import { apps } from "@/os/apps/registry";
import Environment from "@/os/Environment";
import Dock from "@/os/Dock";
import useSession from "@/os/useSession";
import { Desktop } from "@/os/Desktop";
import { AppWindow } from "@/os/AppWindow";
import { useEffect, useRef } from "react";
import TopBar from "@/os/TopBar";
/* ── Shell ── */
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

  return (
    <Environment>
      <div className="relative z-0 flex h-full w-full flex-col">
        <TopBar />
        
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
        apps={apps}
        activeAppId={session.focusedId}
        onOpenApp={session.open}
      />
    </Environment>
  );
};

export default Shell;
