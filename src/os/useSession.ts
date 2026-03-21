import { useCallback, useMemo, useState } from "react";
import { getApp } from "@/os/apps/registry";
import type { AppId } from "@/os/apps/types";

export type WindowState = "maximized" | "windowed";

export interface WindowEntry {
  id: AppId;
  windowState: WindowState;
  zIndex: number;
  offset: { x: number; y: number };
  size: { w: number; h: number };
}

interface Session {
  selectedId: AppId | null;
  windows: WindowEntry[];
  focusedId: AppId | null;
  select: (id: AppId) => void;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  toggleMaximize: (id: AppId) => void;
  focus: (id: AppId) => void;
  move: (id: AppId, offset: { x: number; y: number }) => void;
  resize: (id: AppId, size: { w: number; h: number }) => void;
}

let zCounter = 30;

const getDefaultWindowSize = () => {
  if (typeof window === "undefined") return { w: 900, h: 560 };
  const w = Math.min(960, Math.round(window.innerWidth * 0.8));
  const h = Math.min(640, Math.round(window.innerHeight * 0.7));
  return { w, h };
};

const getDefaultWindowOffset = (size: { w: number; h: number }) => {
  if (typeof window === "undefined") return { x: 0, y: 0 };
  const baseX = Math.max(0, Math.round((window.innerWidth - size.w) / 2));
  const baseY = Math.max(0, Math.round((window.innerHeight - size.h) / 2));
  return {
    x: baseX + Math.round((Math.random() - 0.5) * 160),
    y: baseY + Math.round((Math.random() - 0.5) * 80),
  };
};

const useSession = (): Session => {
  const [selectedId, setSelectedId] = useState<AppId | null>(null);
  const [windows, setWindows] = useState<WindowEntry[]>([]);

  // Derived: window with highest zIndex is focused
  const focusedId = useMemo<AppId | null>(() => {
    if (windows.length === 0) return null;
    return windows.reduce((best, w) => (w.zIndex > best.zIndex ? w : best)).id;
  }, [windows]);

  const focus = useCallback((id: AppId) => {
    zCounter += 1;
    const z = zCounter;
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w)),
    );
  }, []);

  const open = useCallback((id: AppId) => {
    // Validate app exists
    getApp(id);
    setSelectedId(id);
    zCounter += 1;
    const z = zCounter;
    const size = getDefaultWindowSize();
    const offset = getDefaultWindowOffset(size);
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === id);
      if (existing) {
        // Already open — just bring to front
        return prev.map((w) => (w.id === id ? { ...w, zIndex: z } : w));
      }
      return [
        ...prev,
        { id, windowState: "windowed", zIndex: z, offset, size },
      ];
    });
  }, []);

  const close = useCallback((id: AppId) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const toggleMaximize = useCallback((id: AppId) => {
    setWindows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              windowState:
                w.windowState === "maximized" ? "windowed" : "maximized",
            }
          : w,
      ),
    );
  }, []);

  const move = useCallback((id: AppId, offset: { x: number; y: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, offset } : w)),
    );
  }, []);

  const resize = useCallback((id: AppId, size: { w: number; h: number }) => {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, size } : w)),
    );
  }, []);

  return {
    selectedId,
    windows,
    focusedId,
    select: setSelectedId,
    open,
    close,
    toggleMaximize,
    focus,
    move,
    resize,
  };
};

export default useSession;
