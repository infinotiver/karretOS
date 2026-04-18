import { Card } from "./Card";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useTime } from "@/hooks/useTime";

export const ClockWidget = () => {
  const { time, formattedTime, formattedDate } = useTime({
    updateInterval: 1000,
  });

  return (
    <Card className="self-start">
      <div className="flex items-center gap-6">
        <div className="shrink hidden lg:block">
          <Clock value={time} size={100} />
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-black tracking-tighter text-foreground">
            {formattedTime}
          </p>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Card>
  );
};

export const TimeMini = () => {
  const { time } = useTime({
    updateInterval: 1000,
  });
  const shortTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="group relative inline-flex">
      <div className="inline-flex h-12 items-center rounded-2xl border border-border/40 bg-background/45 px-3 transition-colors duration-300 hover:bg-background/65">
        <span className="text-xs font-semibold text-foreground">
          {shortTime}
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-full right-0 mb-10 w-max origin-bottom-right opacity-0 scale-95 translate-y-1 transition-all duration-200 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0">
        <ClockWidget />
      </div>
    </div>
  );
};
