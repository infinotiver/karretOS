import { motion } from "framer-motion";
import { ClockWidget } from "@/components/widgets/ClockWidget";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { Greeting } from "@/components/widgets/GreetingWidget";

/* ── pop-in spring variant used by each card ── */
const popIn = {
  initial: { opacity: 0, y: 18, scale: 0.93 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 380, damping: 26 },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.14 } },
};

/* ── Widget Island ── */

const widgets = [
  <Greeting key="greeting" />,
  <ClockWidget key="clock" />,
  <WeatherWidget key="weather" />,
];

const DesktopWidgets = () => {
  return (
    <motion.div
      className="flex flex-col gap-3 max-h-screen h-full scrollbar-none"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
      }}
    >
      {widgets.map((Widget, i) => (
        <motion.div variants={popIn} key={Widget.key ?? i}>
          {Widget}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DesktopWidgets;
