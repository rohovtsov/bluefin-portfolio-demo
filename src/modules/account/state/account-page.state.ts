import { useTokenList } from '@/modules/account/hooks/use-token-list.ts';
import { AccountData, useAccountData } from '@/modules/account/hooks/use-account-data.ts';
import { useAccountSelectedToken } from '@/modules/account/hooks/use-account-selected-token.ts';

interface Result {
  addToken: (token: string) => void;
  removeToken: (token: string) => void;
  tokenList: string[];
  accountData: AccountData;
  selectedToken: string | null;
  setSelectedToken: (token: string) => void;
}

export function useAccountPageState(account: string): Result {
  const { addToken, removeToken, tokenList } = useTokenList();
  const accountData = useAccountData(account, tokenList);
  const { selectedToken, setSelectedToken } = useAccountSelectedToken(accountData.tokens);

  return { addToken, removeToken, accountData, tokenList, selectedToken, setSelectedToken };
}
