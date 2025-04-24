import { useTokenList } from '@/modules/account/hooks/use-token-list.ts';
import { AccountData, useAccountData } from '@/modules/account/hooks/use-account-data.ts';

interface Result {
  addToken: (token: string) => void;
  removeToken: (token: string) => void;
  tokenList: string[];
  accountData: AccountData;
}

export function useAccountPageState(account: string): Result {
  const { addToken, removeToken, tokenList } = useTokenList();

  const accountData = useAccountData(account, tokenList);
  return { addToken, removeToken, accountData, tokenList };
}
