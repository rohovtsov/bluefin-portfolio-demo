import cn from 'classnames';
import styles from './style.module.scss';
import LaggingText from '@/modules/ui/lagging-text/lagging-text.component.tsx';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component.tsx';
import Icon from '@/modules/ui/icon/icon.component.tsx';

export default function NotFoundPage() {
  return (
    <div className={cn(styles['page'], 'slide-animation')}>
      <div className="container">
        <div className={`${styles['page-inner']}`}>
          <h1>
            <LaggingText texts={[
              '404 – Not Found',
              'Checking again ...',
              '404 – Still not found',
            ]} duration={3200} laggingOffset={0} laggingRatio={0.35}/>
          </h1>

          <p>
            This
            <LaggingText texts={[
              ' page could not be found. ',
              ' resource is not available. ',
            ]} duration={4800} laggingRatio={0.05}/>
            Please check the<br/>
            <LaggingText texts={[
              ' URL ',
              ' link ',
            ]} duration={4800} laggingRatio={0.05}/>
            or return to the homepage.
          </p>

          <div className={styles['buttons-wrap']}>
            <PrettyButton to={'/'}>
              <span className="pretty-button-icon prefix"><Icon name="arrow_back" source="material"/></span>
              Go Back
            </PrettyButton>

            <PrettyButton onClick={() => window.location.reload()} variant="secondary">
              <span className="pretty-button-icon prefix"><Icon name="refresh" source="material"/></span>
              Reload
            </PrettyButton>
          </div>
        </div>
      </div>
    </div>
  );
}
