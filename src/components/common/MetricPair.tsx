import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricPairProps {
  label: ReactNode;
  value: ReactNode;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

export const MetricPair = ({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: MetricPairProps) => (
  <div
    className={cn(
      "flex items-center justify-between gap-3 text-[11px] font-semibold leading-tight text-muted-foreground",
      className,
    )}
  >
    <span className={cn(labelClassName)}>{label}</span>
    <span className={cn("text-foreground", valueClassName)}>{value}</span>
  </div>
);

export default MetricPair;
