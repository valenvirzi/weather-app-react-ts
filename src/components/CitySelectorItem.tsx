import { CityData, GeoCoordinates } from "../types/types";

interface CitySelectorItemProps {
  city: CityData;
  fetchWeather: ({ lat, lon }: GeoCoordinates) => void;
  setCurrentCityName: (name: string) => void;
}

const CitySelectorItem: React.FC<CitySelectorItemProps> = ({
  city,
  fetchWeather,
  setCurrentCityName,
}) => {
  return (
    <button
      type="button"
      onPointerDown={() => {
        fetchWeather({ lat: city.latitude, lon: city.longitude });
        setCurrentCityName(city.name);
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
