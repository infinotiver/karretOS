import "react-clock/dist/Clock.css";
import { useTime } from "@/hooks/useTime";
import type { AppId } from "@/os/apps/types";

interface TimeMiniProps {
  onOpenApp?: (id: AppId) => void;
}

export const TimeMini = ({ onOpenApp }: TimeMiniProps) => {
  const { time } = useTime({
    updateInterval: 1000,
  });
  const shortTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <button
      type="button"
      onClick={() => onOpenApp?.("clock")}
      className="inline-flex h-12 items-center rounded-2xl border border-border/40 bg-background/45 px-3 transition-colors duration-300 hover:bg-background/65"
      title="Open Clock"
      aria-label="Open Clock app"
    >
      <span className="text-xs font-semibold text-foreground">{shortTime}</span>
    </button>
  );
};
