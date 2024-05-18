import cn from 'classnames';
import * as React from 'react';
import s from './SliderArrow.module.scss';

type IconProps = {
  direction?: 'right' | 'left';
  className: string;
  onClick: () => void;
  disabled: boolean;
};

const SlideArrow: React.FC<IconProps> = (props) => {
  const { direction, disabled, onClick, className } = props;
  return (
    <svg
      className={cn(className, {
        [s.arrow_left]: direction === 'left',
      })}
      onClick={onClick}
      width="104"
      height="104"
      viewBox="0 0 104 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_531_2167)">
        <circle cx="52" cy="48" r="32" fill={disabled ? '#AFADB533' : '#000'} />
      </g>
      <path
        d="M47.957 57.6126L56.0439 49.5258C56.9989 48.5708 56.9989 47.008 56.0439 46.0529L47.957 37.9661"
        stroke="white"
        strokeWidth="3"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter
          id="filter0_d_531_2167"
          x="0"
          y="0"
          width="104"
          height="104"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.686275 0 0 0 0 0.678431 0 0 0 0 0.709804 0 0 0 0.2 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_531_2167" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_531_2167" result="shape" />
        </filter>
      </defs>
    </svg>
  );
};

export default SlideArrow;
