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
        <img className="w-6" src="./img/calendar.svg" alt="calendar" />
        <h3 className="">Details</h3>
      </div>
      <ul className="flex gap-2 overflow-x-auto p-2 text-sm">
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("humidity")}
            className="rounded border p-2"
          >
            Humidity
          </button>
        </li>
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("precipitation")}
            className="rounded border p-2"
          >
            Precipitation
          </button>
        </li>
        <li>
          <button
            type="button"
            onPointerDown={() => setPropertyDisplayed("wind")}
            className="rounded border p-2"
          >
            Wind
          </button>
        </li>
      </ul>
      <div className="w-full overflow-x-auto py-2">{display}</div>
    </div>
  );
};

export default ExtraForecastDisplay;
