
import cn from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Input from '../Input';
import ArrowDownIcon from '../icons/ArrowDownIcon';
import s from './MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, onChange, getTitle, ...props }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [placeholder, setPlaceholder] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);

  const setTitle = useCallback(() => {
    const res = getTitle(value);
    if (value.length === 0) {
      setPlaceholder(res);
    } else {
      setInputValue(res);
    }
  }, [value, getTitle, setPlaceholder, setInputValue]);

  useEffect(() => {
    setTitle();
  }, [setTitle]);

  const activeKeys = value.map(({ key }) => key);

  const isActive = (option: Option) => { return activeKeys.includes(option.key); }

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  const inputChange = (string: string) => {
    setFilteredOptions(options.filter(option => option.value.toLowerCase().includes(string.toLowerCase())));
  };

  const handleClick = (_: React.MouseEvent<HTMLOptionElement>, option: Option) => {
    if (props.disabled) return;
    let activeOptions: Option[];
    if (isActive(option)) {
      activeOptions = value.filter(el => el.key !== option.key);
      setPlaceholder('Filter');
    } else {
      activeOptions = [option];
    }
    const res = getTitle(activeOptions);
    setInputValue(res);
    onChange(activeOptions);
    setShow(false);
  }

  const dropdownRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className={s.filter_wrapper}>
      <Input
        className={props.className}
        placeholder={placeholder}
        disabled={props.disabled}
        onClick={() => setShow(true)}
        value={inputValue}
        onChange={inputChange}
        afterSlot={<ArrowDownIcon color="secondary" />}
      />
      {(show && !props.disabled) &&
        <select disabled={props.disabled} size={filteredOptions.length} multiple className={s.select}>
          {filteredOptions.map(elem => {
            return (
              <option
                className={cn(s.item, isActive(elem) && s.selected)}
                value={elem.value}
                key={elem.key}
                onClick={(e) => handleClick(e, elem)}
              >
                {elem.value}
              </option>
            )

          })}
        </select >
      }
    </div>
  )
};

export default MultiDropdown;
