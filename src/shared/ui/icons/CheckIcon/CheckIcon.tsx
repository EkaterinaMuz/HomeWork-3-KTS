import * as React from 'react';
import { IconProps } from '../Icon';

const CheckIcon: React.FC<IconProps> = (props) => {
  return (
    <svg
      className={props.className}
      width={props.width ?? '24'}
      height={props.height ?? '24'}
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 11.6129L9.87755 18L20 7"
        stroke={
          props.color === 'accent'
            ? '#518581'
            : props.color === 'secondary'
              ? '#afadb5'
              : props.color === 'primary'
                ? '#000'
                : 'inherit'
        }
        strokeWidth="2"
      />
    </svg>
  );
};

export default CheckIcon;
