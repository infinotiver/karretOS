import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { AppDefinition, AppId } from "@/os/apps/types";

interface DockProps {
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
}

const Dock = ({ apps, activeAppId, onOpenApp }: DockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="flex items-center gap-2 rounded-[2rem] border border-white/10 bg-black/90 p-2 backdrop-blur-2xl shadow-2xl"
          >
            {apps.map((app) => (
              <DockIcon
                key={app.id}
                app={app}
                isActive={activeAppId === app.id}
                onClick={() => onOpenApp(app.id)}
              />
            ))}
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-9 w-10 items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-lg transition-colors hover:border-white/40"
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </motion.button>
    </div>
  );
};

function DockIcon({
  app,
  isActive,
  onClick,
}: {
  app: AppDefinition;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = app.icon;

  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.15, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={`
        group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-200
        ${
          isActive
            ? "border-gray-300 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            : "border-gray-800 bg-neutral-800/40 hover:bg-neutral-700/60"
        }
      `}
    >
      <Icon
        className={`h-6 w-6 transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}
      />

      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100">
        {app.title}
      </div>
    </motion.div>
  );
}

export default Dock;
