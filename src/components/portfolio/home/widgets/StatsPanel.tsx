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
  "bg-pink3400",
  "bg-purple-300",
  "bg-orange-300",
  "bg-teal3500",
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
        className="md:h-full p-2 bg-card/40 border-border shadow-none"
      >
        <div className="flex flex-col gap-2">
          {/* Stats row */}
          <div className="flex items-end justify-between gap-4 text-xs">
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Daily
              </span>
              <span className="font-black text-foreground text-lg leading-tight">
                {dailyAverage}
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Total
              </span>
              <span className="font-bold text-foreground text-lg leading-tight">
                {totalCoding}
              </span>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-0">
              <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">
                Top Lang
              </span>
              <span className="font-bold text-foreground text-lg leading-tight truncate max-w-20">
                {topLanguage}
              </span>
            </div>
          </div>
          {/* Activity bar and legend */}
          {activitySegments.length > 0 && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex h-2 w-full gap-px overflow-hidden rounded">
                {activitySegments.map((segment, index) => (
                  <span
                    key={segment.name}
                    className={`h-full ${shadeClasses[index % shadeClasses.length]}`}
                    style={{ width: `${segment.percent}%` }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {activitySegments.map((segment, index) => (
                  <span
                    key={segment.name}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className={`inline-block h-2 w-2 rounded-sm ${shadeClasses[index % shadeClasses.length]}`}
                    />
                    {segment.name}{" "}
                    <span className="font-semibold">
                      {Math.round(segment.percent)}%
                    </span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </Panel>
    </aside>
  );
  // ...existing code...
};

export default StatsPanel;
