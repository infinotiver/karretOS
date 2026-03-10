import { useState, useEffect } from "react";
import { useAppContext } from "@/providers/AppProvider";
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

export function AboutSettings() {
  const { username, setUsername } = useAppContext();

  // 1. Sync local state with context if username changes elsewhere
  const [tempName, setTempName] = useState(username);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState<Record<string, string | number>>({});

  useEffect(() => {
    setTempName(username);
  }, [username]);

  // 2. Fetch system info safely
  useEffect(() => {
    if (typeof window !== "undefined") {
      const systemInfo = {
        "User Agent": navigator.userAgent,
        Platform:
          (navigator as any).userAgentData?.platform || navigator.platform,
        Language: navigator.language,
        Screen: `${window.screen.width}x${window.screen.height}`,
        "Color Depth": `${window.screen.colorDepth}-bit`,
        Timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      setInfo(systemInfo);
    }
  }, []);

  const handleSave = () => {
    if (tempName.trim()) {
      setUsername(tempName.trim());
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-start space-y-2 bg-accent/50 rounded-lg p-4">
        <div className="text-sm font-medium text-muted-foreground">
          Current Profile
        </div>
        <div className="text-2xl font-bold tracking-tight">{username}</div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm">Change Username</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                This name will be displayed on your desktop greeting.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
                placeholder="Enter new username..."
                autoFocus
              />
            </div>

            <DialogFooter>
              <Button variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* System Info Section */}
      <div className="space-y-3 px-1">
        <h3 className="text-sm font-semibold text-muted-foreground">
          System Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {Object.entries(info).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col p-2 border rounded-md bg-background/50"
            >
              <span className="text-xs text-muted-foreground">{key}</span>
              <span className="font-mono truncate" title={value?.toString()}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
