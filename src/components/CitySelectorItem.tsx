import { CityData, GeoCoordinates } from "../types/types";

interface CitySelectorItemProps {
  city: CityData;
  fetchCurrentWeather: ({ lat, lon }: GeoCoordinates) => void;
  fetchForecast: (coord: GeoCoordinates) => void;
  setCurrentCityName: (name: string) => void;
  setDisplaySearch: (search: boolean) => void;
}

const CitySelectorItem: React.FC<CitySelectorItemProps> = ({
  city,
  fetchCurrentWeather,
  fetchForecast,
  setCurrentCityName,
  setDisplaySearch,
}) => {
  return (
    <button
      type="button"
      onPointerDown={() => {
        fetchCurrentWeather({ lat: city.latitude, lon: city.longitude });
        fetchForecast({ lat: city.latitude, lon: city.longitude });
        // console.log(fetchForecast({ lat: -34.6583293, lon: -58.6671441 }));
        setCurrentCityName(city.name);
        setDisplaySearch(false);
      }}
      className="flex w-full flex-col gap-1 bg-black bg-opacity-75 px-4 py-2"
      // TODO: Hacer que la funcion devuelva las coordenadas de la ciudad seleccionada para utilizarlas en la api del clima.
    >
      <h3 className="font-semibold">{city.name}</h3>
      <p className="text-sm opacity-75">
        {city.state}, {city.country}
      </p>
    </button>
  );
};

export default CitySelectorItem;
