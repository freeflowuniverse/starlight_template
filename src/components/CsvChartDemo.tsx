import React, { useEffect, useState } from 'react';
import { CsvReader, PeriodType, UnitType } from '../lib/csv_reader';
import { LineChart } from './charts/LineChart.tsx';
import { BarChart } from './charts/BarChart.tsx';
import { PieChart } from './charts/PieChart.tsx';

interface Props {
  csvContent: string;
}

export const CsvChartDemo: React.FC<Props> = ({ csvContent }) => {
  const [csvData] = useState(() => new CsvReader(csvContent));

  if (!csvData) return <div>Loading...</div>;

  // Example: Get funding data
  const fundingData = csvData.getDataAsList({
    rowname: 'funding_our_investor',
    periodType: PeriodType.Year,
    unit: UnitType.Million
  });

  const labels = csvData.getHeaderAsList(PeriodType.Year);

  return (
    <div>
      <h2>CSV Data Visualization</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        <h3>Funding Data - Line Chart</h3>
        <LineChart
          title="Funding Overview"
          titleSub="Yearly funding data"
          data={fundingData}
          labels={labels}
          rowname="Funding"
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Funding Data - Bar Chart</h3>
        <BarChart
          title="Funding Overview"
          titleSub="Yearly funding data"
          data={fundingData}
          labels={labels}
          rowname="Funding"
        />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h3>Funding Data - Pie Chart</h3>
        <PieChart
          title="Funding Distribution"
          titleSub="Yearly funding breakdown"
          data={fundingData}
          labels={labels}
          rowname="Funding"
          size="50%"
        />
      </div>
    </div>
  );
};

export default CsvChartDemo;
