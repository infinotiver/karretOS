import { motion } from "framer-motion";

import { springPopIn } from "@/lib/spring";
import { useFeatureFlagsContext } from "@/hooks/useFeatureFlagsContext";
import { Feature } from "@/components/common/Feature";
import { DesktopAtAGlance } from "@/components/desktop/DesktopAtAGlance";

interface DesktopProps {
  enableMotion?: boolean;
}

export const Desktop = ({ enableMotion = true }: DesktopProps) => {
  const { flags } = useFeatureFlagsContext();

  const Content = (
    <div className="relative h-full w-full">
      <Feature enabled={flags.desktopAtAGlance}>
        <DesktopAtAGlance />
      </Feature>
    </div>
  );

  if (!enableMotion) return Content;

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
