import { useState, useEffect } from "react";
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
import { MetricPair } from "@/components/common/MetricPair";

export function AboutSettings() {
  const { username, setUsername } = useAppContext();
  const [tempName, setTempName] = useState(username);
  const [open, setOpen] = useState(false);

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
                <Button onClick={handleSave}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Panel>

      <Panel
        title="System"
        description="Device metadata pulled from the browser"
      >
        <div className="space-y-2 text-sm">
          <MetricPair
            label="Platform"
            value={
              <span className="font-mono text-foreground">
                {navigator.platform}
              </span>
            }
          />
          <MetricPair
            label="Screen"
            value={
              <span className="font-mono text-foreground">
                {window.screen.width}×{window.screen.height}
              </span>
            }
          />
          <MetricPair
            label="Timezone"
            value={
              <span className="font-mono text-foreground">
                {Intl.DateTimeFormat().resolvedOptions().timeZone}
              </span>
            }
          />
        </div>
      </Panel>
    </div>
  );
}
