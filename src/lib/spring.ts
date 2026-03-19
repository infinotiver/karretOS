// src/lib/spring.ts

export const springPopIn = {
  initial: { opacity: 0, y: 18, scale: 0.93 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.14 } },
};
