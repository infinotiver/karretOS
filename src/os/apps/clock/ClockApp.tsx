import { useEffect, useState } from "react";
import { WindowLayout } from "@/components/layouts/WindowLayout";
import "react-clock/dist/Clock.css";

const ClockApp = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <WindowLayout>
      <div className="flex h-full w-full items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:justify-between">
           

            <div className="min-w-0 text-center md:text-left">
              <h1 className="text-5xl font-black tracking-tighter text-foreground md:text-6xl">
                {time}
              </h1>
              <p className="mt-2 text-base font-semibold text-muted-foreground">
                {date}
              </p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                <span className="inline-flex items-center rounded-xl border border-border/40 bg-background/45 px-2.5 py-1 text-xs font-semibold text-foreground">
                  Local Time
                </span>
                <span className="inline-flex items-center rounded-xl border border-border/40 bg-background/45 px-2.5 py-1 text-xs text-muted-foreground">
                  {timezone}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </WindowLayout>
  );
};

export default ClockApp;
