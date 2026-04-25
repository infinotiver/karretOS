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
  "window-control-btn inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/10 hover:text-foreground touch-manipulation";

const stopDrag = (e: React.PointerEvent | React.TouchEvent) => {
  e.stopPropagation();
};

const TitleBar = ({
  title,
  windowState,
  onToggleMaximize,
  onClose,
  className,
}: TitleBarProps) => (
  <header
    className={cn(
      "window-drag-handle flex items-center justify-between cursor-grab border-b border-border/40 bg-background/60 px-2 py-1 active:cursor-grabbing",
      className,
    )}
  >
    <p className="select-none truncate text-sm font-semibold text-muted-foreground">
      {title}
    </p>

    <div className="window-controls flex items-center gap-1" data-no-drag>
      <button
        type="button"
        data-no-drag
        onPointerDown={stopDrag}
        onTouchStart={stopDrag}
        onClick={onToggleMaximize}
        className={ctrl}
        aria-label={windowState === "maximized" ? "Restore" : "Maximize"}
      >
        {windowState === "maximized" ? (
          <Minimize2 className="h-4 w-4" />
        ) : (
          <Maximize2 className="h-4 w-4" />
        )}
      </button>

      <button
        type="button"
        data-no-drag
        onPointerDown={stopDrag}
        onTouchStart={stopDrag}
        onClick={onClose}
        className={cn(ctrl, "hover:bg-red-500/20 hover:text-red-600")}
        aria-label={`Close ${title}`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  </header>
);

export default TitleBar;
