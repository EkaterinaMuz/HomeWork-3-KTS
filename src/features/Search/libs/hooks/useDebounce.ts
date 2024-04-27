import { ParsedQs } from 'qs';
import { useEffect, useState } from 'react';

const useDebounce = (value: string | string[] | ParsedQs | ParsedQs[], delay: number) => {
  const [delayedValue, setDelayedValue] = useState<string | string[] | ParsedQs | ParsedQs[]>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return delayedValue;
};

export default useDebounce;
