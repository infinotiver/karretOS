import { motion } from "framer-motion";
import DesktopWidgets from "@/os/DesktopWidgets";

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

export const Desktop = () => {
  return (
    <motion.div
      className="flex flex-row gap-6 lg:gap-10"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
      }}
    >
      {/* Widgets section*/}
      <motion.aside
        variants={popIn}
        className="shrink-0 h-auto w-40 sm:w-48 md:w-56 lg:w-80 lg:h-screen lg:max-h-150 grid grid-cols-1 gap-4 auto-rows-max"
      >
        <DesktopWidgets />
      </motion.aside>
    </motion.div>
  );
};
