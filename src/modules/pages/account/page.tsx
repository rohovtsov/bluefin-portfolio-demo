import cn from 'classnames';
import styles from './style.module.scss';
import { useParams } from 'react-router';

export default function AccountPage() {
  const { address } = useParams<{ address: string }>();

  return <div className={cn(styles['page'], 'slide-animation')}>
    <div className="container">
      Account page {address}
    </div>
  </div>;
}
