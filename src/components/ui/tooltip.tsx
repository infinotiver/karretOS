import { ReactNode } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

// Simple tooltip using group-hover and absolute positioning
const Tooltip = ({ content, children }: TooltipProps) => (
  <div className="relative group">
    {children}
    <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-black border border-white/10 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white opacity-0 transition-opacity group-hover:opacity-100 z-50 whitespace-nowrap">
      {content}
    </div>
  </div>
);

export default Tooltip;
