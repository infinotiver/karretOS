import { createContext } from "react";
import type {FeatureFlag} from "@/config/featureFlags";

export interface FeatureFlagsContextType {
  flags: Record<FeatureFlag, boolean>;
  setFlag: (flag: FeatureFlag, value: boolean) => void;
  toggleFlag: (flag: FeatureFlag) => void;
}

export const FeatureFlagsContext = createContext<
  FeatureFlagsContextType | undefined
>(undefined);
