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
  showLabel?: boolean;
}

const DockIcon = ({
  app,
  isActive,
  onClick,
  showLabel = false,
}: DockIconProps) => {
  const Icon = app.icon;

  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          className={`group relative flex h-14 items-center p-1 ${
            showLabel ? "w-auto" : "w-14 justify-center"
          }`}
          onClick={onClick}
        >
          <motion.div
            whileHover={{
              scale: 1.06,
              y: -2,
            }}
            whileTap={{ scale: 0.95 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className={`
              flex h-full cursor-pointer items-center rounded-2xl border px-3 transition-colors duration-300
              ${
                isActive
                  ? "border-border/70 bg-background/80 shadow-md shadow-black/20"
                  : "border-border/40 bg-background/45 hover:bg-background/65"
              }
            `}
          >
            <Icon
              className={`h-6 w-6 transition-colors duration-300 ${
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground group-hover:text-foreground"
              }`}
            />

            {showLabel && (
              <span
                className={`ml-2 whitespace-nowrap text-sm font-semibold transition-colors duration-300 ${
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {app.title}
              </span>
            )}
          </motion.div>
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" sideOffset={10}>
        <span className="text-xs font-bold tracking-tight">
          {app.title}
        </span>
      </TooltipContent>
    </Tooltip>
  );
};

export default DockIcon;
