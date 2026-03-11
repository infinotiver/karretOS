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
      {/* Profile Section */}
      <div className="p-4 bg-card rounded-lg border border-border/50">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Profile
        </div>
        <div className="text-2xl font-bold mb-3">{username}</div>

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

      {/* System Info Section */}
      <div className="p-4 bg-card rounded-lg border border-border/50">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          System
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-mono">{navigator.platform}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Screen</span>
            <span className="font-mono">
              {window.screen.width}×{window.screen.height}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Timezone</span>
            <span className="font-mono">
              {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
