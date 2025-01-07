import { useWeatherData, WeatherData } from "../context/WeatherDataContext";
import { CityData, GeoCoordinates } from "../types/types";

// TODO: Export type to types.ts file
interface CitySelectorItemProps {
  city: CityData;
  fetchCurrentWeather: (coord: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setDisplaySearch: (displaySearch: boolean) => void;
}

const CitySelectorItem: React.FC<CitySelectorItemProps> = ({
  city,
  fetchCurrentWeather,
  fetchForecast,
  setDisplaySearch,
}) => {
  const { setWeatherData } = useWeatherData();

  const updateCurrentCity = (city: CityData) => {
    setWeatherData((prevWeatherData: WeatherData) => ({
      ...prevWeatherData,
      city: city,
    }));
  };

  return (
    <button
      type="button"
      onPointerDown={() => {
        fetchCurrentWeather({ lat: city.latitude, lon: city.longitude });
        fetchForecast({ lat: city.latitude, lon: city.longitude });
        updateCurrentCity(city);
        setDisplaySearch(false);
      }}
      className="flex w-full flex-col gap-1 bg-black bg-opacity-75 px-4 py-2"
    >
      <h3 className="font-semibold">{city.name}</h3>
      <p className="text-sm opacity-75">
        {city.state}, {city.country}
      </p>
    </button>
  );
};

export default CitySelectorItem;
