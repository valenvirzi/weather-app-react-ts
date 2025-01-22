import React from "react";
import { ForecastItem } from "../types/types";
import ForecastItemDetails from "./ForecastItemDetails";

// TODO: Export type to types.ts file
interface ForecastDetailsProps {
  gapSize: number;
  forecastData: ForecastItem[];
  children: React.ReactNode;
}

const ForecastDetails: React.FC<ForecastDetailsProps> = ({
  gapSize,
  forecastData,
  children,
}) => {
  return (
    <>
      <ul
        className="flex justify-between px-6"
        style={{ width: `${(forecastData.length - 1) * gapSize + 100}px` }}
      >
        {forecastData.map((item) => (
          <ForecastItemDetails key={item.dt} item={item} />
        ))}
      </ul>
      {children}
      <ul
        className="flex justify-between px-8"
        style={{ width: `${(forecastData.length - 1) * gapSize + 100}px` }}
      >
        {forecastData.map((item) => (
          <li key={item.dt} className="flex max-w-9 items-center">
            <img className="w-5" src="./img/umbrella.svg" alt="umbrella" />
            <span className="text-sm">{Math.round(item.pop * 100)}%</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ForecastDetails;
