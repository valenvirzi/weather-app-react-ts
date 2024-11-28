import { ChartOptions } from "chart.js";

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
