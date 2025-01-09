import { useState } from "react";
import { GeoCoordinates } from "../types/types";

const useReverseGeocoding = (apiKey: string) => {
  //TODO: Find a way to make this work.
  const [city, setCity] = useState<{
    name: string;
    country: string;
    state: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCity = async (coordinates: GeoCoordinates): Promise<void> => {
    setLoading(true);
    setError(null);
    setCity(null);

    try {
      const response = await fetch(
        `https://api.api-ninjas.com/v1/reversegeocoding?lat=${coordinates.lat}&lon=${coordinates.lon}`,
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
      const result: { name: string; country: string; state: string } =
        await response.json();
      setCity(result);
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
  return { city, loading, error, fetchCity };
};

export default useReverseGeocoding;
