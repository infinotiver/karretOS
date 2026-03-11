import { useEffect, useCallback } from "react";

interface WidgetUpdateConfig {
  interval: number;
  onUpdate: () => void;
  enabled?: boolean;
}

export const useWidgetUpdater = ({
  interval,
  onUpdate,
  enabled = true,
}: WidgetUpdateConfig) => {
  useEffect(() => {
    if (!enabled) return;

    const timer = setInterval(onUpdate, interval);
    return () => clearInterval(timer);
  }, [interval, onUpdate, enabled]);
};

// Hook for managing widget visibility based on time
export const useWidgetVisibility = (alwaysVisible: boolean = false) => {
  const isVisible = alwaysVisible;
  return { isVisible };
};
