import cn from 'classnames';
import styles from './style.module.scss';
import { NavLink } from 'react-router';
import Icon from '@/modules/ui/icon/icon.component.tsx';

export default function LayoutNav() {
  return (
    <div className={cn(styles['layout-nav'], 'container')}>
      <NavLink className={styles['logo']} to={'/'}>
        <Icon className={styles['logo-icon']} name={'logo'} source={'native'} />
        <Icon className={styles['logo-text']} name={'logo-text'} source={'native'} />
      </NavLink>
    </div>
  )
}
