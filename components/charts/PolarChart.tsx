import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

export default function PolarChart({ data = [], labels = [], height }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData({
      series: data,

      options: {
        chart: {
          type: "polarArea",
        },
        stroke: {
          colors: ["#fff"],
        },
        fill: {
          opacity: 0.8,
        },
        labels: labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
        yaxis: {
          show: false,
        },
      },
    });
  }, []);

  return (
    <div>
      {chartData && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="polarArea"
          height={height}
        />
      )}
    </div>
  );
}
