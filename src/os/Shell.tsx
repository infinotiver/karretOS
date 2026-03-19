import { AnimatePresence } from "framer-motion";
import { apps } from "@/os/apps/registry";
import Environment from "@/os/Environment";
import Dock from "@/os/Dock";
import useSession from "@/os/useSession";
import { Desktop } from "@/os/Desktop";
import { AppWindow } from "@/os/AppWindow";
import { useEffect, useRef } from "react";

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
      <div className="relative z-0 h-full w-full">
        {!hasMaximized && (
          <div className="relative z-0 h-full px-6 py-6 pb-20 md:px-12 md:py-10 md:pb-20">
            <Desktop
              selectedId={session.selectedId}
              onSelect={session.select}
              onOpen={session.open}
            />
          </div>
        )}
      </div>

      <AnimatePresence>
        {session.windows.map((win) => (
          <AppWindow
            key={win.id}
            win={win}
            isFocused={session.focusedId === win.id}
            onFocus={() => session.focus(win.id)}
            onToggleMaximize={() => session.toggleMaximize(win.id)}
            onClose={() => session.close(win.id)}
            onOpenApp={session.open}
          />
        ))}
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
