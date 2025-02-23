import { defineCollection } from 'astro:content';
import { Card, CardGrid } from '@astrojs/starlight/components';
import BarChart from '../../components/charts/BarChart';
import RadarChart from '../../components/charts/RadarChart';
import StackedLineChart from '../../components/charts/StackedLineChart';

export default {
  Card,
  CardGrid,
  BarChart,
  RadarChart,
  StackedLineChart,
};
