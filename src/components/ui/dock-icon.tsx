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
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div
          onClick={onClick}
          whileHover={{ scale: 1.15, y: -2 }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
          className={`
            group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-200
            ${
              isActive
                ? "border-gray-300 bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                : "border-gray-800 bg-neutral-800/40 hover:bg-neutral-700/60"
            }
          `}
        >
          <Icon
            className={`h-6 w-6 transition-colors ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}
          />
        </motion.div>
      </TooltipTrigger>
      <TooltipContent>
        <span className="text-xs font-medium">{app.title}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default DockIcon;
