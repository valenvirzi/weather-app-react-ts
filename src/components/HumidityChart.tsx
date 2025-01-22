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
import HumidityDetails from "./HumidityDetails";

interface HumidityChartProps {
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

const humidityChartData = (list: ForecastItem[]) => ({
  labels: list.map((item) => item.dt_txt),
  datasets: [
    {
      label: "Humidity (%)",
      data: list.map((item) => item.main.humidity),
      backgroundColor: list.map((item) => getColor(item.main.humidity)),
      borderColor: "rgba(54, 171, 248, 1)",
      borderWidth: 1,
      borderRadius: 5,
      barPercentage: 0.9,
      barThickness: 50,
      categoryPercentage: 0.9,
    },
  ],
});

const HumidityChart: React.FC<HumidityChartProps> = ({
  forecastLoading,
  forecastError,
}) => {
  const { weatherData } = useWeatherData();

  const chartWidth = (weatherData.forecast?.list?.length ?? 0) * 75;

  const display = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="mx-auto w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <HumidityDetails
      chartWidth={chartWidth}
      forecastData={weatherData.forecast.list}
    >
      <div className="h-40 px-9" style={{ width: `${chartWidth}px` }}>
        <Bar
          options={options}
          data={humidityChartData(weatherData.forecast?.list)}
        />
      </div>
    </HumidityDetails>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );

  return <div>{display}</div>;
};

export default HumidityChart;
