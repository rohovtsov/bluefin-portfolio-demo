import styles from './style.module.scss';
import { Outlet } from 'react-router';
import LayoutNav from './layout-nav/layout-nav.component.tsx';

export default function Layout() {
  return <>
    <div className={styles['layout']}>
      <nav className={styles['layout-nav']}>
        <LayoutNav />
      </nav>
      <main className={styles['layout-content']}>
        <Outlet />
      </main>
    </div>
  </>
}
