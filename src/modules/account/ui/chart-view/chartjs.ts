import Chart from 'chart.js/auto';
import { CoingeckoTokenHistoricalPrice } from '@/modules/account/hooks/use-coingecko.ts';
import { createFormatter } from '@/modules/account/ui/chart-view/chartjs-formatter.ts';

const backgroundGradientColor = ({ chart }: { chart: Chart }) => {
  const gradient = chart.ctx.createLinearGradient(
    0, 0, 0, chart.height
  );

  gradient.addColorStop(0, 'rgba(42,90,218,0.35)');
  gradient.addColorStop(0.5, 'rgba(42,90,218,0.25)');
  gradient.addColorStop(1, 'rgba(42,90,218,0.03)');

  return gradient;
};


export function registerChartJsTokenPrices(prices: CoingeckoTokenHistoricalPrice[], canvas: HTMLCanvasElement): Chart {
  const formatter = createFormatter(prices);

  return new Chart(canvas, {
    type: 'line',
    data: {
      labels: prices.map(price => new Date(price.timestamp).toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short'
      })),
      datasets: [
        {
          pointStyle: 'circle',
          data: prices.map(price => price.price),
          borderColor: '#2a5ada',
          backgroundColor: backgroundGradientColor,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 500,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      scales: {
        x: {
          ticks: {
            maxTicksLimit: 5,
            maxRotation: 0,
            minRotation: 0,
            color: '#9096a5',
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: '#9096a5',
            callback: (value) => formatter.format(value as number),
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      layout: {
        autoPadding: false,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
    },
  });
}
