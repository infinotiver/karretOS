import { motion } from "framer-motion";
import DesktopWidgets from "@/os/DesktopWidgets";
import { springPopIn } from "@/lib/spring";
interface DesktopProps {
  enableMotion?: boolean;
}

export const Desktop = ({ enableMotion = true }: DesktopProps) => {
  // Responsive layout: main area + side widgets
  const Content = (
    <div className="h-full w-full flex flex-row">
      <aside className="block min-w-100 w-full lg:w-auto h-full">
        <DesktopWidgets />
      </aside>
    </div>
  );

  if (!enableMotion) {
    return Content;
  }
  return (
    <motion.div
      className="h-full w-full"
      initial="initial"
      animate="animate"
      variants={springPopIn}
    >
      {Content}
    </motion.div>
  );
};
