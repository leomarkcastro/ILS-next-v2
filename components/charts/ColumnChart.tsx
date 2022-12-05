import ReactApexChart from "react-apexcharts";
import { useState, useEffect } from "react";

export default function ColumnChart({
  data = [],
  labels = [],
  height,
  maxValue = 5,
}) {
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
        xaxis: {
          categories: labels,
        },
        plotOptions: {
          bar: {
            distributed: true,
            colors: {
              ranges: [
                {
                  from: -11,
                  to: 0,
                  color: "#06f",
                },
                {
                  from: 0,
                  to: 11,
                  color: "#a0f",
                },
              ],
            },
          },
        },
        yaxis: {
          min: -maxValue,
          max: maxValue,
          decimalsInFloat: 0,
        },
        logarithmic: true,
        legend: {
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
          type="bar"
          height={height}
        />
      )}
    </div>
  );
}
