import { useWeatherData, WeatherData } from "../context/WeatherDataContext";
import { CityData, GeoCoordinates } from "../types/types";

// TODO: Export type to types.ts file
interface CitySelectorItemProps {
  city: CityData;
  fetchCurrentWeather: (coord: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setDisplaySearch: (displaySearch: boolean) => void;
  isFavorite: boolean;
  toggleFavoriteCity: (city: CityData) => void;
}

const CitySelectorItem: React.FC<CitySelectorItemProps> = ({
  city,
  fetchCurrentWeather,
  fetchForecast,
  setDisplaySearch,
  isFavorite,
  toggleFavoriteCity,
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
        fetchCurrentWeather({
          latitude: city.latitude,
          longitude: city.longitude,
        });
        fetchForecast({ latitude: city.latitude, longitude: city.longitude });
        updateCurrentCity(city);
        setDisplaySearch(false);
      }}
      className="flex w-full items-stretch justify-between bg-black bg-opacity-75 px-4 py-2"
    >
      <div className="flex flex-col gap-1 text-left">
        <h3 className="font-semibold">{city.name}</h3>
        <p className="text-sm opacity-75">
          {city.state}, {city.country}
        </p>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="grid cursor-pointer content-center p-2"
        onPointerDown={(e) => {
          e.stopPropagation();
          toggleFavoriteCity(city);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
            toggleFavoriteCity(city);
          }
        }}
      >
        {isFavorite ? (
          <img
            className="aspect-square max-w-6"
            src="./img/favoriteTrue.svg"
            alt="favorite"
          />
        ) : (
          <img
            className="aspect-square max-w-6"
            src="./img/favoriteFalse.svg"
            alt="favorite"
          />
        )}
      </div>
    </button>
  );
};

export default CitySelectorItem;
