import { useState, useMemo, type ReactNode } from "react";
import { FEATURE_FLAGS, type FeatureFlag } from "@/config/featureFlags";
import { FeatureFlagsContext } from "@/context/FeatureFlagsContext";

export function FeatureFlagsProvider({ children }: { children: ReactNode }) {
  const [flags, setFlags] = useState<Record<FeatureFlag, boolean>>(() => ({
    ...FEATURE_FLAGS,
  }));

  const setFlag = (flag: FeatureFlag, value: boolean) => {
    setFlags((prev) => ({ ...prev, [flag]: value }));
  };

  const toggleFlag = (flag: FeatureFlag) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const value = useMemo(
    () => ({
      flags,
      setFlag,
      toggleFlag,
    }),
    [flags],
  );

  return (
    <FeatureFlagsContext.Provider value={value}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}
