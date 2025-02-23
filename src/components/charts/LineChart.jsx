import ChartComponent from '../BaseChart';

export default function LineChart() {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        tension: 0.1
      },
      {
        label: 'Dataset 2',
        data: [28, 48, 40, 19, 86, 27, 90],
        fill: false,
        tension: 0.1
      },
      {
        label: 'Dataset 3',
        data: [45, 30, 50, 60, 70, 40, 55],
        fill: false,
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: 'Line Chart with Multiple Datasets'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <ChartComponent type="line" data={data} options={options} />;
}
