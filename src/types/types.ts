// Root type for the API response
export type ForecastThreeHoursResponse = {
  cod: string; // Internal parameter
  message: number; // Internal parameter
  cnt: number; // Number of timestamps returned
  list: ForecastItem[]; // Array of forecast items
  city: ForecastCity; // Information about the city
};

// Type for individual forecast items in the list
export type ForecastItem = {
  dt: number; // Time of data forecasted, unix, UTC
  main: MainWeatherData; // Main weather data
  weather: WeatherCondition[]; // Array of weather conditions
  clouds: CloudData; // Cloudiness data
  wind: WindData; // Wind data
  visibility: number; // Average visibility, metres
  pop: number; // Probability of precipitation, 0 to 1
  rain?: PrecipitationData; // Rain data (optional)
  snow?: PrecipitationData; // Snow data (optional)
  sys: SystemData; // Part of the day data
  dt_txt: string; // Time of data forecasted, ISO, UTC
};

// Type for the `main` field in `list`
export type MainWeatherData = {
  temp: number; // Temperature
  feels_like: number; // Human-perceived temperature
  temp_min: number; // Minimum temperature
  temp_max: number; // Maximum temperature
  pressure: number; // Atmospheric pressure on sea level, hPa
  sea_level?: number; // Atmospheric pressure on sea level, hPa (optional)
  grnd_level?: number; // Atmospheric pressure on ground level, hPa (optional)
  humidity: number; // Humidity, %
  temp_kf?: number; // Internal parameter (optional)
};

// Type for the `weather` field in `list`
export type WeatherCondition = {
  id: number; // Weather condition id
  main: string; // Group of weather parameters (Rain, Snow, Clouds, etc.)
  description: string; // Weather condition description
  icon: string; // Weather icon id
};

// Type for the `clouds` field in `list`
export type CloudData = {
  all: number; // Cloudiness, %
};

// Type for the `wind` field in `list`
export type WindData = {
  speed: number; // Wind speed
  deg: number; // Wind direction, degrees (meteorological)
  gust?: number; // Wind gust (optional)
};

// Type for the `rain` and `snow` fields in `list`
export type PrecipitationData = {
  "1h"?: number; // Volume for last 1 hour, mm
  "3h"?: number; // Volume for last 3 hours, mm
};

// Type for the `sys` field in `list`
export type SystemData = {
  pod: string; // Part of the day (n - night, d - day)
};

// Type for the `city` field in the response
export type ForecastCity = {
  id: number; // City ID
  name: string; // City name
  coord: GeoCoordinates; // Geographical coordinates
  country: string; // Country code (GB, JP, etc.)
  population: number; // City population
  timezone: number; // Shift in seconds from UTC
  sunrise: number; // Sunrise time, Unix, UTC
  sunset: number; // Sunset time, Unix, UTC
};

// Type for the `coord` field in `city`
export type GeoCoordinates = {
  lat: number; // Latitude
  lon: number; // Longitude
};

export type ForecastChartProps = {
  gapSize: number;
  apiResponse: {
    forecastList: ForecastItem[];
    forecastCity: ForecastCity;
  };
  unit: "K" | "C" | "F";
};

export interface CurrentWeatherResponse {
  coord: GeoCoordinates;
  weather: WeatherCondition[];
  base: string;
  main: MainWeatherData;
  visibility: number;
  wind: WindData;
  rain?: PrecipitationData;
  snow?: PrecipitationData;
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type CityData = {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  state: string;
};

export type GeocodingResponse = CityData[];
