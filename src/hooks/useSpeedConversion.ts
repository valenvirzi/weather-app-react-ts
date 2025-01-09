import { useMemo } from "react";

const useSpeedConversion = (speed: number, unit: string): string => {
  return useMemo(() => {
    switch (unit) {
      case "Km/h":
        return (speed * 3.6).toFixed(1);
      case "M/h":
        return (speed * 2.236936).toFixed(1);
      default:
        return speed.toFixed(1);
    }
  }, [speed, unit]);
};

export default useSpeedConversion;
