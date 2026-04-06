import type { PropsWithChildren } from "react";
import { useTheme } from "@/hooks/useTheme";
import bg from "@/assets/assets/bg2.png";

const Environment = ({ children }: PropsWithChildren) => {
  const { backgroundMode } = useTheme();

  return (
    <div className="relative h-screen w-full overflow-hidden text-foreground">
      {backgroundMode !== "solid" && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover grayscale-25"
        />
      )}

      {/* Background overlay */}
      <div className="pointer-events-none absolute inset-0 bg-white/20" />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/8 via-transparent to-black/18 opacity-60" />

      
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
};

export default Environment;
