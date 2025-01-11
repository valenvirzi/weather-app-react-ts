import { useState } from "react";
import { CityData, GeoCoordinates } from "../types/types";

const useReverseGeocoding = (apiKey: string) => {
  const [city, setCity] = useState<CityData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = async (
    coordinates: GeoCoordinates,
  ): Promise<CityData | null> => {
    setLoading(true);
    setError(null);
    setCity(null);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/reversegeocoding?lat=${coordinates.latitude}&lon=${coordinates.longitude}`,
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

      const cityData = {
        name: result[0].name,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        country: result[0].country,
        state: result[0].state,
      };

      setCity(cityData); // Update the state
      return cityData; // Explicitly return the city data
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      return null; // Return null in case of an error
    } finally {
      setLoading(false);
    }
  };

  return { city, loading, error, fetchCity };
};

export default useReverseGeocoding;
