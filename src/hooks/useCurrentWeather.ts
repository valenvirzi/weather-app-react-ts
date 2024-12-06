import currentWeatherResponse from "../mocks/currentWeatherResponse.json";
import { CurrentWeatherResponse } from "../types/types";

const useCurrentWeather = () => {
  const currentWeatherData: CurrentWeatherResponse = currentWeatherResponse;

  const {
    coord,
    weather,
    base,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    visibility,
    wind: { speed, deg },
    rain,
    snow,
    clouds,
    dt,
    sys: { type, country, sunrise, sunset },
    timezone,
    id,
    name,
    cod,
  } = currentWeatherData;
  const currentWeather = {
    coord,
    weather,
    base,
    main: { temp, feels_like, temp_min, temp_max, humidity, pressure },
    visibility,
    wind: { speed, deg },
    rain,
    snow,
    clouds,
    dt,
    sys: {
      type,
      country,
      sunrise,
      sunset,
    },
    timezone,
    id,
    name,
    cod,
  };
  return currentWeather;
};

export default useCurrentWeather;
