import React from "react";
import { ForecastItem } from "../types/types";

interface ItemListProps {
  gapSize: number;
  forecastData: ForecastItem[];
  children: React.ReactNode;
  unit?: "K" | "C" | "F";
  // TODO: Remove the "?" from "unit" when the functionality is properly implemented.
  // https://chatgpt.com/c/675227a4-3014-8007-a353-5d9006b067c6
}

// TODO: ItemList works as intended, but now it needs to render the proper info depending if it is on top of the chart or below, so that it renders the img (depending on the weather)
// Change ItemList name to something that fits better with its function on the app.

const ItemList: React.FC<ItemListProps> = ({
  gapSize,
  forecastData,
  children,
  unit,
}) => {
  return (
    <>
      <ul
        className="flex justify-between px-6"
        style={{ width: `${(forecastData.length - 1) * gapSize + 100}px` }}
      >
        {forecastData.map((item) => (
          <li key={item.dt} className="group flex flex-col items-center gap-2">
            <span>{item.dt_txt.slice(12, 16)}</span>
            <img className="w-6" src="./img/rain.svg" alt="rain" />
            <span className="rounded p-1 px-2 font-semibold group-first:bg-[#36abf8]">
              {item.main.temp.toFixed(1)}°{unit}
              {/* TODO: Make the conversion to diferent units of measure and be able to change it from the settings */}
            </span>
          </li>
        ))}
      </ul>
      {children}
      <ul
        className="flex justify-between px-6"
        style={{ width: `${(forecastData.length - 1) * gapSize + 100}px` }}
      >
        {forecastData.map((item) => (
          <li key={item.dt} className="flex items-center">
            <img className="w-6" src="./img/umbrella.svg" alt="umbrella" />
            <span className="text-sm">{item.pop * 100}%</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ItemList;
