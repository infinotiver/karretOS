import { createContext, type FeatureFlag } from "react";

export interface FeatureFlagsContextType {
  flags: Record<FeatureFlag, boolean>;
  setFlag: (flag: FeatureFlag, value: boolean) => void;
  toggleFlag: (flag: FeatureFlag) => void;
}

export const FeatureFlagsContext = createContext<
  FeatureFlagsContextType | undefined
>(undefined);
