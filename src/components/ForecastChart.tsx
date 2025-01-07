import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { data, options } from "../utils/chartConfiguration";
import { dashedLinesPlugin, gradientShadowPlugin } from "../utils/chartPlugins"; // Import the shared plugins

import ForecastDetails from "./ForecastDetails";
import { ForecastChartProps } from "../types/types";
import { useWeatherData } from "../context/WeatherDataContext";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ForecastChart: React.FC<ForecastChartProps> = ({
  gapSize,
  forecastLoading,
  forecastError,
}) => {
  const { weatherData } = useWeatherData();

  const chartWidth = (weatherData.forecast?.list?.length ?? 0) * gapSize;
  const forecastDisplay = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <ForecastDetails gapSize={gapSize} forecastData={weatherData.forecast.list}>
      <div className="mb-2 h-40 px-10" style={{ width: `${chartWidth}px` }}>
        <Line
          data={data(weatherData.forecast.list)}
          options={options}
          height={300}
          plugins={[dashedLinesPlugin, gradientShadowPlugin]}
        />
      </div>
    </ForecastDetails>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );

  return <div className="w-full overflow-x-auto py-2">{forecastDisplay}</div>;
};

export default ForecastChart;
