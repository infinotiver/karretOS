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
          // layout
          whileHover={{ 
            scale: 1.2, 
            y: -10,
          }}
          whileTap={{ scale: 0.9, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 18 
          }}
          className={`
            group relative flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border transition-all duration-200
            ${
              isActive
                ? "border-gray-400 bg-white/20"
                : "border-gray-800 bg-neutral-800 hover:bg-neutral-700"
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
