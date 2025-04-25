import { useCoingeckoIdsMap } from '@/modules/account/hooks/use-coingecko.ts';
import { useAccountBalances } from '@/modules/account/hooks/use-account-balance.ts';
import { useMemo } from 'react';
import { useCoingeckoTokenDataCached } from '@/modules/account/hooks/use-coingecko-cached.ts';

export interface AccountTokenData {
  address: string;
  name: string;
  symbol: string;
  icon?: string;
  balance: number;
  priceUSD: number;
  balanceUSD: number;
}

export interface AccountData {
  account: string;
  tokens: AccountTokenData[];
}

export function useAccountData(account: string, tokenList: string[]): AccountData {
  const balances = useAccountBalances(account, tokenList);
  const { data: idsMap } = useCoingeckoIdsMap();
  const { data: tokenData } = useCoingeckoTokenDataCached(tokenList);

  const tokens = useMemo(() => {
    return balances.map(balance => {
      const address = balance.address as `0x${string}`;
      const idItem = idsMap?.[address];
      const dataItem = tokenData?.[address];

      const priceUSD = dataItem?.current_price ?? 0;
      const balanceUSD = balance.balance * priceUSD;

      return {
        address,
        name: idItem?.name ?? 'Unknown',
        symbol: idItem?.symbol ?? 'Unknown',
        icon: dataItem?.image,
        balance: balance.balance,
        priceUSD,
        balanceUSD
      }
    });
  }, [tokenData, balances, idsMap]);

  return useMemo(() => {
    return {
      account,
      tokens,
    };
  }, [account, tokens]);
}
