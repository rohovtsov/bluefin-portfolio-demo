import { CoingeckoTokenHistoricalPrice } from '@/modules/account/hooks/use-coingecko.ts';

const defaultFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
  style: 'currency',
  currency: 'USD',
});

export function createFormatter(prices: CoingeckoTokenHistoricalPrice[]): Intl.NumberFormat {
  if (!prices.length) {
    return defaultFormatter;
  }

  let maxDigits = 0;

  while (maxDigits <= 6) {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: maxDigits,
      maximumFractionDigits: maxDigits,
      style: 'currency',
      currency: 'USD',
    });

    let differences = 0;
    for (let i = 1; i < prices.length; i++) {
      const prevPrice = formatter.format(prices[i - 1].price);
      const currentPrice = formatter.format(prices[i].price);

      if (prevPrice !== currentPrice) {
        differences++;
      }
    }

    if (differences >= prices.length / 2) {
      return formatter;
    }

    maxDigits++;
  }

  return defaultFormatter;
}
