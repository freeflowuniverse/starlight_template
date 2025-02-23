import ChartComponent from '../BaseChart';

export default function RadarChart() {
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
      label: 'My First Dataset',
      data: [65, 59, 90, 81, 56, 55, 40],
      fill: true,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff'
    }, {
      label: 'My Second Dataset',
      data: [28, 48, 40, 19, 96, 27, 100],
      fill: true,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff'
    }]
  };

  const options = {
    elements: {
      line: {
        borderWidth: 3
      }
    }
  };

  return <ChartComponent type="radar" data={data} options={options} />;
}
