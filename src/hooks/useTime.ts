import { useState, useEffect } from "react";

interface UseTimeOptions {
  updateInterval?: number; /// in ms
}

export const useTime = (options: UseTimeOptions = {}) => {
  const { updateInterval = 1000 } = options;
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), updateInterval);
    return () => clearInterval(timer);
  }, [updateInterval]);
  // Pre-formatted helpers
  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: updateInterval < 60000 ? "2-digit" : undefined,
  });

  const formattedDate = time.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return {
    time,
    formattedTime,
    formattedDate,
    minutes: time.getMinutes(),
    hours: time.getHours(),
    seconds: time.getSeconds(),
  };
};
