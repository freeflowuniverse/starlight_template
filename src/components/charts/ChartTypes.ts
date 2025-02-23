import type { ChartData, ChartOptions } from 'chart.js';

export interface ChartProps {
  title?: string;
  titleSub?: string;
  data: number[];
  labels: string[];
  rowname?: string;
  size?: string;
}

export interface ChartConfig {
  data: ChartData;
  options: ChartOptions;
}
