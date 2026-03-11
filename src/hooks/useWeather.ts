import { useEffect, useState, useCallback } from "react";
import { useWidgetUpdater } from "./useWidgetUpdater";

export interface WeatherData {
  temp: number;
  condition: string;
  emoji: string;
  wind: number;
  humidity: number;
  feelsLike: number;
}

const wmoMeta = (code: number) => {
  if (code === 0) return { condition: "Clear sky", emoji: "☀️" };
  if (code <= 3) return { condition: "Cloudy", emoji: "☁️" };
  if (code <= 67) return { condition: "Rain", emoji: "🌧️" };
  if (code <= 77) return { condition: "Snow", emoji: "❄️" };
  return { condition: "Overcast", emoji: "🌥️" };
};

export const useWeather = () => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateWeather = useCallback(async () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const url = new URL("https://api.open-meteo.com/v1/forecast");
          url.searchParams.set("latitude", coords.latitude.toString());
          url.searchParams.set("longitude", coords.longitude.toString());
          url.searchParams.set(
            "current",
            "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature",
          );

          const response = await fetch(url.toString());

          if (!response.ok) throw new Error("Network response was not ok");
          const json = await response.json();

          setData({
            temp: Math.round(json.current.temperature_2m),
            wind: Math.round(json.current.wind_speed_10m),
            humidity: json.current.relative_humidity_2m,
            feelsLike: Math.round(json.current.apparent_temperature),
            ...wmoMeta(json.current.weather_code),
          });
          setError(null);
        } catch (err) {
          setError(`Failed to fetch weather ${err}`);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      },
    );
  }, []);

  useEffect(() => {
    updateWeather();
  }, [updateWeather]);

  useWidgetUpdater({
    onUpdate: updateWeather,
    interval: 30 * 60 * 1000, // every 30 mins
  });

  return { data, loading, error };
};
