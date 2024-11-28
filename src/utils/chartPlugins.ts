import { Plugin, Chart } from "chart.js";

export const dashedLinesPlugin: Plugin<"line"> = {
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
      ctx.setLineDash([3, 3]); // Dashed line style: 3px dash, 3px gap
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
    ctx.setLineDash([3, 3]); // Dashed line style: 3px dash, 3px gap
    ctx.strokeStyle = "rgba(255, 255, 255, 1)"; // White dashed line
    ctx.lineWidth = 2; // Thickness of the dashed line
    ctx.moveTo(xAxis.left, yBottom); // Start at the left edge
    ctx.lineTo(xAxis.right, yBottom); // Draw to the right edge
    ctx.stroke();
    ctx.restore();
  },
};

export const gradientShadowPlugin: Plugin<"line"> = {
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
