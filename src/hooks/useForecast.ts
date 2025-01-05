import { useState } from "react";
import {
  ForecastThreeHoursResponse,
  ForecastItem,
  ForecastCity,
  GeoCoordinates,
} from "../types/types";

const useForecast = (apiKey: string) => {
  const [forecast, setForecast] = useState<ForecastThreeHoursResponse | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Type the forecast response correctly

  const fetchForecast = async (coord: GeoCoordinates): Promise<void> => {
    setLoading(true);
    setError(null);
    setForecast(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`,
      );
      if (!response.ok) {
        throw new Error(
          `Error! status: ${response.status} ${response.statusText}`,
        );
      }
      const result: ForecastThreeHoursResponse = await response.json();
      setForecast(result);
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
  const forecastCity: ForecastCity | undefined = forecast?.city ?? undefined;
  const forecastList: ForecastItem[] | undefined =
    // Map over the list and create the full ForecastItem structure
    forecast?.list.map((forecastItem) => {
      const {
        dt,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        weather,
        clouds,
        wind,
        visibility,
        pop: precipitationProbability,
        rain,
        snow,
        sys: { pod },
        dt_txt: dateTime,
      } = forecastItem;

      // Return the full object, keeping the nested structure
      return {
        dt,
        main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
        weather,
        clouds,
        wind,
        visibility,
        pop: precipitationProbability,
        rain,
        snow,
        sys: { pod },
        dt_txt: dateTime,
      };
    }) ?? [];

  const forecastData = {
    forecastCity,
    forecastList,
  };

  return { forecastData, loading, error, fetchForecast };
};

export default useForecast;
