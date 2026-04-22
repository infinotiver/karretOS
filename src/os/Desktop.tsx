import { motion } from "framer-motion";

import { springPopIn } from "@/lib/spring";
import { useFeatureFlagsContext } from "@/hooks/useFeatureFlagsContext";
import { Feature } from "@/components/common/Feature";
import { DesktopAtAGlance } from "@/components/desktop/DesktopAtAGlance";
import { WeatherWidget } from "@/components/widgets/WeatherWidget";

interface DesktopProps {
  enableMotion?: boolean;
}

export const Desktop = ({ enableMotion = true }: DesktopProps) => {
  const { flags } = useFeatureFlagsContext();

  const Content = (
    <div className="relative h-full w-full p-4">
      {/* Set the specific width here and use items-stretch */}
      <div className="flex flex-col items-stretch gap-4 w-[60%] md:w-[20%]">
        <Feature enabled={flags.desktopWidgets}>
          {/* w-full now refers to 100% of the 20% container */}
          <div className="w-full">
            <WeatherWidget />
          </div>
        </Feature>

        <Feature enabled={flags.desktopAtAGlance}>
          <div className="w-full">
            <DesktopAtAGlance />
          </div>
        </Feature>
      </div>
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
