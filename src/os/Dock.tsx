import { motion } from "framer-motion";
import type { AppDefinition, AppId } from "@/os/apps/types";
import DockIcon from "../components/ui/dock-icon";
// import { UserPill } from "@/components/widgets/GreetingWidget";
import { WeatherMini } from "@/components/widgets/WeatherWidget";
import { ClockWidget } from "@/components/widgets/ClockWidget";
import { MAX_PINNED_APPS } from "@/config/dock";

interface DockProps {
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
  openAppIds: AppId[];
  pinnedAppIds: AppId[];
}

const Dock = ({
  apps,
  activeAppId,
  onOpenApp,
  openAppIds,
  pinnedAppIds,
}: DockProps) => {
  const appMap = new Map(apps.map((app) => [app.id, app]));
  const pinned = pinnedAppIds
    .filter((id) => id !== "launcher" && appMap.has(id))
    .slice(0, MAX_PINNED_APPS);
  const pinnedSet = new Set(pinned);
  const runningUnpinned = Array.from(new Set(openAppIds)).filter(
    (id) => id !== "launcher" && !pinnedSet.has(id) && appMap.has(id),
  );
  const launcherApp = apps.find((app) => app.id === "launcher");
  // const centerApps = apps.filter((app) => app.id !== "launcher");

  const pillClass =
    "inline-grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 rounded-3xl border border-border bg-background px-2 py-1 shadow-xl shadow-black/20";

  return (
    <div className="fixed inset-x-0 bottom-2 z-10 flex justify-center px-3">
      <motion.nav
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={pillClass}
      >
        <div className="flex items-center gap-2 pr-1.5">
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

        <div className="flex items-center gap-1.5">
          {pinned.map((id) => {
            const app = appMap.get(id)!;
            return (
              <DockIcon
                key={id}
                app={app}
                isActive={activeAppId === id}
                onClick={() => onOpenApp(id)}
              />
            );
          })}

          {runningUnpinned.length > 0 ? (
            <div className="mx-1 h-6 w-px bg-border/40" />
          ) : null}

          {runningUnpinned.map((id) => {
            const app = appMap.get(id)!;
            return (
              <DockIcon
                key={`running-${id}`}
                app={app}
                isActive={activeAppId === id}
                onClick={() => onOpenApp(id)}
              />
            );
          })}
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
