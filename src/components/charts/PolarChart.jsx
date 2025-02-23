import ChartComponent from '../BaseChart';

export default function PolarChart() {
  const data = {
    labels: [
      'Eating',
      'Drinking',
      'Sleeping',
      'Designing',
      'Coding',
      'Cycling',
      'Running'
    ],
    datasets: [{
      label: 'Dataset 1',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true
    }, {
      label: 'Dataset 2',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true
    }]
  };

  const options = {
    scales: {
      r: {
        beginAtZero: true
      }
    }
  };

  return <ChartComponent type="polarArea" data={data} options={options} />;
}
