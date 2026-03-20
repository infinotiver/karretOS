import { Wind, Droplets, Thermometer } from "lucide-react";
import { Card } from "./Card";
import { useWeather } from "@/hooks/useWeather";

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
          <p className="text-sm font-semibold text-muted-foreground">
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
      <div className="mt-4 grid grid-cols-3 gap-1 border-t border-border/40 pt-3">
        {/* Wind */}
        <div className="flex flex-col items-center">
          <Wind className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="mt-1 text-xs font-bold">{data.wind}km/h</span>
        </div>

        {/* Humidity */}
        <div className="flex flex-col items-center">
          <Droplets className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="mt-1 text-xs font-bold">{data.humidity}%</span>
        </div>

        {/* Feels Like */}
        <div className="flex flex-col items-center">
          <Thermometer className="h-3.5 w-3.5 text-muted-foreground/70" />
          <span className="mt-1 text-xs font-bold">{data.feelsLike}°</span>
        </div>
      </div>
    </Card>
  );
};
