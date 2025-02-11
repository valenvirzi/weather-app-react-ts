import { useState } from "react";
import { CityData, GeoCoordinates } from "../types/types";
import { useWeatherData, WeatherData } from "../context/WeatherDataContext";
import useReverseGeocoding from "../hooks/useReverseGeocoding";
import CollapsibleList from "./CollapsibleList";

// TODO: Export type to types.ts file
interface LocationSearchDisplayProps {
  cities?: CityData[] | null;
  citiesLoading: boolean;
  citiesError: string | null;
  goecodingApiKey: string;
  fetchCityList: (citySearchInput: string) => void;
  fetchCurrentWeather: ({ latitude, longitude }: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setDisplaySearch: (display: boolean) => void;
}

const LocationSearchDisplay: React.FC<LocationSearchDisplayProps> = ({
  cities,
  citiesLoading,
  citiesError,
  goecodingApiKey,
  fetchCityList,
  fetchCurrentWeather,
  fetchForecast,
  setDisplaySearch,
}) => {
  const [citySearchInput, setCitySearchInput] = useState<string>("");

  const [favoriteCities, setFavoriteCities] = useState<CityData[]>(() =>
    JSON.parse(localStorage.getItem("favoriteCities") || "[]"),
  );

  const toggleFavoriteCity = (city: CityData) => {
    setFavoriteCities((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(
        (favCity) =>
          favCity.latitude === city.latitude &&
          favCity.longitude === city.longitude,
      );

      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter(
            (favCity) =>
              favCity.latitude !== city.latitude ||
              favCity.longitude !== city.longitude,
          )
        : [...prevFavorites, city];

      localStorage.setItem("favoriteCities", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (citySearchInput.trim()) {
      fetchCityList(citySearchInput);
    }
  };

  const { setWeatherData } = useWeatherData();
  const { loading: cityLoading, fetchCity } =
    useReverseGeocoding(goecodingApiKey);

  const updateCurrentCity = (city: CityData) => {
    setWeatherData((prevWeatherData: WeatherData) => ({
      ...prevWeatherData,
      city: city,
    }));
    setDisplaySearch(false);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coordinates: GeoCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        try {
          const fetchedCity = await fetchCity(coordinates);
          if (fetchedCity) {
            updateCurrentCity(fetchedCity);
          }
          fetchCurrentWeather(coordinates);
          fetchForecast(coordinates);
        } catch (error) {
          console.error("Error fetching location data:", error);
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      },
    );
  };

  const filteredCities = (cities || []).filter(
    (city) =>
      !favoriteCities.some(
        (favCity) =>
          city.latitude === favCity.latitude &&
          city.longitude === favCity.longitude,
      ),
  );

  return (
    <div className="flex flex-col">
      <form
        id="citySearchForm"
        onSubmit={handleCitySearch}
        className="flex items-stretch bg-black bg-opacity-80"
        action=""
        method="get"
      >
        <button
          type="button"
          onPointerDown={handleGetLocation}
          form="citySearchForm"
          className="p-2"
        >
          {cityLoading ? (
            <img
              className="aspect-square max-w-6 animate-spin"
              src="./img/loading.svg"
              alt="loading"
            />
          ) : (
            <img
              className="aspect-square max-w-6"
              src="./img/locationArrow.svg"
              alt="locationArrow"
            />
          )}
        </button>

        <input
          type="text"
          name="citySearchInput"
          id="citySearchInput"
          onChange={(e) => {
            setCitySearchInput(e.target.value);
          }}
          placeholder="London, Miami, etc..."
          className="w-full p-2 px-4 text-black"
        />
        <button type="submit" form="citySearchForm" className="p-2">
          <img
            className="aspect-square max-w-6"
            src="./img/search.svg"
            alt="search"
          />
        </button>
      </form>
      {cities?.length ? (
        <CollapsibleList
          title="Search Results"
          cityList={filteredCities}
          favoriteCities={favoriteCities}
          fetchCurrentWeather={fetchCurrentWeather}
          fetchForecast={fetchForecast}
          setDisplaySearch={setDisplaySearch}
          toggleFavoriteCity={toggleFavoriteCity}
        />
      ) : citiesLoading ? (
        <></>
      ) : citiesError ? (
        <></>
      ) : (
        <div className="my-px bg-black bg-opacity-75 p-5">
          <h2>There are no cities with that name</h2>
        </div>
      )}
      {citiesLoading && (
        <div className="my-px flex items-center justify-center bg-black bg-opacity-75 p-4">
          <img
            className="aspect-square max-w-8 animate-spin self-center"
            src="./img/loading.svg"
            alt="loading"
          />
        </div>
      )}

      {citiesError && (
        <p className="mt-4 self-center text-2xl text-red-600">{citiesError}</p>
      )}
      {favoriteCities.length ? (
        <CollapsibleList
          title="Favorite Cities"
          cityList={favoriteCities}
          favoriteCities={favoriteCities}
          fetchCurrentWeather={fetchCurrentWeather}
          fetchForecast={fetchForecast}
          setDisplaySearch={setDisplaySearch}
          toggleFavoriteCity={toggleFavoriteCity}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LocationSearchDisplay;
