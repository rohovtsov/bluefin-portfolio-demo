import style from './style.module.scss';
import { ChangeEvent, useCallback } from 'react';
import cn from 'classnames';

// @ts-ignore
type Props = any & {
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

export default function PrettyInput({ value, className, label, onChange, ...props }: Props) {
  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  }, [onChange]);

  return (
    <label className={cn(style['pretty-input'], className)}>
      <div className={style['pretty-input-inner']}>
        <span className={style['pretty-input-label']}>{label}</span>
        <input
          type="text"
          value={value === 0 ? '' : value}
          placeholder={'0'}
          onChange={handleInputChange}
          {...props}
        />
      </div>
    </label>
  );
}
