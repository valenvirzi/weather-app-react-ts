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

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ForecastChart: React.FC = () => {
  // TODO: I need to know what will come from the API (.json) and then store it in another file to import it later into the chart for rendering purposes and to get rid of "forecastData"
  const forecastData = [
    { time: "1 AM", temperature: -5 },
    { time: "2 AM", temperature: -3 },
    { time: "3 AM", temperature: 0 },
    { time: "4 AM", temperature: 2 },
    { time: "5 AM", temperature: 4 },
    { time: "6 AM", temperature: -2 },
    { time: "7 AM", temperature: 3 },
    { time: "8 AM", temperature: 5 },
    { time: "9 AM", temperature: 7 },
    { time: "10 AM", temperature: 6 },
    { time: "11 AM", temperature: 4 },
    { time: "12 PM", temperature: 3 },
  ];

  const gapSize = 100;
  const chartWidth = forecastData.length * gapSize;

  const data = {
    labels: forecastData.map((item) => item.time), // Get time from forecastData
    datasets: [
      {
        label: "Temperature (°C)",
        data: forecastData.map((item) => item.temperature), // Get temperature from forecastData
        borderColor: "#ffffff",
        backgroundColor: "rgba(75,192,192,0.5)",
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
      <ItemList gapSize={gapSize} />
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
