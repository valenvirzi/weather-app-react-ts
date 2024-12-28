import { useState } from "react";
// import geocodingResponse from "../mocks/geocodingResponse.json";
import { CityData } from "../types/types";

const useGeocoding = (apiKey: string) => {
  const [cityList, setCityList] = useState<CityData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCityList = async (citySearchInput: string): Promise<void> => {
    setLoading(true);
    setError(null);
    setCityList(null);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/geocoding?city=${citySearchInput}&country=`,
        {
          method: "GET",
          headers: {
            "X-APi-Key": apiKey,
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        throw new Error(
          `Error! status: ${response.status} ${response.statusText}`,
        );
      }

      const result: CityData[] = await response.json();
      setCityList(result);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // const geocodingData: GeocodingResponse = geocodingResponse;
  // const cityList: CityData[] = geocodingData.map((city) => {
  //   const { name, latitude, longitude, country, state } = city;

  //   return {
  //     name,
  //     latitude,
  //     longitude,
  //     country,
  //     state,
  //   };
  // });
  return { cityList, loading, error, fetchCityList };
};

export default useGeocoding;
