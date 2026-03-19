import { motion } from "framer-motion";
import { apps } from "@/os/apps/registry";
import AppGrid from "@/os/AppGrid";
import DesktopWidgets from "@/os/DesktopWidgets";
import type { AppId } from "@/os/apps/types";

/* ── Spring pop-in variant ── */
const popIn = {
  initial: { opacity: 0, y: 18, scale: 0.93 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
};

interface DesktopProps {
  selectedId: AppId | null;
  onSelect: (id: AppId) => void;
  onOpen: (id: AppId) => void;
}

export const Desktop = ({ selectedId, onSelect, onOpen }: DesktopProps) => {
  return (
    <motion.div
      className="flex flex-row gap-6 lg:gap-10"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
      }}
    >
      <motion.div variants={popIn} className="flex-1 space-y-6">
        <motion.div variants={popIn}>
          <AppGrid
            apps={apps}
            selectedId={selectedId}
            onSelect={onSelect}
            onOpen={onOpen}
          />
        </motion.div>
      </motion.div>
      {/* Widgets section - side by side on all devices */}
      <motion.aside
        variants={popIn}
        className="shrink-0 h-auto w-40 sm:w-48 md:w-56 lg:w-80 lg:h-screen lg:max-h-150 grid grid-cols-1 gap-4 auto-rows-max"
      >
        <DesktopWidgets />
      </motion.aside>
    </motion.div>
  );
};
