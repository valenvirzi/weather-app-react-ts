import { useState } from "react";
import { CurrentWeatherResponse, GeoCoordinates } from "../types/types";

const useCurrentWeather = (apiKey: string) => {
  const [currentWeather, setCurrentWeather] =
    useState<CurrentWeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrentWeather = async (coord: GeoCoordinates): Promise<void> => {
    setLoading(true);
    setError(null);
    setCurrentWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error! status: ${response.status} ${response.statusText}`,
        );
      }

      const result: CurrentWeatherResponse = await response.json();
      setCurrentWeather(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return { currentWeather, loading, error, fetchCurrentWeather };
};

export default useCurrentWeather;
