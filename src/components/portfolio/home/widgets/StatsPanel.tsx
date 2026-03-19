import type React from "react";
import type { HomeStat } from "@/config/home";
import { Panel } from "@/components/common/Panel";
import { MetricPair } from "@/components/common/MetricPair";

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
  "bg-black",
  "bg-neutral-700",
  "bg-neutral-500",
  "bg-neutral-400",
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
        <div className="space-y-3">
          <div className="rounded-xl border border-border/60 bg-background/45 px-3 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Daily
            </p>
            <p className="mt-1 text-4xl font-black tracking-tight text-foreground">
              {dailyAverage}
            </p>
          </div>

          <div className="space-y-2">
            <MetricPair
              label="Total"
              value={
                <span className="font-black text-foreground">
                  {totalCoding}
                </span>
              }
            />
            <MetricPair
              label="Top Language"
              value={
                <span className="font-black text-foreground">
                  {topLanguage}
                </span>
              }
            />
          </div>

          <div className="space-y-2">
            <MetricPair
              label="Activity"
              value={
                <span className="text-[11px] text-muted-foreground">
                  {activityBreakdown}
                </span>
              }
              className="text-[11px]"
            />

            {activitySegments.length > 0 && (
              <div className="space-y-2">
                <div className="flex h-4 w-full gap-px overflow-hidden rounded-full border border-border/60 bg-white/30 p-[2px]">
                  {activitySegments.map((segment, index) => (
                    <span
                      key={segment.name}
                      className={`h-full ${shadeClasses[index % shadeClasses.length]}`}
                      style={{ width: `${segment.percent}%` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <div className="space-y-1">
                  {activitySegments.map((segment, index) => (
                    <MetricPair
                      key={`${segment.name}-${segment.percent}`}
                      label={
                        <span className="flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 rounded-sm ${shadeClasses[index % shadeClasses.length]}`}
                          />
                          {segment.name}
                        </span>
                      }
                      value={`${Math.round(segment.percent)}%`}
                      className="text-[11px]"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </aside>
  );
};

export default StatsPanel;
