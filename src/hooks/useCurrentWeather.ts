import { useState } from "react";
import { CurrentWeatherResponse, GeoCoordinates } from "../types/types";
import { useWeatherData, WeatherData } from "../context/WeatherDataContext";

const useCurrentWeather = (apiKey: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setWeatherData } = useWeatherData();

  const updateCurrentWeather = (currentWeather: CurrentWeatherResponse) => {
    setWeatherData((prevWeatherData: WeatherData) => ({
      ...prevWeatherData,
      currentWeather: currentWeather,
    }));
  };
  const fetchCurrentWeather = async (coord: GeoCoordinates): Promise<void> => {
    setLoading(true);
    setError(null);

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
      updateCurrentWeather(result);
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
  return { loading, error, fetchCurrentWeather };
};

export default useCurrentWeather;
