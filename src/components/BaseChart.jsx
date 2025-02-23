import { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

/**
 * Generic Chart component that supports all Chart.js chart types and configurations
 * @param {Object} props
 * @param {string} props.type - Chart type (e.g., 'bar', 'line', 'radar', 'pie', etc.)
 * @param {Object} props.data - Chart data configuration
 * @param {Object} props.options - Chart options configuration
 * @param {string} [props.className] - Additional CSS classes for the container
 */
export default function ChartComponent({ type, data, options = {}, className = '' }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    
    // Default colors for datasets if not provided
    const defaultColors = [
      { bg: 'rgba(255, 99, 132, 0.5)', border: 'rgb(255, 99, 132)' },
      { bg: 'rgba(54, 162, 235, 0.5)', border: 'rgb(54, 162, 235)' },
      { bg: 'rgba(255, 206, 86, 0.5)', border: 'rgb(255, 206, 86)' },
      { bg: 'rgba(75, 192, 192, 0.5)', border: 'rgb(75, 192, 192)' },
      { bg: 'rgba(153, 102, 255, 0.5)', border: 'rgb(153, 102, 255)' },
      { bg: 'rgba(255, 159, 64, 0.5)', border: 'rgb(255, 159, 64)' }
    ];

    // Apply default colors to datasets if not specified
    const processedData = {
      ...data,
      datasets: data.datasets.map((dataset, index) => {
        const defaultColor = defaultColors[index % defaultColors.length];
        return {
          ...dataset,
          backgroundColor: Array.isArray(dataset.data) 
            ? dataset.data.map((_, i) => defaultColors[i % defaultColors.length].bg)
            : defaultColor.bg,
          borderColor: Array.isArray(dataset.data)
            ? dataset.data.map((_, i) => defaultColors[i % defaultColors.length].border)
            : defaultColor.border
        };
      })
    };

    // Set default options based on theme
    const defaultOptions = {
      responsive: true,
      color: isDark ? '#fff' : '#000',
      scales: {
        x: {
          ticks: { color: isDark ? '#fff' : '#000' },
          grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
        },
        y: {
          ticks: { color: isDark ? '#fff' : '#000' },
          grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
        },
        r: {
          ticks: { color: isDark ? '#fff' : '#000' },
          grid: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' },
          angleLines: { color: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }
        }
      },
      plugins: {
        legend: {
          labels: { color: isDark ? '#fff' : '#000' }
        },
        title: {
          display: true,
          color: isDark ? '#fff' : '#000'
        },
        tooltip: {
          titleColor: isDark ? '#fff' : '#000',
          bodyColor: isDark ? '#fff' : '#000',
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        }
      },
      ...options
    };

    // Set global defaults
    Chart.defaults.color = isDark ? '#fff' : '#000';
    Chart.defaults.borderColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    // Create chart instance
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type,
      data: processedData,
      options: defaultOptions
    });

    // Update colors on theme change
    const observer = new MutationObserver(() => {
      const newIsDark = document.documentElement.classList.contains('dark');
      if (chartInstance.current) {
        const chart = chartInstance.current;
        
        // Update global defaults
        Chart.defaults.color = newIsDark ? '#fff' : '#000';
        Chart.defaults.borderColor = newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
        
        // Update options
        chart.options.color = newIsDark ? '#fff' : '#000';
        if (chart.options.scales) {
          ['x', 'y', 'r'].forEach(scale => {
            if (chart.options.scales[scale]) {
              chart.options.scales[scale].ticks.color = newIsDark ? '#fff' : '#000';
              chart.options.scales[scale].grid.color = newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
              if (scale === 'r') {
                chart.options.scales[scale].angleLines.color = newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
              }
            }
          });
        }
        
        // Update plugins
        if (chart.options.plugins) {
          if (chart.options.plugins.legend) {
            chart.options.plugins.legend.labels.color = newIsDark ? '#fff' : '#000';
          }
          if (chart.options.plugins.title) {
            chart.options.plugins.title.color = newIsDark ? '#fff' : '#000';
          }
          if (chart.options.plugins.tooltip) {
            chart.options.plugins.tooltip.titleColor = newIsDark ? '#fff' : '#000';
            chart.options.plugins.tooltip.bodyColor = newIsDark ? '#fff' : '#000';
            chart.options.plugins.tooltip.backgroundColor = newIsDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)';
            chart.options.plugins.tooltip.borderColor = newIsDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
          }
        }
        
        chart.update();
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => {
      observer.disconnect();
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className={`p-6 bg-white rounded-xl shadow-lg dark:bg-gray-800 ${className}`}>
      <canvas ref={chartRef} className="w-full max-w-2xl mx-auto"></canvas>
    </div>
  );
}
