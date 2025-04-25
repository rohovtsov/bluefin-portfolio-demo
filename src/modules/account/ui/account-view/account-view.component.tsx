import styles from './style.module.scss';
import { AccountData } from '@/modules/account/hooks/use-account-data.ts';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component.tsx';
import Icon from '@/modules/ui/icon/icon.component.tsx';
import AddAccountItem from '@/modules/account/ui/add-account-item/add-account-item.component.tsx';
import cn from 'classnames';
import { isSameAddress } from '@/modules/utils/address.ts';
import { SyntheticEvent } from 'react';

const format = new Intl.NumberFormat();
const usdFormat = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});

interface Props {
  data: AccountData;
  addToken: (token: string) => void;
  removeToken: (token: string) => void;
  selectedToken: string | null;
  setSelectedToken: (token: string) => void;
}

export default function AccountView({ data, addToken, removeToken, selectedToken, setSelectedToken }: Props) {
  return <div className={styles['account-view']}>
    {data.tokens.map((token) => {
      const symbol = token.symbol.toUpperCase().slice(0, 8);
      const handleRemove = (e: SyntheticEvent<MouseEvent>) => {
        e.stopPropagation();
        removeToken(token.address);
      }

      return <div
        onClick={() => setSelectedToken(token.address)}
        className={cn(styles['account-item'], {
          [styles['selected']]: isSameAddress(selectedToken ?? '', token.address)
        })}
        key={token.address}
      >
        <div className={styles['account-item-icon']}>{token.icon && <img src={token.icon} alt=""/>}</div>
        <div className={styles['account-item-data']}>
          <div className={styles['account-item-data-inner']}>
            <h3>{token.name}</h3>
            <div className={styles['account-item-balance']}>
              {format.format(token.balance)} {symbol}
              <small>{usdFormat.format(token.balanceUSD)}</small>
            </div>
          </div>
          <PrettyButton className={styles['account-item-action']} onClick={handleRemove} variant="transparent">
            <span className="pretty-button-icon prefix postfix"><Icon name="close" source="material"/></span>
          </PrettyButton>
        </div>
      </div>;
    })}

    <AddAccountItem addToken={addToken} />
  </div>;
}
