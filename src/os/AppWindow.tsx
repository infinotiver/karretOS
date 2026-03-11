import { motion } from "framer-motion";
import TitleBar from "@/os/TitleBar";
import { getApp } from "@/os/apps/registry";
import type { WindowEntry } from "@/os/useSession";

interface AppWindowProps {
  win: WindowEntry;
  isFocused: boolean;
  onFocus: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
}

export const AppWindow = ({
  win,
  isFocused,
  onFocus,
  onToggleMaximize,
  onClose,
}: AppWindowProps) => {
  const appDef = getApp(win.id);
  const Component = appDef.component;
  const isWindowed = win.windowState === "windowed";

  return (
    <motion.div
      style={{ zIndex: win.zIndex }}
      className={`fixed inset-0 pointer-events-none ${
        isWindowed
          ? "flex items-center justify-center p-4 pb-24"
          : "flex flex-col p-2"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className={`pointer-events-auto h-full ${
          isWindowed
            ? "max-w-4xl w-full flex flex-col rounded-2xl border-2 border-border bg-background/80 backdrop-blur-md min-h-[50vh] max-h-[75vh] transition-all"
            : "flex flex-1 w-full flex-col rounded-xl border border-border bg-background overflow-hidden"
        } ${isWindowed && isFocused ? "shadow-2xl shadow-black/20" : ""} ${
          isWindowed && !isFocused ? "opacity-90 shadow-sm" : ""
        }`}
        drag={isWindowed}
        dragMomentum={false}
        dragElastic={0}
        initial={
          isWindowed ? { x: win.offset.x, y: win.offset.y } : { x: 0, y: 0 }
        }
        animate={isWindowed ? {} : { x: 0, y: 0 }}
        onPointerDownCapture={onFocus}
      >
        <TitleBar
          title={appDef.title}
          windowState={win.windowState}
          onToggleMaximize={onToggleMaximize}
          onClose={onClose}
        />
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col rounded-b-lg">
          <Component isActive={isFocused} />
        </div>
      </motion.div>
    </motion.div>
  );
};
