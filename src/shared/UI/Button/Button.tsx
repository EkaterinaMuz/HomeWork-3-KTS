import cn from 'classnames';
import * as React from 'react';
import Loader from '../Loader';
import Text from '../Text';
import s from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({ loading, disabled, children, className, color, ...props }) => {
  return (
    <>
      <button
        data-testid="button"
        className={cn(className, s.btn, s[`color_${color}`], {
          [s.disabled]: disabled,
        })}
        disabled={disabled ? true : loading}
        {...props}
      >
        {loading && <Loader size="s" data-testid="loader" />}
        <Text tag="span" view="button">
          {children}
        </Text>
      </button>
    </>
  );
};

export default Button;
