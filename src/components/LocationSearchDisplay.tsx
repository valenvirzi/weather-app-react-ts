import { useState } from "react";
import { CityData, GeoCoordinates } from "../types/types";
import CitySelectorItem from "./CitySelectorItem";
// import { useWeatherData, WeatherData } from "../context/WeatherDataContext";
// import useReverseGeocoding from "../hooks/useReverseGeocoding";

// TODO: Export type to types.ts file
interface LocationSearchDisplayProps {
  cities?: CityData[] | null;
  citiesLoading: boolean;
  citiesError: string | null;
  // apiKey: string;
  fetchCityList: (citySearchInput: string) => void;
  fetchCurrentWeather: ({ lat, lon }: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setDisplaySearch: (display: boolean) => void;
}

const LocationSearchDisplay: React.FC<LocationSearchDisplayProps> = ({
  cities,
  citiesLoading,
  citiesError,
  // apiKey,
  fetchCityList,
  fetchCurrentWeather,
  fetchForecast,
  setDisplaySearch,
}) => {
  const [citySearchInput, setCitySearchInput] = useState<string>("");

  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (citySearchInput.trim()) {
      fetchCityList(citySearchInput);
    }
  };

  // const { setWeatherData } = useWeatherData();
  // const { city, loading, error, fetchCity } = useReverseGeocoding(apiKey);

  // const updateCurrentCity = (city: CityData | null) => {
  //   setWeatherData((prevWeatherData: WeatherData) => ({
  //     ...prevWeatherData,
  //     city: city,
  //   }));
  // };

  // TODO: Make a useEffect function that saves the fav cities in localStorage for later render of the favCities list at the top of the <ul></ul>
  // TODO: Make a merge of both arrays conditionally before rendering the components from it.

  return (
    <div className="flex flex-col gap-px">
      <form
        id="citySearchForm"
        onSubmit={handleCitySearch}
        className="flex items-stretch bg-black bg-opacity-75"
        action=""
        method="get"
      >
        {/* TODO: Make this button make a reverseGeocodingAPI call of the city from the coordinates gotten from the browser location and then updateCurrentCity with that info https://www.api-ninjas.com/api/reversegeocoding */}
        {/* <button
          type="button"
          onPointerDown={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const coordinates = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                  };
                  fetchCurrentWeather(coordinates);
                  fetchForecast(coordinates);
                  fetchCity(coordinates)
                  updateCurrentCity(city);
                },
                (error) => {
                  return error.message;
                },
              );
            } else {
              return "Geolocation is not supported by this browser.";
            }
            setDisplaySearch(false);
          }}
          form="citySearchForm"
          className="p-2"
        >
          <img
            className="aspect-square max-w-6"
            src="./img/locationArrow.svg"
            alt="locationArrow"
          />
        </button> */}

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
      {citiesLoading && (
        <p className="mt-4 self-center text-2xl">Loading cities...</p>
      )}

      {citiesError && (
        <p className="mt-4 self-center text-2xl text-red-600">{citiesError}</p>
      )}

      {cities && (
        <ul className="flex flex-col gap-px">
          {cities?.map((city, index) => {
            return (
              <li key={index}>
                <CitySelectorItem
                  city={city}
                  fetchCurrentWeather={fetchCurrentWeather}
                  fetchForecast={fetchForecast}
                  setDisplaySearch={setDisplaySearch}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocationSearchDisplay;
