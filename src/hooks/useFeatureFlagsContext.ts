import { useContext } from "react";
import {
  FeatureFlagsContext,
  type FeatureFlagsContextType,
} from "@/context/FeatureFlagsContext";

export function useFeatureFlagsContext(): FeatureFlagsContextType {
  const context = useContext(FeatureFlagsContext);
  if (!context) {
    throw new Error(
      "useFeatureFlagsContext must be used within FeatureFlagsProvider",
    );
  }
  return context;
}
