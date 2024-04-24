import cn from 'classnames';
import React from 'react';
import Loader from '../Loader';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, disabled, children, className, ...props }) => {
  const colors = {
    accent: props.color === 'accent',
    light: props.color === 'light'
  }
  return (
    <>
      <button data-testid="button" className={cn(className, s.btn, {
        [s.disabled]: disabled,
        [s.accent]: colors.accent,
        [s.light]: colors.light,
      })}
        disabled={disabled ? true : loading}
        {...props}>
        {loading && <Loader size='s' data-testid="loader" />}
        {children}
      </button >
    </>
  )
};

export default Button;
