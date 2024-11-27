import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ChartOptions,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Plugin,
  Chart,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

const ForecastChart: React.FC = () => {
  // Example data
  const temperatures = [-5, -3, 0, 2, 4, -2, 3, 5, 7, 6, 4, 3]; // Example temperatures
  const times = [
    "1 AM",
    "2 AM",
    "3 AM",
    "4 AM",
    "5 AM",
    "6 AM",
    "7 AM",
    "8 AM",
    "9 AM",
    "10 AM",
    "11 AM",
    "12 PM",
  ]; // Example times

  const gapSize = 66;
  const chartWidth = times.length * gapSize;

  const data = {
    labels: times,
    datasets: [
      {
        label: "Temperature (°C)",
        data: temperatures,
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

  const dashedLinesPlugin: Plugin<"line"> = {
    id: "dashed-lines",
    beforeDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;
      const xAxis = chart.scales.x;

      // Draw dashed lines from each dot to the bottom
      chart.data.datasets[0].data.forEach((value, index) => {
        const x = xAxis.getPixelForValue(index); // X-coordinate of the point
        const y = yAxis.getPixelForValue(value as number); // Y-coordinate of the point
        const yBottom = yAxis.getPixelForValue(yAxis.min as number); // Bottom of the chart

        ctx.save();
        ctx.beginPath();
        ctx.setLineDash([3, 3]); // Dashed line style: 5px dash, 5px gap
        ctx.strokeStyle = "rgba(255, 255, 255, 1)"; // White dashed line
        ctx.lineWidth = 2;
        ctx.moveTo(x, y); // Start at the point
        ctx.lineTo(x, yBottom); // Draw to the bottom
        ctx.stroke();
        ctx.restore();
      });

      // Draw a dashed bottom border
      const yBottom = yAxis.getPixelForValue(yAxis.min as number); // Bottom of the chart
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([3, 3]); // Dashed line style: 5px dash, 5px gap
      ctx.strokeStyle = "rgba(255, 255, 255, 1)"; // White dashed line
      ctx.lineWidth = 2; // Thickness of the dashed line
      ctx.moveTo(xAxis.left, yBottom); // Start at the left edge
      ctx.lineTo(xAxis.right, yBottom); // Draw to the right edge
      ctx.stroke();
      ctx.restore();
    },
  };

  const gradientShadowPlugin: Plugin<"line"> = {
    id: "gradient-shadow",
    beforeDatasetsDraw: (chart: Chart) => {
      const ctx = chart.ctx;
      const yAxis = chart.scales.y;
      const xAxis = chart.scales.x;

      const dataset = chart.data.datasets[0];
      const data = dataset.data as number[];

      // Create a gradient from the line to the bottom
      const gradient = ctx.createLinearGradient(0, yAxis.top, 0, yAxis.bottom);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

      ctx.save();
      ctx.beginPath();

      // Move along the chart line
      data.forEach((value, index) => {
        const x = xAxis.getPixelForValue(index);
        const y = yAxis.getPixelForValue(value as number);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      // Close the path to form the gradient area
      ctx.lineTo(xAxis.getPixelForValue(data.length - 1), yAxis.bottom);
      ctx.lineTo(xAxis.getPixelForValue(0), yAxis.bottom);
      ctx.closePath();

      // Apply the gradient fill
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.restore();
    },
  };

  const options: ChartOptions<"line"> = {
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

  return (
    <div className="h-44 pl-3" style={{ width: `${chartWidth}px` }}>
      <Line
        data={data}
        options={options}
        height={300}
        plugins={[dashedLinesPlugin, gradientShadowPlugin]}
      />
    </div>
  );
};

export default ForecastChart;
