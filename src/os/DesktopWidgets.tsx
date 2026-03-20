import { motion } from "framer-motion";
import { ClockWidget } from "@/components/widgets/ClockWidget";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";
import { Greeting } from "@/components/widgets/GreetingWidget";
import { springPopIn } from "@/lib/spring";

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
        <motion.div variants={springPopIn} key={Widget.key ?? i}>
          {Widget}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DesktopWidgets;
