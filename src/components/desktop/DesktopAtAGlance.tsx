import { useEffect, useState } from "react";
// import { Cpu, Monitor, Wifi, WifiOff, CarrotIcon } from "lucide-react";
import { CpuIcon, MonitorIcon, WifiHighIcon, WifiSlashIcon, CarrotIcon } from "@phosphor-icons/react";
import { Card } from "@/components/widgets/Card";
export function DesktopAtAGlance() {
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

  return (
    <Card className="pointer-events-none select-none space-y-1 text-xs text-foreground bg-secondary/50 p-2">
      <div className="flex items-center gap-2">
        <CpuIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span>{cores} cores</span>
      </div>
      <div className="flex items-center gap-2">
        <MonitorIcon className="h-3.5 w-3.5 text-muted-foreground" />
        <span>
          {viewport.w}×{viewport.h}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isOnline ? (
          <WifiHighIcon className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <WifiSlashIcon className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        <span>{isOnline ? "Online" : "Offline"}</span>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <CarrotIcon className="h-3.5 w-3.5 text-foreground" />
        <span>karretOS</span>
      </div>
    </Card>
  );
}
