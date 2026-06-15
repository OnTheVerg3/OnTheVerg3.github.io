import type { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { cx } from '../utils/cx';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'ghost' | 'outline';

interface ButtonBaseProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  to?: undefined;
  href?: undefined;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

interface ButtonAsLink extends ButtonBaseProps {
  to: string;
  href?: undefined;
  type?: undefined;
  onClick?: undefined;
}

interface ButtonAsAnchor extends ButtonBaseProps {
  href: string;
  to?: undefined;
  type?: undefined;
  onClick?: undefined;
}

type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

/** Brand-aligned button rendered as `<button>`, React Router `<Link>`, or `<a>`. */
export function Button({
  children,
  variant = 'primary',
  className,
  ...rest
}: ButtonProps): ReactElement {
  const buttonClass = cx(styles.button, styles[variant], className);

  if ('to' in rest && rest.to !== undefined) {
    return (
      <Link className={buttonClass} to={rest.to}>
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href !== undefined) {
    return (
      <a className={buttonClass} href={rest.href} rel="noopener noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  const { type = 'button', onClick } = rest as ButtonAsButton;
  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
