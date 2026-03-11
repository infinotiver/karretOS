import { useState, useCallback } from "react"; // Added useCallback
import { Card } from "./Card";
import Clock from "react-clock";
import "react-clock/dist/Clock.css";
import { useWidgetUpdater } from "@/hooks/useWidgetUpdater";

export const ClockWidget = () => {
  const [now, setNow] = useState(new Date());

  // Wrap update logic in useCallback so the timer doesn't reset constantly
  const handleUpdate = useCallback(() => {
    setNow(new Date());
  }, []);

  useWidgetUpdater({
    interval: 1000,
    onUpdate: handleUpdate,
    enabled: true, // TODO pull this from settings
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const currentDate = now.toLocaleDateString();

  return (
    <Card className="self-start">
      <div className="flex items-center gap-6">
        <div className="shrink-0 hidden lg:block">
          <Clock value={now} size={120}/>
        </div>
        <div className="flex flex-col">
          <p className="text-4xl font-black tracking-tighter text-foreground">
            {time}
          </p>
          <span>{currentDate}</span>
        </div>
      </div>
    </Card>
  );
};
