import { motion } from "framer-motion";
import { useRef } from "react";
import TitleBar from "@/os/TitleBar";
import { getApp } from "@/os/apps/registry";
import type { AppId } from "@/os/apps/types";
import type { WindowEntry } from "@/os/useSession";

const APP_WINDOW_BLUR = "backdrop-blur-xl";
const APP_WINDOW_OPACITY = "bg-background/40";

interface AppWindowProps {
  win: WindowEntry;
  isFocused: boolean;
  onFocus: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  titleBar: boolean;
}

export const AppWindow = ({
  win,
  isFocused,
  onFocus,
  onToggleMaximize,
  onClose,
  onOpenApp,
  titleBar = true,
}: AppWindowProps) => {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const appDef = getApp(win.id);
  const Component = appDef.component;
  const isWindowed = win.windowState === "windowed";

  return (
    <motion.div
      ref={constraintsRef}
      style={{ zIndex: win.zIndex, top: "2rem" }}
      className={`fixed left-0 right-0 bottom-0 pointer-events-none ${
        isWindowed
          ? "flex items-center justify-center p-4"
          : "flex flex-col p-0.5"
      }`}
      initial={{ opacity: 0, y: 20, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.99 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        className={`pointer-events-auto h-full ${APP_WINDOW_BLUR} ${APP_WINDOW_OPACITY} ${
          isWindowed
            ? "max-w-4xl w-full flex flex-col rounded-2xl border-2 border-border max-h-[75vh] transition-all overflow-hidden"
            : "flex flex-1 w-full flex-col rounded-xl border border-border overflow-hidden"
        } ${isWindowed && isFocused ? "shadow-2xl shadow-black/20" : ""} ${
          isWindowed && !isFocused ? "opacity-90 shadow-sm" : ""
        }`}
        drag={isWindowed}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={isWindowed ? constraintsRef : undefined}
        initial={
          isWindowed ? { x: win.offset.x, y: win.offset.y } : { x: 0, y: 0 }
        }
        animate={isWindowed ? {} : { x: 0, y: 0 }}
        onPointerDownCapture={onFocus}
      >
        {titleBar && (
          <TitleBar
            title={appDef.title}
            windowState={win.windowState}
            onToggleMaximize={onToggleMaximize}
            onClose={onClose}
          />
        )}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col rounded-b-lg">
          <Component
            isActive={isFocused}
            onOpenApp={onOpenApp}
            onCloseApp={onClose}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};
