
import { useReadContracts } from 'wagmi';
import { erc20Abi } from 'viem';
import { useMemo } from 'react';
import { applyDecimals } from '@/modules/utils/decimals.ts';

export interface AccountTokenBalance {
  account: string;
  address: string;
  balance: number;
  rawBalance: bigint;
  decimals: number;
}

export function useAccountBalances(account: string, tokenList: string[]): AccountTokenBalance[] {
  const { data: balancesData } = useReadContracts({
    contracts: tokenList.map((tokenAddress) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account],
    })),
  });

  const { data: decimalsData } = useReadContracts({
    contracts: tokenList.map((tokenAddress) => ({
      address: tokenAddress as `0x${string}`,
      abi: erc20Abi,
      functionName: 'decimals',
    })),
  });

  const balances = useMemo(() => {
    return tokenList.map((address, i) => {
      const rawBalance = BigInt(balancesData?.[i]?.result ?? 0n);
      const decimals = Number(decimalsData?.[i]?.result ?? 18);
      const balance = applyDecimals(rawBalance, decimals);

      return {
        account,
        address,
        balance,
        rawBalance,
        decimals,
      };
    })
  }, [account, tokenList, balancesData, decimalsData]);

  return balances;
}
