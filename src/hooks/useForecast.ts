import forecastResponse from "../mocks/response.json";
import {
  ForecastThreeHoursResponse,
  ForecastItem,
  ForecastCity,
} from "../types/types";

const useForecast = () => {
  // Type the forecast response correctly
  const forecastResult: ForecastThreeHoursResponse = forecastResponse;

  // Destructure the relevant parts of the API response
  const { city, list } = forecastResult;
  const forecastCity: ForecastCity = city;

  // Map over the list and create the full ForecastItem structure
  const forecastList: ForecastItem[] = list.map((forecastItem) => {
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
  });

  const forecastData = {
    forecastCity,
    forecastList,
  };

  return forecastData;
};

export default useForecast;
