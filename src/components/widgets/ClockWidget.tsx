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
