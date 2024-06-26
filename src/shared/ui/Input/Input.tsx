import cn from 'classnames';
import * as React from 'react';
import { SearchParams } from '@/features/Search/ui';
import s from './Input.module.scss';

export type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: SearchParams) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ value, onChange, afterSlot, ...props }, ref) => {
  const [state, setState] = React.useState<string>(value);

  React.useEffect(() => {
    setState(value);
  }, [value]);

  return (
    <label htmlFor="input" className={cn(props.className, s.wrapper)}>
      <input
        ref={ref}
        type="text"
        placeholder={props.placeholder}
        id="INPUT_ID"
        value={state}
        {...props}
        className={cn(props.className, s.myinput)}
        onChange={(e) => {
          setState(e.target.value);
          onChange({ searchValue: e.target.value });
        }}
      />
      {afterSlot && afterSlot}
    </label>
  );
});

Input.displayName = 'Input';

export default Input;
