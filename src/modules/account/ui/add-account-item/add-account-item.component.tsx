import styles from './style.module.scss';
import PrettyInput from '@/modules/ui/pretty-input/pretty-input.component.tsx';
import PrettyButton from '@/modules/ui/pretty-button/pretty-button.component.tsx';
import Icon from '@/modules/ui/icon/icon.component.tsx';
import { FormEvent, useCallback, useState } from 'react';

interface Props {
  addToken: (token: string) => void;
}

export default function AddAccountItem({ addToken }: Props) {
  const [query, setQuery] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    addToken(query);
    setQuery('');
  }, [addToken, query]);

  return <div className={styles['add-account-item']}>
    <h3>Add Token Address</h3>

    <form onSubmit={handleSubmit}>
      <PrettyInput
        name="account"
        onChange={setQuery}
        value={query}
        className={styles['add-account-item-input']}
        label={"Token Address"}
        placeholder="0x000...000"
        size="large"
      />

      <PrettyButton className={styles['add-account-item-button']} type="submit">
        Add
        <span className="pretty-button-icon postfix"><Icon name="arrow_forward" source="material"/></span>
      </PrettyButton>
    </form>
  </div>;
}
