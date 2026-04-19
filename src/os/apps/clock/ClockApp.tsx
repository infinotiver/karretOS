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
  const unix = Math.floor(now.getTime() / 1000);
  const iso = now.toISOString();

  return (
    <WindowLayout>
      <div className="h-full p-4 sm:p-6">
        <div className="mx-auto flex h-full flex-col items-center gap-2">
          <section className="flex-1 p-5 flex flex-col justify-center items-center">
            <h1 className="mt-2 text-4xl font-bold text-foreground sm:text-6xl md:text-8xl">
              {time}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              {date}
            </p>
            <p className="text-sm text-muted-foreground sm:text-base">
              {timezone}
            </p>
          </section>

          <section className="flex w-full gap-3 md:w-80">
            <div className="rounded-xl border border-border/40 bg-background/35 p-3">
              <p className="text-xs text-muted-foreground">UNIX</p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {unix}
              </p>
            </div>

            <div className="rounded-xl border border-border/40 bg-background/35 p-3">
              <p className="text-xs text-muted-foreground">ISO</p>
              <p className="mt-1 truncate text-sm font-semibold text-foreground">
                {iso}
              </p>
            </div>
          </section>
        </div>
      </div>
    </WindowLayout>
  );
};

export default ClockApp;
