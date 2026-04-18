import { motion } from "framer-motion";
import type { AppDefinition, AppId } from "@/os/apps/types";
import DockIcon from "../components/ui/dock-icon";

interface DockProps {
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
}

const Dock = ({ apps, activeAppId, onOpenApp }: DockProps) => {
  const launcherApp = apps.find((app) => app.id === "launcher");
  const centerApps = apps.filter((app) => app.id !== "launcher");

  const pillClass =
    "inline-flex items-center rounded-3xl border border-border/40 bg-background/60 px-1.5 py-1 shadow-xl shadow-black/20 backdrop-blur-sm";

  return (
    <div className="fixed inset-x-0 bottom-2 z-10 flex justify-center px-3">
      <motion.nav
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={pillClass}
      >
        <div className="flex items-center shrink-0">
          {launcherApp ? (
            <DockIcon
              app={launcherApp}
              isActive={activeAppId === launcherApp.id}
              onClick={() => onOpenApp(launcherApp.id)}
              // showLabel={true}
            />
          ) : null}
        </div>

        <div className="ml-2 flex items-center gap-1 pl-2">
          {centerApps.map((app) => (
            <DockIcon
              key={app.id}
              app={app}
              isActive={activeAppId === app.id}
              onClick={() => onOpenApp(app.id)}
              showLabel={activeAppId === app.id}
            />
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export default Dock;
