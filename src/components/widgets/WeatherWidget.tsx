import { Wind, Droplets, Thermometer } from "lucide-react";
import { Card } from "./Card";
import { useWeather } from "@/hooks/useWeather";

const DOCK_CHIP =
  "inline-flex h-12 items-center rounded-2xl border border-border/40 bg-background/45 hover:bg-background/65 px-3 transition-colors duration-300";
const WEATHER_STAT_CHIP =
  "inline-flex items-center gap-1.5 rounded-xl border border-border/40 bg-background/45 px-2.5 py-1.5";

export const WeatherWidget = () => {
  const { data, loading, error } = useWeather();

  if (loading)
    return (
      <Card className="animate-pulse p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="h-10 w-24 rounded bg-muted/40" />
          <div className="h-10 w-10 rounded-full bg-muted/40" />
        </div>
        <div className="h-10 w-full rounded bg-muted/20" />
      </Card>
    );

  if (error || !data)
    return (
      <Card className="p-4 flex items-center justify-center min-h-30">
        <p className="text-xs font-medium text-destructive/80 text-center">
          {error ?? "Weather data unavailable"}
        </p>
      </Card>
    );

  return (
    <Card className="p-4">
      {/* Top Section: Main Temperature */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-4xl font-black tracking-tighter text-foreground">
            {data.temp}°
          </p>
          <p className="mt-1 inline-flex items-center rounded-xl border border-border/40 bg-background/45 px-2 py-1 text-xs font-semibold text-muted-foreground">
            {data.condition}
          </p>
        </div>
        <span
          className="text-5xl leading-none"
          role="img"
          aria-label="weather-icon"
        >
          {data.emoji}
        </span>
      </div>

      {/* Bottom Section: Detailed Stats */}
      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-3">
        {/* Wind */}
        <div className={WEATHER_STAT_CHIP}>
          <Wind className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="text-xs font-semibold text-foreground">
            {data.wind}km/h
          </span>
        </div>

        {/* Humidity */}
        <div className={WEATHER_STAT_CHIP}>
          <Droplets className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="text-xs font-semibold text-foreground">
            {data.humidity}%
          </span>
        </div>

        {/* Feels Like */}
        <div className={WEATHER_STAT_CHIP}>
          <Thermometer className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="text-xs font-semibold text-foreground">
            {data.feelsLike}°
          </span>
        </div>
      </div>
    </Card>
  );
};

export const WeatherMini = () => {
  const { data, loading, error } = useWeather();

  if (loading) {
    return (
      <div className={`${DOCK_CHIP} gap-2`}>
        <span className="text-xs text-muted-foreground">Weather…</span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={`${DOCK_CHIP} gap-2`}>
        <span className="text-xs text-muted-foreground">Weather N/A</span>
      </div>
    );
  }

  return (
    <div className={`${DOCK_CHIP} gap-2`}>
      <span
        className="text-base leading-none"
        role="img"
        aria-label="weather-icon"
      >
        {data.emoji}
      </span>
      <span className="text-xs font-semibold text-foreground">
        {data.temp}°
      </span>
      <span className="text-xs text-muted-foreground">{data.condition}</span>
    </div>
  );
};
