import { Maximize2, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WindowState } from "@/os/useSession";

interface TitleBarProps {
  title: string;
  windowState: WindowState;
  onToggleMaximize: () => void;
  onClose: () => void;
  className?: string;
}

const ctrl =
  "inline-flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground bg-gray-400/20 transition-colors hover:bg-black/10 hover:text-foreground";

const TitleBar = ({
  title,
  windowState,
  onToggleMaximize,
  onClose,
  className,
}: TitleBarProps) => (
  <header
    className={cn(
      "flex items-center justify-between px-3 py-0.5 cursor-grab active:cursor-grabbing bg-background/60 border-b border-border/40",
      className,
    )}
  >
    <p className="select-none text-xs font-semibold text-muted-foreground">{title}</p>
    <div className="flex-1" />
    <div className="flex items-center gap-1.5 rounded-lg px-2 py-0.5">
      <button
        type="button"
        onClick={onToggleMaximize}
        onPointerDown={(e) => e.stopPropagation()}
        className={ctrl}
        aria-label={windowState === "maximized" ? "Restore" : "Maximize"}
      >
        {windowState === "maximized" ? (
          <Minimize2 className="h-3.5 w-3.5" />
        ) : (
          <Maximize2 className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        onClick={onClose}
        onPointerDown={(e) => e.stopPropagation()}
        className={`${ctrl} hover:bg-red-500/20 hover:text-red-600`}
        aria-label={`Close ${title}`}
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  </header>
);

export default TitleBar;
