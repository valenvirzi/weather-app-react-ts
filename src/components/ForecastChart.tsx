import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { options } from "../utils/chartConfiguration";
import { dashedLinesPlugin, gradientShadowPlugin } from "../utils/chartPlugins"; // Import the shared plugins

import ItemList from "./ItemList";
import useForecast from "../hooks/useForecast";
import { ForecastChartProps } from "../types/types";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

//TODO: aislar el funcionamiento del componente para que pueda tomar por prop la data que luego debe renderizar
const ForecastChart: React.FC<ForecastChartProps> = ({ gapSize }) => {
  // TODO: I need to know what will come from the API (.json) and then store it in another file to import it later into the chart for rendering purposes and to get rid of "forecastData"
  const forecastData = useForecast();

  const GAP_SIZE: number = gapSize;
  const chartWidth = forecastData.forecastList.length * GAP_SIZE;

  // TODO: Find the way to store this styling values into another file and import them from there, since it will always look the same no matter the type of chart.

  const data = {
    labels: forecastData.forecastList.map((item) => item.dt_txt), // Get time from forecastData
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecastData.forecastList.map((item) => item.main.temp), // Get temperature from forecastData
        borderColor: "#ffffff",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointBackgroundColor: "#36abf8",
        pointHoverBackgroundColor: "#ffd900",
        pointHoverBorderColor: "#ffffff",
        pointRadius: 4,
        pointHoverRadius: 5,
        borderWidth: 1.5,
        fill: false,
      },
    ],
  };

  return (
    <div className="w-full overflow-x-auto">
      <ItemList gapSize={GAP_SIZE} />
      <div className="h-44 px-10" style={{ width: `${chartWidth}px` }}>
        <Line
          data={data}
          options={options}
          height={300}
          plugins={[dashedLinesPlugin, gradientShadowPlugin]}
        />
      </div>
    </div>
  );
};

export default ForecastChart;
