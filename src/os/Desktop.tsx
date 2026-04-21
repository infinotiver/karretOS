import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Monitor, Wifi, WifiOff, CarrotIcon } from "lucide-react";

import { springPopIn } from "@/lib/spring";

interface DesktopProps {
  enableMotion?: boolean;
}

export const Desktop = ({ enableMotion = true }: DesktopProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [viewport, setViewport] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const cores = navigator.hardwareConcurrency ?? "N/A";

  const Content = (
    <div className="relative h-full w-full">
      <div className="pointer-events-none absolute left-4 top-4 z-10 select-none space-y-1 text-xs text-foreground rounded-md bg-secondary/50 p-2">
        <div className="flex items-center gap-2">
          <Cpu className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{cores} cores</span>
        </div>
        <div className="flex items-center gap-2">
          <Monitor className="h-3.5 w-3.5 text-muted-foreground" />
          <span>
            {viewport.w}×{viewport.h}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <Wifi className="h-3.5 w-3.5 text-muted-foreground" />
          ) : (
            <WifiOff className="h-3.5 w-3.5 text-muted-foreground" />
          )}
          <span>{isOnline ? "Online" : "Offline"}</span>
        </div>
        <div className="flex items-center gap-2">
          <CarrotIcon className="h-3.5 w-3.5 text-foreground" />
          <span>karretOS</span>
        </div>
      </div>
    </div>
  );

  if (!enableMotion) return Content;

  return (
    <motion.div
      className="h-full w-full"
      initial="initial"
      animate="animate"
      variants={springPopIn}
    >
      {Content}
    </motion.div>
  );
};
