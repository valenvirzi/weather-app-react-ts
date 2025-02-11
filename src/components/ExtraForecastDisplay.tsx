import { useState } from "react";
import HumidityChart from "./HumidityChart";
import WindChart from "./WindChart";
import PrecipitationChart from "./PrecipitationChart";

interface ExtraForecastDisplayProps {
  forecastLoading: boolean;
  forecastError: string | null;
  theme: {
    color: string;
    backgroundImage: string;
  };
}

const ExtraForecastDisplay: React.FC<ExtraForecastDisplayProps> = ({
  forecastLoading,
  forecastError,
  theme,
}) => {
  // TODO: Make one chart/component for each weather property (Precipitation, Humidity and Wind) and display one of them on this component based on propertyDisplayed useState
  const [propertyDisplayed, setPropertyDisplayed] =
    useState<string>("humidity");
  let display;
  if (propertyDisplayed === "precipitation") {
    display = (
      <PrecipitationChart
        forecastError={forecastError}
        forecastLoading={forecastLoading}
      />
    );
  } else if (propertyDisplayed === "wind") {
    display = (
      <WindChart
        forecastError={forecastError}
        forecastLoading={forecastLoading}
        theme={theme}
      />
    );
  } else {
    display = (
      <HumidityChart
        forecastError={forecastError}
        forecastLoading={forecastLoading}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <img className="w-6 md:w-7" src="./img/graph.svg" alt="graph" />
        <h3 className="md:text-lg">Details</h3>
      </div>
      <ul className="flex gap-2 overflow-x-auto py-2 text-sm">
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("humidity")}
            className="rounded border bg-blue-500 p-2 hover:bg-blue-600 focus:bg-sky-500"
          >
            Humidity
          </button>
        </li>
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("precipitation")}
            className="rounded border bg-blue-500 p-2 hover:bg-blue-600 focus:bg-sky-500"
          >
            Precipitation
          </button>
        </li>
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("wind")}
            className="rounded border bg-blue-500 p-2 hover:bg-blue-600 focus:bg-sky-500"
          >
            Wind
          </button>
        </li>
      </ul>
      <div className="w-full overflow-x-auto">{display}</div>
    </div>
  );
};

export default ExtraForecastDisplay;
