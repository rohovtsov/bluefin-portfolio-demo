import cn from 'classnames';
import styles from './style.module.scss';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component.tsx';
import Icon from '@/modules/ui/icon/icon.component.tsx';
import { randomStr } from '@/modules/utils/random.ts';
import PrettyInput from '@/modules/ui/pretty-input/pretty-input.component.tsx';
import { FormEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router';

export default function HomePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    navigate(`/account/${query}`);
  }, [query, navigate]);

  return <div className={cn(styles['page'], 'slide-animation')}>
    <div className="container">
      <div className={styles['page-inner']}>
        <h1>Portfolio Intelligence<br/>Unleashed.</h1>
        <p>Track performance in real-time, optimize asset allocations, and maximize returns with every trade. Smarter portfolio tracking means better decisions.</p>
        <div className={styles['controls-wrap']}>
          <form className={styles['search-form']} onSubmit={handleSubmit}>
            <PrettyInput
              name="account"
              onChange={setQuery}
              value={query}
              className={styles['search-form-input']}
              label={"Wallet Address"}
              placeholder="0x000...000"
              size="large"
            />

            <PrettyButton className={styles['search-form-button']} type="submit" size="large">
              Lookup
              <span className="pretty-button-icon postfix"><Icon name="arrow_forward" source="material"/></span>
            </PrettyButton>
          </form>

          <PrettyButton to={`/not-found-${randomStr(10)}`} variant="tertiary">
            Check out 404
            <span className="pretty-button-icon postfix"><Icon name="search" source="material"/></span>
          </PrettyButton>
        </div>
        <div className={styles['screenshot']}>
          <img src={'/assets/example.png'} alt={'Screenshot'} width={2166} height={840}/>
        </div>
      </div>
    </div>
  </div>;
}
