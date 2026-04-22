import type { ReactNode } from "react";

interface FeatureProps {
  enabled: boolean;
  children: ReactNode;
}

export function Feature({ enabled, children }: FeatureProps) {
  if (!enabled) return null;
  return <>{children}</>;
}
