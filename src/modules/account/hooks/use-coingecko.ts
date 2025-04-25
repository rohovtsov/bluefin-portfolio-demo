import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface CoingeckoTokenId {
  id: string;
  symbol: string;
  name: string;
  address: string;
}
export type CoingeckoIdsMap = Record<`0x${string}`, CoingeckoTokenId>;

const apiUrl = 'https://api.coingecko.com/api';
const authHeaders = {
  'x-cg-demo-api-key': 'CG-7h1pi4mzBnuwJAyHaBHiuZzx'
}

export function useCoingeckoIdsMap(): UseQueryResult<CoingeckoIdsMap> {
  return useQuery({
    queryKey: ['coingeckoIdsMap'],
    queryFn: async () => {
      //https://api.coingecko.com/api/v3/coins/list?include_platform=true&status=active
      const url = `/assets/coingecko-ids-map.json`;
      const response = await fetch(url).then(r => r.json());
      return response.reduce((acc: CoingeckoIdsMap, token: CoingeckoTokenId) => {
        acc[token.address.toLowerCase() as `0x${string}`] = { ...token, address: token.address.toLowerCase() };
        return acc;
      }, {} as CoingeckoIdsMap);
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}

export interface CoingeckoTokenData extends CoingeckoTokenId {
  current_price: number;
  image?: string;
}
export type CoingeckoTokenDataMap = Record<`0x${string}`, CoingeckoTokenData>;

export function useCoingeckoTokenData(addresses: string[]): UseQueryResult<CoingeckoTokenDataMap> {
  const { data: idsMap } = useCoingeckoIdsMap();
  const idsQuery = useMemo(() => {
    return addresses.map(address => idsMap?.[address.toLowerCase() as `0x${string}`]?.id).filter(Boolean) as string[];
  }, [addresses, idsMap]);

  return useQuery({
    queryKey: ['coingeckoTokenData', addresses.join(',')],
    queryFn: async () => {
      const url = `${apiUrl}/v3/coins/markets?ids=${idsQuery.join(',')}&vs_currency=usd`;
      const response = await fetch(url, { headers: authHeaders }).then(r => r.json()).catch(() => {
        throw new Error('Coingecko: Too Many Requests – try again in a few minutes')
      });
      const responseMap = response.reduce((acc: Record<string, CoingeckoTokenData>, token: CoingeckoTokenData) => {
        acc[token.id] = token;
        return acc;
      }, {});

      const tokenData: CoingeckoTokenData[] = addresses.map(address => {
        const item = idsMap?.[address.toLowerCase() as `0x${string}`] ?? {} as CoingeckoTokenId;
        const data = responseMap?.[item.id];

        return {
          ...item,
          current_price: data?.current_price ?? 0,
          image: data?.image,
        }
      });

      return tokenData.reduce((acc, token) => {
        acc[token.address as `0x${string}`] = token;
        return acc;
      }, {} as CoingeckoTokenDataMap)
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!idsQuery.length,
  });
}

export interface CoingeckoTokenHistoricalPrice {
  price: number;
  timestamp: number;
}

export function useCoingeckoHistoricalTokenPrice(address: string | null): UseQueryResult<CoingeckoTokenHistoricalPrice[]> {
  const { data: idsMap } = useCoingeckoIdsMap();
  const coinId = idsMap?.[address?.toLowerCase?.() as `0x${string}`]?.id;

  const now = new Date();
  now.setMinutes(0, 0, 0);
  const to = new Date(now).getTime() / 1000;
  const from = new Date(now.setDate(now.getDate() - 7)).setHours(0, 0, 0, 0) / 1000;

  return useQuery({
    queryKey: ['coingeckoHistoricalTokenPrice', coinId, from, to],
    queryFn: async () => {
      const url = `${apiUrl}/v3/coins/${coinId}/market_chart/range?from=${from}&to=${to}&vs_currency=usd`;
      const response = await fetch(url, { headers: authHeaders }).then(r => r.json()).catch(() => {
        throw new Error('Coingecko: Too Many Requests – try again in a few minutes')
      });

      return response.prices.map(([timestamp, price]: any) => ({ timestamp, price }));
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!coinId,
  });
}
