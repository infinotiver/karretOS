import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { UnlockIcon } from "lucide-react";
import bg from "@/assets/assets/bg2.png";
import { prefetchWeather } from "@/hooks/useWeather";
interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen = ({ onBootComplete }: BootScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const preload = async () => {
      try {
        const img = new Image();
        img.src = bg;
        await img.decode?.();
      } catch {
        // ignore preload failures
      }
      prefetchWeather();
    };
    const bootSequence = async () => {
      preload();
      const steps = 20;
      const stepDuration = 100;
      for (let i = 0; i <= steps; i++) {
        await new Promise((resolve) => setTimeout(resolve, stepDuration));
        if (!cancelled) setProgress((i / steps) * 100);
      }
      await new Promise((resolve) => setTimeout(resolve, 400));
      if (!cancelled) setReady(true);
    };
    bootSequence();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUnlock = () => {
    setUnlocked(true);
    onBootComplete();
  };

  if (unlocked) return null;

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-background"
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
    >
      {/* Logo/Title */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">
          karretOS
        </h1>
      </motion.div>

      <AnimatePresence mode="wait">
        {!ready ? (
          <motion.div
            key="boot-progress"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-72"
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
              <motion.div
              className="h-full bg-linear-to-r from-foreground to-foreground/60"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="boot-unlock"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <Button
              onClick={handleUnlock}
              className="group text-base px-5 py-4 rounded-full bg-foreground text-background hover:bg-foreground/90"
            >
              <UnlockIcon className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              Unlock
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="pointer-events-none absolute bottom-6 text-xs text-muted-foreground">
        Original distribution, created by infinotiver
      </footer>
    </motion.div>
  );
};
