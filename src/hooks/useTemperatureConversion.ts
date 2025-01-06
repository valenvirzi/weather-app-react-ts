import { useMemo } from "react";

const useTemperatureConversion = (temp: number, unit: string): string => {
  return useMemo(() => {
    switch (unit) {
      case "C":
        return (temp - 273.15).toFixed(1);
      case "F":
        return (((temp - 273.15) * 9) / 5 + 32).toFixed(1);
      default:
        return temp.toFixed(1);
    }
  }, [temp, unit]);
};

export default useTemperatureConversion;
