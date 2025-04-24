import { useCallback, useEffect, useMemo, useState } from 'react';
import { filterUniqueAddresses, isSameAddress } from '@/modules/utils/address.ts';

type TokenList = `0x${string}`[];

const TOKEN_LIST_KEY = 'token-list';

const INITIAL_TOKEN_LIST: TokenList = [
  '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
  '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
  '0x6b175474e89094c44da98b954eedeac495271d0f',
  '0xdac17f958d2ee523a2206206994597c13d831ec7',
];

function loadTokenList(): TokenList {
  const list = localStorage.getItem(TOKEN_LIST_KEY);

  try {
    return list ? JSON.parse(list) : INITIAL_TOKEN_LIST;
  } catch {
    return INITIAL_TOKEN_LIST;
  }
}

function saveTokenList(list: TokenList) {
  localStorage.setItem(TOKEN_LIST_KEY, JSON.stringify(list));
}

export function useTokenList() {
  const [tokenList, setTokenList] = useState<TokenList>(loadTokenList());

  useEffect(() => {
    saveTokenList(tokenList);
  }, [tokenList]);

  const addToken = useCallback((tokenAddress: string) => {
    setTokenList((tokenList) => {
      const newTokenList = filterUniqueAddresses([...tokenList, tokenAddress]);
      return newTokenList;
    });
  }, [setTokenList]);

  const removeToken = useCallback((tokenAddress: string) => {
    setTokenList((tokenList) => {
      const newTokenList = tokenList.filter((address) => !isSameAddress(address, tokenAddress));

      if (!newTokenList.length) {
        return tokenList;
      }

      return newTokenList;
    });
  }, [setTokenList]);

  return useMemo(() => ({
    tokenList,
    addToken,
    removeToken,
  }), [tokenList, addToken, removeToken]);
}
