import { useEffect, useState } from "react";
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

      <Panel title="System" description="Device metadata pulled from the browser">
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-mono text-foreground">
              {navigator.platform}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Screen</span>
            <span className="font-mono text-foreground">
              {window.screen.width}x{window.screen.height}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Timezone</span>
            <span className="font-mono text-foreground">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
