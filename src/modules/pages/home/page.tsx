import cn from 'classnames';
import styles from './style.module.scss';

export default function HomePage() {
  return <div className={cn(styles['page'], 'slide-animation')}>
    <div className="container">
      Home page
    </div>
  </div>;
}
