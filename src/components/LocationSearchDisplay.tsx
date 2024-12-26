import { GeocodingResponse } from "../types/types";
import CitySelectorItem from "./CitySelectorItem";

interface LocationSearchDisplayProps {
  geocodingData?: GeocodingResponse;
}

const LocationSearchDisplay: React.FC<LocationSearchDisplayProps> = ({
  geocodingData,
}) => {
  return (
    <div className="flex flex-col gap-px">
      <form
        className="flex items-stretch bg-black bg-opacity-75"
        action=""
        method="get"
      >
        <input
          type="text"
          name=""
          id=""
          placeholder="London, Miami, etc..."
          className="w-full p-2 px-4 text-black"
        />
        <button type="button" className="p-2">
          <img
            className="aspect-square max-w-6"
            src="./img/search.svg"
            alt="search"
          />
        </button>
      </form>
      <ul className="flex flex-col gap-px">
        {geocodingData?.map((city, index) => {
          return (
            <li key={index}>
              <CitySelectorItem city={city} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LocationSearchDisplay;
