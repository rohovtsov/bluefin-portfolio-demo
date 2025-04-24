import cn from 'classnames';
import styles from './style.module.scss';
import { useParams } from 'react-router';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component.tsx';
import { useAccountPageState } from '@/modules/account/state/account-page.state.ts';
import { prettyAddress } from '@/modules/utils/address.ts';
import AccountView from '@/modules/account/ui/account-view/account-view.component.tsx';
import Icon from '@/modules/ui/icon/icon.component.tsx';

export default function AccountPage() {
  const { address = '' } = useParams<{ address: string }>();
  const { accountData, addToken, removeToken } = useAccountPageState(address);

  return <div className={cn(styles['page'], 'slide-animation')}>
    <div className="container">
      <div className={styles['page-inner']}>
        <PrettyButton to={`/`} variant="transparent">
          <span className="pretty-button-icon prefix"><Icon name="arrow_back" source="material"/></span>
          Back
        </PrettyButton>
        <h1>Account <ins>{prettyAddress(accountData.account)}</ins></h1>
        <AccountView data={accountData} addToken={addToken} removeToken={removeToken} />
      </div>
    </div>
  </div>;
}
