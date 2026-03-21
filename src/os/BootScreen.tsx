import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h1 className="text-5xl font-black tracking-tighter text-foreground md:text-7xl">
          karretOS
        </h1>
      </motion.div>

      {!ready ? (
        <div className="w-64 space-y-3">
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full bg-linear-to-r from-foreground to-foreground/60"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <p className="text-right text-xs font-mono text-muted-foreground">
            {Math.round(progress)}%
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          onClick={handleUnlock}
        >
          <Button className="text-2xl p-6"><UnlockIcon/>unlock</Button>
        </motion.div>
      )}
    </motion.div>
  );
};
