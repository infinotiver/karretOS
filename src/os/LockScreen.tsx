import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import bg from "@/assets/assets/bg.png";

interface LockScreenProps {
  onUnlock: () => void;
}

export const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Preload Shell and background image
  useEffect(() => {
    import("@/os/Shell");
    const image = new Image();
    image.src = bg;
  }, []);

  const clockLabel = useMemo(
    () =>
      now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    [now],
  );

  const handleUnlock = () => {
    if (onUnlock) onUnlock();
    window.location.href = "/";
  };

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-background text-foreground cursor-pointer"
      onClick={handleUnlock}
    >
      <img
        src={bg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-white/40 backdrop-blur-md" />

      <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
        <span className="text-5xl font-extrabold tracking-tight text-foreground drop-shadow-lg">
          {clockLabel}
        </span>
        <Button className="mt-4 px-8 py-2 select-none">click to unlock</Button>
      </div>
    </div>
  );
};
