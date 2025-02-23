import ChartComponent from '../BaseChart';

export default function StackedLineChart() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: true
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: true
      },
      {
        label: 'Dataset 3',
        data: [45, 30, 50, 60, 70, 40, 55],
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Stacked Line Chart'
      }
    },
    scales: {
      y: {
        stacked: true
      }
    }
  };

  return <ChartComponent type="line" data={data} options={options} />;
}
