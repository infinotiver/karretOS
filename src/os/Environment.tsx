import type { PropsWithChildren } from "react";
import { useTheme } from "@/hooks/useTheme";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuLabel
} from "@/components/ui/context-menu";
import { GithubLogoIcon } from "@phosphor-icons/react";
const SOURCE_URL = "https://github.com/infinotiver/karretos";

const Environment = ({ children }: PropsWithChildren) => {
  const { backgroundMode, backgroundOptions } = useTheme();
  const activeBackground = backgroundOptions.find(
    (option) => option.mode === backgroundMode,
  );
  const isSolid = backgroundMode === "solid";

  const openSource = () => {
    window.open(SOURCE_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div className="relative h-screen w-full overflow-hidden text-foreground">
          {!isSolid && activeBackground?.image && (
            <>
              <img
                src={activeBackground.image}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale-25"
              />
            </>
          )}

          {isSolid && (
            <>
              <div className="pointer-events-none absolute inset-0 bg-white/20" />

              {/* Gradient overlay */}
              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/18 opacity-60" />
            </>
          )}

          <div className="relative h-full w-full">{children}</div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="w-56">
        <ContextMenuLabel>karretOS</ContextMenuLabel>
        <ContextMenuItem onSelect={openSource}>
          <GithubLogoIcon className="mr-2 h-4 w-4" />
          View source on GitHub
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default Environment;
