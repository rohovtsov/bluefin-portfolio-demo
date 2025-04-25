import { AccountTokenData } from '@/modules/account/hooks/use-account-data.ts';
import { useEffect, useMemo, useState } from 'react';
import { isSameAddress } from '@/modules/utils/address.ts';

export function useAccountSelectedToken(tokens: AccountTokenData[]) {
  const [selectedToken, setSelectedToken] = useState<string | null>(tokens?.[0]?.address ?? null);

  useEffect(() => {
    const foundToken = tokens.find(token => isSameAddress(token.address, selectedToken ?? ''));

    if (!foundToken) {
      setSelectedToken(tokens[0]?.address ?? null);
    }
  }, [selectedToken, tokens]);

  return useMemo(() => ({
    selectedToken,
    setSelectedToken,
  }), [selectedToken, setSelectedToken]);
}
