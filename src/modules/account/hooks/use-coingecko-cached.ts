import { useEffect, useState } from 'react';
import {
  CoingeckoTokenDataMap,
  useCoingeckoTokenData
} from './use-coingecko.ts';

export function useCoingeckoTokenDataCached(addresses: string[]): { data: CoingeckoTokenDataMap | undefined } {
  const [lastAddresses, setLastAddresses] = useState<string[]>(addresses);
  const { data: lastTokenData } = useCoingeckoTokenData(lastAddresses);

  useEffect(() => {
    const lastAddressesSet = new Set(lastAddresses.map(address => address.toLowerCase()));
    const missingAddress = addresses.find(address => !lastAddressesSet.has(address.toLowerCase()));

    if (missingAddress) {
      setLastAddresses(addresses);
    }
  }, [lastAddresses, addresses])

  return { data: lastTokenData };
}
