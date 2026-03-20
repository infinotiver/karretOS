import type React from "react";
import type { HomeStat } from "@/config/home";
import { Panel } from "@/components/common/Panel";

interface StatsPanelProps {
  stats: HomeStat[];
}

const findStat = (stats: HomeStat[], label: string, fallback: string) =>
  stats.find((item) => item.label === label)?.value ?? fallback;

interface ActivitySegment {
  name: string;
  percent: number;
}

const shadeClasses = [
  "bg-blue-300",
  "bg-green-300",
  "bg-yellow-300",
  "bg-pink-300",
  "bg-purple-300",
  "bg-orange-300",
  "bg-teal-300",
  "bg-red-300",
];

const parseActivityBreakdown = (value: string): ActivitySegment[] =>
  value
    .split("|")
    .map((part) => part.trim())
    .map((part) => {
      const match = part.match(/^(.+?)\s+(\d+(?:\.\d+)?)%$/);
      if (!match) return null;
      return { name: match[1], percent: Number(match[2]) };
    })
    .filter((item): item is ActivitySegment => item !== null)
    .filter((item) => item.percent > 0);

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const totalCoding = findStat(stats, "Total Coding", "--");
  const topLanguage = findStat(stats, "Top Language", "N/A");
  const dailyAverage = findStat(stats, "Daily Average", "--");
  const activityBreakdown = findStat(
    stats,
    "Activity Breakdown",
    "Coding -- | Browsing --",
  );
  const activitySegments = parseActivityBreakdown(activityBreakdown);

  return (
    <aside className="md:col-span-1 md:col-start-4 md:h-full">
      <Panel
        title="Waka Stats"
        description="Live coding metrics from WakaTime"
        className="md:h-full"
      >
        <div className="space-y-2">
          <div className="space-y-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border/40 bg-background/40 p-2">
                <p className="text-xs font-semibold  tracking-widest text-muted-foreground">
                  Daily Avg
                </p>
                <p className="mt-1 text-lg font-black text-foreground">
                  {dailyAverage}
                </p>
              </div>
              <div className="rounded-xl border border-border/40 bg-background/40 p-2">
                <p className="text-xs font-semibold  tracking-widest text-muted-foreground">
                  Total
                </p>
                <p className="mt-1 text-lg font-black text-foreground">
                  {totalCoding}
                </p>
              </div>
              <div className="col-span-2 rounded-xl border border-border/40 bg-background/40 p-2">
                <p className="text-xs font-semibold  tracking-widest text-muted-foreground">
                  Top Language
                </p>
                <p className="mt-1 truncate text-lg font-black text-foreground">
                  {topLanguage}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-[11px] font-semibold  tracking-[0.2em] text-muted-foreground">
              Activity
            </p>
            {activitySegments.length > 0 ? (
              <div className="space-y-3">
                <div className="flex h-2 w-full overflow-hidden rounded-full bg-muted/40">
                  {activitySegments.map((segment, index) => (
                    <span
                      key={segment.name}
                      className={shadeClasses[index % shadeClasses.length]}
                      style={{ width: `${segment.percent}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="space-y-1 text-[11px] text-muted-foreground">
                  {activitySegments.map((segment, index) => (
                    <div key={segment.name} className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className={`h-2 w-2 rounded-sm ${shadeClasses[index % shadeClasses.length]}`}
                      />
                      <span className="flex-1 truncate">{segment.name}</span>
                      <span className="font-semibold text-foreground">
                        {Math.round(segment.percent)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">
                {activityBreakdown}
              </p>
            )}
          </div>
        </div>
      </Panel>
    </aside>
  );
  // ...existing code...
};

export default StatsPanel;
