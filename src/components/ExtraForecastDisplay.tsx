import { Bar } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { useWeatherData } from "../context/WeatherDataContext";
import { ForecastItem } from "../types/types";
import { useState } from "react";

interface ExtraForecastDisplayProps {
  forecastLoading: boolean;
  forecastError: string | null;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const getColor = (value: number): string => {
  const intensity = Math.min(
    255,
    Math.max(0, Math.round((1 - (value * 0.9) / 100) * 255)),
  ); // Map 0-100 to 0-255
  return `rgba(54, ${intensity}, 248, 0.75)`; // Blue-green with variable intensity
  //   return `rgba(228, ${intensity}, 27, 0.8)`; // Blue-green with variable intensity
};

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
  },
  scales: {
    y: {
      min: 0, // Set the lowest value to 0
      max: 100, // Set the maximum value to 100
      display: false, // Hide y-axis
      grid: {
        display: false, // Hide grid lines
      },
    },
    x: {
      type: "category", // Ensure consistent spacing
      ticks: {
        autoSkip: false,
        display: false, // Prevent skipping ticks
      },
      grid: {
        display: false, // Hide grid lines for cleaner look
      },
    },
  },
};

const extraData = (list: ForecastItem[]) => ({
  labels: list.map((item) => item.dt_txt),
  datasets: [
    {
      label: "Humidity (%)",
      data: list.map((item) => item.main.humidity),
      backgroundColor: list.map((item) => getColor(item.main.humidity)),
      borderColor: "rgba(54, 171, 248, 1)",
      borderWidth: 1,
      borderRadius: 5,
    },
  ],
});

const ExtraForecastDisplay: React.FC<ExtraForecastDisplayProps> = ({
  forecastLoading,
  forecastError,
}) => {
  // TODO: Make one chart/component for each weather property (Precipitation, Humidity and Wind) and display one of them on this component based on propertyDisplayed useState
  const [propertyDisplayed, setPropertyDisplayed] =
    useState<string>("precipitation");
  const { weatherData } = useWeatherData();
  const extraDisplay = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <div
      className="mb-2 h-40 px-10"
      style={{ width: `${(weatherData.forecast?.list?.length ?? 0) * 80}px` }}
    >
      <Bar options={options} data={extraData(weatherData.forecast?.list)} />
    </div>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );
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
      <div className="w-full overflow-x-auto py-2">{extraDisplay}</div>
    </div>
  );
};

export default ExtraForecastDisplay;
