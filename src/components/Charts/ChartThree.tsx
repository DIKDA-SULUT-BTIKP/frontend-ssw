import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

interface ChartThreeProps {
  title: string;
  series: number[];
  labels: string[];
}

const ChartThree: React.FC<ChartThreeProps> = ({ title, series, labels }) => {
  const [state, setState] = useState<{ series: number[] }>({
    series: series,
  });

  const total = state.series.reduce((acc, val) => acc + val, 0);

  const options: ApexOptions = {
    chart: {
      fontFamily: 'Satoshi, sans-serif',
      type: 'donut',
    },

    colors: ['#FF0000', '#FF6347', '#8FD0EF', '#0FADCF'],
    labels: labels,
    legend: {
      show: false,
      position: 'bottom',
    },

    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          background: 'transparent',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3  gap-4 sm:flex">
        <h5 className="text-xl text-center font-semibold text-black dark:text-white">
          {title}
        </h5>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex items-center justify-center gap-y-3">
        {labels.map((label, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full justify-center items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{
                  backgroundColor: options.colors
                    ? options.colors[index]
                    : undefined,
                }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                <span>{label}</span>
                <span>
                  {state.series[index]} (
                  {((state.series[index] / total) * 100).toFixed(2)}%)
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
