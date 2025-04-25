import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { useMemo } from 'react';

export interface CoingeckoTokenId {
  id: string;
  symbol: string;
  name: string;
  address: string;
}
export type CoingeckoIdsMap = Record<`0x${string}`, CoingeckoTokenId>;

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
      const url = `https://api.coingecko.com/api/v3/coins/markets?ids=${idsQuery.join(',')}&vs_currency=usd`;
      const response = await fetch(url).then(r => r.json());
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
