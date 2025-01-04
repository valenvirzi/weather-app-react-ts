import { useState } from "react";
import { CityData, GeoCoordinates } from "../types/types";
import CitySelectorItem from "./CitySelectorItem";

interface LocationSearchDisplayProps {
  cities?: CityData[] | null;
  citiesLoading: boolean;
  citiesError: string | null;
  fetchCityList: (citySearchInput: string) => void;
  fetchWeather: ({ lat, lon }: GeoCoordinates) => void;
  setCurrentCityName: (name: string) => void;
  setDisplaySearch: (display: boolean) => void;
}

const LocationSearchDisplay: React.FC<LocationSearchDisplayProps> = ({
  cities,
  citiesLoading,
  citiesError,
  fetchCityList,
  fetchWeather,
  setCurrentCityName,
  setDisplaySearch,
}) => {
  const [citySearchInput, setCitySearchInput] = useState<string>("");
  const handleCitySearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (citySearchInput.trim()) {
      fetchCityList(citySearchInput);
    }
  };

  return (
    <div className="flex flex-col gap-px">
      <form
        id="citySearchForm"
        onSubmit={handleCitySearch}
        className="flex items-stretch bg-black bg-opacity-75"
        action=""
        method="get"
      >
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
                  setCurrentCityName={setCurrentCityName}
                  city={city}
                  fetchWeather={fetchWeather}
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
