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

import ItemList from "./ItemList";
import { ForecastChartProps } from "../types/types";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

//TODO: Aislar el funcionamiento del componente para que pueda tomar por prop la data que luego debe renderizar, para poder utilizar este mismo componente para el Pronóstico Diario y el Pronóstico cada 3 Horas.
const ForecastChart: React.FC<ForecastChartProps> = ({
  gapSize,
  apiResponse,
}) => {
  // TODO: I need to know what will come from the API (.json) and then store it in another file to import it later into the chart for rendering purposes and to get rid of "forecastData"
  const forecastData = apiResponse;
  const chartWidth = forecastData.forecastList.length * gapSize;

  return (
    <div className="w-full overflow-x-auto py-2">
      {/* TODO: Add a State to change the unitSystem used and pass it as props to the ItemList component to render the proper unit and make the conversion.
      Make the same functionality for the main temperature display (and any other place where temperature is used)
      */}
      <ItemList gapSize={gapSize} forecastData={forecastData.forecastList}>
        <div className="mb-2 h-40 px-10" style={{ width: `${chartWidth}px` }}>
          <Line
            data={data(forecastData.forecastList)}
            options={options}
            height={300}
            plugins={[dashedLinesPlugin, gradientShadowPlugin]}
          />
        </div>
      </ItemList>
    </div>
  );
};

export default ForecastChart;
