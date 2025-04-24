import style from './style.module.scss';
import React from 'react';
import { NavLink } from 'react-router';
import cn from 'classnames';

// @ts-ignore
type Props = any & {
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
  to?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  size?: 'small' | 'medium' | 'large';
}

function PrettyButtonContent({ to, children, ...other }: Props = {}) {
  return to ? <NavLink to={to} {...other}>{children}</NavLink> : <button {...other}>{children}</button>;
}

export default function PrettyButton({ to, children, className, variant = 'primary', size = 'medium', ...other }: Props = {}) {
  return (
    <PrettyButtonContent
      to={to}
      className={cn(style['pretty-button'], style[`variant-${variant}`], style[`size-${size}`], className)}
      {...other}
    >{children}</PrettyButtonContent>
  );
}
