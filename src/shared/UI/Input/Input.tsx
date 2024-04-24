import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import s from './Input.module.scss';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...props }, ref) => {

    const [state, setState] = useState<string>(value);

    useEffect(() => {
      setState(value);
    }, [value]);

    return (
      <label htmlFor='input' className={cn(props.className, s.wrapper)}>
        <input ref={ref} type='text' placeholder={props.placeholder} id='INPUT_ID' value={state} {...props} className={cn(props.className, s.myinput)}
          onChange={(e) => {
            setState(e.target.value);
            onChange(e.target.value);
          }}
        />
        {afterSlot && afterSlot}
      </label>
    );
  });

Input.displayName = 'Input';

export default Input;
