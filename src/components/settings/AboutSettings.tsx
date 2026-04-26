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
  const [lastCommitUpdated, setLastCommitUpdated] = useState("Loading...");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    const loadLastCommit = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/infinotiver/karretos/commits?per_page=1",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Failed to load latest commit");

        const data = (await response.json()) as Array<{
          commit?: { committer?: { date?: string } };
        }>;

        const date = data[0]?.commit?.committer?.date;
        if (!date) {
          setLastCommitUpdated("Unavailable");
          return;
        }

        setLastCommitUpdated(new Date(date).toLocaleString());
      } catch {
        if (!controller.signal.aborted) {
          setLastCommitUpdated("Unavailable");
        }
      }
    };

    loadLastCommit();

    return () => controller.abort();
  }, []);

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

            <DialogContent className="dark">
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

      <Panel title="About karretOS" description="Project information">
        <div className="space-y-1 text-sm">
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Last Commit Update</span>
            <span className="font-mono text-foreground">
              {lastCommitUpdated}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-muted-foreground">Current Time</span>
            <span className="font-mono text-foreground">{currentTime}</span>
          </div>
        </div>
      </Panel>
    </div>
  );
}
