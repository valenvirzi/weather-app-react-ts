import geocodingResponse from "../mocks/geocodingResponse.json";
import { CityData, GeocodingResponse } from "../types/types";

const useGeocoding = () => {
  const geocodingData: GeocodingResponse = geocodingResponse;
  const cityList: CityData[] = geocodingData.map((city) => {
    const { name, latitude, longitude, country, state } = city;

    return {
      name,
      latitude,
      longitude,
      country,
      state,
    };
  });
  return cityList;
};

export default useGeocoding;
