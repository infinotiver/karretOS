import { motion } from "framer-motion";
import { Suspense } from "react";
import { Rnd } from "react-rnd";
import TitleBar from "@/os/TitleBar";
import { getApp } from "@/os/apps/registry";
import type { AppId } from "@/os/apps/types";
import type { WindowEntry } from "@/os/useSession";
const APP_WINDOW_BLUR = "backdrop-blur-sm";
const APP_WINDOW_OPACITY = "bg-background/60";
const APP_WINDOW_SOLID = "bg-muted";

interface AppWindowProps {
  win: WindowEntry;
  isFocused: boolean;
  onFocus: () => void;
  onToggleMaximize: () => void;
  onClose: () => void;
  onOpenApp: (id: AppId) => void;
  onMove: (offset: { x: number; y: number }) => void;
  onResize: (size: { w: number; h: number }, offset: { x: number; y: number }) => void;
  titleBar: boolean;
}

export const AppWindow = ({
  win,
  isFocused,
  onFocus,
  onToggleMaximize,
  onClose,
  onOpenApp,
  onMove,
  onResize,
  titleBar = true,
}: AppWindowProps) => {
  const appDef = getApp(win.id);
  const Component = appDef.component;
  const isWindowed = win.windowState === "windowed";
  const isResizable = appDef.resizable ?? true;
  const closeOnOutside = appDef.closeOnOutside ?? false;
  const windowSurface = appDef.hasSidebar
    ? `${APP_WINDOW_BLUR} ${APP_WINDOW_OPACITY}`
    : APP_WINDOW_SOLID;

  return (
    <motion.div
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
      {isWindowed ? (
        <>
          {closeOnOutside && (
            <button
              type="button"
              aria-label={`Close ${appDef.title}`}
              onClick={onClose}
              className="absolute inset-0 pointer-events-auto bg-transparent"
            />
          )}
          <Rnd
            bounds="parent"
            size={{ width: win.size.w, height: win.size.h }}
            position={{ x: win.offset.x, y: win.offset.y }}
            minWidth={360}
            minHeight={260}
            dragHandleClassName="window-drag-handle"
            enableResizing={isResizable}
            onDragStart={onFocus}
            onDragStop={(_, data) => onMove({ x: data.x, y: data.y })}
            onResizeStart={onFocus}
            onResizeStop={(_, __, ref, ___, position) =>
              onResize(
                {
                  w: Math.round(ref.offsetWidth),
                  h: Math.round(ref.offsetHeight),
                },
                { x: position.x, y: position.y },
              )
            }
            className={`pointer-events-auto ${isFocused ? "z-10" : "z-0"}`}
          >
            <div
              className={`h-full ${windowSurface} flex flex-col rounded-2xl transition-all overflow-hidden ${
                isFocused
                  ? "shadow-2xl shadow-black/20"
                  : "opacity-90 shadow-sm"
              }`}
              onPointerDownCapture={(e) => {
                e.stopPropagation();
                onFocus();
              }}
            >
              {titleBar && (
                <TitleBar
                  title={appDef.title}
                  windowState={win.windowState}
                  onToggleMaximize={onToggleMaximize}
                  onClose={onClose}
                  className="window-drag-handle"
                />
              )}
              <div className="flex-1 min-h-0 overflow-y-auto flex flex-col rounded-b-lg">
                <Suspense
                  fallback={
                    <div className="p-6 text-sm text-muted-foreground">
                      Loading…
                    </div>
                  }
                >
                  <Component
                    isActive={isFocused}
                    onOpenApp={onOpenApp}
                    onCloseApp={onClose}
                  />
                </Suspense>
              </div>
            </div>
          </Rnd>
        </>
      ) : (
        <motion.div
          className={`pointer-events-auto h-full ${windowSurface} flex flex-1 w-full flex-col rounded-xl overflow-hidden`}
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
      )}
    </motion.div>
  );
};
