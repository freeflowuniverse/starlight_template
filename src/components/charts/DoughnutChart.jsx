import ChartComponent from '../BaseChart';

export default function DoughnutChart() {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Dataset 1',
      data: [12, 19, 3, 5, 2, 3],
      hoverOffset: 4
    }, {
      label: 'Dataset 2',
      data: [15, 12, 8, 9, 7, 4],
      hoverOffset: 4
    }]
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        position: 'top'
      }
    }
  };

  return <ChartComponent type="doughnut" data={data} options={options} />;
}
