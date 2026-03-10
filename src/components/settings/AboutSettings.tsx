import { useState } from "react";
import useUserName from "@/hooks/useUserName";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
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
  const [username, setUserName] = useUserName();
  // Local state to hold the text while typing
  const [tempName, setTempName] = useState(username);
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    setUserName(tempName);
    setOpen(false); // Close the dialog
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
            <Button size="sm">
              Change Username
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
              <DialogDescription>
                This name will be displayed on your desktop greeting.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <Input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter new username..."
                autoFocus
              />
            </div>

            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
