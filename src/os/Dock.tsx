import { motion } from "framer-motion";
import type { AppDefinition, AppId } from "@/os/apps/types";
import DockIcon from "../components/ui/dock-icon";
// import { UserPill } from "@/components/widgets/GreetingWidget";
import { WeatherMini } from "@/components/widgets/WeatherWidget";
import { ClockWidget } from "@/components/widgets/ClockWidget";

interface DockProps {
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
}

const Dock = ({ apps, activeAppId, onOpenApp }: DockProps) => {
  const launcherApp = apps.find((app) => app.id === "launcher");
  const centerApps = apps.filter((app) => app.id !== "launcher");

  const pillClass =
    "inline-grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 rounded-3xl border border-border bg-background/60 px-2 py-1 shadow-xl shadow-black/20 backdrop-blur-sm";

  return (
    <div className="fixed inset-x-0 bottom-2 z-10 flex justify-center px-3">
      <motion.nav
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={pillClass}
      >
        <div className="flex items-center gap-2 pl-1 pr-1.5">
          {/* <UserPill /> */}
          {launcherApp ? (
            <DockIcon
              app={launcherApp}
              isActive={activeAppId === launcherApp.id}
              onClick={() => onOpenApp(launcherApp.id)}
              // showLabel
            />
          ) : null}
        </div>

        <div className="flex min-w-0 items-center justify-center gap-0.5 px-1.5">
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

        <div className="flex items-center gap-2 pl-1.5 pr-1">
          <WeatherMini />
          <ClockWidget onOpenApp={onOpenApp} />
        </div>
      </motion.nav>
    </div>
  );
};

export default Dock;
