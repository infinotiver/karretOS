import { useEffect, useState, useMemo } from "react";
import { useAppContext } from "@/hooks/useAppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Panel } from "@/components/common/Panel";

export function AboutSettings() {
  const { username, setUsername } = useAppContext();
  const [tempName, setTempName] = useState(username);
  const [open, setOpen] = useState(false);
const [isOnline, setIsOnline] = useState(navigator.onLine);
const [uptimeSec, setUptimeSec] = useState(0);
const [battery, setBattery] = useState<string>("N/A");

useEffect(() => {
  const onOnline = () => setIsOnline(true);
  const onOffline = () => setIsOnline(false);

  window.addEventListener("online", onOnline);
  window.addEventListener("offline", onOffline);

  const uptimeTimer = window.setInterval(
    () => setUptimeSec((s) => s + 1),
    1000,
  );

  // Battery API (optional support)
  const nav = navigator as Navigator & {
    getBattery?: () => Promise<{ level: number; charging: boolean }>;
  };

  if (nav.getBattery) {
    nav.getBattery().then((b) => {
      const pct = Math.round(b.level * 100);
      setBattery(`${pct}%${b.charging ? " (charging)" : ""}`);
    });
  }

  return () => {
    window.removeEventListener("online", onOnline);
    window.removeEventListener("offline", onOffline);
    window.clearInterval(uptimeTimer);
  };
}, []);

const uptime = useMemo(() => {
  const h = Math.floor(uptimeSec / 3600);
  const m = Math.floor((uptimeSec % 3600) / 60);
  const s = uptimeSec % 60;
  return `${h}h ${m}m ${s}s`;
}, [uptimeSec]);

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;
  const cores = navigator.hardwareConcurrency ?? "N/A";

  useEffect(() => {
    setTempName(username);
  }, [username]);

  const handleSave = () => {
    if (tempName.trim()) {
      setUsername(tempName.trim());
      setOpen(false);
    }
  };

  return (
    <div className="space-y-4">
      <Panel title="Profile" description="Display name shown on the desktop">
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">{username}</div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="secondary">
                Change Username
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Update your username displayed on the desktop.
                </DialogDescription>
              </DialogHeader>

              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Enter new username..."
                autoFocus
              />

              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handleSave}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Panel>

      <Panel title="System" description="Device and performance information">
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Status</span>
            <span className="font-mono text-foreground">
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Uptime</span>
            <span className="font-mono text-foreground">{uptime}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">CPU Cores</span>
            <span className="font-mono text-foreground">{cores}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Memory</span>
            <span className="font-mono text-foreground">
              {deviceMemory ? `${deviceMemory} GB` : "N/A"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Battery</span>
            <span className="font-mono text-foreground">{battery}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Viewport</span>
            <span className="font-mono text-foreground">
              {window.innerWidth}x{window.innerHeight}
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
