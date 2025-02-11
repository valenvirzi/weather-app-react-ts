import { useState } from "react";
import { motion } from "framer-motion";
import { CityData, GeoCoordinates } from "../types/types";
import CitySelectorItem from "./CitySelectorItem";

interface CollapsibleListProps {
  title: string;
  cityList: CityData[];
  favoriteCities: CityData[];
  fetchCurrentWeather: (coord: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setDisplaySearch: (displaySearch: boolean) => void;
  toggleFavoriteCity: (city: CityData) => void;
}

const CollapsibleList: React.FC<CollapsibleListProps> = ({
  title,
  cityList,
  favoriteCities,
  fetchCurrentWeather,
  fetchForecast,
  setDisplaySearch,
  toggleFavoriteCity,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex flex-col gap-px first-of-type:my-px">
      <button
        className="flex w-full items-center justify-between gap-2 bg-black p-2 px-4"
        type="button"
        onPointerDown={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg">{title}</span>
        <img
          className={`w-4 transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
          src="./img/arrow-collapse.svg"
          alt="collapse"
        />
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <ul className="flex flex-col gap-px">
          {cityList.map((city, index) => {
            return (
              <li key={`${city.latitude},${city.longitude},${index}`}>
                <CitySelectorItem
                  city={city}
                  fetchCurrentWeather={fetchCurrentWeather}
                  fetchForecast={fetchForecast}
                  setDisplaySearch={setDisplaySearch}
                  toggleFavoriteCity={toggleFavoriteCity}
                  isFavorite={favoriteCities.some(
                    (favCity) =>
                      favCity.latitude === city.latitude &&
                      favCity.longitude === city.longitude,
                  )}
                />
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
};

export default CollapsibleList;
