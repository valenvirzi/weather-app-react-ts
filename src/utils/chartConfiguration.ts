import { ChartOptions } from "chart.js";
import { ForecastItem } from "../types/types";

export const options: ChartOptions<"line"> = {
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
    y: {
      display: false, // Hide y-axis
      grid: {
        display: false, // Hide grid lines
      },
    },
  },
};

export const data = (list: ForecastItem[]) => ({
  labels: list.map((item) => item.dt_txt), // Get time from forecastData
  datasets: [
    {
      label: "Temperature (°C)",
      data: list.map((item) => item.main.temp), // Get temperature from forecastData
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
});
