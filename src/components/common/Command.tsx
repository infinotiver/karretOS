import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { apps } from "@/os/apps/registry";
import type { AppId } from "@/os/apps/types";
import { LockIcon } from "@phosphor-icons/react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenApp: (id: AppId) => void;
  onLock: () => void;
};

export function Command({ open, onOpenChange, onOpenApp, onLock }: Props) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or app name..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Apps">
          {apps.map((app) => (
            <CommandItem
              key={app.id}
              onSelect={() => {
                onOpenApp(app.id);
                onOpenChange(false);
              }}
            >
              <app.icon className="h-4 w-4 text-muted-foreground" />
              {app.title}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup heading="Actions">
          <CommandItem
            onSelect={() => {
              onLock();
              onOpenChange(false);
            }}
          >
            <LockIcon className="h-4 w-4 text-muted-foreground" />
            Suspend session
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
