import { useState } from "react";
import { ForecastThreeHoursResponse, GeoCoordinates } from "../types/types";
import { useWeatherData, WeatherData } from "../context/WeatherDataContext";

const useForecast = (apiKey: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { setWeatherData } = useWeatherData();

  const updateForecast = (forecast: ForecastThreeHoursResponse) => {
    setWeatherData((prevWeatherData: WeatherData) => ({
      ...prevWeatherData,
      forecast: forecast,
    }));
  };
  // Type the forecast response correctly

  const fetchForecast = async (coord: GeoCoordinates): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.latitude}&lon=${coord.longitude}&appid=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error! status: ${response.status} ${response.statusText}`,
        );
      }
      const result: ForecastThreeHoursResponse = await response.json();
      updateForecast(result);
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

  return { loading, error, fetchForecast };
};

export default useForecast;
