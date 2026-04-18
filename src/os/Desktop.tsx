import { motion } from "framer-motion";
import { springPopIn } from "@/lib/spring";
interface DesktopProps {
  enableMotion?: boolean;
}

export const Desktop = ({ enableMotion = true }: DesktopProps) => {
  const Content = <div className="h-full w-full" />;

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
