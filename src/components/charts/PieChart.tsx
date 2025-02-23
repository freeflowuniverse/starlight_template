import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import type { ChartProps } from './ChartTypes';

ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const PieChart: React.FC<ChartProps> = ({
  title,
  titleSub,
  data,
  labels,
  rowname,
  size = '70%',
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: rowname || 'Data',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'left' as const,
      },
      title: {
        display: !!title,
        text: title,
        subtitle: {
          display: !!titleSub,
          text: titleSub,
        },
      },
    },
    layout: {
      padding: 20,
    },
  };

  return (
    <div style={{ width: size, margin: '0 auto' }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
