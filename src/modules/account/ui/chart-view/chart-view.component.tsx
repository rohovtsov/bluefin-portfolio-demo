import styles from './style.module.scss';
import { useCoingeckoHistoricalTokenPrice } from '@/modules/account/hooks/use-coingecko.ts';
import { useEffect, useRef } from 'react';
import { registerChartJsTokenPrices } from '@/modules/account/ui/chart-view/chartjs.ts';

interface Props {
  tokenAddress: string | null;
}

export default function ChartView({ tokenAddress }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { data } = useCoingeckoHistoricalTokenPrice(tokenAddress);

  useEffect(() => {
    if (!canvasRef.current || !data || !data.length) {
      return;
    }

    const chart = registerChartJsTokenPrices(data, canvasRef.current);

    return () => {
      chart.destroy();
    };
  }, [data]);

  return <div className={styles['chart-view']}>
    <canvas ref={canvasRef}></canvas>
  </div>
}
