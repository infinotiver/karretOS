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

const WEATHER_CACHE_KEY = "weather-cache-v1";
const WEATHER_CACHE_TTL = 15 * 60 * 1000; // 15 minutes

const wmoMeta = (code: number) => {
  if (code === 0) return { condition: "Clear sky", emoji: "☀️" };
  if (code <= 3) return { condition: "Cloudy", emoji: "☁️" };
  if (code <= 67) return { condition: "Rain", emoji: "🌧️" };
  if (code <= 77) return { condition: "Snow", emoji: "❄️" };
  return { condition: "Overcast", emoji: "🌥️" };
};

const readWeatherCache = (): WeatherData | null => {
  try {
    const raw = localStorage.getItem(WEATHER_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data: WeatherData; ts: number };
    if (!parsed?.data || !parsed?.ts) return null;
    if (Date.now() - parsed.ts > WEATHER_CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
};

const writeWeatherCache = (data: WeatherData) => {
  try {
    localStorage.setItem(
      WEATHER_CACHE_KEY,
      JSON.stringify({ data, ts: Date.now() }),
    );
  } catch {
    // ignore cache errors
  }
};

const fetchWeatherForCoords = async (coords: GeolocationCoordinates) => {
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

  return {
    temp: Math.round(json.current.temperature_2m),
    wind: Math.round(json.current.wind_speed_10m),
    humidity: json.current.relative_humidity_2m,
    feelsLike: Math.round(json.current.apparent_temperature),
    ...wmoMeta(json.current.weather_code),
  } as WeatherData;
};

export const prefetchWeather = async () =>
  new Promise<WeatherData | null>((resolve) => {
    if (!navigator.geolocation) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const data = await fetchWeatherForCoords(coords);
          writeWeatherCache(data);
          resolve(data);
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
    );
  });

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
          const nextData = await fetchWeatherForCoords(coords);
          setData(nextData);
          writeWeatherCache(nextData);
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
    const cached = readWeatherCache();
    if (cached) {
      setData(cached);
      setLoading(false);
    }
    updateWeather();
  }, [updateWeather]);

  useWidgetUpdater({
    onUpdate: updateWeather,
    interval: 30 * 60 * 1000, // every 30 mins
  });

  return { data, loading, error };
};
