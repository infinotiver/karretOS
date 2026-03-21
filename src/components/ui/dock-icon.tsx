import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { AppDefinition } from "@/os/apps/types";

interface DockIconProps {
  app: AppDefinition;
  isActive: boolean;
  onClick: () => void;
}

const DockIcon = ({ app, isActive, onClick }: DockIconProps) => {
  const Icon = app.icon;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        
        <div
          className="group relative flex h-14 w-14 items-center justify-center p-1"
          onClick={onClick}
        >
          <motion.div
            whileHover={{
              scale: 1.25,
              y: -8,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`
              flex h-full w-full cursor-pointer items-center justify-center rounded-2xl border transition-colors duration-300
              ${
                isActive
                  ? "border-white/30 bg-white/10 shadow-lg"
                  : "border-white/5 bg-neutral-800 hover:bg-neutral-700/50"
              }
            `}
          >
            <Icon
              className={`h-6 w-6 transition-colors duration-300 ${
                isActive
                  ? "text-white"
                  : "text-neutral-400 group-hover:text-white"
              }`}
            />
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10}>
        <span className="text-[10px] font-bold tracking-tight">
          {app.title}
        </span>
      </TooltipContent>
    </Tooltip>
  );
};

export default DockIcon;
