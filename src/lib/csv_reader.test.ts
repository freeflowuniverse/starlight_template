import { CsvReader, PeriodType, UnitType } from './csv_reader.ts';
import * as fs from 'fs';
import * as path from 'path';

// Read the test CSV file
const csvContent = fs.readFileSync(path.join(__dirname, '../content/test.csv'), 'utf-8');
const reader = new CsvReader(csvContent);

// Example 1: Get all funding-related rows
console.log('\nFunding Rows:');
const fundingRows = reader.getRowNames({
  includeFilter: ['funding type:*']
});
console.log(fundingRows);

// Example 2: Get yearly data for a specific row
console.log('\nYearly Data for funding_our_investor:');
const yearlyData = reader.getDataAsList({
  rowname: 'funding_our_investor',
  periodType: PeriodType.Year
});
console.log('Headers:', reader.getHeaderAsList(PeriodType.Year));
console.log('Values:', yearlyData);

// Example 3: Get quarterly data with unit conversion
console.log('\nQuarterly Data for funding_a_founder (in millions):');
const quarterlyData = reader.getDataAsList({
  rowname: 'funding_a_founder',
  periodType: PeriodType.Quarter,
  unit: UnitType.Million
});
console.log('Headers:', reader.getHeaderAsList(PeriodType.Quarter));
console.log('Values:', quarterlyData);

// Example 4: Filter by revenue type
console.log('\nRevenue Rows:');
const revenueRows = reader.getRowNames({
  includeFilter: ['rev name:oem_deals']
});
console.log(revenueRows);

// Example 5: Get specific row by name
console.log('\nSingle Row:');
try {
  const rowName = reader.getRowName({
    rowname: 'funding_our_investor'
  });
  console.log('Found row:', rowName);
} catch (error: any) {
  console.error('Error:', error.message);
}
