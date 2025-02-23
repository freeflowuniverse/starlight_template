// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { Card, CardGrid } from '@astrojs/starlight/components';
import BarChart from './src/components/charts/BarChart';
import RadarChart from './src/components/charts/RadarChart';
import StackedLineChart from './src/components/charts/StackedLineChart';


// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind(),
		react(),		
		starlight({
			title: 'My Docs',
			social: {
				github: 'https://github.com/withastro/starlight',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
						{ label: 'Charts', slug: 'guides/charts' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			customCss: ['./src/tailwind.css']
		}),
	],
});
