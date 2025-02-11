import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

import { useWeatherData } from "../context/WeatherDataContext";
import PrecipitationDetails from "./PrecipitationDetails";

interface PrecipitationChartProps {
  forecastLoading: boolean;
  forecastError: string | null;
}

const PrecipitationChart: React.FC<PrecipitationChartProps> = ({
  forecastLoading,
  forecastError,
}) => {
  const { weatherData } = useWeatherData();

  const chartData = weatherData.forecast?.list.map((data) => {
    const value = data.rain?.["3h"] || data.snow?.["3h"] || 0.0; // Minimum height
    return { label: data.dt_txt, value };
  });

  // Prepare data for Chart.js
  const labels = chartData?.map((data) => data.label);
  const values = chartData?.map((data) => data.value);

  const data = {
    // TODO: Make the bar change color depending on the amount of precipitation, just like the HumidityChart does with the getColor function.
    labels,
    datasets: [
      {
        label: "Rain/Snow (mm)",
        data: values,
        backgroundColor: values?.map((value) =>
          value > 0 ? "rgba(59, 130, 235, 1)" : "rgba(211, 211, 211, 0.7)",
        ),
        borderColor: values?.map((value) =>
          value > 0 ? "rgba(59, 130, 235, 1)" : "rgba(211, 211, 211, 1)",
        ),
        borderWidth: 1,
        borderRadius: 5,
        barPercentage: 0.9,
        barThickness: 50,
        categoryPercentage: 0.9,
      },
    ],
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

  const chartWidth = (weatherData.forecast?.list?.length ?? 0) * 75;

  const precipitationDisplay = forecastError ? (
    <p className="text-red-800">{forecastError}</p>
  ) : forecastLoading ? (
    <img className="mx-auto w-10 animate-spin" src="./img/loading.svg" />
  ) : weatherData.forecast?.list?.length ? (
    <PrecipitationDetails
      chartWidth={chartWidth}
      forecastData={weatherData.forecast.list}
      precipitationList={values}
    >
      <div
        className="h-28 overflow-x-auto px-9"
        style={{ width: `${chartWidth}px` }}
      >
        <Bar data={data} options={options} />
      </div>
    </PrecipitationDetails>
  ) : (
    <h3 className="mx-auto inline-block text-2xl text-white">No Data</h3>
  );
  return (
    <div>
      <div>{precipitationDisplay}</div>
    </div>
  );
};

export default PrecipitationChart;
