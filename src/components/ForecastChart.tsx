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

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ForecastChart: React.FC<ForecastChartProps> = ({
  gapSize,
  apiResponse,
  unit,
}) => {
  // TODO: I need to know what will come from the API (.json) and then store it in another file to import it later into the chart for rendering purposes and to get rid of "forecastData"
  const forecastData = apiResponse;
  const chartWidth = forecastData.forecastList.length * gapSize;

  return (
    <div className="w-full overflow-x-auto py-2">
      <ForecastDetails
        gapSize={gapSize}
        forecastData={forecastData.forecastList}
        unit={unit}
      >
        <div className="mb-2 h-40 px-10" style={{ width: `${chartWidth}px` }}>
          <Line
            data={data(forecastData.forecastList)}
            options={options}
            height={300}
            plugins={[dashedLinesPlugin, gradientShadowPlugin]}
          />
        </div>
      </ForecastDetails>
    </div>
  );
};

export default ForecastChart;
