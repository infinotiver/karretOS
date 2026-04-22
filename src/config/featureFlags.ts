export const FEATURE_FLAGS = {
//   launcherUserPill: false,
  desktopWidgets: false,
  desktopAtAGlance: false,
//   splitAppStore: false,
//   newClockLayout: false,
//   newWeatherLayout: false,
} as const;

export type FeatureFlag = keyof typeof FEATURE_FLAGS;
