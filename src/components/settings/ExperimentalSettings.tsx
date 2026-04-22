import { useFeatureFlagsContext } from "@/hooks/useFeatureFlagsContext";
import { Switch } from "@/components/ui/switch";

export function ExperimentalSettings() {
  const { flags, toggleFlag } = useFeatureFlagsContext();

  return (
    <div className="space-y-3">
      {Object.entries(flags).map(([key, value]) => (
        <label
          key={key}
          className="flex items-center justify-between rounded-lg border border-border/40 bg-background/40 px-3 py-2"
        >
          <span className="text-sm">{key}</span>
          <Switch
            checked={value}
            onCheckedChange={() => toggleFlag(key as never)}
          />
        </label>
      ))}
    </div>
  );
}
