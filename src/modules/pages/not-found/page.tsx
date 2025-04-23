import cn from 'classnames';
import styles from './style.module.scss';
import LaggingText from '@/modules/ui/lagging-text/lagging-text.component.tsx';

export default function NotFoundPage() {
  return (
    <div className={cn(styles['page'], 'slide-animation')}>
      <div className="container">
        <LaggingText texts={[
          '404 – Not Found',
          'Checking again ...',
          '404 – Still not found',
        ]} duration={3200} laggingOffset={0} laggingRatio={0.35}/>
      </div>
    </div>
  );
}
