import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { AppDefinition, AppId } from "@/os/apps/types";
import DockIcon from "../components/ui/dock-icon";

interface DockProps {
  apps: AppDefinition[];
  activeAppId: AppId | null;
  onOpenApp: (id: AppId) => void;
}

const Dock = ({ apps, activeAppId, onOpenApp }: DockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, y: 10, scale: 0.75 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.75 }}
            className="flex items-center gap-2 rounded-4xl border border-white/10 bg-black/90 p-2 backdrop-blur-2xl shadow-2xl"
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
        onHoverStart={() => {
          if (!isOpen) setIsOpen(true);
        }}
        onHoverEnd={() => {
          // Do nothing on hover end to prevent closing on hover out
        }}
        className="flex h-8 w-10 items-center justify-center rounded-full border border-white/15 bg-black text-white shadow-lg transition-colors hover:border-white/40"
      >
        {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </motion.button>
    </div>
  );
};

export default Dock;
