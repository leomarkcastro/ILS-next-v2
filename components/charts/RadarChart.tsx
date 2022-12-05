import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

export default function RadarChart({ data = [], labels = [], height }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    setChartData({
      series: [
        {
          name: "Average",
          data: data,
        },
      ],

      options: {
        chart: {
          type: "radar",
        },
        xaxis: {
          categories: labels,
        },
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
          type="radar"
          height={height}
        />
      )}
    </div>
  );
}
